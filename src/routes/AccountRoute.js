import Route from './Route';
let route = new Route();
route.group('/', {
  'name': 'account',
  'uses': function (route) {
    console.log(route);
  }
});
export default route;
