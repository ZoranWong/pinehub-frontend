//返回前一页命令
import Command from './Command';
export default class CreateProjectCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle(name, logo, contactName, contactPhoneNum) {
    return await this.service('http.projects').create(name, logo, contactName, contactPhoneNum);
  }

  static commandName() {
    return 'CREATE_PROJECT';
  }
}
