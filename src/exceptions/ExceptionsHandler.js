export default class ExceptionHandler {
  constructor(app, exceptionHandler) {
    this.$application = app;
    this.exceptionHandler = exceptionHandler;
  }
  handle( message, type) {
    message = !!message ? message : this.message;
    type = !!type ? type : this.type;
    this.exceptionHandler({message: message,type: type});
  }
}
