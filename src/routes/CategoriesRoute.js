import Route from './Route';
import Layout from '../views/common/Layout';
import Index from '../views/categories/Index';
let route = new Route();
route.group('/project/:projectId/categories', {
    'tag' : '品类管理',
    'component': Layout,
    uses : function(parent) {
      parent.addRoute('/', {
        'name': 'categories',
        'component': Index,
        'tag': '品类列表'
      });
    }
});
export default route;
