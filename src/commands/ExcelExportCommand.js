import Command from './Command';

export default class ExcelExportCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(projectId, key, query) {
        let search = this.json.encode(query);
        search = encodeURIComponent(search);
        search = this.base64.encodeURI(search);
        return await this.http.excel.export(projectId, key, query, search);
    }

    static commandName() {
        return 'EXCEL_EXPORT';
    }
}