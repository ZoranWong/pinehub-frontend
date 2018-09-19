export default class Customer {
  constructor(customer) {
    this.idx = customer['index'];
    this.id = customer['id'];
    this.nickname = customer['nickname'];
    this.ordersCount = customer['orders_count'];
    this.totalScore = customer['total_score'];
    this.canUseScore =customer['can_use_score'];
    this.score = customer['score'];
    this.channel = customer['channel'];
    this.isMember = customer['is_member'] ? "是" : "否";
    this.sex = customer['sex'];
    this.tags = customer['tags'];
  }
}
