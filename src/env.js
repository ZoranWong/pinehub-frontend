export default {
	gateways: {
		api: {
			auth: 'http://api.auth.kingdomcloud.cn',
			admin: 'http://api.backend.kingdomcloud.cn'
		},
		web: {
			image: 'http://image.kingdomcloud.cn',
			admin: 'http://admin.kingdomcloud.com'
		}
	},
	http: {
        headers: {
            'Accept': 'json',
            'Content-type': 'application/json'
        },
		apiGateway: window.location.protocol + '//api.backend.kingdomcloud.cn'
	}
}
