import AppCall from './appcall';

// //ios手机切换应用、锁屏回调设置   AppCall.openConnectReload(true)
// //然后执行   window.connectReloadChat = function () {xxxx}
// AppCall.call("openConnectReload", val);

// 信息接口
AppCall.extend({
    // 检测支付状态
    verificationState: function () {
        AppCall.call('verificationState');
    },
    // 获取个人参数
    getUserData: function () {
        return new Promise((resolve, reject) => {
            AppCall.call('getUserData', (data, error) => {
                resolve(data);
            });
        });
    },

    // 获取app参数
    getProductData: function () {
        return new Promise((resolve, reject) => {
            AppCall.call('getProductData', (data, error) => {
                resolve(data);
            });
        });
    },

    // 获取所有信息（个人和app）
    getAppData: function () {
        let params = {};
        return new Promise((resolve, reject) => {
            AppCall.getProductData()
                .then(_data => {
                    let data = JSON.parse(_data);
                    params.cmdId = data.cmdId;
                    params.cmdName = data.cmdName;

                    params.uuid = data.deviceId || data.appVersion;
                    params.platformCode = data.platformCode;
                    params.platformVersion = data.platformVersion;
                    params.appVersion = data.appVersion;

                    return AppCall.getUserData();
                })
                .then(_data => {
                    let data = JSON.parse(_data);
                    params.userID = data.userId;
                    params.userType = data.userType;
                    params.token = data.userToken;
                    params.username = data.userName;
                    params.islogin = false;
                    if (params.userID) params.islogin = true;
                    resolve(params);
                });
        });
    },

    // 获取签证信息(sign和公共参数)
    getSignData: function (requestParmas) {
        let params = {};
        return new Promise((resolve, reject) => {
            AppCall.getRequestSign(requestParmas).then(_data => {
                let data = JSON.parse(_data);
                params.cmdId = data.cmdId;
                params.cmdName = data.cmdName;
                params.uuid = data.uuid;
                params.platformCode = data.platformCode;
                params.platformVersion = data.platformVersion;
                params.appVersion = data.appVersion;
                params.UserID = data.userId;
                params.islogin = false;
                if (params.UserID) params.islogin = true;
                params.sign = data.sign;
                resolve(params);
            });
        });
    },

    // 判断客户端小号是否停售
    getHaHaltSales: function () {
        return new Promise((resolve, reject) => {
            AppCall.call('getHaHaltSales', data => {
                let res = data == 'true';
                resolve(res);
            });
        });
    },

    // 获取支付信息
    getPayInfo: function () {
        // AppCall.call("callByWebView", number, "" + realMoney, issueName, multiple);
    },

    // 奖金优化
    optimization: function (number, realMoney, issueName, multiple) {
        if (AppCall.system == 'Android') {
            AppCall.call('callByWebView', number, String(realMoney), issueName, multiple);
        } else {
            AppCall.call(
                'callToOptimize',
                JSON.stringify({
                    number: number,
                    realBuy: realMoney,
                    issueName: issueName,
                    Beishu: multiple
                }));
        }
    }
});

// 工具类接口
AppCall.extend({
    // 链接跳转去浏览器
    gotoBrowser: function (url) {
        AppCall.call('gotoBrowser', url);
    },
    // 弹出提示
    alert: function (_text) {
        let text = typeof _text === 'object' ? JSON.stringify(_text) : String(_text);
        return AppCall.call('alert', text);
    },

    // 设置回调刷新
    setRefreshOnBack: function (on) {
        setTimeout(() => {
            post(on);
        }, 100);

        function post(on) {
            return AppCall.call('setRefreshOnBack', on ? true : false);
        }
    },

    // 设置定时器修复IOSbug
    setReload: function (dir) {
        AppCall.call('setReload', dir);
    },

    // 关闭webView
    close: function () {
        return AppCall.call('close');
    },

    // web支付成功设置标识
    webSuccess: function (on) {
        return AppCall.call('success', on ? true : false);
    },

    // 彩金卡数据上报
    reportCJK: function (index) {
        return AppCall.call('reportData', index ? index : 0);
    },

    // app web支付
    wapCommonPay: function (callback) {
        return new Promise((resolve, reject) => {
            AppCall.call('wapCommonPay', data => {
                resolve(data);
            });
        });
    },

    // 跳转到彩金卡页面
    goHandselCard: function () {
        return this.call('goHandselCard');
    },
    // 跳转到观点页面
    goViewPoint: function () {
        return this.call('goViewPoint');
    },
    // 跳转到充值优惠卡页面
    goRechargeCard: function () {
        return this.call('goRechargeCard');
    },
    // 跳转到H5没有title
    goNoTitleBarWeb: function (URL) {
        return this.call('goNoTitleBarWeb', URL);
    },
    /**
     * 设置保存在app的值
     * @param key
     * @returns {*}
     */
    setOnetimeEventDone: function (key) {
        // AppCall.call("getOnetimeEventStatus", key, (data) => {
        //   AppCall.alert(data);
        //   resolve("OK");
        // });
        return this.call('setOnetimeEventDone', key);
    },
    /**
     * 从app获取值
     * @param key
     * @returns {Promise}
     */
    getOnetimeEventStatus: function (key) {
        return new Promise((resolve, reject) => {
            AppCall.call('getOnetimeEventStatus', key, data => {
                resolve(data == true);
            });
        });
    },
    /**
     * 原生头部自定义分享
     * @param params
     * iconshow:1
     * title:分享的标题
     * content:内容
     * url:跳转的url
     * ways:渠道   'weixin,weixinfriend,qq,qqfriend' ios没有qqfriend
     * picUrl 分享的图片,不传默认jdd图片
     */
    shareNewsActivity: function (params) {
        return this.call('shareNewsActivity', JSON.stringify(params));
    },
    /**
     * 按钮自定义分享
     * @param params
     * title:分享的标题
     * content:内容
     * url:跳转的url
     * ways:渠道   'weixin,weixinfriend,qq,qqfriend' ios没有qqfriend
     * picUrl 分享的图片,不传默认jdd图片
     */
    shareNewsActivityByWays: function (params) {
        return this.call('shareNewsActivityByWays', JSON.stringify(params));
    },
    /**
     * app登录成功回调某个方法
     * @param params 方法名
     */
    setJsReload: function (params) {
        return this.call('setJsReload', params);
    }
});

// 埋点接口
AppCall.extend({
    // 埋点接口
    infocTable: '',
    infocCfg: {},
    // type
    // 0: wifi下上传
    // 1: 都上传
    infocType: 0,
    infoc: async function (_table, _obj) {
        let i,
            params = [],
            obj,
            table;
        // 如果只传第一个参数，则表名取默认
        if (_obj == null) {
            obj = _table;
            table = this.infocTable;
        }
        // 加入默认参数
        for (i in this.infocCfg) {
            if (obj[i] == null) {
                obj[i] = this.infocCfg[i];
            }
        }
        // 参数格式化
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                params.push(i + '=' + encodeURIComponent(obj[i]));
            }
        }

        if (await this.has('report')) {
            return AppCall.call(
                'report',
                JSON.stringify({
                    table: table,
                    type: this.infocType,
                    params: params.join('&')
                })
            );
        } else if (window.Infoc) {
            // 兼容旧版本
            return window.Infoc.report(
                JSON.stringify({
                    table: table,
                    params: params.join('&')
                })
            );
        }
    }
});

// 调起接口
AppCall.extend({
    // 行为调起
    navigate: function (action) {
        return AppCall.call('navigate', JSON.stringify(action));
    },

    // 充值调起
    recharge: function (params, action) {
        return AppCall.call('recharge', JSON.stringify(params), JSON.stringify(action));
    },

    // 充值第二版
    pay: function (params, expands, action) {
        return AppCall.call('pay', JSON.stringify(params), JSON.stringify(expands), JSON.stringify(action));
    },

    /** 直接跳到支付页
     * @params mode: 0 支持即买即负 1不支持
     * @params params:支付需要的params
     */
    toPay: async function (params) {

        if (await AppCall.has('payCommon')) {
            return AppCall.call('payCommon', JSON.stringify(params));
        }
    },
    /** 直接跳到支付页
     * @params mode: 0 支持即买即负 1不支持 2追号 3大神跟单
     * @params params:支付需要的params
     */
    toNewPay: async function (params) {
        if (await AppCall.has('h5pay')) {
            return AppCall.call('h5pay', JSON.stringify(params));
        }
    },

    // 分享功能
    share: function (title, content, url, target, screenshot) {
        let params = {
            title: title || '金山彩票',
            text: content || '',
            url: url || '',
            targetUrl: target ? target : url || '',
            screenshot: screenshot ? 1 : 0
        };
        return AppCall.call('share', JSON.stringify(params));
    },

    // 88红包分享功能
    share88: function (content, url, target) {
        return AppCall.call('share88', content, url, target || '');
    },

    // 动态的分享 标题、分享url、内容
    // obj={title:'xxx',url:'xxx',content:'xzxxx'}
    shareNews: function (obj) {
        AppCall.call('shareNews', JSON.stringify(obj));
    },

    // 分享活动(int 活动ID)
    shareHuodong: function (activityid) {
        setTimeout(function () {
            post();
        }, 100);

        function post() {
            return AppCall.call('shareHuodong', activityid);
        }
    },

    // 点击头部按钮分享活动
    // 格式:{id:分享id,params:[val1,val2,val3,val4...]}
    shareDynamicHD: function (obj) {
        setTimeout(function () {
            post();
        }, 100);

        function post() {
            return AppCall.call('shareDynamicHD', JSON.stringify(obj));
        }
    },

    // 点击页面按钮分享活动，参数同上
    shareHD: function (obj) {
        setTimeout(function () {
            post();
        }, 100);

        function post() {
            return AppCall.call('shareHD', JSON.stringify(obj));
        }
    },
    /**
     * 唤起客服
     * @returns {*}
     */
    onlineService: function () {
        setTimeout(function () {
            post();
        }, 100);

        function post() {
            return AppCall.call('onlineService');
        }
    },

    h5StorageGetObject: function (key) {
        return new Promise((resolve, reject) => {
            AppCall.call('h5StorageGetObject', key, (data, error) => {
                resolve(data);
            });
        });
    },

    h5StorageSetObject: function (obj) {
        return new Promise((resolve, reject) => {
            AppCall.call('h5StorageSetObject', JSON.stringify(obj), (data, error) => {
                resolve(data);
            });
        });
    },

    h5StorageDeleteObject: function (key) {
        return AppCall.call('h5StorageDeleteObject', key);
    },

    /**
     * 活动多币充值调起
     * @param  {object} param           [参数对象]
     * @param  {string} actId           [活动id]
     * @param  {string} chargeMoney     [充值金额]
     * @param  {string} accountMoney    [到账金额]
     * @return {[type]}                 [description]
     */
    goCoinRecharge(param) {
        return AppCall.call('goCoinRecharge', JSON.stringify(param));
    },
    /**
     * 跳转到话题详情
     * @param id
     * @returns {*}
     */
    goTopicDetail(id) {
        return AppCall.call('goTopicDetail', id);
    },
    /**
     * 跳转到专家个人中心
     * @param id
     * @returns {*}
     */
    goAnalystPersonDetail(id) {
        return AppCall.call('goAnalystPersonDetail', id);
    },
    /**
     * 跳转多币抵用券页
     *
     * @returns
     */
    goExpertCard() {
        return AppCall.call('goExpertCard');
    },
    /**
     * 判断路由action是否存在
     * @returns {*}
     */
    hasActivityAction(action) {
        return new Promise((resolve, reject) => {
            AppCall.call('hasActivityAction', JSON.stringify(action), (data, error) => {
                resolve(data);
            });
        });
    }
});

// 帐号操作接口
AppCall.extend({
    // 登录
    login: function () {
        return AppCall.call('login');
    },
    // 注册
    register: function () {
        return AppCall.call('register');
    },
    // 登录v2
    signin: function (action) {
        return AppCall.call('signin', JSON.stringify(action || {}));
    },
    // 注册v2
    signup: function (action) {
        return AppCall.call('signup', JSON.stringify(action || {}));
    },
    // 完善信息
    bindPersonal: function () {
        return AppCall.call('bindPersonal');
    },
    // 绑定手机
    bindPhone: function () {
        return AppCall.call('bindPhone');
    },
    // 绑定身份证
    bindIdCardNumber: function () {
        return AppCall.call('bindIdCardNumber');
    },
    // 用户中心
    bindSecurityCenter: function () {
        return AppCall.call('bindSecurityCenter');
    }
});

// 基于服务端请求的封装
AppCall.extend({
    // 设置请求数据
    setServerData: function (self, callback) {
        if (typeof self.data !== 'object') {
            self.data = {};
        }

        setTimeout(function () {
            return new Promise((resolve, reject) => {
                AppCall.getUserData()
                    .then(_data => {
                        let data = JSON.parse(_data);
                        self.data.userId = data.userId;
                        self.data.userType = data.userType;
                        self.data.token = data.userToken;
                        if (self.data.userId) {
                            self.isLogin = true;
                        } else {
                            self.isLogin = false;
                        }
                        return AppCall.getProductData();
                    })
                    .then(_data => {
                        let data = JSON.parse(_data);
                        self.data.platformCode = data.platformCode;
                        self.data.appVersion = data.appVersion;
                        self.data.cmdId = data.cmdId;
                        self.data.cmdName = data.cmdName;
                    });
            });
        }, 100);
    }
});

export default AppCall;
