import Mock from './Mock';

/* eslint-disable */
export default class SevenDaysCount extends Mock {
  constructor(application) {
    super(application);
    this.total = 12;
    this.Random = this.application.instances['mock'].Random;
  }
  data(id) {
    let lastWeek = this.randomArray(7);
    let thisWeek = this.randomArray(this.Random.integer(1, 7));
    return {
      "data": {
        "last_week": lastWeek
        ,
        "this_week": thisWeek
      }
    };
  }

  randomArray(count) {
    let result = [];
    console.log();
    for(let i = 0; i < count; i ++) {
      result.push(this.Random.integer(10, 1000))
    }
    return result;
  }
}
