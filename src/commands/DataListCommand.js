//汇报命令
/* eslint-disable */
import Command from './Command';
export default class DataListCommand extends Command {
  constructor(app) {
    super(app);
  }
  async handle(service, event, page, search = null, limit = 15) {
    console.log('command handle', Date.now());
    search = this.json.encode(search);
    search = encodeURIComponent(search);
    search = this.base64.encodeURI(search);
    let headers = {};
    if(this.$requestInput('projectId')) {
      headers = {'ProjectId': this.$requestInput('projectId')}
    }
    let [list, totalNum, currentPage,  totalPage ] = await this.$service(service)
    .header(headers)
    .list(page, search, limit);
    this.$store.dispatch({
      type: event,
      list: list,
      totalNum: totalNum,
      currentPage: currentPage,
      totalPage: totalPage,
      pageCount: limit
    });
  }
  static commandName() {
    return 'data.list';
  }
}
