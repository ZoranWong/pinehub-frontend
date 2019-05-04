import ServiceProvider from './ServiceProvider';
import appConfig from '@/configs/app';
import httpConfig from '@/configs/http';
import middlewareConfig from '@/configs/middleware';

export default class ConfigServiceProvider extends ServiceProvider {
    constructor(application) {
        super(application);
    }

    register() {
        this.app.registerConfig('app', appConfig);
        this.app.registerConfig('http', httpConfig);
        this.app.registerConfig('middleware', middlewareConfig);
    }
}
