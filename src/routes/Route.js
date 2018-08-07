import _ from 'underscore';
import _str from 'underscore.string';
export default class Route {
  constructor() {
    this.route = [];
    this.parent = null;
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
    if(this.parent) {
      let path = '/' + _str.strip(this.parent.route[0]['path'], '/');
      path += '/';
      path +=  _str.strip(route['path'], '/');
      route['path'] = path;
    }
    if(typeof Route.routeMap === 'undefined')
      Route.routeMap = {};
    Route.routeMap[route['name']] = route;
    this.route.push(route);
  }

  group(route, callback) {
    let children = new Route();
    children.parent = this;
    let group = callback;
    if(typeof callback !== 'function') {
      callback = group['uses'];
    }
    let $route = {
      path: route,
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
    callback(children);
    let list = children.getRoute();
    list = list.length > 1 ? list : [list];
    $route['children'] = list;
  }

  getRoute() {
    return this.route.length > 1 ? this.route : this.route[0];
  }
}
