import ApiService from './ApiService';
export default class FilesService extends ApiService {
    constructor (application) {
        super (application);
    }
    async upload (projectId, files, fileField, route) {
        let response = null;
        if (this.$application.needMock ()) {
            response = await this.service('mock.file').mock(files);
        } else {
            let data = new FormData();
            data.append(fileField, files);
            data.append('file_field', fileField);
            response = await this.header({'ProjectId': projectId}).httpPost(route, data);
        }
        return response.data;
    }

    async projectLogoUpload (projectId, files, fileField) {
        return await this.upload(projectId, files, fileField, '/app/logo/cloud');
    }

    async merchandiseImage (projectId, files, fileField) {
        return await this.upload(projectId, files, fileField, '/merchandise/image/cloud');
    }

    async activityPosterImage(projectId, files, fileField) {
        return await this.upload(projectId, files, fileField, 'new/merchandise/activity/upload/image/cloud');
    }

    async activityMerchandiseImage(projectId, files, fileField) {
        return await this.upload(projectId, files, fileField, 'new/merchandise/activity/upload/image/cloud');
    }
}
