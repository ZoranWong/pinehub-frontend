import ApiService from './ApiService';
export default class MarketingService extends ApiService{
    constructor(application) {
        super(application);
    }

    async merchandiseActivity(projectId) {
        let response = await  this.header({'ProjectId': projectId}).httpGet('/new/merchandise/activity');
        return response.data;
    }

    async createMerchandiseActivity(projectId, activity) {
        let response = await this.header({'ProjectId': projectId}).httpPost('/new/merchandise/activity', activity);
        return response.data;
    }

    async updateMerchandiseActivity(projectId, activityId, activity) {
        let response = await this.header({'ProjectId': projectId}).httpPut(`/new/merchandise/activity`, activityId, activity);
        return response.data;
    }

    async removeMerchandise(projectId, id) {
      let response = await this.header({'ProjectId': projectId}).httpDelete(`/new/merchandise/${id}/activity`);
      return response.data;
    }
}
