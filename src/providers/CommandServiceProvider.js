import ServiceProvider from './ServiceProvider';
import SignInCommand from '../commands/SignInCommand';
export default class CommandServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
    this.commands = [];
  }
  register() {
    this.commands['account:sign-in'] = this.$vm.register('account:sign-in', SignInCommand);
    this.$vm.prototype['command'] = (command, params) => {
      return this.commands[command].handle(params);
    }
  }
}
