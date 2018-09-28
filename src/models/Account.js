import Model from './Model'
export default class Account extends Model{
  constructor(application) {
    super(application);
    console.log(this.services('session'));
  }
  data() {
    return {
      username: 'null',
      password: null,
      roles: [],
      expiresAt: null
    };
  }
  computed() {
    return {
      logined() {
        return this.username;
      }
    };
  }
}
