import Model from './Model'
export default class Common extends Model{
  constructor(application) {
    super(application);
  }
  data(){
    return {
    	saveType: 0,
			container: '',
			box:'',
			containerTop: '',
			scrollTop: '20px',
      provinces: [ ],
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
