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
import ClearAccountCommand from '@/commands/ClearAccountCommand';
import CreateMpConfigCommand from '@/commands/CreateMpConfigCommand';
import UpdateMpConfigCommand from '@/commands/UpdateMpConfigCommand';
import CreateWechatMenuCommand from '@/commands/CreateWechatMenuCommand';
import UpdateWechatMenuCommand from '@/commands/UpdateWechatMenuCommand';
import CreateTicketCommand from '@/commands/CreateTicketCommand';
import CreateMerchandiseCommand from '@/commands/CreateMerchandiseCommand';
import UpdateMerchandiseCommand from '@/commands/UpdateMerchandiseCommand';
import CreateMemberCardCommand from '@/commands/CreateMemberCardCommand';
import UpdateMemberCardCommand from '@/commands/UpdateMemberCardCommand';
import CreateScoreRuleCommand from '@/commands/CreateScoreRuleCommand';
import UpdateScoreRuleCommand from '@/commands/UpdateScoreRuleCommand';

export default class CommandServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }

  register() {
    let commands = [
        SignInCommand, ReportCommand, RedirectCommand, DataListCommand,
        GetProjectsCommand, UpLoadCommand, GetCouponCommand, GetFullReduceCommand,
        ReloadCommand, CreateProjectCommand, UpdateProjectCommand, RemoveProjectCommand,
        GetProjectDetialCommand, LoadProvincesCommand, LoadCitiesCommand, LoadCountiesCommand,
        CreateShopCommand, UpdateShopCommand, CreateUTCActivityCommand, GetPublicKeyCommand,
        ClearAccountCommand, CreateMpConfigCommand, UpdateMpConfigCommand, CreateWechatMenuCommand,
        UpdateWechatMenuCommand, CreateTicketCommand, CreateMerchandiseCommand, UpdateMerchandiseCommand,
        CreateMemberCardCommand, UpdateMemberCardCommand, CreateScoreRuleCommand, UpdateScoreRuleCommand
    ];
    for (let key in commands) {
      this.app.registerCommand(commands[key].commandName(), commands[key]);
    }
  }
}
