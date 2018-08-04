/*eslint constructor-super: "error"*/
/*eslint-env es6*/
import ServiceProvider from './ServiceProvider';
import TokenService from '../services/TokenService';
import SessionService from '../services/cache/SessionService';
import Base64Service from '../services/encrypt/Base64Service';
import MD5Service from '../services/encrypt/MD5Service';
import JsonService from '../services/encrypt/JsonService';
export default class AppServiceProvider extends ServiceProvider{
  constructor(app) {
    super(app);
  }
  register() {
    this.app.register('base64', Base64Service);
    this.app.register('md5', MD5Service);
    this.app.register('json', JsonService);
    this.app.register('session', SessionService);
    this.app.register('token', TokenService);
  }
  boot() {

  }
}
