import Service from './Service';
export default class TokenService extends Service {
  constructor($application) {
    super($application);
    this.token = null;
  }
  // eslint-disable-next-line
  async getToken() {
    let token = this.service('localStorage').get('token');
    if(!token) {
      token = await this.refresh();
    }
    return !token ? null : token;
  }

  getRefreshToken() {
    return this.service('localStorage').get('refresh_token');
  }

  async refresh() {
      this.command('CLEAR_ACCOUNT');
      this.service('localStorage').delete('token')
      let token = this.getRefreshToken();
      if(token) {
          token = await this.service('http.account').refreshToken(token);
          if(token) {
              this.setToken(token);
              return token['value'];
          }
      }
      return false;
  }
  setToken(token) {
    this.service('localStorage').set('token', token['value'], token['ttl']);
    this.service('localStorage').set('refresh_token', token['value'], token['refresh_ttl']);
  }
}
