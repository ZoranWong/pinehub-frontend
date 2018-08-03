import Model from './Model'
export default class Order extends Model{
  constructor(application) {
    super(application);
  }

  data() {
    return {
      orders:[],
      pageCount: 0,
      currentPage: 0
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
      }
    }
  }
}
