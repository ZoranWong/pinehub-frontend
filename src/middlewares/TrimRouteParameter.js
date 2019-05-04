import Middleware from './Middleware';

export default class TrimRouteParameter extends Middleware {
    constructor($application) {
        super($application);
    }


    async handle(request) {
        if (this.checkExceptRoute(request['route'])) {
            return;
        }

        let queryParameter = request.params;
        for (let key in queryParameter) {
            if (!queryParameter[key]) {
                delete queryParameter[key];
            }
            if (key === 'searchJson') {

                let parsedSearchJson = this.$application['base64'].decodeURI(queryParameter[key]);
                parsedSearchJson = this.$application['json'].decode(parsedSearchJson);
                parsedSearchJson = this.$application['uri'].decodeURIComponent(parsedSearchJson);
                parsedSearchJson = JSON.parse(parsedSearchJson);

                for (let search in parsedSearchJson) {
                    if (parsedSearchJson[search] === null || parsedSearchJson[search] === 'undefined') {
                        delete parsedSearchJson[search];
                    }
                }

                parsedSearchJson = this.$application['json'].encode(parsedSearchJson);
                parsedSearchJson = encodeURIComponent(parsedSearchJson);
                parsedSearchJson = this.$application['base64'].encodeURI(parsedSearchJson);
                queryParameter[key] = parsedSearchJson;
            }
        }
    }
}