import ApiService from './ApiService';
export default class FilesService extends ApiService {
	constructor (application) {
		super (application);
	}
	async upload (files, fileField, route) {
		let response = null;
		if (this.$application.needMock ()) {
			response = await this.service('mock.file').mock(files);
		} else {
			let data = new FormData();
			data.append(fileField, files);
			data.append('file_field', fileField);
			response = await this.httpPost(route, data);
		}
		return response.data;
	}

	async projectLogoUpload (files, fileField) {
		return await this.upload(files, fileField, '/project/logo/cloud');
	}
}
