import _ from 'underscore';
export default class FromRequest {
    constructor(data) {
        this.formData = {};
        _.extend(this.formData, data);

    }
    rules() {

    }
    messages() {

    }
}
