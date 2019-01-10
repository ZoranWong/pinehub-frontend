export default class Service {
    constructor($application) {
        this.$application = $application;
    }

    service(name = null) {
        return name ? this.$application[name] : this.$application.instances;
    }

    command(...params) {
        this.$application.vueApp && this.$application.vueApp.$command.apply(this.$application.vueApp, params);
    }
}
