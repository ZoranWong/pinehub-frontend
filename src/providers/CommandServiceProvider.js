import ServiceProvider from './ServiceProvider';
import SignInCommand from '../commands/SignInCommand';
export default class CommandServiceProvider extends ServiceProvider {
  constructor(app) {
    super(app);
  }
  register() {
    this.$vm.register('account:sign-in', SignInCommand);
    this.$vm.prototype['command'] = (command, params) => {
      return this[command].handle(params);
    }
  }
}
