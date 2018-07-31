import ServiceProvider from './ServiceProvider';
import SignInCommand from '../commands/SignInCommand';
import ReportCommand from '../commands/ReportCommand';
export default class CommandServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
    this.commands = [];
  }
  register() {
    let commands = [SignInCommand, ReportCommand];
    for (let key in commands) {
      this.commands[commands[key].commandName()] = this.$vm.register(commands[key].commandName(), commands[key]);
    }
    //this.commands['account:sign-in'] = this.$vm.register('account:sign-in', SignInCommand);
    this.$vm.prototype['command'] = (command, params) => {
      return this.commands[command].handle(params);
    }
  }
}
