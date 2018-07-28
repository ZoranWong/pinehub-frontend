import md5 from 'md5';
import _ from 'underscore';
export default class MD5Service {
  constructor() {

  }
  encrypt(data) {
    if(_.isObject(data) || _.isArray(data)) {
      data = JSON.stringify(data);
    }
    return md5(data);
  }

}
