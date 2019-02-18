import Loading from 'public/components/loading';
import * as conf from 'public/config/api';

let ajaxNumber = 0;
const loadingDelay = conf.LOADING_DELAY;
let loadingTimmer;

/**
 * 关闭loading
 *
 */
function closeLoading() {
    if (ajaxNumber > 0) ajaxNumber--;
    clearTimeout(loadingTimmer);
    loadingTimmer = setTimeout(() => {
        if (ajaxNumber === 0) {
            Loading.close();
        }
    }, loadingDelay);
}


/**
 * 请求拦截器
 *
 * @export
 * @param {AxiosRequestConfig} config
 * @returns
 */
export function requestInterceptor(config) {
    if (!config.isNotLoading) {
        ajaxNumber++;
        Loading.show();
    }
    return config;
}

/**
 * 响应拦截器
 *
 * @export
 * @param {AxiosResponse} response
 * @returns
 */
export function responseInterceptor(response) {
    if (!response.config.isNotLoading) {
        closeLoading();
    }
    return response;

}

/**
 * 请求异常拦截器
 *
 * @export
 * @param {*} error
 */
export function requestErrorInterceptor(error) {
    closeLoading();
}

/**
 * 响应异常拦截器
 *
 * @export
 * @param {*} error
 */
export function responseErrorInterceptor(error) {
    closeLoading();
    throw error;
}

