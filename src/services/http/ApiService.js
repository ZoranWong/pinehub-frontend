import Service from '../Service';
/* eslint-disable */
export default class ApiService extends Service{
  constructor(app) {
    super(app);
    this.headers = {};
    this.axios = this.$application.$vm.axios.create({
      headers: this.$application.config['httpHeaders']
    });
  }
  // eslint-disable-next-line
  async httpGet(route, params = [], auth = false, self = this) {
    if(auth) {
      console.log(self);
      let token = await self.$vm.token.getToken();
      self.axios.defaults.headers.get['Authorization'] = 'bearer ' + token;
    }
    console.log(this);
    return null;
  }

  async httpPost(route, params = [], auth = false) {
    if(auth) {
      let token = await this.$vm.token.getToken();
      this.axios.defaults.headers.get['Authorization'] = 'bearer ' + token;
    }
    return null;
  }

  async httpPut(route, params = [], auth = false) {
    if(auth) {
      let token = await this.$vm.token.getToken();
      this.axios.defaults.headers.get['Authorization'] = 'bearer ' + token;
    }
    return null;
  }

  async httpDelete(route, params = [], auth = false) {
    if(auth) {
      let token = await this.$vm.token.getToken();
      this.axios.defaults.headers.get['Authorization'] = 'bearer ' + token;
    }
    return null;
  }
}
