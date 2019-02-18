import cookies from 'public/utils/cookies';
import { USER_INFO_KEY } from 'public/config';
import { getParamsCode } from 'public/utils/getParamsCode';
// import axios from 'axios';

// const CancelToken = axios.CancelToken.source();

export async function requestInterceptor(config) {
    // config.cancelToken = CancelToken.token;
    const userInfo = cookies.get(USER_INFO_KEY);
    if ((userInfo === undefined || userInfo === '' || userInfo === null) && config.isNeedLogin) {
        // CancelToken.cancel();
        cookies.remove(USER_INFO_KEY);
        location.href = `//${location.host}/home/login?backUrl=${(getParamsCode('backUrl') ? getParamsCode('backUrl') : encodeURIComponent(location.href))}`;
    }

    return config;
}

export async function responseInterceptor(response) {
    if ((response.data.code == -2 || response.data.code == -97 || response.data.code == -96 || response.data.code == -90 || response.data.code == -91 || response.data.code == 88) && response.config.isNeedLogin) {
        response.data.code = -2;
        cookies.remove(USER_INFO_KEY);
        location.href = `//${location.host}/home/login?backUrl=${(getParamsCode('backUrl') ? getParamsCode('backUrl') : encodeURIComponent(location.href))}`;
    }
    return response;
}
