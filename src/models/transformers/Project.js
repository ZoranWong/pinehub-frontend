import _ from 'underscore';
export default class Project {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    let createdAt = '';
    if(_.isObject(data.created_at)) {
      createdAt = data.created_at.date;
    }else{
      createdAt = data.created_at;
    }
    createdAt = new Date(createdAt);
    this.createdAt = createdAt.format('yyyy-MM-dd hh:mm:ss');
  }
}
