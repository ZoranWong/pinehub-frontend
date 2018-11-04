export default class Customer {
  constructor(customer) {
  	let sex={
		    "UNKOWN":"未知",
		    "MALE":"男",
		    "FEMALE":"女"
     };
    this.idx = customer['index'];
    this.id = customer['id'];
    this.nickname = customer['nickname'];
    this.ordersCount = customer['order_count'];
    this.totalScore = customer['total_score'];
    this.canUseScore =customer['can_use_score'];
    this.score = customer['score'];
    this.channel = customer['channel'];
    this.isMember = customer['is_member'] ? "是" : "否";
    this.sex = sex[customer['sex']];
    this.tags = customer['tags'];
  }
}
