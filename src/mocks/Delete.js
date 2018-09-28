import Mock from './Mock';
/* eslint-disable */
export default class Material extends Mock {
  constructor(application) {
    super(application);
  }
  data(id) {
    return {
      "data":{
        "delete_count": "@integer(0, 10)",
      }
    };
  }
}
