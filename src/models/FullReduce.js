import Model from './Model';
//import _ from 'underscore';
import FullReduceTransformer from './transformers/FullReduce';
export default class FullReduce extends Model {
  constructor(application) {
    super(application);
  }
  data() {
    return {
      list:[],
      pageCount: 0,
      currentPage: 0,
      totalNum:0,
      formVisible:false
    };
  }
  computed() {
    return {
      getShopsBuyPage: (state) => (page) => {
        return state.orders[page -1];
      },
      currentPage: (state) =>  {
        return state.list[state.currentPage -1];
      }
    };
  }

  dispatchs() {
    return {
      	nextPage({commit}) {
        	commit('nextPage');
      	},
        setFullReduce({commit}, payload){
          commit('setFullReduce', payload);
        }
    };
  }

  listeners() {
    return {
      nextPage(state) {
        state.currentPage ++;
      },
      reset(state) {
        state.list = [];
        state.totalNum = 0;
        state.totalPage = 0;
        state.currentPage = 0;
      },
      setFullReduce: (state, payload) => {
        let fullReduce = payload['fullReduce'];
        let page = payload['currentPage'];
        let totalNum = payload['totalNum'];
        let totalPage = payload['totalPage'];
        state.currentPage = page;
        state.list[page - 1] =  this.transform(fullReduce, FullReduceTransformer);
        if(totalNum !== null)
          state.totalNum = totalNum;
        if(totalPage !== null)
          state.totalPage = totalPage;
      }
    };
  }
}
