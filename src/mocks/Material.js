import Mock from './Mock';
/* eslint-disable */
export default class Material extends Mock {
  constructor(application) {
    super(application);
  }
  data(page = 1, search = null, limit = 15) {
    return {
      "data":{
        "title": "@CWORD(4, 7)",
        "introduction": "@CWORD(16, 32)",
        "media_id|+1": 12,
        "url": "@IMAGE('64x64','#FF6600', '')",
        "update_time": "@DATE(yyyy-MM-dd hh:mm:ss)"
      }
    };
  }
}
