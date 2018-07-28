import Service from './Service';
export default class TokenService extends Service {
  constructor($application) {
    super($application);
    this.token = null;
  }
  // eslint-disable-next-line
  async getToken() {
    let token = await this.asyncToken();
    return  token;
  }

  asyncToken() {
    	let token = this.$vm.session.get('token');
      return new Promise(function(resolve) {
        return resolve(token);
      }).then(function (token) {
        return  token;
      });
 }

  getRefreshToken() {

  }
  refresh() {

  }
  setToken() {

  }
}
