//登陆命令
/* eslint-disable */
import Command from './Command';
export default class SignInCommand extends Command {
  constructor(app) {
    super(app);
  }
  handle(params) {
    console.log(params);
  }
  static commandName() {
    return 'account:sign-in';
  }
}
