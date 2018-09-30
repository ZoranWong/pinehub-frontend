import Service from '../Service';
//import _ from 'underscore';
export default class SessionService extends Service {
  constructor(application) {
    super(application);
  }
  get(key) {
    let data = sessionStorage.getItem(key);
    return this.service('json').decode(data);
  }

  put() {

  }

  clear() {

  }

  delete() {

  }
}
