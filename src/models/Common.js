import Model from './Model'
export default class Common extends Model{
  constructor(application) {
    super(application);
  }
  data(){
    let self = this;
    return {
    	saveType: 0,
			container: '',
			box:'',
			containerTop: '',
			scrollTop: '20px',
      provinces: self.provinces,
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
