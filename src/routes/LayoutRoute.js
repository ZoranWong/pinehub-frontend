import Route from './Route';
import Layout from '../views/common/Layout';
let route = new Route();
route.addRoute('/layout', {
  'name': 'layout',
  'component': Layout
});
export default route;
