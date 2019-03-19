import Route from './Route';
let route = new Route();
route.addRoute('', {
  'name': 'home',
  'redirect': function(to) {
    console.log(to);
    return {name: 'sign-in'};
  }
});
export default route;
