import Command from './Command';
import _ from 'underscore';

export default class AdvertisementCommand extends Command {
    constructor(app) {
        super(app);
    }

    static buildAdvertisementInfo(advertisement) {
        let advertisementInfo = JSON.parse(JSON.stringify(advertisement));

        if (!advertisementInfo['conditions']['payment_amount']) {
            advertisementInfo['conditions']['payment_amount'] = 0;
        }

        advertisementInfo['begin_at'] = advertisementInfo['start_to_end'][0];
        advertisementInfo['end_at'] = advertisementInfo['start_to_end'][1];
        delete advertisementInfo['start_to_end'];
        if (_.isString(advertisementInfo['begin_at'])) {
            advertisementInfo['begin_at'] = new Date(advertisementInfo['begin_at']);
        }
        if (_.isString(advertisementInfo['end_at'])) {
            advertisementInfo['end_at'] = new Date(advertisementInfo['end_at']);
        }
        if (advertisementInfo['begin_at'] instanceof Date) {
            advertisementInfo['begin_at'] = advertisementInfo['begin_at'].format('yyyy-MM-dd') + ' 00:00:00';
        }
        if (advertisementInfo['end_at'] instanceof Date) {
            advertisementInfo['end_at'] = advertisementInfo['end_at'].format('yyyy-MM-dd') + ' 00:00:00';
        }

        return advertisementInfo;
    }
}