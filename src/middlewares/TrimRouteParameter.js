import Middleware from './Middleware';
import QueryString from 'query-string';

export default class TrimRouteParameter extends Middleware {
    async handle(request, next) {
        let url = request.url;
        let indexOfQuery = url.indexOf('?');
        let uri = indexOfQuery === -1 ? url : url.substring(0, indexOfQuery);
        let queryParameter = url.substring(url.indexOf('?') + 1);
        queryParameter = QueryString.parse(queryParameter);
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
                parsedSearchJson = this.$application['base64'].encode(parsedSearchJson);
                queryParameter[key] = parsedSearchJson;
            }
        }
        request.url = request.baseURL + uri + this.$application['uri'].query(queryParameter);
    }
}