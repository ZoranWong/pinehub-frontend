import Service from '../Service';
import _ from 'underscore';
import http from "../../configs/http";

const AUTH_TOKEN_EXPIRES = 10004;


/* eslint-disable */
export default class ApiService extends Service {
    constructor(app) {
        super(app);
        Object.defineProperty(this, 'axios', {
            get: () => {
                let axios = app._axios;
                let request = {
                    route: '',
                    method: '',
                    params: [],
                    request: axios.request,
                    headers: {},
                    middlewares: []
                };
                let http = {
                    request: request,
                    axios: axios,
                    beforeRequest: (callback) => {
                        return axios.interceptors.request.use(callback);
                    },
                    get: (route, params) => {
                        request['route'] = route;
                        request['method'] = 'GET';
                        request['params'] = params;
                        return axios.get(route);
                    },
                    post: (route, params) => {
                        request['route'] = route;
                        request['method'] = 'POST';
                        return axios.post(route, params);
                    },
                    put: (route, params) => {
                        request['route'] = route;
                        request['method'] = 'PUT';
                        return axios.put(route, params);
                    },
                    delete: (route) => {
                        request['route'] = route;
                        request['method'] = 'DELETE';
                        return axios.delete(route);
                    },
                    addMiddleware: (middlewares) => {
                        if (!_.isArray(middlewares)) {
                            middlewares = [middlewares];
                        }
                        request['middlewares'] = _.union(request['middlewares'], middlewares);
                        return http;
                    }
                };
                this.beforeRequestSend(http);
                return http;
            }
        });
        this.gateway = app.config['http']['apiGateway'];
        this.middlewares = [];
        this.middlewareNeedLoad = ['auth', 'projectSetting'];
        this.showError = true;
        this.headers = {};
        this.middlewarePrefix = this.$application.config['middleware'].prefix;
    }

    loadMiddlewareConfig(request) {
        console.log(request);
        let routeMiddlewares = _.union(this.middlewareNeedLoad, request['middlewares']);
        console.log(routeMiddlewares);
        routeMiddlewares.forEach((middleware) => {
            let m = this.$application[this.middlewarePrefix + middleware];
            if (m) {
                this.middlewares.push(m);
            }
        });
    }

    beforeRequestSend(http) {
        http.beforeRequest(async (request) => {
            http.request.request = request;
            http.request.headers = request.headers.common;
            this.middlewares = [];
            this.loadMiddlewareConfig(http.request);
            for (let key in this.middlewares) {
                await this.middlewares[key].handle(http.request);
            }
            if (request.method === 'get') request.url += this.service().uri.query(http.request.params);
            return request;
        });
    }

    setError(show) {
        this.showError = show;
        return this;
    }

    header(key, value = null) {
        if (key && value) {
            this.headers[key] = value;
        } else {
            this.headers = key;
        }

        return this;
    }

    async setHttpHeader(auth, headers, axios) {
        let x = axios.interceptors.request.use(async (request) => {
            if (auth) {
                let token = await this.service('token').getToken();
                headers['Authorization'] = `bearer ${token}`;
            } else {
                delete headers['Authorization'];
            }
            _.extend(request.headers.common, headers);
            this.handleMiddlewares(request, null);
            return request;
        });
        return axios;
    }

    // eslint-disable-next-line
    async httpGet(route, params = {}, ...additionalMiddlewares) {
        route = route.trim('/');
        route = '/' + route;
        try {
            let result = await this.axios.addMiddleware(additionalMiddlewares).get(route, params);
            console.log(result);
            return result.data;
        } catch (error) {
            console.log(error);
            this.tokenExpired(error.response);
            this.error(error);
        }
    }

    async download(route, params = {}, auth = true) {
        route = route.trim('/');
        route = '/' + route;
        let host = this.gateway.trim('/');
        try {
            if (true) {
                let token = await this.service('token').getToken();
                params['token'] = encodeURIComponent(token);
            }
            params['ProjectId'] = this.headers['ProjectId'];
            let url = host + route + this.service().uri.query(params);
            console.log('download_url: ', url);
            return url;
        } catch (error) {
            console.log(error);
            this.tokenExpired(error.response);
            this.error(error);
        }
    }

    async httpPost(route, params = {}, ...additionalMiddlewares) {
        route = route.trim('/');
        route = '/' + route;
        try {
            let result = await this.axios.addMiddleware(additionalMiddlewares).post(route, params);
            console.log(result);
            return result.data;
        } catch (error) {
            this.tokenExpired(error.response);
            this.error(error);
        }
    }

    error(error) {
        let result = error.response;
        if (this.showError && typeof this.$application['$route'] !== 'undefined' && this.$application.$route.name !== 'sign-in') {
            this.$application.$error(result.data.message);
        }
        let exception = new Error();
        exception['data'] = result.data;
        throw exception;
    }

    async httpPut(route, id, params = {}, ...additionalMiddlewares) {
        route = route.trim('/');
        route = '/' + route;
        try {
            let result = await this.axios.addMiddleware(additionalMiddlewares).put(route + '/' + id, params);
            return result.data;
        } catch (error) {
            this.tokenExpired(error.response);
            this.error(error);
        }

    }

    async httpDelete(route, params = null, ...additionalMiddlewares) {
        let id = params ? (_.isString(params) || _.isNumber(params) ? params : this.service('json').encode(params)) : null;
        route = route.trim('/');
        route = '/' + route;
        if (id) {
            route = route + '/' + id
        }
        try {
            let result = await this.axios.addMiddleware(additionalMiddlewares).delete(route);
            return result.data;
        } catch (error) {
            await this.tokenExpired(error.response);
            this.error(error);
        }
    }

    searchBuilder(searchFields) {
        let search = {};
        search = this.buildSearchStr(searchFields);
        return 'searchJson=' + this.service('base64').encode(search);
    }

    buildSearchStr(searchFields) {
        return this.service('json').encode(searchFields);
    }

    async tokenExpired(error) {
        if (error.data.code === AUTH_TOKEN_EXPIRES) {
            this.service('localStorage').delete('token');
            this.service('localStorage').delete('refresh_token');
            await this.command('CLEAR_ACCOUNT');
            this.command('REDIRECT', {
                name: 'sign-in',
                query: {
                    'redirectTo': this.$application.vueApp.$route.fullPath
                }
            });
        }
    }
}
