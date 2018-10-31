import Command from './Command';
export default class UpdateMpConfigCommand extends Command {
  constructor() {
    super();
  }
  async handle(projectId, id, config) {
    let result = await this.http.projects.updateMpConfig(projectId, id, config);
  }

  static commandName() {
    return 'UPDATE_MP_CONFIG';
  }
}
