//返回前一页命令
import Command from './Command';
export default class RemoveProjectCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle(id) {
      try{
          return await this.$service('http.projects').delete(id);
      }catch (e) {
          console.log(e);
      }
  }

  static commandName() {
    return 'DELETE_PROJECT';
  }
}
