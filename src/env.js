export default {
	gateways: {
		api:{
			auth: 'http://api.auth.kingdomcloud.cn',
			admin: 'http://api.admin.kingdomcloud.cn'
		},
		web: {
			image: 'http://image.kingdomcloud.cn',
			web: 'http://kingdomcloud.cn',
			admin: 'http://admin.kingdomcloud.cn'
		}
	},
	http: {
		headers: {
			'Accept': 'json',
			'Content-type': 'application/json'
		},
		apiGateway: 'http://api.backend.kingdomcloud.cn'
	}
}
