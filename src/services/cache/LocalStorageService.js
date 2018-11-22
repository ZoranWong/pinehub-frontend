import Service from '@/services/Service';
//import _ from 'underscore';
export default class LocalStorageService extends Service {
    constructor(application) {
        super(application);
    }

    get(key) {
        let data = localStorage.getItem(key);
        data =  this.service('json').decode(data);
        if(!data)return null;
        if(this.service('date').overDate(data['ttl'])) {
            this.delete(key);
            return null;
        }else {
            return data['value'];
        }
    }

    put(key, data, ttl) {
        let json = {
            value: data,
            ttl: ttl
        };
        localStorage.setItem(key, this.service('json').encode(json));
    }

    clear() {
        localStorage.clear();
    }

    delete(key) {
        localStorage.removeItem(key);
    }
}
