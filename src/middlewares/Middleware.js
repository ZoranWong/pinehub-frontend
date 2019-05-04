export default class Middleware {
    constructor($application) {
        this.$application = $application;
        this.except = [];
    }

    checkExceptRoute(route) {
        for (let i = 0; i < this.except.length; i++) {
            let reg = new RegExp(this.except[i], "g");
            reg.exec(route);
            if (reg.lastIndex) {
                return true;
            }
        }

        return false;
    }

    async handle(request) {

    }
}
