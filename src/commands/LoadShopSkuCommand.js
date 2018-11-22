/* eslint-disable no-console */
import Command from './Command';
export default class LoadShopSkuCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(shopId, event, page, search, limit) {
        try{
            search = this.json.encode(search);
            search = encodeURIComponent(search);
            search = this.base64.encodeURI(search);
            let headers = {};
            if(this.$requestInput('projectId')) {
                headers = {'ProjectId': this.$requestInput('projectId')}
            }
            let [list, totalNum, currentPage,  totalPage ] = await this.$service('http.shops')
                .header(headers).skuMerchandises(shopId, page, search, limit);
            this.$store.dispatch({
                type: event,
                list: list,
                totalNum: totalNum,
                currentPage: currentPage,
                totalPage: totalPage,
                pageCount: limit
            });
        }catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'LOAD_SHOP_SKU';
    }
}
