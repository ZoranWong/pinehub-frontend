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
import GetProjectDetialCommand from '@/commands/GetProjectDetialCommand';
import LoadProvincesCommand from '@/commands/LoadProvincesCommand';
import LoadCitiesCommand from '@/commands/LoadCitiesCommand';
import LoadCountiesCommand from '@/commands/LoadCountiesCommand';
import CreateShopCommand from '@/commands/CreateShopCommand';
import UpdateShopCommand from '@/commands/UpdateShopCommand';
import CreateUTCActivityCommand from '@/commands/CreateUTCActivityCommand';
import GetPublicKeyCommand from '@/commands/GetPublicKeyCommand';
export default class CommandServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
    this.commands = [];
  }
  register() {
    let commands = [SignInCommand, ReportCommand, RedirectCommand, DataListCommand,
      GetProjectsCommand, UpLoadCommand, GetCouponCommand, GetFullReduceCommand,
      ReloadCommand, CreateProjectCommand, UpdateProjectCommand, RemoveProjectCommand,
      GetProjectDetialCommand, LoadProvincesCommand, LoadCitiesCommand, LoadCountiesCommand,
      CreateShopCommand, UpdateShopCommand, CreateUTCActivityCommand, GetPublicKeyCommand];
    for (let key in commands) {
      this.app.registerCommand(commands[key].commandName(), commands[key]);
    }
  }
}
