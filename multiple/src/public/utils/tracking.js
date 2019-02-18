import cookies from './cookies';
import encUft8 from 'crypto-js/enc-utf8';
import encBase64 from 'crypto-js/enc-base64';

import {
    browser
}
    from 'public/utils/browser';
import bridge from '../bridge';
import {
    normalInstance
}
    from 'public/fetch';
import {
    getParamsCode
}
    from 'public/utils/getParamsCode';
import {
    getTDL
}
    from 'public/utils/utils';

const url = `https://log-center.${getTDL()}/am/log/v1/json`;

function send(params, eventId, other) {
    let now = new Date().getTime();

    other.url = window.location.href;
    let logs = [{
        uid: params.uid,
        eventid: eventId,
        eventcontent: JSON.stringify(other),
        begintime: now,
        pmenu: '',
        menu: '',
        ip: '',
        net: params.netWorkType || '',
        lon: '',
        lat: '',
        areacode: '',
        address: ''
    }];
    params.logs = logs;


    let form = new FormData();
    // let form = {
    //     appName:location.host,
    //     json:JSON.stringify(params)
    // }
    form.append('json', JSON.stringify(params));
    form.append('appName', location.host);

    normalInstance.post(url, form, {
        timeout: 0,
        isNotLoading: true
    }).catch(error => {
        console.warn(error);
    });
}

export default function(eventId) {
    try {
        let other = arguments[1] || {};
        let params = {
            // 上报请求参数
            deviceid: '',
            plateform: 'h5',
            subplateform: 'h5',
            version: '4.0.2',
            channel: '',
            client: '',
            os: '',
            logs: '',
            net: '',
            uid: '',
        };
        if (browser().isApp) {
            bridge.info.userAppDataNative().then(cparams => {
                params.version = cparams.appVersion;
                params.channel = cparams.cmdName;
                params.uid = cparams.userID ? encBase64.parse(cparams.userID).toString(
                    encUft8) : 0;
                params.deviceid = cparams.uuid;
                params.subplateform = cparams.platformCode;
                params.client = '';
                params.net = '';
                params.os = cparams.platformVersion || '';
                params.ip = '';
                send(params, eventId, other);
            });
        } else {
            let userInfo = cookies.get('userInfo');
            params.channel = 'h5_' + (cookies.get('from') || getParamsCode('frm') ||
        'zz');
            params.uid = userInfo ? encBase64.parse(userInfo.id || '').toString(
                encUft8) : 0;
            send(params, eventId, other);
        }
    } catch (error) {
        console.log(error);
    }
}
