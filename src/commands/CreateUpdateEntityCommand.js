import Command from './AdvertisementCommand';

export default class CreateUpdateEntityCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(event, entity) {
        this.$store.dispatch({
            type: event,
            entity: entity
        });
    }

    static commandName() {
        return 'CREATE_UPDATE_ENTITY_INIT';
    }
}