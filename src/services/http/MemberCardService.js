import ApiService from './ApiService';
export default class MemberCardService extends ApiService{
	constructor(application) {
		super(application);
	}
	async list(page = 1, search = null, limit = 15) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.memberCards').mock(page, search, limit);
		}else{
			//服务器交互代码
			response = await this.httpGet('member/cards', {page: page, limit: limit, searchJson: search});
		}
		let memberCards = response.data;
		let pagination = response.meta.pagination;
		let totalNum = pagination.total;
		let currentPage = pagination['current_page'];
		let totalPage = pagination['total_pages'];
		return [memberCards, totalNum, currentPage,  totalPage];
	}

	async show(id) {
		let response = null;
		if(this.$application.needMock()) {
			response =  await this.service('mock.memberCard').mock(id);
		}else{
			//服务器交互代码
			response = await this.httpGet(`member/card/${id}`);
		}
		return response.data;
	}

	async create(projectId, memberCard) {
		let cardInfo = this.buildMemberCardInfo(memberCard);
		let response = await this.header({"ProjectId": projectId}).httpPost('member/card', cardInfo);
		return response.data;
	}

	async update(projectId, id, memberCard) {
        let cardInfo = this.buildMemberCardInfo(memberCard);
        let response = await this.header({"ProjectId": projectId}).httpPut('member/card', id, cardInfo);
        return response.data;
	}

	buildMemberCardInfo(card) {
        let cardInfo = {
            auto_activate: card['auto_activate'],
            prerogative:  card['prerogative'],
            supply_balance: !!card['bonus_rule']['init_increase_bonus'],
            supply_bonus: card['base_info'][''],
            base_info: {
                brand_name: card['base_info']['brand_name'],
                title: card['base_info']['title'],
                can_share: card['base_info']['can_share'],
                description: card['base_info']['description'],
                service_phone: card['base_info']['service_phone'],
                color: card['base_info']['color'],
                logo_url: card['base_info']['logo_url'],
                sku: {
                    quantity: 100000000
                },
				date_info: {}
            }
        };
        if(card['base_info']['date_info']['type'] === "DATE_TYPE_PERMANENT") {
            cardInfo['base_info']['date_info']['type'] = "DATE_TYPE_PERMANENT";
        }else if (card['base_info']['date_info']['type'] === "DATE_TYPE_FIX_TIME_RANGE") {
            cardInfo['base_info']['date_info']['type'] = "DATE_TYPE_FIX_TIME_RANGE";
            cardInfo['base_info']['date_info']['begin_timestamp'] = card['base_info']['date_info']['begin_timestamp'];
            cardInfo['base_info']['date_info']['end_timestamp'] = card['base_info']['date_info']['end_timestamp'];
        }else if(card['base_info']['date_info']['type'] === "DATE_TYPE_FIX_TIME_TERM") {
            cardInfo['base_info']['date_info']['type'] = "DATE_TYPE_FIX_TIME_TERM";
            cardInfo['base_info']['date_info']['fixed_term'] = card['base_info']['date_info']['fixed_term'];
            cardInfo['base_info']['date_info']['fixed_begin _term'] = card['base_info']['date_info']['fixed_begin _term'];
        }
        if(card['discount']) {
            cardInfo['discount'] = card['discount'];
        }
        if (card['bonus_rule']['init_increase_bonus']) {
            cardInfo['bonus_rule'] = {};
            cardInfo['bonus_rule']['init_increase_bonus'] = card['bonus_rule']['init_increase_bonus'];
        } else {
            delete cardInfo['bonus_rule'];
        }

        return {
            member_card_type: 'member_card',
            member_card_info: cardInfo,
            sync: card['sync']
        };
	}
}
