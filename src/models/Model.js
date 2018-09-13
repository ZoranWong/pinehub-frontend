import _ from 'underscore';
export default class Model {
  constructor(application) {
    this.dataMap = {};
    this.$application = application;
    this.state = this.data();
    this.getters = this.computed();
    this.actions = this.dispatchs();
    this.mutations = this.listeners();
    this.transformer = null;
  }

  data() {
    this.dataMap = _.extend(this.dataMap, {
        list:[],
        pageCount: 0,
        currentPage: 0,
        totalNum:0,
    });
    return this.dataMap;
  }
  computed() {
    return {
      currentPage: (state) =>  {
        if(state.currentPage) {
          return state.list[state.currentPage -1];
        }else{
          return null;
        }
      }
    };
  }

  dispatchs() {
    return {
      nextPage({commit}) {
        commit('nextPage');
      },
      setList({commit}, payload) {
        commit('setList', payload);
      }
    };
  }

  listeners() {
    return {
      nextPage(state) {
        state.currentPage ++;
      },
      reset(state) {
        for (var key in state) {
          if (state.hasOwnProperty(key)) {
            state[key] = null;
          }
        }
      },
      setList: (state, payload) => {
        let list = payload['list'];
        let page = payload['currentPage'];
        let totalNum = payload['totalNum'];
        let totalPage = payload['totalPage'];
        let limit = payload['pageCount'];
        state.currentPage = page;
        let startIndex = (page - 1) * limit + 1;
        state.list[page - 1] =  this.transform(list, this.transformer, startIndex);
        if(totalNum !== null)
          state.totalNum = totalNum;
        if(totalPage !== null)
          state.totalPage = totalPage;
          if(limit !== null) {
            state.pageCount = limit;
          }
      }
    };
  }

  services(name) {
    return this.$application.instances[name];
  }

  transform(data, transformer, startIndex = 1) {
    if(_.isArray(data)) {
      return _.map(data, function(value, index) {
        value.index = startIndex + index;
        return new transformer(value);
      });
    }else{
      return new transformer(data);
    }
  }
}
