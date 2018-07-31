//登陆命令
/* eslint-disable */
import Command from './Command';
export default class SignInCommand extends Command {
  constructor(app) {
    super(app);
  }
  handle(params) {
    (async () => {
      let result = await this.$application.vueApp.account.signIn(params['username'], params['password']);
      console.log(result);
    })();
  }
}
