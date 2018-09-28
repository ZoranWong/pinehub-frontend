import Model from './Model'
export default class PayGift extends Model{
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
}
