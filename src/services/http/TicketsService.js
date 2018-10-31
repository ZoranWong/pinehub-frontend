import ApiService from './ApiService';
export default class TicketsService extends ApiService{
	constructor(application) {
		super(application);
	}

  async list(projectId) {
    let tickets = null;
		let response = null;
    if(this.$application.needMock()) {
      response =  await this.service('mock.tickets').mock();
    }else{
      response = await this.httpGet(`project/${projectId}/tickets`);
    }
    tickets = response.data;
    return tickets;
  }
}
