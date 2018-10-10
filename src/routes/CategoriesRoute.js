import Route from './Route';
import Layout from '../views/common/Layout';
import Index from '../views/categories/Index';
let route = new Route();
route.addRoute('project/:projectId/categories', {
  'name': 'categories',
  'component': Index,
  'tag': '品类管理'
});
export default route;
