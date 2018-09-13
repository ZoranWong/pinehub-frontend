/* eslint-disable */
import Route from './Route';
import Layout from '../views/common/Layout';
import Index from '../views/merchandises/Index';
import Selling from '../views/merchandises/Selling';
import Down from '../views/merchandises/Down';
import SoldOut from '../views/merchandises/SoldOut';
let route = new Route();
route.group('/merchandise', {
    'name': 'merchandise',
    'tag' : '商品管理',
    'component': Layout,
    uses : function(route) {
      route.addRoute('/index', {
        'name': 'merchandises-index',
        'component': Index,
        'tag': '商品管理'
      });

      route.addRoute('/selling', {
        'name': 'merchandises-selling',
        'component': Selling,
        'tag': '出售中'
      });
      route.addRoute('/down', {
        'name': 'merchandises-down',
        'component': Down,
        'tag': '仓库中'
      });
      route.addRoute('/sold_out', {
        'name': 'merchandises-sold-out',
        'component': SoldOut,
        'tag': '已售罄'
      });
	}
});
export default route;
