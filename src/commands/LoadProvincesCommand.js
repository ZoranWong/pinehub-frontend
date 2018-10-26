//返回前一页命令
import Command from './Command';
export default class LoadProvincesCommand extends Command {
  constructor(app) {
    super(app);
  }

  async handle() {
    let provinces = await this.$service('http.regions').provinces();
    this.store().dispatch({
      type: 'regions/append',
      list: provinces,
      key: 'provinces'
    });
  }

  static commandName() {
    return 'LOAD_PROVINCES';
  }
}
