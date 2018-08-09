import Model from './Model'
export default class Coupon extends Model{
  constructor(application) {
    super(application);
  }
  data() {
  	let self = this;
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
				//
				pickerOptions2:{
		          	disabledDate(time) {
			          	const d = self.formData.base_info.date_info.begin_timestamp?Date.parse(self.formData.base_info.date_info.begin_timestamp) + 48 * 60 * 60 * 1000:''
			            return time.getTime() < (d?d:Date.now()) - 8.64e7;
		           	}
		        },		
				pickerOptions1:{
		          	disabledDate(time) {
		            	return time.getTime() < Date.now() - 8.64e7;
		           	}
		        },			
				chooseColor:'background-color:#2c9f67',
				colorOptions:[{color:"#63b359",baseColor:"Color010"},{color:"#2c9f67",baseColor:"Color020"},{color:"#509fc9",baseColor:"Color030"},{color:"#5885cf",baseColor:"Color040"},{color:"#9062c0",baseColor:"Color050"},{color:"#d09a45",baseColor:"Color060"},{color:"#e4b138",baseColor:"Color070"},{color:"#ee903c",baseColor:"Color080"},{color:"#dd6549",baseColor:"Color090"},{color:"#cc463d",baseColor:"Color100"}],
				activeName:'first',
				activeNames:['1'],
				nostartData:[],
				couponsData:[],
				processData:[],
				endData:[],
				cardVisible:false,
				cardData:{
					c1:'',
					c2:'',
				},
				processFilters: {
					ticket_type: '',
					begin_at: '',
					end_at: ''
				},
				endFilters: {
					ticket_type: '',
					begin_at: '',
					end_at: ''
				},
				nostartFilters: {
					ticket_type: '',
					begin_at: '',
					end_at: ''
				},
				//列表查询字段
				couponsFilters: {
					ticket_type: '',
					begin_at: '',
					end_at: ''
				},
				formData:{
					base_info:{
						logo_url:'',
						code_type:'CODE_TYPE_QRCODE',//二维码
						notice:'请出示二维码',//卡券使用提醒，字数上限为16个汉字
						sku: {
			                quantity: ''
			            },//商品信息。
					//以上固定字段
						title:'',//会员卡名称
						brand_name:'',
						color:'Color010',
						service_phone:'',//客服电话
						description:'',//使用说明
						get_limit:'',
						date_info: {
		                    type: "",
		                    begin_timestamp: "",
		                   	end_timestamp: "",
		                   	fixed_term: ""
		                },
						can_share:'true'//卡券领取页面是否可分享，默认为true
					},
					advanced_info: {
					 	use_condition:{
					 		least_cost:''
					 	},//满减
					 },
		            discount:'',
					sync:false,
					card_type:'',
					
					least_cost:'',
					garden:'click'
				},
				formRules:{
					'base_info.title': [{ required: true, message: '优惠券名称必须在 1-10 个字内', trigger: 'blur' }],
					'base_info.sku.quantity': [{ required: true, message: '请输入发放总量', trigger: 'blur' },{ type: 'number', message: '发放总量必须是一个整数数字值'}],
					'base_info.description': [{ required: true, message: '使用说明不能为空', trigger: 'blur' }],
					'base_info.brand_name': [{ required: true, message: '卡券标题不能为空', trigger: 'blur' }],
					titles: [{ required: true, message: '卡券副标题不能为空', trigger: 'blur' }],
					'base_info.color': [{ required: true, message: '请选择卡券颜色', trigger: 'blur' }],
					'card_type': [{ required: true, message: '请选择优惠形式', trigger: 'blur' }],
					'advanced_info.use_condition.least_cost': [{ required: true, message: '请选择使用门槛', trigger: 'blur' }],
					'base_info.get_limit': [{ required: true, message: '请选择每人限领', trigger: 'blur' }],
					gardens: [{ required: true, message: '请选择有效期', trigger: 'blur' }],
					garden: [{ required: true, message: '请选择适用范围', trigger: 'blur' }]
				},
				cardRules:{},
				options:[
					[{label:"1张",value:"1"},{label:"2张",value:"2"},{label:"3张",value:"3"},{label:"4张",value:"4"},{label:"5张",value:"5"},{label:"10张",value:"10"}]
				],
				copyFormData:''
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
