//汇报命令
/* eslint-disable */
import Command from './Command';
export default class GetProjectsCommand extends Command {
  constructor(app) {
    super(app);
  }
  async handle(page, search = null, limit = 20) {
      try{
          let [projects, totalNum, currentPage, totalPage ] = await this.$service('projects').projects(page, search, limit);
          this.store().dispatch({
              type: 'projects/setProjects',
              projects: projects,
              totalNum: totalNum,
              currentPage: currentPage,
              totalPage: totalPage
          });
      }catch (e) {
          console.log(e);
      }
  }
  static commandName() {
    return 'get-projects';
  }
}
