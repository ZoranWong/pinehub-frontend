import ServiceProvider from './ServiceProvider';
import Models from '@/models'
export default class ModelServiceProvider extends ServiceProvider {
    constructor(app) {
        super(app);
        this.$vuex = app.$vuex;
    }
    register() {
        this.app.register('vue-store', new this.$vuex.Store(new Models(this.app)));
    }
    boot() {
    }
}
