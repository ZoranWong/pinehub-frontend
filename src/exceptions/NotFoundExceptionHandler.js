import ExceptionHandler from './ExceptionsHandler';
export default class NotFoundExceptionHandler extends ExceptionHandler {
    constructor(app, exceptionHandler) {
        super(app, exceptionHandler);
        this.message = '未查找到相关资源';
        this.type = 'warning';
    }
}
