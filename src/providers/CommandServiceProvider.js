import ServiceProvider from './ServiceProvider';
import SignInCommand from '@/commands/SignInCommand';
import ReportCommand from '@/commands/ReportCommand';
import RedirectCommand from '@/commands/RedirectCommand';
import DataListCommand from '@/commands/DataListCommand';
import GetProjectsCommand from '@/commands/GetProjectsCommand';
import UpLoadCommand from '@/commands/UpLoadCommand';
import GetCouponCommand from '@/commands/GetCouponCommand';
import GetFullReduceCommand from '@/commands/GetFullReduceCommand';
import ReloadCommand from '@/commands/ReloadCommand';
import CreateProjectCommand from '@/commands/CreateProjectCommand';
import UpdateProjectCommand from '@/commands/UpdateProjectCommand';
import RemoveProjectCommand from '@/commands/RemoveProjectCommand';
export default class CommandServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
    this.commands = [];
  }
  register() {
    let commands = [SignInCommand, ReportCommand, RedirectCommand, DataListCommand,
      GetProjectsCommand, UpLoadCommand, GetCouponCommand, GetFullReduceCommand,
      ReloadCommand, CreateProjectCommand, UpdateProjectCommand, RemoveProjectCommand];
    for (let key in commands) {
      this.app.registerCommand(commands[key].commandName(), commands[key]);
    }
  }
}
