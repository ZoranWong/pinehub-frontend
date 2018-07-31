import Service from '../Service';
/* eslint-disable */
export default class ApiService extends Service{
  constructor(app) {
    super(app);
    this.headers = {};
    this.axios = this.$application.axios;
  }
  // eslint-disable-next-line
  async httpGet (route, params = [], auth = false) {
    if(auth) {
      let token = await this.services().token.getToken();
      this.axios.defaults.headers.get['Authorization'] = 'bearer ' + token;
    }
    //let result = await this.axios.get();
    return null;
  }

  async httpPost(route, params = [], auth = false) {
    if(auth) {
      let token = await this.services().token.getToken();
      this.axios.defaults.headers.get['Authorization'] = 'bearer ' + token;
    }
    return null;
  }

  async httpPut(route, params = [], auth = false) {
    if(auth) {
      let token = await this.services().token.getToken();
      this.axios.defaults.headers.get['Authorization'] = 'bearer ' + token;
    }
    return null;
  }

  async httpDelete(route, params = [], auth = false) {
    if(auth) {
      let token = await this.services().token.getToken();
      this.axios.defaults.headers.get['Authorization'] = 'bearer ' + token;
    }
    return null;
  }
}
