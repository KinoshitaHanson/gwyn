/**
 * 获取浏览器信息、是否在app中打开
 */
import { getParamsCode } from './getParamsCode';
import cookies from 'public/utils/cookies';

export function browser() {
    let u = navigator.userAgent.toLowerCase();
    let isWapWay = getParamsCode('way') === 'wap' || cookies.get('app_way') === 'wap';
    return {
        txt: u, // 浏览器版本信息
        version: (u.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1], // 版本号
        msie: /msie/.test(u) && !/opera/.test(u), // IE内核
        mozilla: /mozilla/.test(u) && !/(compatible|webkit)/.test(u), // 火狐浏览器
        safari: /safari/.test(u) && !(u.indexOf('android') > -1) && !/chrome/.test(u), // 是否为safair
        chrome: /chrome/.test(u), // 是否为chrome
        opera: /opera/.test(u), // 是否为oprea
        presto: u.indexOf('presto/') > -1, // opera内核
        webKit: u.indexOf('applewebkit/') > -1, // 苹果、谷歌内核
        gecko: u.indexOf('gecko/') > -1 && u.indexOf('khtml') == -1, // 火狐内核
        mobile: !!u.match(/applewebkit.*mobile.*/), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/), // ios终端
        android: u.indexOf('android') > -1, // android终端
        iPhone: u.indexOf('iphone') > -1, // 是否为iPhone
        iPad: u.indexOf('ipad') > -1, // 是否iPad
        weixin: /micromessenger/.test(u), // 微信
        QQBrowse: u.indexOf(' QQ') > -1 || u.indexOf(' qq') > -1,
        webApp: !!u.match(/applewebkit.*mobile.*/) && u.indexOf('safari/') == -1, // 是否web应该程序，没有头部与底部,
        isApp: !isWapWay && ((u.indexOf('jscp/ios') > -1 || u.indexOf('jscp/android') > -1) || getParamsCode('source') == 'app'),
        isNotApp: isWapWay || ((u.indexOf('jscp/ios') <= -1 && u.indexOf('jscp/android') <= -1) && getParamsCode('source') != 'app'),
        baidu: /baidu/.test(u), // 是否为oprea
        isAppWap: ((u.indexOf('jscp/ios') > -1 || u.indexOf('jscp/android') > -1) || getParamsCode('source') == 'app') && isWapWay,
        isPureApp: ((u.indexOf('jscp/ios') > -1 || u.indexOf('jscp/android') > -1) || getParamsCode('source') == 'app'),
        isWapWay: isWapWay
        // isApp:true
    };
}
