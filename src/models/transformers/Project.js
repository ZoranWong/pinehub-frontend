import _ from 'underscore';
export default class Project {
<<<<<<< HEAD
  constructor(project) {
  	console.log(project)
    this.id = project.id;
    this.name = project.name;
    this.cratedAt = project.created_at;
    this.logo = project.logo;
    this.qrCode = project.qrCode;
=======
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
>>>>>>> dc0dfc751854ab42e29d7a9900aa24f0b8e6c05b
  }
}
