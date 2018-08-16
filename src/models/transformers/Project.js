export default class Project {
  constructor(project) {
  	console.log(project)
    this.id = project.id;
    this.name = project.name;
    this.cratedAt = project.created_at;
    this.logo = project.logo;
    this.qrCode = project.qrCode;
  }
}
