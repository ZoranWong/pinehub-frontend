//汇报命令
/* eslint-disable */
import Command from './Command';
export default class UpLoadCommand extends Command {
  constructor(app) {
    super(app);
  }
  async handle(page, search = null, limit = 20) {
    let [projects, totalNum, currentPage, totalPage ] = await this.service('projects').projects(page, search, limit);
    this.store().dispatch({
      type: 'projects/setProjects',
      projects: projects,
      totalNum: totalNum,
      currentPage: currentPage,
      totalPage: totalPage
    });
  }
  static commandName() {
    return 'up-load';
  }
}
