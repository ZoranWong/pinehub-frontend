import Model from './Model'
export default class Account extends Model{
  constructor(application) {
    super(application);
    this.state = {
      pageCount: 0,
      currentPage: 1
    };
  }
}
