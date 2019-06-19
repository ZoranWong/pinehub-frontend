//汇报命令
/* eslint-disable */
import Command from './Command';

export default class DataListCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(service, event, page, search = null, limit = 15) {
        try {
            console.log('发送前searchJson：',search);
            search = this.json.encode(search);
            search = encodeURIComponent(search);
            search = this.base64.encodeURI(search);
            let headers = {};
            if (this.$requestInput('projectId')) {
                headers = {'ProjectId': this.$requestInput('projectId')}
            }
            let [list, totalNum, currentPage, totalPage, excelUrl] = await this.$service(service)
                .header(headers)
                .list(page, search, limit);
            this.$store.dispatch({
                type: event,
                list: list,
                totalNum: totalNum,
                currentPage: currentPage,
                totalPage: totalPage,
                pageCount: limit,
                excelUrl: excelUrl
            });
        } catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'DATA_LIST';
    }
}
