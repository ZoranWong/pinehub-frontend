import Middleware from "./Middleware";

export default class ProjectSettingMiddleware extends Middleware {
    constructor($application) {
        super($application);
        this.except = ["/refresh/token", "/public/key", "/login", "/apps"];
    }

    async handle(request) {
        if (this.checkExceptRoute(request['route'])) {
            return;
        }

        let projectId = this.$application.vueApp.$requestInput('projectId');
        request.headers['ProjectId'] = projectId;
    }

}