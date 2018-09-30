//汇报命令
/* eslint-disable */
import Command from './Command';
export default class UpLoadCommand extends Command {
  constructor(app) {
    super(app);
  }
  async handle (files, fileField, method) {
    return await this.service('http.files')[method](files, fileField);
  }
  static commandName() {
    return 'UPLOAD_FILE';
  }
}
