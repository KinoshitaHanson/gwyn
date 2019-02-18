import { browser } from 'public/utils/browser';
import native from '../native';
import { getParamsCode } from 'public/utils/getParamsCode';
import { localStorage } from 'public/utils/utils';
import cookies from 'public/utils/cookies';
import storage from './storage';

export default {
    // 个人信息
    userDataNative() {
        return native.getUserData();
    },

    // 获取app信息
    appDataNative() {
        return native.getProductData();
    },

    // 获取所有信息（个人和app）
    async userAppDataNative() {
        if (browser().isApp) {
            return native.getAppData();
        } else {
            let userInfo;
            if (browser().isAppWap) {
                userInfo = await storage.get('userInfo');
            } else {
                userInfo = cookies.get('userInfo');
            }
            // let userInfo = await storage.get('userInfo');
            // console.log('userInfo', userInfo);
            return new Promise(async (resolve, reject) => {
                resolve({
                    uuid: '3C075555N9M0',
                    platformCode: 'h5mobile',
                    appVersion: '4.0.2',
                    platformVersion: '4.0.2',
                    userID: userInfo ? userInfo.id : '',
                    userType: userInfo ? userInfo.usertype : 1,
                    cmdName: 'h5_' + (await storage.get('from') || getParamsCode('frm') || 'zz'),
                    cmdId: 0,
                    token: userInfo ? userInfo.token : ''
                });
            });
        }
    },

    // 获取所有信息（个人和app）
    async userAppData() {
        if (browser().isApp) {
            return native.getAppData();
        } else {
            let info;
            if (browser().isAppWap) {
                info = await storage.get('userInfo');
            } else {
                info = cookies.get('userInfo');
            }
            if (info) {
                return Promise.resolve({
                    id: info.id,
                    userID: info.id,
                    logintype: info.logintype,
                    mobile: info.mobile,
                    username: info.name,
                    token: info.token,
                    userType: info.usertype,
                    usertype: info.usertype,
                    islogin: true
                });
            } else {
                return Promise.resolve({ islogin: false });
            }
        }
    },

    /**
     * 判断是否正在销售 （ios520前没有此方法）
     *
     * @returns
     */
    isOnSale() {
        if (browser().isApp) {
            return native.getHaHaltSales();
        } else {
            return Promise.resolve(true);
        }
    },

    async getLocalDataFromApp(key) {
        if (browser().isPureApp) {
            if (await native.has('getOnetimeEventStatus')) {
                return await native.getOnetimeEventStatus(key);
            } else {
                return true;
            }
        } else {
            return localStorage.get(key) == true;
        }
    },


    setLocalDataToApp(key) {
        if (browser().isPureApp) {
            native.setOnetimeEventDone(key);
        } else {
            localStorage.set(key, true, {
                path: '/'
            });
        }
    },

    trackingVoucher(index) {
        if (browser().isApp) {
            native.reportCJK(index);
        }
    },
};
