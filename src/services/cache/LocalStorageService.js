import Service from '@/services/Service';
import _ from 'underscore';
import CryptoJS from "crypto-js";

const AES = CryptoJS.AES;
export default class LocalStorageService extends Service {
    constructor(application) {
        super(application);
        this.aesKey = '34B3E2861E670A0064C034D213F2BC44';
    }

    get(key) {
        let data = localStorage.getItem(key);
        data = this.service('json').decode(data);
        if (!data) return null;
        if (data['ttl'] && this.service('dateService').overDate(data['ttl'])) {
            this.delete(key);
            return null;
        } else {
            let value = data['value'];
            value = AES.decrypt(value, this.aesKey);
            return this.service('json').decode(value.toString(CryptoJS.enc.Utf8));
        }
    }

    put(key, data, ttl) {
        if (_.isObject(data) || _.isArray(data)) {
            data = this.service('json').encode(data);
        }
        data = AES.encrypt(data, this.aesKey).toString();
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
