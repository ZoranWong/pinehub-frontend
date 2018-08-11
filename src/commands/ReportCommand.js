//汇报命令
/* eslint-disable */
import Command from './Command';
export default class ReportCommand extends Command {
  constructor(app) {
    super(app);
  }
  handle(message) {
    console.log('report front-end running status', message);
  }
  static commandName() {
    return 'report';
  }
}
