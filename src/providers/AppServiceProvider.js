/*eslint constructor-super: "error"*/
/*eslint-env es6*/
import ServiceProvider from './ServiceProvider';
import TokenService from '../services/TokenService';
//import SessionService from '../services/cache/SessionService';
export default class AppServiceProvider extends ServiceProvider{
  constructor() {
    super();
  }
  register() {
    //this.app.register('session', SessionService);
    this.app.register('token', TokenService);
  }
}
