export default class Member {
  constructor(member) {
    this.idx = member['index'];
    this.id = member['id'];
    this.nickname = member['nickname'];
    this.mobile = member['mobile'];
    this.ordersCount = member['orders_count'];
    this.totalScore = member['total_score'];
    this.canUseScore =member['can_use_score'];
    this.score = member['score'];
    this.channel = member['channel'];
    this.isMember = member['is_member'] ? "是" : "否";
    this.sex = member['sex'];
    this.tags = member['tags'];
    this.card = member['card'];
  }
}
