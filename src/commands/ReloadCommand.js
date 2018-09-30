//返回前一页命令
import Command from './Command';
export default class ReloadCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle() {
    this.store().dispatch('common/refreshDate');
  }

  static commandName() {
    return 'RELOAD';
  }
}
