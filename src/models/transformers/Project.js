import _ from 'underscore';
export default class Project {
  constructor(project) {
    this.id = project['id'];
    this.name = project['name'];
    this.logo = project['logo'];
    this.qrCode = project['qr_code'];
    this.contactName = project['contact_name'];
    this.contactPhoneNum = project['contact_phone_num'];
    let createdAt = '';
    if(_.isObject(project['created_at'])) {
      createdAt = project['created_at'].date;
    }else{
      createdAt = project['created_at'];
    }
    createdAt = new Date(createdAt);
    this.createdAt = createdAt.format('yyyy-MM-dd hh:mm:ss');
  }
}
