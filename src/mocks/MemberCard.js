import Mock from './Mock';
/* eslint-disable */
export default class MemberCard extends Mock {
  constructor(application) {
    super(application);
  }
  data(id) {
    return {
      "data":{
        "id|+1": 1,
        "auto_activate": 1,
        "color": "Color030",
        "cover": "color",
        "member_private": ["discount"],
        "discount": "@float(1, 10, 0, 2)",
        "bonus_rule": {
          "init_increase_bonus": null,
        },
        "base_info": {
          "brand_name": "@CWORD(3, 6)",
          "title": "@CWORD(3, 8)",
          "logo_url": "@image('64X64', '#a0a0a0')",
          "can_share": "@integer(0, 1)",
          "description": "@cparagraph(2, 5)",
          "service_phone": /^(((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8})|((\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14})$/,
          "date_info": {
            "type": "DATE_TYPE_PERMANENT",
            "begin_timestamp": null,
            "end_timestamp": null,
            "fixed_term": null,
            "fixed_begin_term": null
          }
        },
        "sync": "@boolean",
        "created_at": "@DATE(yyyy-MM-dd hh:mm:ss)",
        "updated_at": "@DATE(yyyy-MM-dd hh:mm:ss)"
      }
    };
  }
}
