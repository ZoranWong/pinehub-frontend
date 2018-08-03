import Model from './Model'
export default class Account extends Model{
  constructor(application) {
    super(application);
  }
  data() {
    return {
      username: null,
      password: null,
      roles: [],
      expiresAt: null
    };
  }
  computed() {
    return {
      logined(state) {
        return state.username;
      }
    };
  }
}
