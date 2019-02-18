/**
 * 百度统计代码
 * */
import { statisticCode } from 'common/config';

export default {
    install(Vue) {
        Vue.prototype._hmt = window._hmt = window._hmt || [];
        window.onload = function () {
            setTimeout(function () {
                (function () {
                    let hm = document.createElement('script');
                    // TODO: 统计id
                    hm.src = `//hm.baidu.com/hm.js?${statisticCode}`;
                    hm.onload = () => {
                        Vue.prototype._hmt = window._hmt = window._hmt || [];
                    };
                    let s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(hm, s);
                })();
            }, 500);
        };
    }
};
