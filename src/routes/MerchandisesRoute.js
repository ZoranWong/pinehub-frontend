/* eslint-disable */
import Route from './Route';
import Layout from '../views/common/Layout';
import Index from '../views/merchandises/Index';
import Selling from '../views/merchandises/Selling';
import Down from '../views/merchandises/Down';
import SoldOut from '../views/merchandises/SoldOut';
import Create from '../views/merchandises/MerchandiseCreate';
import Editor from '../views/merchandises/MerchandiseEditor';
let route = new Route();
route.group('/project/:projectId/merchandises', {
    'tag' : '商品管理',
    'component': Layout,
    uses : function(route) {
      route.addRoute('', {
        'name': 'merchandises',
        'component': Index,
        'tag': '商品管理'
      });

      route.addRoute('selling', {
        'name': 'merchandises-selling',
        'component': Selling,
        'tag': '出售中'
      });
      route.addRoute('down', {
        'name': 'merchandises-down',
        'component': Down,
        'tag': '仓库中'
      });
      route.addRoute('sold_out', {
        'name': 'merchandises-sold-out',
        'component': SoldOut,
        'tag': '已售罄'
      });
	}
});

route.group('/project/:projectId/merchandise', {
    'tag' : '商品管理',
    'component': Layout,
    uses : function(route) {
        route.addRoute('create', {
            'name': 'merchandise-create',
            'component': Create,
            'tag': '新建商品'
        });
        route.addRoute('edit/:merchandiseId', {
            'name': 'merchandise-editor',
            'component': Editor,
            'tag': '编辑商品'
        });
    }
  });
export default route;
