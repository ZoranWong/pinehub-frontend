import ServiceProvider from './ServiceProvider';
import SignInCommand from '../commands/SignInCommand';
import ReportCommand from '../commands/ReportCommand';
import RedirectCommand from '../commands/RedirectCommand';
import GetShopsCommand from '../commands/GetShopsCommand';
import GetProjectsCommand from '../commands/GetProjectsCommand';
import UpLoadCommand from '../commands/UpLoadCommand';
import GetCouponCommand from '../commands/GetCouponCommand';
import GetFullReduceCommand from '../commands/GetFullReduceCommand';
export default class CommandServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
    this.commands = [];
  }
  register() {
    let commands = [SignInCommand, ReportCommand, RedirectCommand, GetShopsCommand,GetProjectsCommand,UpLoadCommand,GetCouponCommand,GetFullReduceCommand];
    for (let key in commands) {
      this.app.registerCommand(commands[key].commandName(), commands[key]);
    }
  }
}
