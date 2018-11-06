import _ from 'underscore';
export default class Merchandise{
  constructor(merchandise) {
    this.statusDict = ['仓储中', '出售中', '已售罄'];
    this.id = merchandise['id'];
    this.idx = merchandise['index'];
    this.sellPrice = merchandise['sell_price'];
    this.name = merchandise['name'];
    this.stockNum = merchandise['stock_num'];
    this.sellNum = merchandise['sell_num'];
    this.visitTime = merchandise['visit_time'];
    this.visitorNum = merchandise['visitor_num'];
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
