import Model from './Model'
import _ from 'underscore';
import Shop from './transformers/Shop';
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
      orderPage: (state) => (page) => {
        return state.orders[page];
      }
    }
  }

  dispatchs() {
    return {
      	nextPage(context) {
        	context.commit('nextPage');
      	}
    }
  }

  listeners() {
    return {
      nextPage(state) {
        state.currentPage ++;
      },
      reset(state) {

      },
      getShops(state) {
        let shops = [];//异步请求
        _.each(shops, function(shop) {
          state.list[state.currentPage].push(new Shop(shop));
        });
      }
    }
  }
}
