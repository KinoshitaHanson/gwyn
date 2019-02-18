import { browser } from 'public/utils/browser';
import native from '../native';
import cookies from 'public/utils/cookies';
import { getParamsCode } from 'public/utils/getParamsCode';

function LinkTo(param, url) {
    if (browser().isApp) {
        native.navigate(param);
    } else {
        location.href = url;
    }
}

export default {
    /**
     * 购彩大厅
     * @method index
     * @return {[type]} [description]
     */
    index() {
        if (browser().isApp) {
            LinkTo({ id: 10001, category: 0, business: 0, param: '', description: '' }, '');
        } else {
            location.href = `//${location.host}/lottery/index`;
        }
    },

    /**
     * 双色球
     * @method ssq
     * @return {[type]} [description]
     */
    ssq() {
        LinkTo({ id: 10001, category: 5, business: 0, param: '', description: '' }, `//${location.host}/lottery/ssq`);
    },

    /**
     * 大乐透
     * @method dlt
     * @return {[type]} [description]
     */
    dlt() {
        LinkTo({ id: 10001, category: 39, business: 0, param: '', description: '' }, `//${location.host}/lottery/dlt`);
    },

    // 竞彩足球
    jczq({ business, param, description, url }) {
        LinkTo(
            { id: 10001, category: 90, business: business || 1, param: param || '', description: description || '' },
            url || `//${location.host}/lottery/jczq`
        );
    },

    // 竞彩篮球
    jclq() {
        LinkTo({ id: 10001, category: 91, business: 0, param: '', description: '' }, `//${location.host}/lottery/jclq`);
    },

    /**
     * 胜负彩
     * @method sfc
     * @return {[type]} [description]
     */
    sfc() {
        LinkTo({ id: 10001, category: 1, business: 0, param: '', description: '' }, '');
    },

    /**
     * 七星彩
     * @method qxc
     * @return {[type]} [description]
     */
    qxc() {
        LinkTo({ id: 10001, category: 3, business: 0, param: '', description: '' }, '');
    },

    /**
     * 七乐彩
     * @method qlc
     * @return {[type]} [description]
     */
    qlc() {
        LinkTo({ id: 10001, category: 13, business: 0, param: '', description: '' }, '');
    },

    /**
     * 北京单场
     * @method bjdc
     * @return {[type]} [description]
     */
    bjdc() {
        LinkTo({ id: 10001, category: 45, business: 0, param: '', description: '' }, '');
    },

    // 任选9
    rxj() {
        LinkTo({ id: 10001, category: 19, business: 0, param: '', description: '' }, '');
    },

    // 福彩3d
    fc3d() {
        LinkTo({ id: 10001, category: 6, business: 0, param: '', description: '' }, `//${location.host}/lottery/fc3d`);
    },

    // 排列3
    pl3() {
        LinkTo({ id: 10001, category: 63, business: 0, param: '', description: '' }, `//${location.host}/lottery/pl3`);
    },

    // 排列5
    pl5() {
        LinkTo({ id: 10001, category: 64, business: 0, param: '', description: '' }, `//${location.host}/lottery/pl5`);
    },

    /**
     * 江西快3
     * @method jxk3
     * @return {[type]} [description]
     */
    jxk3() {
        LinkTo({ id: 10001, category: 67, business: 0, param: '', description: '' }, `//${location.host}/lottery/jxk3`);
    },

    /**
     * 广西快三
     * @method gxk3
     * @return {[type]} [description]
     */
    gxk3() {
        LinkTo({ id: 10001, category: 68, business: 0, param: '', description: '' }, `//${location.host}/lottery/xk3`);
    },

    /**
     * 山东11选5 （十一运夺金）
     * @method sd11x5
     * @return {[type]} [description]
     */
    sd11x5() {
        LinkTo({ id: 10001, category: 62, business: 0, param: '', description: '' }, `//${location.host}/lottery/sd11x5`);
    },

    // 广东十一选五
    gd11x5() {
        LinkTo({ id: 10001, category: 72, business: 0, param: '', description: '' }, `//${location.host}/lottery/gd11x5`);
    },

    // 新疆十一选五
    xj11x5() {
        LinkTo({ id: 10001, category: 74, business: 0, param: '', description: '' }, `//${location.host}/lottery/xj11x5`);
    },

    // 湖北十一选五
    hb11x5() {
        LinkTo({ id: 10001, category: 78, business: 0, param: '', description: '' }, `//${location.host}/lottery/hb11x5`);
    },

    // 冠军
    gj() {
        LinkTo({ id: 10001, category: 95, business: 0, param: '', description: '' }, '');
    },

    // 冠亚军
    gyj() {
        LinkTo({ id: 10001, category: -95, business: 0, param: '', description: '' }, '');
    },

    // 大神擂台
    dslt() {
        LinkTo({ id: 10003, category: 0, business: 0, param: '', description: '' }, '');
    },
    // 大神个人
    dsgr(categoryId) {
        LinkTo({ id: 10010, category: categoryId, business: 0, param: '', description: '' }, '');
    },
    // 购彩记录
    gcjl() {
        LinkTo(
            {
                id: 10007,
                category: 0,
                business: 0,
                param: '',
                description: ''
            },
            `//${location.host}/home/user/scheme/list`
        );
    },

    // 我的彩票
    wdcp() {
        LinkTo({ id: 10005, category: 2, business: 0, param: '', description: '' }, '');
    },

    // 登录
    login() {
        if (browser().isApp) {
            native.login();
        } else {
            // location.href = "/home/login?backUrl=" + encodeURIComponent(location.href);
            location.href = `//${location.host}/communal/loginTransfer/before?backUrl=` + (getParamsCode('backUrl') ? getParamsCode('backUrl') : encodeURIComponent(location.href));
        }
    },

    // 登录v2
    login2(action) {
        if (browser().isApp) {
            native.signin(action);
        } else {
            // location.href = "/home/login?backUrl=" + encodeURIComponent(location.href);
            location.href = `//${location.host}/communal/loginTransfer/before?backUrl=` + (getParamsCode('backUrl') ? getParamsCode('backUrl') : encodeURIComponent(location.href));
        }
    },

    // 注册
    register() {
        if (browser().isApp) {
            native.register();
        } else {
            location.href = `//${location.host}/home/reg`;
        }
    },

    // 注册v2
    register2(action) {
        if (browser().isApp) {
            native.signup(action);
        } else {
            location.href = `//${location.host}/home/reg`;
        }
    },

    /**
     * 充值
     * @method recharge
     * @param  {[type]} money [充值金额]
     * @return {[type]}       [description]
     */
    recharge(money) {
        if (browser().isApp) {
            native.pay(
                {
                    money: money,
                    protocol: 108,
                    forceMoney: false,
                    pageTitle: '充值'
                },
                {},
                {}
            );
        } else {
            location.href = '/home/user/recharge?money=' + money;
        }
    },

    // 带优惠卡去充值
    rechargeByCard() {
        if (browser().isApp) {
            native.goRechargeCard();
        } else {
            // TODO:带优惠卡去充值
            location.href = '';
        }
    },

    // 彩金卡
    async voucherCard() {
        if (browser().isApp) {
            if (await native.has('goHandselCard')) {
                native.goHandselCard();
            } else {
                this.jumpToPage2('//' + location.host + '/common/cjk/record.html', '彩金卡');
            }
        } else {
            location.href = '/home/user/cjcards';
        }
    },

    // 充值优惠卡
    rechargeCard() {
        if (browser().isApp) {
            native.goRechargeCard();
        } else {
            // location.href = "/home/#/user/cjcards";
        }
    },

    /**
     * 跳转
     * @param url  不带source=app的url
     * @param description  跳转后app显示的title
     */
    jumpToPage2(url, description) {
        let _url = url;
        if (browser().isApp) {
            if (_url.indexOf('?') > -1) {
                _url += '&';
            } else {
                _url += '?';
            }
            let param;
            if (_url.indexOf('http') < 0) {
                param = location.protocol + _url + 'source=app';
            } else {
                param = _url + 'source=app';
            }
            native.navigate({
                id: 10006,
                category: 0,
                business: 0,
                param: param,
                description: description
            });
        } else {
            location.href = _url;
        }
    },

    /** 自定义跳转
     * @param  {[type]} :
     *         0,代表自定义跳转
     *         1,代表跳转比分详情跳转 f1,
     *         2,活动跳转 g1
     *         3,资讯详情跳转 m1
     * @param  {[lotterid]}彩种
     *         91，篮球
     *         90，足球
     * @param {[way]}玩法
     *          竞彩足球   4胜平负、5总进球 、6比分、7半全场、8混合过关、9单关
     *          竞彩篮球   1让分胜负、2胜负、3胜分差、4 大小分、5混合过关、6单关固赔
     * @param {[name]}
     *        活动就传活动名称
     *        比分详情就穿赛事ID
     **/
    custom(type, lotteyId, way, name, url) {
        if (browser().isApp) {
            let obj = {
                id: 10001,
                category: lotteyId,
                business: way,
                extra: {
                    name: name
                },
                param: '',
                description: '投注'
            };
            if (type == 1) {
                obj.extra.track = 'f1';
            } else if (type == 2) {
                obj.extra.track = 'g1';
            } else if (type == 3) {
                obj.extra.track = 'm1';
            }
            native.navigate(obj);
        } else {
            location.href = url;
        }
    },

    // 绑定手机
    bindPhone() {
        if (browser().isApp) {
            native.bindPhone();
        } else {
            location.href = '/home/safe/index';
        }
    },

    // 安全中心
    securityCenter() {
        if (browser().isApp) {
            native.bindSecurityCenter();
        } else {
            location.href = '/home/safe/index';
        }
    },

    // 完善信息
    bindPersonal() {
        if (browser().isApp) {
            native.bindPersonal();
        } else {
            // TODO:完善信息
            location.href = '';
        }
    },

    // 绑定身份证
    bindIdCardNumber() {
        if (browser().isApp) {
            native.bindIdCardNumber();
        } else {
            location.href = `//${location.host}/home/safe/id`;
        }
    },

    // 泊松预测
    poisson(router, route) {
        if (browser().isApp) {
            native.navigate({
                id: 10006,
                category: 0,
                business: 0,
                param:
                (document.location.protocol == 'http:' ? 'http:' : 'https:') +
                '//' +
                location.host +
                '/football/poisson?source=app&mid=' +
                route.query.mid +
                '&lotteryID=' +
                route.query.lotteryID +
                '&lotteryIdForParam=' +
                route.query.lotteryIdForParam,
                description: '泊松预测'
            });
        } else {
            router.push({ path: `/poisson`, query: route.query });
        }
    },

    // 直播
    live(mid, progress) {
        if (browser().isApp) {
            native.navigate({
                id: 10006,
                category: 0,
                business: 0,
                param:
                (document.location.protocol == 'http:' ? 'http:' : 'https:') +
                '//' +
                location.host +
                '/football/fullLive?mid=' +
                mid +
                '&status=' +
                progress,
                description: '赛事直播'
            });
            return true;
        } else {
            return false;
        }
    },

    // 购买
    buy(mid, lotteryID) {
        if (browser().isApp) {
            // android -90 北单
            if (browser().android && lotteryID == -90) {
                native.navigate({
                    id: 10001,
                    category: 90,
                    business: 9,
                    extra: {
                        name: mid,
                        track: 'f1'
                    },
                    param: '',
                    description: '投注'
                });
            } else {
                native.navigate({
                    id: 10001,
                    category: lotteryID,
                    business: 1,
                    extra: {
                        name: mid,
                        track: 'f1'
                    },
                    param: '',
                    description: '投注'
                });
            }
        } else {
            location.href = `//${location.host}/lottery/jczq`;
        }
    },

    // 返回
    back() {
        if (browser().isApp) {
            native.close();
        } else {
            history.go(-1);
        }
    },

    // 赛制
    rule(router, route) {
        if (browser().isApp) {
            native.navigate({
                id: 10006,
                category: 0,
                business: 0,
                param:
                (document.location.protocol == 'http:' ? 'http:' : 'https:') +
                '//' +
                location.host +
                '/football/rule?source=app&mid=' +
                route.query.mid +
                '&lotteryID=' +
                route.query.lotteryID +
                '&lotteryIdForParam=' +
                route.query.lotteryIdForParam,
                description: '赛制'
            });
        } else {
            router.push({ path: '/rule', query: route.query });
        }
    },

    // 亚盘赔率详情
    oddsAsia(router, route, item, index) {
        if (browser().isApp) {
            native.navigate({
                id: 10006,
                category: 0,
                business: 0,
                param:
                (document.location.protocol == 'http:' ? 'http:' : 'https:') +
                '//' +
                location.host +
                '/football/oddsdetail?source=app&mid=' +
                route.query.mid +
                '&act=' +
                'yp' +
                '&bookid=' +
                item.bookMarkerId +
                '&pl=' +
                route.query.pl +
                '&index=' +
                index +
                '&lotteryID=' +
                route.query.lotteryID +
                '&lotteryIdForParam=' +
                route.query.lotteryIdForParam,
                description: '赔率详情'
            });
        } else {
            route.query['bookid'] = item.bookMarkerId;
            route.query['act'] = 'yp';
            route.query['index'] = index;

            router.push({ path: `/oddsdetail`, query: route.query });
            // location.href = "pldetail.html?mid=" + mid + "&act=" + act + "&bkid=" + bookid + "&pl=" + isShowPL + (act == 'rq' ? "&rq=" + rq : "") + '&index=' + index + "&lotteryID=" + lotteryID + "&lotteryIdForParam=" + lotteryIdForParam;
        }
    },

    /**
     * [jump description]
     * @param  {[type]} :
     *         0,代表自定义跳转
     *         1,代表跳转比分详情跳转 f1,
     *         2,活动跳转 g1
     *         3,资讯详情跳转 m1
     * @param  {[lotterid]}彩种
     *         91，篮球
     *         90，足球
     * @param {[way]}玩法
     *          竞彩足球   4胜平负、5总进球 、6比分、7半全场、8混合过关、9单关
     *          竞彩篮球   1让分胜负、2胜负、3胜分差、4 大小分、5混合过关、6单关固赔
     * @param {[name]}
     *        活动就传活动名称
     *        比分详情就穿赛事ID
     */
    detailToBuyBasketball(way, name) {
        if (browser().isApp) {
            let obj = {
                id: 10001,
                category: 91,
                business: way,
                extra: {
                    name: name,
                    track: 'f1'
                },
                param: '',
                description: '投注'
            };
            native.navigate(obj);
        } else {
            location.href = `//${location.host}/lottery/jclq`;
        }
    },

    // 不带标题的webview
    goNoTitleBarWeb(url) {
        native.goNoTitleBarWeb(url);
    },

    // 资讯页
    information() {
        this.jumpToPage2(`//${location.host}/communal/news/recommend`, '观点');
    },

    // 跳转观点详情页
    async informationDetail(newsId) {
        this.jumpToPage2(`//${location.host}/communal/news/detail?id=${newsId}`, '观点详情');
    },

    // 跳转观点详情公告页
    announcementDetail(newsId) {
        this.jumpToPage2(`//${location.host}/communal/news/detail?id=${newsId}`, '观点详情');
    },

    // 跳转观点举报页
    informationReport(newsId, replyId, userId) {
        this.jumpToPage2(`//${location.host}/communal/news/report?newsid=${newsId}&replyid=${replyId}&userId=${userId}`, '举报');
    },

    // 跳转观点分析师详情页
    informationAnalyst(newsId, replyId) {
        this.jumpToPage2(`//${location.host}/communal/news/analyst?id=${newsId}`, '分析师详情');
    },

    // 跳转观点打赏页
    informationReward({ name, userId, newsId, face }) {
        this.jumpToPage2(`//${location.host}/communal/news/reward?name=${name}&userId=${userId}&newsId=${newsId}&face=${face}`, '打赏');
    },

    // 跳转资讯打赏列表页
    informationRewardList(id) {
        this.jumpToPage2(`//${location.host}/communal/news/reward/list?newsId=${id}`, '打赏列表');
    },

    // 世界杯集国旗--球衣兑换
    nationalFlagPoloShirtList(actTypeId) {
        this.jumpToPage2(`//${location.host}/hd/nationalFlag/exchange?actTypeId=${actTypeId}`, '球衣兑换');
    },
    // 世界杯集国旗--奖励记录
    nationalFlagRecord(actTypeId) {
        this.jumpToPage2(`//${location.host}/hd/nationalFlag/record?actTypeId=${actTypeId}`, '奖励记录');
    },
    // 世界杯集国旗--更多奖品
    nationalFlagPrize(actTypeId) {
        this.jumpToPage2(`//${location.host}/hd/nationalFlag/prize?actTypeId=${actTypeId}`, '更多奖品');
    },

    // 资讯跳转购彩页
    informationLottery({ actionId, category, url, description }) {
        if (browser().isApp) {
            if (actionId == '10006') {
                this.jumpToPage2(url, description);
            } else {
                native.navigate({
                    id: actionId,
                    category: category,
                    business: 0,
                    param: '',
                    description: ''
                });
            }
        } else {
            location.href = url;
        }
    },

    // 跳转资讯评论详情页
    informationCommentDetail(id) {
        if (browser().isApp) {
            native.navigate({
                id: 10006,
                category: 0,
                business: 0,
                param:
                (document.location.protocol == 'http:' ? 'http:' : 'https:') +
                '//' +
                location.host +
                '/communal/news/comment?source=app&id=' +
                id,
                description: '评论详情'
            });
        } else {
            location.href = `/communal/news/comment?id=${id}`;
        }
    },

    // 跳转资讯打赏列表页
    informationSubscriptionList(id) {
        this.jumpToPage2(`//${location.host}/communal/news/subscription/list`, '订阅列表');
    },

    /**
     * 前往收银台
     * @param {object} params
     * @param {number} params.mode          0 支持即买即负 1不支持  必传
     * @param {object} params.extra         埋点信息
     * @param {string} params.extra.name    名称
     * @param {string} params.extra.track   Id
     * @param {object} params.params        支付参数recomtype
     * @param {number} params.params.recomtype        必传
     */
    async pay(params) {
        if (browser().isApp) {
            if (await native.has('h5pay')) {
                native.toNewPay(params);
            } else {
                native.toPay(params);
            }
        } else {
            let o = params.params ? params.params : params;
            cookies.set('ZFParms', o);
            location.href = '/lottery/payconfirm';
        }
    },

    /**
     * @desc 在线客服
     */
    onlineService() {
        native.onlineService();
    },

    // 晒单广场
    sharePiazza() {
        LinkTo({ id: 10013, category: 0, business: 0, param: '', description: '' }, `//${location.host}/lottery/share`);
    },

    /**
     *  跳转精选预测页面
     *
     */
    featuredPrediction() {
        this.jumpToPage2(`//${location.host}/communal/recommend`, '精选预测');
    },


    /**
     *  跳转竞足问答列表页
     *
     */
    footballFaq() {
        this.jumpToPage2(`//${location.host}/communal/footballFaq/index`, '竞足问答');
    },

    /**
     *  跳转竞足问答详情
     *
     */
    footballFaqDetail(id) {
        this.jumpToPage2(`//${location.host}/communal/footballFaq/Reply?questionId=${id}`, '竞足问答');
    },


    /**
     *  积分中心
     *
     */
    pointCenter() {
        this.jumpToPage2(`//${location.host}/communal/point/`, '我的积分');
    },

    /**
     *  积分消费记录
     *
     */
    pointRecord() {
        this.jumpToPage2(`//${location.host}/communal/point/record`, '收支明细');
    },

    /**
     *  积分说明
     *
     */
    pointHelp() {
        this.jumpToPage2(`//${location.host}/communal/point/help`, '积分说明');
    },

    /**
     *  积分任务
     *
     */
    pointTask() {
        this.jumpToPage2(`//${location.host}/communal/point/task`, '任务中心');
    },

    /**
     *  积分商城
     *
     */
    pointMall() {
        this.jumpToPage2(`//${location.host}/communal/pointMall/`, '积分商城');
    },

    /**
     *  积分商城物品详情
     *
     */
    pointMallDetail(id, name) {
        this.jumpToPage2(`//${location.host}/communal/pointMall/detail?goodId=${id}&description=${name}`, name);
    },

    /**
     *  积分商城兑换记录
     *
     */
    pointMallRecord() {
        // location.href=`//${location.host}/communal/pointMall/record`;
        this.jumpToPage2(`//${location.host}/communal/pointMall/record`, '我的兑换记录');
    },


    /* ---------- 新的积分中心、积分商城------------------- */
    /**
     *  积分中心
     *
     */
    newPointCenter() {
        this.jumpToPage2(`//${location.host}/point/center/index`, '我的积分');
    },

    /**
     *  积分消费记录
     *
     */
    newPointRecord() {
        this.jumpToPage2(`//${location.host}/point/center/record`, '收支明细');
    },

    /**
     *  积分说明
     *
     */
    newPointHelp() {
        this.jumpToPage2(`//${location.host}/point/center/help`, '积分说明');
    },

    /**
     *  积分任务
     *
     */
    newPointTask() {
        this.jumpToPage2(`//${location.host}/point/center/task`, '任务中心');
    },

    /**
     *  积分商城
     *
     */
    newPointMall() {
        this.jumpToPage2(`//${location.host}/point/mall/index`, '积分商城');
    },

    /**
     *  积分商城物品详情
     *
     */
    newPointMallDetail(id, name) {
        this.jumpToPage2(`//${location.host}/point/mall/detail?id=${id}&titleName=${name}`, '积分商城');
    },

    /**
     *  积分商城兑换记录
     *
     */
    newPointMallRecord() {
        this.jumpToPage2(`//${location.host}/point/mall/record`, '我的兑换记录');
    },
    /* -------------------- */

    /**
     *  哆咪游戏金叶子
     *
     */
    gamePoint() {
        this.jumpToPage2(`//wap.beeplay123.com/jsWap?from=jifen`, '哆咪游戏');
    },

    /**
     *  等级中心
     *
     */
    grade() {
        this.jumpToPage2(`//${location.host}/communal/grade/`, '会员中心');
    },

    /**
     *  等级中心会员权益说明
     *
     */
    gradeInterests() {
        this.jumpToPage2(`//${location.host}/communal/grade/interests`, '会员权益说明');
    },

    /**
     *  等级中心成长值说明
     *
     */
    gradeGrowth(type) {
        this.jumpToPage2(`//${location.host}/communal/grade/growth?type=${type}`, '成长值说明');
    },

    /**
     *  足球赛事库
     *
     */
    footballEvent() {
        this.jumpToPage2(`//${location.host}/communal/footballEvent/`, '赛事库');
    },

    /**
     *  足球赛事库全部赛事
     *
     */
    footballEventAll() {
        this.jumpToPage2(`//${location.host}/communal/footballEvent/all`, '全部赛事');
    },

    /**
     *  足球赛事库详情
     *
     */
    footballEventDetail({ cId = '', nId = '', uId = '', sId = '', title = '', SName = '' }) {
        this.jumpToPage2(
            `//${location.host}/communal/footballEvent/detail?uId=${uId}&cId=${cId}&nId=${nId}&sId=${sId}&title=${title}&SName=${SName}`,
            '赛季详情'
        );
    },
    /**
     *  篮球赛事库详情
     *
     */
    basketballEventDetail({ tId = '', tName = '' }) {
        this.jumpToPage2(
            `//${location.host}/communal/basketballEvent/detail?tId=${tId}&tName=${tName}`,
            '赛季详情'
        );
    },
    /**
     *  足球赛事库赛季选择
     *
     */
    footballEventSeason(uId, title) {
        this.jumpToPage2(`//${location.host}/communal/footballEvent/season?uId=${uId}&tournamentSeasonsTitle=${title}`, '赛季选择');
    },

    /**
     *  足球比分详情
     *
     */
    async footballDetail(mid, title = '比分详情') {
        let url = `//${location.host}/football/analysis/base?lotteryId=90&mid=${mid}`;
        if (browser().isApp) {
            if (await native.has('goNoTitleBarWeb')) {
                this.goNoTitleBarWeb(location.protocol + url);
            } else {
                url += '&isNeedHeader=0';
                this.jumpToPage2(url, title);
            }
        } else {
            location.href = url;
        }
    },
    /**
     *  篮球比分详情
     *
     */
    async basketballDetail(mid, title = '比分详情') {
        let url = `//${location.host}/basketball/analysis/base?mid=${mid}`;
        if (browser().isApp) {
            if (await native.has('goNoTitleBarWeb')) {
                this.goNoTitleBarWeb(location.protocol + url);
            } else {
                this.jumpToPage2(url, title);
            }
        } else {
            location.href = url;
        }
    },
    /**
     * app web支付
     */
    wapCommonPay() {
        return native.wapCommonPay();
    },
    /**
     * 根据彩种id跳转到对应的购彩页面
     * @param lottID
     * @param url
     */
    goGCByLottID(lottID, url, business = 0) {
        if (browser().isApp) {
            LinkTo({ id: 10001, category: lottID, business: business, param: '', description: '' }, '');
        } else {
            location.href = url;
        }
    },

    /**
     *  球酷滚球游戏
     *
     */
    beeplayGame(mid) {
        this.jumpToPage2(`//h5.databiger.com/common/jdd-download-page?trackId=A_DLYM20180428010044000171`, '球酷直播');
        // this.jumpToPage2(`//wap.beeplay123.com/activities/qiukuloading.html?type=match&channel=100001&mid=${mid}`, "哆咪游戏");
    },

    /**
     * [根据彩种id跳转到对应的购彩页面]
     * @method byLotteryId
     * @param  {[type]}    id [description]
     * @return {[type]}       [description]
     */
    byLotteryId(id) {
        if (browser().isApp && browser().android && id == 45) return;
        const mapping = {
            '0': this.index,
            '1': this.sfc,
            '3': this.qxc,
            '5': this.ssq,
            '6': this.fc3d,
            '13': this.qlc,
            '19': this.rxj,
            '39': this.dlt,
            '45': this.bjdc,
            '62': this.sd11x5,
            '63': this.pl3,
            '64': this.pl5,
            '67': this.jxk3,
            '68': this.gxk3,
            '72': this.gd11x5,
            '74': this.xj11x5,
            '78': this.hb11x5,
            '90': this.jczq,
            '91': this.jclq,
            '95': this.gj,
            '-95': this.gyj
        };

        if (mapping[id]) {
            mapping[id.toString()]({});
        } else {
            this.index();
        }
    },

    /**
     * 跳转到追号
     */
    goZH() {
        if (browser().isApp) {
            LinkTo({ id: 10005, category: 1, business: 5, param: '', description: '' }, '');
        } else {
            // TODO: wap追号
        }
    },

    /**
     * 奖金优化支付
     * @return {[type]} [description]
     */
    rewardOptimized(number, realMoney, issueName, multiple) {
        if (browser().isApp) {
            native.optimization(number, realMoney, issueName, multiple);
        } else {
            // TODO: wap奖金优化支付
        }
    },

    /**
     * 跳转观点页
     */
    async goViewpoint() {
        if (browser().isApp) {
            if (await native.has('goViewPoint')) {
                native.goViewPoint();
            } else {
                this.information();
            }
        } else {
            this.information();
        }
    },

    /* 专家号开始 */
    /* 安卓版本5.1.1   ios版本5.3.5 */
    /**
     * 跳转 专家号首页
     */
    expertsHome() {
        LinkTo({ id: 10100, category: 0, business: 0, param: '', description: '' }, `//${location.host}/communal/experts/recommend/home`);
    },
    /**
     * 跳转专家推荐详情页
     * @param schemeId 方案id
     */
    expertsDetail(schemeId) {
        LinkTo({ id: 10101, category: 0, business: 0, param: schemeId, description: '' }, `//${location.host}/communal/experts/recommend/details?schemeId=${schemeId}`);
    },
    /**
     * 跳转专家号高盈利排名列表页 足球专家
     * @param business 方案id 0 命中榜 1 盈利榜 2  连红榜
     */
    expertsSoccerex(business) {
        LinkTo({ id: 10202, category: 0, business, param: '', description: '' }, `//${location.host}/communal/experts/soccerex?status=${business}`);
    },
    /**
     * 专家个人中心页（普通）
     */
    expertsNormalCenter() {
        LinkTo({ id: 10204, category: 0, business: 0, param: '', description: '' }, `//${location.host}/communal/experts/expert/normalCenter`);
    },
    /**
     * 专家个人中心页（专家）
     */
    expertsExpertCenter() {
        LinkTo({ id: 10205, category: 0, business: 0, param: '', description: '' }, `//${location.host}/communal/experts/expert/center`);
    },
    /**
     * 我的关注
     */
    expertsMyAttention() {
        LinkTo({ id: 10203, category: 0, business: 0, param: '', description: '' }, `//${location.host}/communal/experts/attention`);
    },
    /**
     * 专家推荐
     */
    expertsRecommend() {
        LinkTo({ id: 10201, category: 0, business: 0, param: '', description: '' }, `//${location.host}/communal/experts/recommend/recommend`);
    },
    /**
     * 其他用户查看专家个人中心
     * @param param 专家id
     */
    expertsViewCenter(param) {
        LinkTo({ id: 10200, category: 0, business: 0, param, description: '' }, `//${location.host}/communal/experts/expert/viewExpert?expertId=${param}`);
    },
    /* 专家号结束 */

    /* 红彩大师 */
    /**
     * 跳转 专家号首页
     */
    expertsHomeHC() {
        LinkTo({ id: 10001, category: 0, business: 0, param: '', description: '' }, `//${location.host}/communal/experts/recommend/home`);
    },
    /**
     * 跳转专家推荐详情页
     * @param schemeId 方案id
     */
    expertsDetailHC(schemeId) {
        LinkTo({ id: 10101, category: 0, business: 0, param: schemeId, description: '' }, `//${location.host}/communal/experts/recommend/details?schemeId=${schemeId}`);
    },
    /**
     * 跳转专家号高盈利排名列表页 足球专家
     * @param business 方案id 0 命中榜 1 盈利榜 2  连红榜
     */
    expertsSoccerexHC(business) {
        LinkTo({ id: 10100, category: 0, business, param: '', description: '' }, `//${location.host}/communal/experts/soccerex?status=${business}`);
    },
    /**
     * 其他用户查看专家个人中心
     * @param param 专家id
     */
    expertsViewCenterHC(param) {
        LinkTo({ id: 10200, category: 0, business: 0, param, description: '' }, `//${location.host}/communal/experts/expert/viewExpert?expertId=${param}`);
    },
    /**
     * 专家推荐
     */
    expertsRecommendHC() {
        LinkTo({ id: 10002, category: 0, business: 0, param: '', description: '' }, `//${location.host}/communal/experts/recommend/recommend`);
    },
    /**
     * 我的页面
     */
    expertsExpertCenterHC() {
        LinkTo({ id: 10205, category: 0, business: 0, param: '', description: '' }, ``);
    },
    /* 红彩大师 end */

    /* 解球观点 */

    /**
     * 跳转观点个人主页
     */
    viewpointPersonCenter(param) {
        LinkTo({ id: 10601, category: 0, business: 0, param, description: '' }, `//${location.host}/communal/experts/recommend/recommend`);
    },

    /* 解球观点end */

    /**
     * 活动多币充值调起
     * @param  {string} actId           [活动id]
     * @param  {string} chargeMoney     [充值金额]
     * @param  {string} accountMoney    [到账金额]
     * @return {[type]}                 [description]
     */
    async duoCoinRecharge(actId, chargeMoney, accountMoney) {
        if (browser().isApp) {
            if (await native.has('goCoinRecharge')) {
                native.goCoinRecharge({ actId, chargeMoney, accountMoney });
            } else {
                // TODO: app没有此方法
            }
        } else {
            // TODO: wap站操作
        }
    },
    /**
     * 自定义跳转
     * @param title
     * @param business
     * @param category
     * @param description
     * @param id
     * @param param
     */
    customJump(title, business, category, description, id, param) {
        if (id === 10006) {
            this.jumpToPage2(param, title);
        } else if (browser().isApp) {
            LinkTo({ id, category, business, param, description }, '');
        }
    },

    /**
     * 跳转多币抵用券页
     *
     * @return {[type]}                 [description]
     */
    async goExpertCard() {
        if (browser().isApp) {
            if (await native.has('goExpertCard')) {
                native.goExpertCard();
            } else {
                // TODO: app没有此方法
            }
        } else {
            // TODO: wap站操作
        }
    },
    /**
     * 跳转到话题详情
     * @param id
     */
    async goTopicDetail(id) {
        if (browser().isApp) {
            if (await native.has('goTopicDetail')) {
                native.goTopicDetail(id);
            }
        }
    },
    /**
     * 跳转到专家个人中心
     * @param id
     * @returns {Promise.<void>}
     */
    async goAnalystPersonDetail(id) {
        if (browser().isApp) {
            if (await native.has('goAnalystPersonDetail')) {
                native.goAnalystPersonDetail(id);
            }
        }
    },
    /**
     * 我的推单
     * @returns {Promise.<void>}
     * @constructor
     */
    async MyPushSheet() {
        if (browser().isApp) {
            let action = { id: 10105, category: 0, business: 0, param: '', description: '' };
            if (await native.has('hasActivityAction')) {
                if (await native.hasActivityAction(action)) {
                    LinkTo(action);
                }
            }
        }
    },
    /**
     * 想要推单
     * @returns {Promise.<void>}
     */
    async wantPushSheet() {
        if (browser().isApp) {
            let action = { id: 10106, category: 0, business: 0, param: '', description: '' };
            if (await native.has('hasActivityAction')) {
                if (await native.hasActivityAction(action)) {
                    LinkTo(action);
                }
            }
        }
    }
};
