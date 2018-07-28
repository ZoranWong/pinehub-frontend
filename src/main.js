import AppServiceProvider from './providers/AppServiceProvider';
Vue.config.productionTip = false;
let appServiceProvider = new AppServiceProvider();
appServiceProvider.register();
appServiceProvider.boot();
