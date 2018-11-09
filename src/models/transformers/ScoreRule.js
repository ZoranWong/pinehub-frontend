import _ from 'underscore';
export default class ScoreRule  {
  constructor(rule) {
    this.index = rule['index'];
    this.id = rule['id'];
    this.score = rule['score'];
    this.type = rule['type'];
    this.orderAmount = rule['rule']['order_amount'];
    this.orderCount = rule['rule']['order_count'];
    this.focus = rule['rule']['focus'];
    this.totalReceivedScore = rule['total_score'];
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
