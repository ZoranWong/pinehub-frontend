import Model from './Model'
export default class Order extends Model{
  constructor(application) {
    super(application);
    this.state = {
      orders: [],
      pageCount: 0,
      currentPage: 1
    };
  }
}
