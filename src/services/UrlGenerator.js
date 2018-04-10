import _ from 'underscore';

export default class UrlGenerator {
    static create(path = '', queryParam = null) {
        let host = process.env.API_SERVER_HOST;
        if (host.lastIndexOf('/') === host.length - 1) {
            host = host.substr(0, host.length - 1);
        }

        if(path.charAt(0) !== '/') {
            path = `/${path}`;
        }

        let query = UrlGenerator.query(queryParam);
        if (query !== '') {
            query = `?${query}`
        }
        return `${host}${path}${query}`;
    }

    static query(queryParam) {
        if (queryParam === '' || queryParam === null || typeof queryParam === 'undefined') {
            return '';
        }
        let query = UrlGenerator.queryBuild(queryParam);
        return query.substr(0, query.length - 1);
    }

    static queryBuild(queryParam, key = '') {
        let tempQuery = '';
        if (_.isArray(queryParam) || _.isObject(queryParam)) {

            _.map(queryParam, function (obj, index) {
                let tKey ='';
                if (key !== '') {
                    tKey = `${key}[${index}]`;
                }else{
                    tKey = index;
                }

                if (_.isArray(obj) || _.isObject(obj)) {
                    tempQuery += UrlGenerator.queryBuild(obj, tKey);
                } else {
                    tempQuery += `${tKey}=${obj}&`;
                }
            });
        }

        if (typeof queryParam === 'string') {
            tempQuery = queryParam;
        }

        return tempQuery;
    }
}