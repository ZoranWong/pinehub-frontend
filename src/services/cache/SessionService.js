import Service from '../Service';
//import _ from 'underscore';
export default class SessionService extends Service {
    constructor(application) {
        super(application);
    }

    get(key) {
        let data = sessionStorage.getItem(key);
        data = this.service('json').decode(data);
        if (!data) return null;
        if (this.service('dateService').overDate(data['ttl'])) {
            this.delete(key);
            return null;
        } else {
            return data['value'];
        }
    }

    put(key, data, ttl) {
        let json = {
            value: data,
            ttl: ttl
        };
        sessionStorage.setItem(key, this.service('json').encode(json));
    }

    clear() {
        sessionStorage.clear();
    }

    delete(key) {
        sessionStorage.removeItem(key);
    }
}
