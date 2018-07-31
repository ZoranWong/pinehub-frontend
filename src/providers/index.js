import AppServiceProvider from './AppServiceProvider';
import HttpServiceProvider from './HttpServiceProvider';
import RouterServiceProvider from './RouterServiceProvider';
import CommandServiceProvider from './CommandServiceProvider';
import ModelsServiceProvider from './ModelsServiceProvider';

export default {
  appServiceProvider: AppServiceProvider,
  httpServiceProvider: HttpServiceProvider,
  routerServiceProvider: RouterServiceProvider,
  commandServiceProvider: CommandServiceProvider,
  modelsServiceProvider: ModelsServiceProvider
};
