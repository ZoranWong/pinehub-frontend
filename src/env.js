export default {
    gateways: {
        api: {
            auth: 'http://api.auth.klsfood.cn',
            admin: 'http://api.admin.klsfood.cn'
        },
        web: {
            image: 'http://image.klsfood.cn',
            web: 'http://klsfood.cn',
            admin: 'http://admin.klsfood.cn'
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
