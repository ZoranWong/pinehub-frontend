import Middleware from './Middleware';

class AuthMiddleware extends Middleware {
    constructor($application) {
        super($application);
        this.except = ['sign'];
    }

    handle(request) {
        let route = request['route'];
        for (let i = 0; this.except.length > i; i++) {
            if (this.except[i] === route) {
                return;
            }
        }

        //添加auth 认证
        request.headers['token'] = 'ddddd';
    }
}
