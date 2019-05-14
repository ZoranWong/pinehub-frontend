import Command from './AdvertisementCommand';

export default class UpdateAdvertisementCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(advertisement) {
        try {
            let advertisementInfo = Command.buildAdvertisementInfo(advertisement);
            let result = await this.http.advertisements.update(advertisement['id'], advertisementInfo);
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'UPDATE_ADVERTISEMENT';
    }
}