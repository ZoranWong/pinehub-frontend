export default class Command {
  constructor(app) {
    this.$application = app;
    this.name = '';
  }

  handle(params) {
    console.log(params);
  }
}
