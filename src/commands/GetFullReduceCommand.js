//汇报命令
/* eslint-disable */
import Command from './Command';
export default class GetFullReduceCommand extends Command {
  constructor(app) {
    super(app);
  }
  async handle(page, search = null, limit = 10) {
    let [fullReduce, totalNum, currentPage, totalPage ] = await this.service('fullReduce').fullReduce(page, search, limit);
    this.store().dispatch({
      type: 'fullReduce/setFullReduce',
      fullReduce: fullReduce,
      totalNum: totalNum,
      currentPage: currentPage,
      totalPage: totalPage
    });
  }
  static commandName() {
    return 'get-fullReduce';
  }
}
