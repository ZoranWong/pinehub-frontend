import Model from './Model'
export default class Merchandise extends Model{
  constructor(application) {
    super(application);
  }
  data() {
    return {
      	selectData:[],
      	pageCount: 0,
      	currentPage: 0,
		totalNum:0,

		formVisible: false, //新增编辑界面是否显示
		detailVisible: false, //详情界面是否显示
		detailData: {},

		paginator : {
			page:1,
			limit:10
		},
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
