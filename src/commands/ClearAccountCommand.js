import Command from './Command';
export default class ClearAccountCommand extends Command {
  constructor() {
    super();
  }
  handle() {
    this.$store.dispatch('account/reset');
  }

  static commandName() {
    return 'CLEAR_ACCOUNT';
  }
}
