import Model from './Model'
export default class Account extends Model{
  constructor(application) {
    super(application);
  }
  data() {
    let storage = this.service('localStorage');
    let account = storage.get('account');
    let password = null;
    return {
      username: account ? account['user_name'] : null,
      password: password,
      roles: account ? account['roles'] : null,
      mobile: account ? account['mobile'] : null,
      nickname: account ? account['nickname'] : null,
      publicKey: null,
      token: this.service('localStorage').get('token')
    };
  }
  computed() {
    let self = this;
    return {
      logined() {
        if(self.service('localStorage').get('token') !== this.token) {
          this.token = self.service('localStorage').get('token')
        }
        return this.token;
      },
      publicKey() {
        return this.publicKey;
      }
    };
  }

  listeners() {
    this.addEventListener('setAccount', function({username, mobile, nickname, password, roles}, model) {
      this.username = username;
      this.password = password;
      this.roles = roles;
      this.mobile = mobile;
      this.nickname = nickname;
      this.token = model.service('localStorage').get('token');
    });

    this.addEventListener('setPublicKey', function({key}) {
      this.publicKey = key;
    });
  }
}
