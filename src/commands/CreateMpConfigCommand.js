import Command from './Command';
export default class CreateMpConfigCommand extends Command {
  constructor() {
    super();
  }
  async handle(projectId, config) {
    try{
        let result = await this.http.projects.addMpConfig(projectId, config);
        console.log(result);
    }catch (e) {
        console.log(e);
    }

  }

  static commandName() {
    return 'CREATE_MP_CONFIG';
  }
}
