import ServiceProvider from './ServiceProvider';
import SignInCommand from '../commands/SignInCommand';
import ReportCommand from '../commands/ReportCommand';
export default class CommandServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
    this.commands = [];
  }
  register() {
    let commands = {
      'account:sign-in': SignInCommand,
      'report': ReportCommand
    };
    for (let key in commands) {
      this.commands[key] = this.$vm.register(key, commands[key]);
    }
    //this.commands['account:sign-in'] = this.$vm.register('account:sign-in', SignInCommand);
    this.$vm.prototype['command'] = (command, params) => {
      return this.commands[command].handle(params);
    }
  }
}
