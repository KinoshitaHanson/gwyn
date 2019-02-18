import { browser } from 'public/utils/browser';
import * as conf from 'common/config/api';

export default {
    data() {
        return {
            pageState: 0, // 0代表初始化，1正常，-1异常
            BRAND_CONFIG: BRAND_CONFIG,
        };
    },
    computed: {
        _browser() {
            return browser();
        },

        _TDL() {
            return (/([0-9]{1,3}\.{1}){3}[0-9]{1,3}/.test(window.location.host) || window.location.host.indexOf('localhost') > -1) ?
                conf.TDL :
                window.location.host
                    .split('.')
                    .slice(-2)
                    .join('.');
        },

        _HOST() {
            return window.location.host;
        }
    },

    methods: {

        /**
         * 日期格式化
         * @param input 输入的值
         * @param format 格式
         * @returns {string}
         */
        _dateFormat(_value, _format) {
            if (!_value) return _value;
            let value = _value;
            if (Object.prototype.toString.call(value) != '[object Date]') {
                value = value.replace(/-/g, '/');
            }
            value = new Date(value);
            let format = _format || 'yyyy-MM-dd hh:mm:ss';
            let args = {
                'M+': value.getMonth() + 1,
                'd+': value.getDate(),
                'h+': value.getHours(),
                'm+': value.getMinutes(),
                's+': value.getSeconds(),
                'q+': Math.floor((value.getMonth() + 3) / 3), // quarter
                S: value.getMilliseconds()
            };
            if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (String(value.getFullYear())).substr(4 - RegExp.$1.length));
            for (let i in args) {
                if (args.hasOwnProperty(i)) {
                    let n = args[i];
                    if (new RegExp('(' + i + ')').test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ('00' + n).substr((String(n)).length));
                }
            }
            return format;

        },

        // 数组去重
        _arrayDistinct(array) {
            let self = array.concat().sort();
            let a = [],
                b = [];
            for (let prop in self) {
                if (self.hasOwnProperty(prop)) {
                    let d = self[prop];
                    if (d === a[prop]) continue; // 防止循环到prototype
                    if (b[d] != 1) {
                        a.push(d);
                        b[d] = 1;
                    }
                }
            }
            return a;
        },

        /**
         * 格式化数字
         * @param number    传进来的数字
         * @param places    保留的小数点位数，默认为2位
         * @param symbol    货币称号，默认为人民币
         * @param thousand  千位符
         * @param decimal   小数点
         * @param return
         */
        _currency(_number, _places, symbol = '$', thousand = ',', decimal = '.') {
            let number = _number || 0;
            let places = !isNaN(Math.abs(_places)) ? _places : 2;
            let negative = number < 0 ? '-' : '',
                i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(places), 10)),
                j = i.length;

            j = j > 3 ? j % 3 : 0;
            return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '');
        },

    },

};
