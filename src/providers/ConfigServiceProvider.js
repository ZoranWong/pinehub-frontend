import ServiceProvider from './ServiceProvider';
import appConfig from '@/configs/app';
import env from '@/env';
import middlewareConfig from '@/configs/middleware';

export default class ConfigServiceProvider extends ServiceProvider {
    constructor(application) {
        super(application);
    }

    register() {
        this.app.registerConfig('app', appConfig);
        this.app.registerConfig('http', env['http']);
        this.app.registerConfig('middleware', middlewareConfig);
        this.app.registerConfig('env', env);
    }
}
