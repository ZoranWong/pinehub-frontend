import  { Base64 } from 'js-base64';
import Service from '../Service';
import _ from 'underscore';
export default class Base64Service extends Service{
  constructor(application) {
    super(application);
  }
  encode(data) {
    if(!_.isString(data)){
      data = this.service('json').encode(data);
    }
    return Base64.encode(data);
  }
  encodeURI(data) {
    return Base64.encodeURI(data);
  }
  decode(str) {
    return Base64.decode(str);
  }
}
