import getRequest from 'public/utils/getRequest';
import createUUid from 'public/utils/uuid';
import cookies from 'public/utils/cookies';
import { getParamsCode } from 'public/utils/getParamsCode';
import { USER_INFO_KEY } from 'public/config';
import bridge from 'public/bridge';
import { browser } from 'public/utils/browser';
/**
 * 请求参数加密拦截器
 *
 */
export async function requestInterceptor(config) {
    if (config.method !== 'post') { return config }
    const params = {
        header: {},
        body: JSON.stringify(config.data.params || {}),
    };
    if (browser().isApp) {
        let cparams = await bridge.info.userAppData();
        params.header = cparams;
        params.header.action = config.data.action;

        config.data = 'request=' + getRequest(params);
    } else {
        let userInfo;
        if (browser().isAppWap) {
            userInfo = await bridge.info.userAppData();
        } else {
            userInfo = cookies.get(USER_INFO_KEY) || {};
        }
        params.header = {
            uuid: createUUid(36, ''), // 32位的uuid 187c6fc9405b4322872019948a66a5e3
            platformCode: 'h5mobile',
            appVersion: '4.0.2',
            platformVersion: '4.0.2',
            cmdName: 'h5_' + (cookies.get('from') || getParamsCode('frm') || 'zz'),
            cmdId: 0,
            token: userInfo ? userInfo.token : '',
            action: config.data.action,
        };
        if (config.isUpload) {
            const form = new FormData();
            form.append('request', getRequest(params));
            form.append('file', config.data.file);
            config.headers.post['Content-Type'] = 'multipart/form-data';
            config.data = form;
        } else {
            config.data = 'request=' + getRequest(params);
        }
    }
    return config;
}
