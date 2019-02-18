import { browser } from 'public/utils/browser';
import native from '../native';
import { localStorage } from 'public/utils/utils';
import cookies from 'public/utils/cookies';
import info from './info';

export default {
    async get(key) {
        if (browser().isPureApp) {
            const has = await native.has('h5StorageGetObject');
            if (has) {
                let value = await native.h5StorageGetObject(key);
                try {
                    value = JSON.parse(value);
                } catch (error) { }
                return value;
            }
        } else {
            return localStorage.get(key);
        }
    },

    async set(key, val) {
        if (browser().isPureApp) {
            const has = await native.has('h5StorageSetObject');
            if (has) {
                let obj = {};
                obj[key] = JSON.stringify(val);
                return native.h5StorageSetObject(obj);
            }
            return false;
        } else {
            return localStorage.set(key, val);
        }
    },

    async remove(key) {
        if (browser().isPureApp) {
            if (await native.has('h5StorageDeleteObject')) {
                native.h5StorageDeleteObject(key);
            }
        } else {
            localStorage.remove(key);
        }
    },

    async writeUserInfo(userInfo) {
        if (browser().isAppWap) {
            await this.set('userInfo', userInfo);
        } else {
            cookies.set('userInfo', userInfo, {
                path: '/',
                domain: document.domain,
                expires: 7
            });
        }
    },

    async getUserInfo() {

        if (browser().isAppWap) {
            let userInfo = await this.get('userInfo');
            return userInfo;
        } else if (browser().isPureApp) {
            return info.userAppData();
        } else {
            return cookies.get('userInfo');
        }
    }
};
