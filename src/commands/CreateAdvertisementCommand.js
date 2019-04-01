import Command from './AdvertisementCommand';

export default class CreateAdvertisementCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(advertisement) {
        try {
            let advertisementInfo = Command.buildAdvertisementInfo(advertisement);
            let result = await this.http.advertisements.create(advertisementInfo);
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'CREATE_ADVERTISEMENT';
    }
}