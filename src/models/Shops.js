import Model from './Model'
import _ from 'underscore';
import ShopTransformer from './transformers/Shop';
export default class Shops extends Model{
  constructor(application) {
    super(application);
  }
  data() {
    return {
      	list:[],
      	pageCount: 0,
      	currentPage: 0,
				totalNum:0,
    };
  }
  computed() {
    return {
      getShopsBuyPage: (state) => (page) => {
        return state.orders[page -1];
      },
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
        setShops({commit}, payload){

          commit('setShops', payload);
        }
    };
  }

  listeners() {
    return {
      nextPage(state) {
        state.currentPage ++;
      },
      reset(state) {

      },
      setShops: (state, payload) => {
        let shops = payload['shops'];
        let page = payload['currentPage'];
        let totalNum = payload['totalNum'];
        let totalPage = payload['totalPage'];
        console.log(this);
        state.currentPage = page;
        state.list[page - 1] =  this.transform(shops, ShopTransformer);
        if(totalNum !== null)
          state.totalNum = totalNum;
        if(totalPage !== null)
          state.totalPage = totalPage;
      }
    };
  }
}
