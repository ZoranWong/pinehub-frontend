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
      this.app.registerCommand(commands[key].commandName(), commands[key]);
    }
  }
}
