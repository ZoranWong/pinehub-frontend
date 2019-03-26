export default class Middleware {
    constructor($application) {
        this.$application = $application;
        this.except = [];
    }

    async handle(request, next) {

    }
}
