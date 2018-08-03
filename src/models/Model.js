export default class Model {
  constructor(application) {
    this.$application = application;
    this.state = this.data();
  }

  data(){
    return {};
  }
}
