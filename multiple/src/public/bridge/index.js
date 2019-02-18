import Interactive from './interactive';
import native from './native';
import { browser } from '../utils/browser';
import createUUID from '../utils/uuid';

import link from './modules/link';
import info from './modules/info';
import social from './modules/social';
import storage from './modules/storage';

// 模块化, modules对象里的key为命名空间名称, modules外则直接挂载在顶级命名空间下
const interactive = new Interactive({
    modules: {
        link,
        info,
        social,
        storage
    },

    // 行为调起
    navigate(action) {
        return native.call('navigate', JSON.stringify(action));
    },

    /**
     * 回调刷新页面,
     * @param {Boolean} on -false时，ios依旧刷新，安卓不刷新
     */
    setRefreshOnBack(on = true) {
        setTimeout(() => {
            post(on);
        }, 100);

        function post(on) {
            return native.call('setRefreshOnBack', on ? true : false);
        }
    },

    /**
     * 回调执行方法
     * @param {function} cb 方法
     */
    async setJsReload(cb = () => {}) {
        if (!browser().isApp) return false;
        if (await native.has('setJsReload')) {
            const funcName = `_self${createUUID(12, '')}`;

            window[funcName] = cb;

            // window[funcName] = function() {
            //     return new Promise((resolve, reject) => {
            //         try {
            //             cb();
            //             resolve();
            //         } catch (error) {
            //             reject(error);
            //         }
            //     });
            // };
            native.setJsReload(funcName);
        } else {
            this.setRefreshOnBack();
        }
    },

    /**
     * 判断native是否有该方法
     * 异步
     * @param {String} name
     * @returns {Boolean}
     */
    async has(name) {
        if (browser().isApp) {
            return await native.has(name);
        } else {
            return Promise.resolve(false);
        }
    }
});

export default interactive;
