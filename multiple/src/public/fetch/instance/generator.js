import axios from 'axios';
import * as frmInterceptor from '../interceptors/frm-set';
import * as loadingInterceptor from '../interceptors/loading';
import * as loginInterceptor from '../interceptors/login';
import * as urlInterceptor from '../interceptors/urlMapping';
import * as responseFormatInterceptor from '../interceptors/response-format';
import Toast from 'public/components/toast';
import qs from 'qs';
import jsonp from 'jsonp';

const defaultConfig = {
    timeout: 10 * 1000,
    headers: {
        post: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
    },
};

/**
 * axios工厂方法
 *
 * @export
 * @param {AxiosRequestConfig} [config={}]
 * @returns
 */
export function generator(config) {
    const instance = axios.create(Object.assign(defaultConfig, config));
    addJsonp(instance);

    instance.interceptors.request.use(loadingInterceptor.requestInterceptor, loadingInterceptor.requestErrorInterceptor);
    instance.interceptors.request.use(frmInterceptor.requestInterceptor);
    instance.interceptors.request.use(loginInterceptor.requestInterceptor);
    instance.interceptors.request.use(urlInterceptor.requestInterceptor);


    instance.interceptors.response.use(loadingInterceptor.responseInterceptor, loadingInterceptor.responseErrorInterceptor);
    instance.interceptors.response.use(undefined, error => {
        console.log();
        if (error.message && !error.config.isNotLoading) {
            if (error.message.indexOf('timeout') > -1) {
                Toast.info('请求超时');
            } else {
                Toast.info('请求异常，请重试');
            }
        }
        throw error;
    });
    instance.interceptors.response.use(loginInterceptor.responseInterceptor);
    instance.interceptors.response.use(responseFormatInterceptor.responseInterceptor);
    return instance;
}


function addJsonp(instance) {
    /**
     * JSONP请求
     * @method
     * @param  {string}   url      [请求url]
     * @param  {string}   name     [回调方法name]
     * @param  {object}   params   [参数]
     * @param  {Function} callback [回调方法]
     */
    instance.jsonp = function (_url, name, params, callback) {
        let url = _url;

        url += url.indexOf('?') > -1 ? '&' : '?';
        url += qs.stringify(params);

        jsonp(
            url, {
                name
            },
            (error, res) => {
                callback(error, res);
            }
        );
    };
}
