import ServiceProvider from './ServiceProvider';
import Vuex from 'vuex';
import Models from '../models'
export default class ModelServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
    this.app.$vm.use(Vuex);
    console.log(Vuex);
  }
  register() {
    this.app['store'] = new Vuex.Store(new Models(this.$application));
  }
  boot() {

  }
}
