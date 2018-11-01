import _ from 'underscore';
export default class ScoreRule  {
  constructor(rule) {
    this.index = rule['index'];
    this.id = rule['id'];
    this.score = rule['score'];
    this.type = rule['type'];
//  console.log(rule['rule'],"sdddddddddddddd")
    this.orderAmount = rule['rule']['order_amount'];
    this.ordersCount = rule['rule']['order_count'];
    this.totalRecievedScore = rule['total_score'];
    let updatedAt = '';
    if(_.isObject(rule['updated_at'])) {
      updatedAt = rule['updated_at']['date'];
    }else{
      updatedAt = rule['updated_at'];
    }
    updatedAt = new Date(updatedAt);
    this.updatedAt = updatedAt.format('yyyy-MM-dd hh:mm:ss');
  }
}
