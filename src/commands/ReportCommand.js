//汇报命令
/* eslint-disable */
import Command from './Command';
export default class ReportCommand extends Command {
  constructor(app) {
    super(app);
  }
  handle(params) {
    console.log('report front-end running status', params);
  }
  static commandName() {
    return 'report';
  }
}
