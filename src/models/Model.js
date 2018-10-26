import _ from 'underscore';
export default class Model {
  constructor(application) {
    this.dataMap = {};
    this.$application = application;
    this.state = this.data();
    this.getters = {};
    this.setGetters();
    this.actions = [];
    this.mutations = [];
    this.listeners();
    this.transformer = null;
  }

  data() {
    this.dataMap = _.extend(this.dataMap, {
        list:[],
        pageCount: 1,
        currentPage: 0,
        totalNum:1,
        totalPage: 0
    });
    return this.dataMap;
  }

  setGetters() {
    let methods = this.computed();
    for (let key in methods) {
      let method = methods[key];
      this.getters[key] = (state) => {
        return method.apply(state);
      }
    }
  }

  computed() {
    return {
      currentPage(){
        if(this.currentPage) {
          return this.list[this.currentPage -1];
        }else{
          return null;
        }
      }
    };
  }

  listeners() {
    this.addEventListener('nextPage', function(){
      this.currentPage ++;
    });

    this.addEventListener('reset', () => {
      this.state = this.data();
      console.log(this.state);
    });

    this.addEventListener('setList', function({list, currentPage, totalNum, totalPage,pageCount}, model){
      this.currentPage = currentPage;
      let startIndex = (currentPage - 1) * pageCount + 1;
      this.list[currentPage - 1] =  model.transform(list, model.transformer, startIndex);
      if(totalNum !== null)
        this.totalNum = totalNum;
      if(totalPage !== null){
          this.totalPage = totalPage;
      }
      if(pageCount !== null) {
        this.pageCount = pageCount;
      }
    });
  }

  service(name) {
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

  addEventListener(type, callback) {
    this.actions[type] = ({commit}, payload) => {
      commit(type, payload);
    }

    this.mutations[type] = (state, payload) => {
      callback.call(state, payload, this);
    }
  }
}
