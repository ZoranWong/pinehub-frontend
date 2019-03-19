import Command from './Command';
export default class UpdateMpConfigCommand extends Command {
    constructor() {
        super();
    }
    async handle(projectId, id, config) {
        try{
            let result = await this.http.projects.updateMpConfig(projectId, id, config);
            console.log(result);
        }catch (e) {
            console.log(e);
        }

    }

    static commandName() {
        return 'UPDATE_MP_CONFIG';
    }
}
