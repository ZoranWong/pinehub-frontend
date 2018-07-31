//登陆命令
/* eslint-disable */
import Command from './Command';
export default class SignInCommand extends Command {
  constructor(app) {
    super(app);
    this.name = 'account:sign-in';
  }
  handle(params) {
    console.log(params);
  }
}
