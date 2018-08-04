import _ from 'underscore';
export default class Route {
  constructor() {
    this.route = [];
  }
  addRoute(route, component = [], name = null) {
    if(_.isArray(component) || _.isObject(component)) {
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
    if(typeof Route.routeMap === 'undefined')
      Route.routeMap = {};
    Route.routeMap[route['name']] = route;
    this.route.push(route);
  }

  group(route, callback) {
    let children = new Route();
    let group = callback;
    if(typeof callback !== 'function') {
      callback = group['uses'];
    }
    callback(children);
    let list = children.getRoute();
    list = list.length > 1 ? list : [list];
    let $route = {
      path: route,
      children: list
    };
    if(typeof group['name'] !== 'undefined') {
      $route['name'] = group['name'];
    }
    if(typeof group['component'] !== 'undefined') {
      $route['component'] = group['component'];
    }

    if(typeof group['tag'] !== 'undefined') {
      $route['tag'] = group['tag'];
    }

    if(typeof Route.routeMap === 'undefined')
      Route.routeMap = {};
    Route.routeMap[$route['name']] = $route;
    this.route.push( $route );
  }

  getRoute() {
    return this.route.length > 1 ? this.route : this.route[0];
  }
}
