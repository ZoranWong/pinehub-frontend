import Model from './Model'
export default class Common extends Model{
  constructor(application) {
    super(application);
  }
  data(){
    return {
    	saveType: 0,
    	tLoading: false, //表格加载
			fLoading: false, //表单加载
			bLoading: false, //按钮加载
			container: '',
			box:'',
			containerTop: '',
			scrollTop: '20px',
			provinceData: [],
			cityData: [],
			areaData: [],
			cxCityData: [],
			cxAreaData: []
    };
  }
  computed() {
    return {
			
    };
  }

  dispatchs() {

  }

  listeners() {

  }

  services(name) {
    return this.$application.instances[name];
  }
}
