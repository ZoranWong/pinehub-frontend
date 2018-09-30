//返回前一页命令
import Command from './Command';
export default class UpdateProjectCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle(id, name, logo, contactName, contactPhoneNum) {
    return await this.service('http.projects').update(id, {name: name, logo: logo, contactName: contactName, contactPhoneNum: contactPhoneNum});
  }

  static commandName() {
    return 'UPDATE_PROJECT';
  }
}
