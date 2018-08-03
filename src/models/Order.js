import Model from './Model'
export default class Order extends Model{
  constructor(application) {
    super(application);
  }

  data() {
    return {
      orders:[],
      pageCount: 0,
      currentPage: 0
    };
  }
}
