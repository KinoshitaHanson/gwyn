var cookies = require('js-cookie');

function getParamsCode(name) {
    var search = window.location.href.indexOf('?') > -1 ? window.location.href.split('?')[1].split('&') : [],
        i = 0,
        len = search.length,
        params = {},
        pos;
    for (; i < len; i++) {
        pos = search[i].indexOf('=');
        if (pos > 0) {
            params[search[i].substring(0, pos)] = decodeURIComponent(search[i].substring(pos + 1));
        }
    }
    return params[name] ? params[name] : undefined;
}


var way = getParamsCode('way');

if(way){
    cookies.set('app_way',way);
}
