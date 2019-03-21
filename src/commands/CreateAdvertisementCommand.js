import Command from './AdvertisementCommand';

export default class CreateAdvertisementCommand extends Command {
    constructor(app) {
        super(app);
    }

    async handle(projectId, advertisement) {
        try {
            let advertisementInfo = Command.buildAdvertisementInfo(advertisement);
            console.log('advertisement info : ', advertisementInfo);
            let result = await this.http.advertisements.create(projectId, advertisementInfo);
            console.log(result);
        } catch (e) {
            console.log(e);
        }
    }

    static commandName() {
        return 'CREATE_ADVERTISEMENT';
    }
}