import Model from './Model'
export default class Common extends Model{
    constructor(application) {
        super(application);
    }
    data(){
        return {
            activeDate: (new Date()).getTime()
        };
    }
    listeners() {
        this.addEventListener('refreshDate', function() {
            this.activeDate = (new Date()).getTime();
        });
    }
}
