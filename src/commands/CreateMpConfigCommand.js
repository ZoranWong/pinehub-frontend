import Command from './Command';
export default class CreateMpConfigCommand extends Command {
  constructor() {
    super();
  }
  async handle(projectId, config) {
    let result = await this.http.projects.addMpConfig(projectId, config);
  }

  static commandName() {
    return 'CREATE_MP_CONFIG';
  }
}
