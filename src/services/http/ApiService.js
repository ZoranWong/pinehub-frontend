import Service from '../Service';
import _ from 'underscore';
import Middleware from '@/middlewares/Middleware';
/* eslint-disable */
export default class ApiService extends Service{
  constructor(app) {
    super(app);
    this.axios = this.$application.axios;
    this.gateway = this.$application.config['http']['apiGateway'];
    this.middlewares = [];
  }

  headers() {
    return this.$application.axios.defaults.headers;
  }

  addMiddleware(middleware) {
    this.middlewares.push(new middleware(this.$application));
  }

  handleMiddlewares(reqeust, next) {
    for(let key in this.middlewares) {
      if(_.isFunction(this.middlewares[key])) {
        if(this.middlewares[key] instanceof Middleware) {
          this.middlewares[key].handle(request, next);
        }else{
          this.middlewares[key](request, next);
        }
      }
    }
  }
  // eslint-disable-next-line
  async httpGet (route, params = [], auth = true) {
    if(auth) {
      let token = await this.service('token').getToken();
      this.headers().get['Authorization'] = 'bearer ' + token;
    }
    route = route.trim('/');
    route = '/' + route;
    let gateway = this.gateway.trim('/');
    let result = await this.axios.get(gateway + route + this.service().uri.query(params));
    return result;
  }

  async httpPost(route, params = [], auth = true) {
    if(auth) {
      let token = await this.service('token').getToken();
      this.headers().get['Authorization'] = 'bearer ' + token;
    }
    route = route.trim('/');
    route = '/' + route;
    let gateway = this.gateway.trim('/');

    let result = await this.axios.post(gateway + route, params);
    return result;
  }

  async httpPut(route, id, params = [], auth = true) {
    if(auth) {
      let token = await this.service('token').getToken();
      this.headers().get['Authorization'] = 'bearer ' + token;
    }
    route = route.trim('/');
    route = '/' + route;
    let gateway = this.gateway.trim('/');
    let result = await this.axios.put(gateway + route + id , params);
    return result;
  }

  async httpDelete(route, params = [], auth = true) {
    if(auth) {
      let token = await this.service('token').getToken();
      this.headers().get['Authorization'] = 'bearer ' + token;
    }
    let id = _.isString(params) || _.isNumber(params) ? params : this.service('json').encode(params);
    route = route.trim('/');
    route = '/' + route;
    let gateway = this.gateway.trim('/');
    let result = await this.axios.delete(gateway + route + id);
    return null;
  }

  searchBuilder(searchFields) {
    let search = {};
    search = this.buildSearchStr(searchFields);
    console.log(this.service('base64'));
    return 'searchJson=' + this.service('base64').encode(search);
  }

  buildSearchStr(searchFields) {
    return this.service('json').encode(searchFields);
  }
}
