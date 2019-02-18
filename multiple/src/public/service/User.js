import cookies from 'public/utils/cookies';
import { browser } from 'public/utils/browser';
import bridge from '../bridge';

/**
 * 用户类
 *
 * @class User
 */
class User {
    /**
     * 用户Id
     *
     * @memberof User
     */
    _userId = null;

    _token = null;

    _mobile = null;

    _loginType = null;

    _userName = null;

    _userType = null;

    /**
     * Creates an instance of User.
     * @memberof User
     */
    constructor() {
        this.initPromise = this._initBaseInfo();
    }

    /**
     *  是否登录
     *
     * @readonly
     * @memberof User
     */
    get isLogin() {
        if (cookies.get('userInfo')) {
            return true;
        }
        console.log(this._userId);
        return Boolean(this._userId || this._token);
    }

    /**
     * 是否登录（异步）
     * @method isLoginAsync
     * @return {Boolean}    [description]
     */
    get isLoginAsync() {
        return new Promise(async (resolve, reject) => {
            await this._initBaseInfo();
            resolve(this.isLogin);
        });
    }

    /**
     * 用户信息
     *
     * @readonly
     * @memberof User
     */
    get info() {
        return {
            UserId: this._userId,
            Token: this._token,
            Mobile: this._mobile,
            LoginType: this._loginType,
            UserName: this._userName,
            UserType: this._userType
        };
    }

    /**
     *  初始化用户信息
     *
     * @memberof User
     */
    async _initBaseInfo() {
        try {
            if (browser().isAppWap) {
                let info = await bridge.storage.getUserInfo();
                if (info) {
                    this._userId = info.id;
                    this._userName = info.username;
                    this._userType = info.userType;
                    this._token = info.token;
                    this._mobile = info.mobile;
                    this._loginType = info.logintype;
                }
            } else {
                // 初次bridge会出现undefined（不影响使用）
                if (!bridge) return;
                let info = await bridge.info.userAppData();
                if (info.islogin) {
                    this._userId = info.id;
                    this._userName = info.username;
                    this._userType = info.userType;
                    this._token = info.token;
                    this._mobile = info.mobile;
                    this._loginType = info.logintype;
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     *  登录
     *
     * @memberof User
     */
    login() {
        cookies.remove('userInfo', { path: '/', domain: document.domain });
        bridge.link.login();
    }

    /**
     * 异步获取用户信息
     *
     * @returns
     * @memberof User
     */
    async getInfo() {
        await this._initBaseInfo();
        return this.info;
    }

    /**
     * 异步获取是否登录
     *
     * @returns
     * @memberof User
     */
    async getIsLogin() {
        await this._initBaseInfo();
        return this.isLogin;
    }

    /**
     * 重新获取基本信息
     *
     * @memberof User
     */
    async refresh() {
        await this._initBaseInfo();
    }
}

export default class {
    _instance = null;

    constructor() {
        throw Error('cant create instance');
    }

    static getInstance() {
        if (!this._instance) {
            this._instance = new User();
        }
        return this._instance;
    }
}
