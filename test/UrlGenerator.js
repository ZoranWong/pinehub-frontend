const _ = require('underscore');

function queryBuild(queryParam, key ) {
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
                tempQuery += queryBuild(obj, tKey);
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

console.log(queryBuild({param1: 'p01', param2: {'k1': 'k1','k2' : ['22m', '23m', {'unit': ['m', 'km']}]}}, ''));