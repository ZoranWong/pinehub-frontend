export default class Mock {
    constructor(application) {
        this.application = application;
    }
    async mock() {
        let data = this.data.apply(this, arguments);
        return this.application.instances['mock'].mock(data);
    }

    service(name) {
        return this.application.instances[name];
    }

    data() {
        return {

        };
    }
}
