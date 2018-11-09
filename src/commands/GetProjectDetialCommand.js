import Command from './Command';
export default class GetProjectDetialCommand extends Command {
  constructor(app) {
    super(app);
  }
  async handle(id) {
      try{
          let project = await this.$service('http.projects').show(id);
          this.$store.dispatch({
              type: 'projects/setCurrentProject',
              project: project
          });
      }catch (e) {
          console.log(e);
      }
  }
  static commandName() {
    return 'GET_PROJECT_DETIAL';
  }
}
