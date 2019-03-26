import Service from '../Service';
import _ from 'underscore';
import Middleware from '@/middlewares/Middleware';

const AUTH_TOKEN_EXPIRES = 10004;


/* eslint-disable */
export default class ApiService extends Service {
    constructor(app) {
        super(app);
        Object.defineProperty(this, 'axios', {
            get: () => {
                return app._axios;
            }
        });
        this.gateway = app.config['http']['apiGateway'];
        this.middlewares = [];
        this.showError = true;
        this.headers = {};
        this.initGlobalMiddleware();
    }

    initGlobalMiddleware() {
        // 先全局
        this.middlewares.push(this.$application['middleware.trimRouteParameter']);
        // 自定义
        this.initServiceMiddleware();
    }

    initServiceMiddleware() {

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

    addMiddleware(middleware) {
        this.middlewares.push(new middleware(this.$application));
    }

    handleMiddlewares(request, next) {
        for (let key in this.middlewares) {
            if (this.middlewares[key] instanceof Middleware) {
                this.middlewares[key].handle(request, next);
            }
        }
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
    async httpGet(route, params = {}, auth = true) {
        route = route.trim('/');
        route = '/' + route;
        try {
            let result = await (await this.setHttpHeader(auth, this.headers, this.axios))
                .get(route + this.service().uri.query(params));
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
            if (auth) {
                let token = await this.service('token').getToken();
                params['token'] = encodeURIComponent(token);
            }
            params['ProjectId'] = this.headers['ProjectId'];
            console.log(this.headers);
            return host + route + this.service().uri.query(params);
        } catch (error) {
            console.log(error);
            this.tokenExpired(error.response);
            this.error(error);
        }
    }

    async httpPost(route, params = {}, auth = true) {
        route = route.trim('/');
        route = '/' + route;
        try {
            let result = await (await this.setHttpHeader(auth, this.headers, this.axios)).post(route, params);
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

    async httpPut(route, id, params = {}, auth = true) {
        route = route.trim('/');
        route = '/' + route;
        try {
            let result = await (await this.setHttpHeader(auth, this.headers, this.axios))
                .put(route + '/' + id, params);
            return result.data;
        } catch (error) {
            this.tokenExpired(error.response);
            this.error(error);
        }

    }

    async httpDelete(route, params = null, auth = true) {
        let id = params ? (_.isString(params) || _.isNumber(params) ? params : this.service('json').encode(params)) : null;
        route = route.trim('/');
        route = '/' + route;
        if (id) {
            route = route + '/' + id
        }
        try {
            let result = await (await this.setHttpHeader(auth, this.headers, this.axios))
                .delete(route);
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
