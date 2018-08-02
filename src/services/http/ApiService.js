import Service from '../Service';
/* eslint-disable */
export default class ApiService extends Service{
  constructor(app) {
    super(app);
    this.axios = this.$application.axios;
    this.gateway = '';
  }

  headers() {
    return this.$application.axios.defaults.headers;
  }
  // eslint-disable-next-line
  async httpGet (route, params = [], auth = false) {
    if(auth) {
      let token = await this.services().token.getToken();
      this.headers().get['Authorization'] = 'bearer ' + token;
    }
    let result = await this.axios.get(this.gateway + this.services().uri.query(params));
    return result;
  }

  async httpPost(route, params = [], auth = false) {
    if(auth) {
      let token = await this.services().token.getToken();
      this.headers().get['Authorization'] = 'bearer ' + token;
    }
    return null;
  }

  async httpPut(route, params = [], auth = false) {
    if(auth) {
      let token = await this.services().token.getToken();
      this.headers().get['Authorization'] = 'bearer ' + token;
    }
    return null;
  }

  async httpDelete(route, params = [], auth = false) {
    if(auth) {
      let token = await this.services().token.getToken();
      this.headers().get['Authorization'] = 'bearer ' + token;
    }
    return null;
  }
}
