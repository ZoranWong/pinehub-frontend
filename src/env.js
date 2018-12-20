export default {
	gateways: {
		api:{
			auth: 'http://api.auth.pinehub',
			admin: 'http://api.admin.pinehub'
		},
		web: {
			image: 'http://image.pinehub',
			web: 'http://pinehub',
			admin: 'http://admin.pinehub'
		}
	},
	http: {
		headers: {
			Accept: 'application/vnd.pinehub.v0.0.1+json'
		}
	}
}
