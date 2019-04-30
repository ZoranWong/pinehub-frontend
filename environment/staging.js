export default {
    gateways: {
        api: {
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
            'Accept': 'json',
            'Content-type': 'application/json'
        },
        apiGateway: window.location.protocol + '//api.backend.klsfood.cn'
    }
}
