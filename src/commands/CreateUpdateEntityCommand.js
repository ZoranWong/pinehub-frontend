import Command from './AdvertisementCommand';

export default class CreateUpdateEntityCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(event, entity, params) {
        let param = Object.assign({}, {type: event, entity}, params);
        console.log('@@@@:', param);
        this.$store.dispatch(param);
    }

    static commandName() {
        return 'CREATE_UPDATE_ENTITY_INIT';
    }
}