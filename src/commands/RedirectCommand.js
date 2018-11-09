//汇报命令
/* eslint-disable */
import Command from './Command';
export default class RedirectCommand extends Command {
  constructor(app) {
    super(app);
  }
  handle(params) {
      this.$router.push(params);
  }
  static commandName() {
    return 'REDIRECT';
  }
}
