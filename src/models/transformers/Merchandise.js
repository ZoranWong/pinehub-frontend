import _ from 'underscore';
export default class Merchandise{
    constructor(merchandise) {
        this.statusDict = ['仓储中', '出售中', '已售罄'];
        this.id = merchandise['id'];
        this.idx = merchandise['index'];
        this.merchandiseId = merchandise['merchandise_id'];
        this.sellPrice = merchandise['sell_price'];
        this.mainImage = merchandise['main_image'];
        this.categories = merchandise['categories'];
        this.name = merchandise['name'];
        this.stockNum = merchandise['stock_num'];
        this.sellNum = merchandise['sell_num'];
        this.visitTime = merchandise['visit_time'] ? merchandise['visit_time'] : 0;
        this.visitorNum = merchandise['visitor_num'] ? merchandise['visitor_num'] : 0;
        this.tags = merchandise['tags'];
        this.status = this.statusDict[merchandise.status];
        let createdAt = '';
        if(_.isObject(merchandise['created_at'])) {
            createdAt = merchandise['created_at']['date'];
        }else{
            createdAt = merchandise['created_at'];
        }
        createdAt = new Date(createdAt);
        this.createdAt = createdAt.format('yyyy-MM-dd hh:mm:ss');
    }
}
