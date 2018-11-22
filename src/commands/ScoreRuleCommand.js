import Command from './Command';
const GENERAL_RULE = 0;
const FOLLOW = 9;
const ORDER_AMOUNT = 10;
const ORDER_COUNT = 11;
export default class ScoreRuleCommand extends Command {
    constructor(app) {
        super(app);

    }

    buildSpecialRule(rule) {
        let specialRule = {
            score: rule['score'],
            notice_user: rule['notice_user'],
            rule: {}
        };

        switch (rule['type']) {
            case 'FOLLOW': {
                specialRule['type'] = FOLLOW;
                specialRule['rule']['focus'] = true;
                specialRule['name'] = '关注公众号送积分';
                break;
            }
            case 'ORDER_AMOUNT': {
                specialRule['type'] = ORDER_AMOUNT;
                specialRule['rule']['order_amount'] = rule['order_amount'];
                specialRule['name'] = `每笔消费${rule['order_amount']}元，送${rule['score']}积分。`;
                break;
            }
            case 'ORDER_COUNT': {
                specialRule['type'] = ORDER_COUNT;
                specialRule['rule']['order_count'] = rule['order_count'];
                specialRule['name'] = `每完成${rule['order_count']}笔订单，送${rule['score']}积分。`;
                break;
            }
        }
        return specialRule;
    }

    buildGeneralRule(rule) {
        let general = {
            type: GENERAL_RULE,
            score: rule['score'],
            rule: {
                active_type: rule['active_type']
            },
            notice_user: false,
            name: '通用积分规则'
        };
        if(rule['get_limit']) {
            general['rule']['get_limit'] = true;
            general['rule']['day_score'] = rule['score'];
        }
        if(rule['active_type'] === 'TIME_RANGE') {
            general['expires_at'] = rule['expires_at'].getTime() / 1000;
        }
        return general;
    }
}
