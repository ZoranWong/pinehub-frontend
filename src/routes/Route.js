import _ from 'underscore';
export default class Route {
  constructor() {
    this.routes = [];
  }
  addRoute(route, component = [], name = null) {
    if(_.isArray(component)) {
      route = _.extend(component, {path: route});
    }else if(_.isString(component)) {
      route = {
        path: route,
        component: component
      };
      if(name) {
        route['name'] = name;
      }
    }
    this.routes.push(route);
  }

  group(route, callback) {
    let children = new Route();
    let group = callback;
    if(typeof callback !== 'function') {
      callback = group['uses'];
    }
    callback(children);
    let $route = {
      path: route,
      children: children.getRoutes()
    };
    if(typeof group['name'] !== 'undefined') {
      $route['name'] = group['name'];
    }
    if(typeof group['component'] !== 'undefined') {
      $route['component'] = group['component'];
    }
    this.routes.push($route);
  }

  getRoutes() {
    return this.routes;
  }
}
