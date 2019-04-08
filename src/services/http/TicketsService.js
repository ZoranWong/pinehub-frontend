import ApiService from './ApiService';

export default class TicketsService extends ApiService {
    constructor(application) {
        super(application);
    }

    async list(projectId) {
        let response = null;

        if (this.$application.needMock()) {
            response = await this.service('mock.tickets').mock();
        } else {
            response = await this.header({'ProjectId': projectId}).httpGet(`tickets`);
        }

        let tickets = response.data;

        return tickets;
    }

    async create(projectId, ticketInfo) {
        let response = null;

        if (this.$application.needMock()) {
            response = await this.service('mock.tickets').mock();
        } else {
            response = await this.header({'ProjectId': projectId}).httpPost(`tickets`, ticketInfo);
        }

        let ticket = response.data;

        return ticket;
    }

    async disabled(projectId, ticketId) {
        let response = null;

        if (this.$application.needMock()) {
            response = await this.service('mock.tickets').mock();
        } else {
            response = await this.header({'ProjectId': projectId}).httpPut(`ticket`, ticketId, {status: 3});
        }

        let ticket = response.data;

        return ticket;
    }
}
