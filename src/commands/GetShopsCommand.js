//汇报命令
/* eslint-disable */
import Command from './Command';
export default class GetShopsCommand extends Command {
  constructor(app) {
    super(app);
  }
  handle(page, search) {
    console.log(`get page:${page} shops data, search data`, search);
  }
  static commandName() {
    return 'get-shops';
  }
}
