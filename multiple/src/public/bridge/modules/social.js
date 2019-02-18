import { browser } from 'public/utils/browser';
import native from '../native';
import { FetchShareConfig } from 'public/api';
import { merge } from 'public/utils/utils';

let cache = {
    customShare: {}
};

export default {
    // 链接跳转去浏览器
    gotoBrowser(url) {
        native.has('gotoBrowser').then((bol) => {
            if (bol) {
                native.gotoBrowser(url);
            }
        });
    },
    /**
     * 检测支付状态
     *
     */
    verificationState() {
        return native.verificationState();
    },
    /**
     * 初始化分享按钮
     *
     * @param {any} { title, url, content }
     */
    async initShareButton({ title, url, content }) {
        let _url = url;
        if (browser().isApp && (await native.has('shareNews'))) {
            if (_url.split('?')[1]) {
                // 去除source=app
                let temp = _url.split('?')[0] + '?';
                let arr = [];
                _url
                    .split('?')[1]
                    .split('&')
                    .forEach((item, index) => {
                        if (item != 'source=app') {
                            arr.push(item);
                        }
                    });
                if (arr.length > 0) {
                    arr.forEach((item, index) => {
                        temp += item + '&';
                    });
                }
                _url = temp.substring(0, temp.length - 1);
            }

            native.shareNews({
                title: title,
                url: _url,
                content: content
            });
        }
    },

    /**
     * 活动分享
     *
     * @param {Number} shareId - 活动Id
     * @param {String[]} params - url参数 [a,b,c,d]
     */
    async shareActivity(shareId, params) {
        if (browser().isApp) {
            // 千万不要加has.('shareHD')
            native.shareHD({
                id: shareId,
                params: params
            });
        }
    },

    /**
     * 活动分享2
     * @method shareActivity2
     * @param  {[type]}       shareId [分享id]
     * @return {Promise}              [description]
     */
    async shareActivity2(shareId) {
        if (browser().isApp && (await native.has('shareHuodong'))) {
            native.shareHuodong(shareId);
        }
    },

    /**
     * 自定义分享-在app头部
     * @method customShareByAppHeader
     * @param  {[type]}               params [description]
     * @return {Promise}                     [description]
     */
    async customShareByAppHeader(params) {
        if (browser().isApp && (await native.has('shareNewsActivity'))) {
            native.shareNewsActivity(params);
        }
    },

    /**
     * 按钮自定义分享
     * @param {object} params
     * @param {string} params.title    分享的标题
     * @param {string} params.content  内容
     * @param {string} params.url      跳转的url
     * @param {string} params.ways     渠道   'weixin,weixinfriend,qq,qqfriend' ios没有qqfriend
     * @param {string} params.picUrl   分享的图片,不传默认jdd图片
     */
    async customShareByBtn(params) {
        if (browser().isApp && (await native.has('shareNewsActivityByWays'))) {
            native.shareNewsActivityByWays(params);
        }
    },

    /**
     * 自定义分享
     *
     * @param {object} queryConfig              查询配置
     * @param {number} queryConfig.actTypeId
     * @param {object} shareConfig              分享配置（覆盖查询结果）
     * @param {string} shareConfig.title
     * @param {string} shareConfig.content
     * @param {string} shareConfig.url
     * @param {string} shareConfig.ways
     * @param {string} shareConfig.picUrl
     * @returns {object}    查询结果
     */
    async customShare(queryConfig, shareConfig) {
        let res,
            mCache = cache.customShare[JSON.stringify(queryConfig)];

        // 缓存策略
        if (mCache) {
            res = mCache;
        } else {
            res = await FetchShareConfig(queryConfig, { isNotLoading: true });
            cache.customShare[JSON.stringify(queryConfig)] = res;
        }

        if (res.data) {
            let share = {
                title: res.data.shareName,
                content: res.data.content,
                url: res.data.directUrl,
                ways: res.data.sharePlatform,
                picUrl: res.data.smallImgUrl
            };
            this.customShareByBtn(merge(share, shareConfig));
        }
        return res;
    }
};
