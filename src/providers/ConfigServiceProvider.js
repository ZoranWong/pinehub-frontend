import ServiceProvider from './ServiceProvider';
import appConfig from '@/configs/app';
import httpConfig from '@/configs/http';
export default class ConfigServiceProvider extends ServiceProvider {
  constructor(application) {
    super(application);
  }
  register() {
    this.app.registerConfig('app', appConfig);
    this.app.registerConfig('http', httpConfig);
  }
}
