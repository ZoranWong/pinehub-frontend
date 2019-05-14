import ServiceProvider from "./ServiceProvider";
import TrimRouteParameter from "../middlewares/TrimRouteParameter";
import AuthMiddleware from "../middlewares/AuthMiddleware";
import ProjectSettingMiddleware from "../middlewares/ProjectSettingMiddleware";

export default class MiddlewareServiceProvider extends ServiceProvider {
    constructor(app) {
        super(app);
        this.prefix = this.app.config['middleware'].prefix;
    }

    register() {
        this.app.register(`${this.prefix}trimRouteParameter`, TrimRouteParameter);
        this.app.register(`${this.prefix}auth`, AuthMiddleware);
        this.app.register(`${this.prefix}projectSetting`, ProjectSettingMiddleware);
    }
}