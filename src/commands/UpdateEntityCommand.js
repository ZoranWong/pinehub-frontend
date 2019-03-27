import Command from './AdvertisementCommand';

export default class UpdateEntityCommand extends Command {
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
        return 'UPDATE_ADVERTISEMENT_INIT';
    }
}