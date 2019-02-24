export default class ExceptionHandler {
    constructor(app, exceptionHandler) {
        this.$application = app;
        this.exceptionHandler = exceptionHandler;
    }
    handle( message, type) {
        message = typeof message !== 'undefined' ? message : this.message;
        type = typeof type !== 'undefined' ? type : this.type;
        this.exceptionHandler({message: message,type: type});
    }
}
