import Service from '../Service';
import _ from 'underscore';
import Middleware from '@/middlewares/Middleware';

const AUTH_TOKEN_EXPIRES = 10004;


/* eslint-disable */
export default class ApiService extends Service{
    constructor(app) {
        super(app);
        this.axios = this.$application.axios;
        Object.defineProperty(this, 'axios', {
            get: () => {
                return this.$application.axios;
            }
        });
        this.gateway = this.$application.config['http']['apiGateway'];
        this.middlewares = [];
        this.showError = true;
        this.headers = {};
    }

    setError(show) {
        this.showError = show;
        return this;
    }
    header(key, value = null) {
        if(key && value ) {
            this.headers[key] = value;
        }else{
            this.headers = key;
        }

        return this;
    }

    addMiddleware(middleware) {
        this.middlewares.push(new middleware(this.$application));
    }

    handleMiddlewares(reqeust, next) {
        for(let key in this.middlewares) {
            if(_.isFunction(this.middlewares[key])) {
                if(this.middlewares[key] instanceof Middleware) {
                    this.middlewares[key].handle(request, next);
                }else{
                    this.middlewares[key](request, next);
                }
            }
        }
    }
    async setHttpHeader(auth, headers, axios) {
        let x = axios.interceptors.request.use(async (request) => {
            if(auth) {
                let token =  await this.service('token').getToken();
                headers['Authorization'] = `bearer ${token}`;
            }else{
                delete headers['Authorization'];
            }
            _.extend(request.headers.common, headers);
            return request;
        });
        // console.log('axios', await axios());
        return axios;
    }
    // eslint-disable-next-line
    async httpGet (route, params = {}, auth = true) {
        route = route.trim('/');
        route = '/' + route;
        try{
            let result = await (await this.setHttpHeader(auth, this.headers, this.axios))
                .get(route + this.service().uri.query(params));
            return result.data;
        }catch(error) {
            this.tokenExpired(error.response);
            this.error(error);
        }
    }

    async httpPost(route, params = {}, auth = true) {
        route = route.trim('/');
        route = '/' + route;
        try{
            let result = await (await this.setHttpHeader(auth, this.headers, this.axios))
                .post(route, params);
            return result.data;
        }catch(error) {
            this.tokenExpired(error.response);
            this.error(error);
        }
    }

    error(error) {
        let result = error.response;
        if(this.showError && typeof this.$application['$route'] !== 'undefined' && this.$application.$route.name !== 'sign-in')  {
            this.$application.$error(result.data.message);
        }
        let exception = new Error();
        exception['data'] = result.data;
        throw exception;
    }

    async httpPut(route, id, params = {}, auth = true) {
        route = route.trim('/');
        route = '/' + route;
        try{
            let result = await (await this.setHttpHeader(auth, this.headers, this.axios))
                .put(route + '/' + id , params);
            return result.data;
        }catch(error){
            this.tokenExpired(error.response);
            this.error(error);
        }

    }

    async httpDelete(route, params = {}, auth = true) {
        let id = _.isString(params) || _.isNumber(params) ? params : this.service('json').encode(params);
        route = route.trim('/');
        route = '/' + route;
        try{
            let result = await (await this.setHttpHeader(auth, this.headers, this.axios))
                .delete(route + '/' + id);
            return result.data;
        }catch(error) {
            await this.tokenExpired(error.response);
            this.error(error);
        }
    }

    searchBuilder(searchFields) {
        let search = {};
        search = this.buildSearchStr(searchFields);
        console.log(this.service('base64'));
        return 'searchJson=' + this.service('base64').encode(search);
    }

    buildSearchStr(searchFields) {
        return this.service('json').encode(searchFields);
    }

    async tokenExpired(error) {
        if(error.data.code === AUTH_TOKEN_EXPIRES) {
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
