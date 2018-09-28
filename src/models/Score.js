import Model from './Model'
export default class Score extends Model{
  constructor(application) {
    super(application);
  }
  data() {
    return {
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
				//
				selected_appid:'',
				universalData:{
					expires_at:'',
					score:''
				},
				formVisible:false,
				cardVisible:false,
				cardData:{
					type:'0',
					expires_at:'',
					garden:'click',
					num:true,
					score:'',
					rule:{"order_count":'',"order_amount":'',"focus":''}
				},
				filters: {
					page: 1,
					limit: 15,
					name: '',
				},
				formData:{
					notice_user:false,
					score:'',
					type:'',
					gardens:'click',
					rule:{"order_count":'',"order_amount":'',"focus":''}
				},
				formRules:{
					score: [{ required: true, message: '请输入奖励分值', trigger: 'blur' },{ validator: this.validateInt, trigger: 'blur' }],
					type: [{ required: true, message: '请选择奖励条件', trigger: 'blur' }],
					'rule.order_count': [{ required: true, message: '请输入交易笔数限制', trigger: 'blur' },{ validator: this.validateZero, trigger: 'blur' }],
					'rule.order_amount': [{ required: true, message: '请输入购买金额限制', trigger: 'blur' },{ validator: this.validateTwo, trigger: 'blur' }]
				},
				cardRules:{
					score:[{ required: true, message: '积分不能为空'},{ validator: this.validateInt, trigger: 'blur' }]
				},
				options:[[{value:"明年",id:'1'},{value:"后年",id:'2'},{value:"3年后",id:'3'},{value:"4年后",id:'4'},{value:"5年后",id:'5'}]],
				selectData:[{}]
    };
  }
}
