import Route from './Route';
import Layout from '../views/common/Layout';
let route = new Route();
route.addRoute('', {
  'name': 'home',
  'redirect': function(to) {
    console.log(to);
    return {name: 'sign-in'};
  }
});
export default route;
