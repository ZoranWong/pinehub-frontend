import _ from 'underscore';
export default class Project {
  constructor(fullReduce) {
    this.id = fullReduce.id;
    this.name = fullReduce.name;
    this.num = fullReduce.num;
    this.number = fullReduce.number;
    this.pays = fullReduce.pays.toFixed(2);
    this.get_limit = fullReduce.get_limit==1?'有效':'无效';
    let createdAt = '';
    if(_.isObject(fullReduce.created_at)) {
      createdAt = fullReduce.created_at.date;
    }else{
      createdAt = fullReduce.created_at;
    }
    createdAt = new Date(createdAt);
    this.createdAt = createdAt.format('yyyy-MM-dd hh:mm:ss');
  }
}
