export default class Route {
  constructor(router) {
    this.routes = [];
  }
  addRoute(route, component = []) {

  }

  group(route, callback) {
    let children = new Router();
    let group = callback;
    if(typeof(callback) !== 'Function') {
      callback = group['uses'];
    }
    callback(children);
    this.routes[] = {
      path: route,
      children: children.getRoutes();
    };
  }

  getRoutes() {
    return this.routes;
  }
}
