import Middleware from './Middleware';

export default class AuthMiddleware extends Middleware {
    constructor($application) {
        super($application);
        this.except = ["/refresh/token", "/public/key", "/login"];
    }

    async handle(request) {
        if (this.checkExceptRoute(request['route'])) {
            return;
        }
        //添加auth 认证
        let token = await this.$application.token.getToken();
        request.headers['Authorization'] = `bearer ${token}`;
    }
}
