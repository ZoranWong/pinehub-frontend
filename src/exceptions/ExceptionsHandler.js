export default class ExceptionHandler {
  constructor(app, exceptionHandler) {
    this.$application = app;
    this.exceptionHandler = exceptionHandler;
  }
  throwError( message, type) {
    this.exceptionHandler({message: message,type: type});
  }
}
