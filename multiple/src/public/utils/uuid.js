/**
 * @desc 生成 UUID
 * @param length {Number} 长度
 * @param segChar {String} 分割字符
 * @returns {String} 生成的 UUID
 */
export default function createUUID(length = 36, segChar = '-') {
    let s = [];
    let hexDigits = '0123456789abcdef';
    for (let i = 0; i < length; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = segChar;

    return s.join('');
}

