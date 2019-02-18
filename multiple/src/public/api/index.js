import { cryptoInstance } from 'public/fetch';

/**
 * 获取分享基础信息
 * @param {object} params
 * @param {string} params.actTypeId
 * @param {any} config
 */
export const FetchShareConfig = (params, config) => cryptoInstance.post('javaHD', { action: 7045, params: JSON.stringify(params) }, config);
