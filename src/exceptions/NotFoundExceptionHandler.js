import ExceptionHandler from './ExceptionsHandler';
export default class NotFoundExceptionHandler extends ExceptionHandler {
  constructor(app, exceptionHandler) {
    super(app, exceptionHandler);
  }
}
