import Model from './Model'
export default class Shops extends Model{
  constructor(application) {
    super(application);
  }
  data() {
    return {
      	selectData:[],
      	pageCount: 0,
      	currentPage: 0,
				totalNum:0,
				tLoading: false, //表格加载
				fLoading: false, //表单加载
				bLoading: false, //按钮加载
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
