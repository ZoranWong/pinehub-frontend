//汇报命令
/* eslint-disable */
import Command from './Command';
export default class UpLoadCommand extends Command {
  constructor(app) {
    super(app);
  }
  async handle(file) {
  }
  static commandName() {
    return 'UPLOAD_FILE';
  }
}
