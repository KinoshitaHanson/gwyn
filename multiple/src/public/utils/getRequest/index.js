import AES from 'crypto-js/aes';
import encUft8 from 'crypto-js/enc-utf8';
import encBase64 from 'crypto-js/enc-base64';
import padPkcs7 from 'crypto-js/pad-pkcs7';

import modeEBC from './mode-cbc';

/**
 * [getRequest description]
 * @param  {[json]} params [参数]
 * 拼接参数 转换成aes加密密文
 *
 */
export default function getRequest(pm) {
    let key = encUft8.parse('d3YmI1BUOSE2S2YmalBVZUQ='),
        iv = encUft8.parse('0000000000000000');
    let params = JSON.stringify(pm);
    let srcs = encUft8.parse(params);
    let encrypted = AES.encrypt(srcs, key, {
        iv: iv,
        mode: modeEBC,
        padding: padPkcs7
    });
    let res = encodeURI(encBase64.stringify(encrypted.ciphertext)).replace(/\+/g, '%2B');
    return res;
}
