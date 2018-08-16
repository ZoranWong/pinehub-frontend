import Model from './Model';
import _ from 'underscore';
import CouponTransformer from './transformers/Coupon';
export default class Coupon extends Model {
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
       console.log(state)
          return state.list[state.currentPage -1];
      }
    };
  }

  dispatchs() {
    return {
      	nextPage({commit}) {
        	commit('nextPage');
      	},
        setCoupon({commit}, payload){

          commit('setCoupon', payload);
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
      setCoupon: (state, payload) => {
        let coupon = payload['coupon'];
        let page = payload['currentPage'];
        let totalNum = payload['totalNum'];
        let totalPage = payload['totalPage'];
        state.currentPage = page;
        state.list[page - 1] =  this.transform(coupon, CouponTransformer);
        if(totalNum !== null)
          state.totalNum = totalNum;
        if(totalPage !== null)
          state.totalPage = totalPage;
      }
    };
  }
}
