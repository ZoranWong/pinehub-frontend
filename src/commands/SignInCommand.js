//登陆命令
/* eslint-disable */
import Command from './Command';
export default class SignInCommand extends Command {
  constructor(app) {
    super(app);
  }
  async handle(username, password) {
    password = this.service('md5').encrypt(password);
    let account = await this.service('http.account').signIn(username, password);
    console.log(account);
  }
  static commandName() {
    return 'SIGNIN';
  }
}
