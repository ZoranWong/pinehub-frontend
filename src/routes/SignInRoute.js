import Route from './Route';
import SignIn from '../views/common/SignIn';
let route = new Route();
route.addRoute('/signIn', {
  'name': 'sign-in',
  'component': SignIn
});
export default route;
