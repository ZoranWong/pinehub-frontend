import Service from '../Service';
import _ from 'underscore';
import Middleware from '@/middlewares/Middleware';

const AUTH_TOKEN_EXPIRES = 10004;


/* eslint-disable */
export default class ApiService extends Service{
  constructor(app) {
    super(app);
    this.axios = this.$application.axios;
    this.gateway = this.$application.config['http']['apiGateway'];
    this.middlewares = [];
    this.showError = true;
  }

  setError(show) {
    this.showError = show;
    return this;
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
  async httpGet (route, params = {}, auth = true) {
    if(auth) {
      let token = await this.service('token').getToken();
      params['token'] = token;
    }
    route = route.trim('/');
    route = '/' + route;
    let gateway = this.gateway.trim('/');
    try{
      let result = await this.axios.get(gateway + route + this.service().uri.query(params));
      return result.data;
    }catch(error) {
      this.tokenExpired(error.response);
      this.error(error);
    }
  }

  async httpPost(route, params = {}, auth = true) {
    if(auth) {
      let token = await this.service('token').getToken();
      // this.headers().get['Authorization'] = 'bearer ' + token;
      params['token'] = token;
    }
    route = route.trim('/');
    route = '/' + route;
    let gateway = this.gateway.trim('/');
    try{
      let result = await this.axios.post(gateway + route, params);
      return result.data;
    }catch(error) {
      this.tokenExpired(error.response);
      this.error(error);
    }
  }

  error(error) {
    let result = error.response;
    if(this.showError)  this.$application.$error(result.data.message);
    let exception = new Error();
    exception['data'] = result.data;
    throw exception;
  }

  async httpPut(route, id, params = {}, auth = true) {
    if(auth) {
      let token = await this.service('token').getToken();
      //this.headers().get['Authorization'] = 'bearer ' + token;
      params['token'] = token;
    }
    route = route.trim('/');
    route = '/' + route;
    let gateway = this.gateway.trim('/');
    try{
      let result = await this.axios.put(gateway + route + id , params);
      return result.data;
    }catch(error){
      this.tokenExpired(error.response);
      this.error(error);
    }

  }

  async httpDelete(route, params = {}, auth = true) {
    if(auth) {
      let token = await this.service('token').getToken();
      //this.headers().get['Authorization'] = 'bearer ' + token;
      params['token'] = token;
    }
    let id = _.isString(params) || _.isNumber(params) ? params : this.service('json').encode(params);
    route = route.trim('/');
    route = '/' + route;
    let gateway = this.gateway.trim('/');
    try{
      let result = await this.axios.delete(gateway + route + id);
      return result.data;
    }catch(error) {
      this.tokenExpired(error.response);
      this.error(error);
    }
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

  tokenExpired(error) {
    if(error.data.code === AUTH_TOKEN_EXPIRES) {
      this.service('localStorage').delete('token');
      let token = this.service('localStorage').get('refresh_token');
      this.command('REDIRECT', {
        name: 'sign-in'
      });
    }
  }
}
