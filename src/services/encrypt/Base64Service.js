import {base64} from 'js-base64';
export default class Base64Service {
  constructor() {
  }
  encode(data) {
    return base64.encode(data);
  }
  encodeURI(data) {
    return base64.encodeURI(data);
  }
  decode(str) {
    return base64.decode(str);
  }
}
