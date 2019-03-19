import Service from '@/services/Service';
export default class MapService extends Service {
    constructor(application, key) {
        super(application);
        this.key = key;
        this.map = null;
    }
}
