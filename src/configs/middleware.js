import TrimRouteParameter from '@/middlewares/TrimRouteParameter';

export default {
    middleware: {},
    routeMiddleware: {

    },
    middlewareGroups: {
        api: [
            TrimRouteParameter
        ]
    }

}