import Command from './Command';
import _ from 'underscore';
export default class CreateShopCommand extends Command {
    constructor(app) {
        super(app);
    }

    static buildTicketInfo( ticket) {
        let ticketInfo = JSON.parse(JSON.stringify(ticket));
        let data = {
            'ticket_type': ticketInfo['type'].toLowerCase(),
            'ticket_info': ticketInfo,
            'sync': ticketInfo['is_public'],
            'issue_count': ticketInfo['base_info']['sku']['quantity']
        };
        delete ticketInfo['is_public'];
        delete ticketInfo['type'];
        switch (ticketInfo['base_info']['date_info']['type']) {
            case 'DATE_TYPE_FIX_TIME_RANGE':
                delete ticketInfo['base_info']['date_info']['fixed_term'];
                delete ticketInfo['base_info']['date_info']['fixed_begin_term'];
                ticketInfo['base_info']['date_info']['begin_timestamp'] = ticket['base_info']['date_info']['begin_timestamp'].getTime() / 1000;
                ticketInfo['base_info']['date_info']['end_timestamp'] = ticket['base_info']['date_info']['end_timestamp'].getTime() / 1000;
                break;
            case 'DATE_TYPE_FIX_TERM_0':
                delete ticketInfo['base_info']['date_info']['begin_timestamp'];
                delete ticketInfo['base_info']['date_info']['end_timestamp'];
                ticketInfo['base_info']['date_info']['fixed_begin_term'] = 0;
                ticketInfo['base_info']['date_info']['type'] = 'DATE_TYPE_FIX_TERM';
                break;
            case 'DATE_TYPE_FIX_TERM_1':
                delete ticketInfo['base_info']['date_info']['begin_timestamp'];
                delete ticketInfo['base_info']['date_info']['end_timestamp'];
                ticketInfo['base_info']['date_info']['fixed_begin_term'] = 1;
                ticketInfo['base_info']['date_info']['type'] = 'DATE_TYPE_FIX_TERM';
                break;
        }

        if(ticket['type'] !== 'DISCOUNT') {
            delete ticketInfo['discount'];
            // delete ticketInfo['least_cost'];
            ticketInfo['advanced_info']['use_condition']['least_cost'] = ticket['least_cost'];
        }

        if(ticket['type'] !== 'CASH') {
            delete ticketInfo['reduce_cost'];
            delete ticketInfo['least_cost'];
            delete ticketInfo['advanced_info']['use_condition']['least_cost'] ;
        }

        if(!ticketInfo['base_info']['description']) {
            delete ticketInfo['base_info']['description'];
        }

        if(!ticketInfo['base_info']['service_phone']) {
            delete ticketInfo['base_info']['service_phone'];
        }
        if(_.isString(ticketInfo['begin_at'])) {
            ticketInfo['begin_at'] = new Date(ticketInfo['begin_at']);
        }

        if(_.isString(ticketInfo['end_at'])) {
            ticketInfo['end_at'] = new Date(ticketInfo['end_at']);
        }

        if(ticketInfo['begin_at'] instanceof Date) {
            data['begin_at'] = ticketInfo['begin_at'].format('yyyy-MM-dd') + ' 00:00:00';
        }

        if(ticketInfo['end_at'] instanceof Date) {
            data['end_at'] = ticketInfo['end_at'].format('yyyy-MM-dd') + ' 23:59:59';
        }
        delete ticketInfo['is_public'];
        delete ticketInfo['is_limited'];
        delete ticketInfo['begin_at'];
        delete ticketInfo['end_at'];
        return data;
    }
}
