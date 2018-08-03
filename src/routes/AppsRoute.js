import Route from './Route';
import Apps from '../views/common/Apps';
let route = new Route();
route.addRoute('/apps', {
  'name': 'apps',
  'component': Apps
});
export default route;
