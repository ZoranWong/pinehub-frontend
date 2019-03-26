import ServiceProvider from "./ServiceProvider";
import TrimRouteParameter from "../middlewares/TrimRouteParameter";

export default class MiddlewareServiceProvider extends ServiceProvider {
    constructor(app) {
        super(app);
    }

    register() {
        this.app.register('middleware.trimRouteParameter', TrimRouteParameter);
    }
}