//返回前一页命令
import Command from './Command';
export default class RemoveProjectCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle(id) {
    return await this.service('http.projects').delete(id);
  }

  static commandName() {
    return 'DELETE_PROJECT';
  }
}
