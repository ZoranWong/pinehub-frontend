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

        return response;
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

    async bindTemplate(ticketId, templateId, wxType, scene, type) {
        let response = null;

        if (this.$application.needMock()) {
            response = null;
        } else {
            response = await this.httpGet(`ticket/${ticketId}/template/bind/${templateId}`, {wxType, scene, type});
        }

        return response;
    }

    async unBindTemplate(ticketId, templateId) {
        let response = null;

        if (this.$application.needMock()) {
            response = null;
        } else {
            response = await this.httpGet(`ticket/${ticketId}/template/unbind/${templateId}`);
        }

        return response;
    }

    async bindDefaultTemplate(templateId, wxType, scene, type) {
        let response = null;

        if (this.$application.needMock()) {
            response = null;
        } else {
            response = await this.httpGet(`ticket/template/default/bind/${templateId}`, {wxType, scene, type});
        }

        return response;
    }

    async unBindDefaultTemplate(templateId, wxType, scene, type) {
        let response = null;

        if (this.$application.needMock()) {
            response = null;
        } else {
            response = await this.httpGet(`ticket/template/default/unbind/${templateId}`, {wxType, scene, type});
        }

        return response;
    }

    async getTemplateMessages(ticketId) {
        let response = null;

        if (this.$application.needMock()) {
            response = null;
        } else {
            response = await this.httpGet(`ticket/${ticketId}/templates?include=userTemplateMessage`);
        }

        return response;
    }

    async getDefaultTemplateMessages(types) {
        let response = null;

        if (this.$application.needMock()) {
            response = null;
        } else {
            response = await this.httpGet(`ticket/templates/default`, {types, include: 'userTemplateMessage'});
        }

        return response;
    }

}
