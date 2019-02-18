import * as C from 'public/utils/constant';
/**
 * @desc 彩种信息
 */
export const LotteryInfo = {
    [C.LOTTERY_ID.CGJ]: { name: '猜冠军', icon: 'cgj', link: `//${location.host}/communal/guessChampion/champion` },
    [C.LOTTERY_ID.GYJ]: { name: '冠亚军', icon: 'gyj', link: `//${location.host}/communal/guessChampion/championship` },
    [C.LOTTERY_ID.SFC]: { name: '胜负彩', icon: 'sfc', path: '/sfc' },
    [C.LOTTERY_ID.QXC]: { name: '七星彩', icon: 'qxc', path: '/qxc' },
    [C.LOTTERY_ID.JLSSC]: { name: '吉林时时彩', icon: 'ssc', path: '/jlssc' },
    [C.LOTTERY_ID.CQSSC]: { name: '重庆时时彩', icon: 'ssc' },
    [C.LOTTERY_ID.SSQ]: { name: '双色球', icon: 'ssq', path: '/ssq' },
    [C.LOTTERY_ID.FC3D]: { name: '福彩3D', icon: 'fc3d', path: '/fc3d' },
    [C.LOTTERY_ID.QLC]: { name: '七乐彩', icon: 'qlc', path: '/qlc' },
    [C.LOTTERY_ID.RXJ]: { name: '任选9', icon: 'rx9', path: '/rxj' },
    [C.LOTTERY_ID.CQKLSF]: { name: '重庆快乐十分', icon: 'klsf', path: '/cqklsf' },
    [C.LOTTERY_ID.DLT]: { name: '大乐透', icon: 'dlt', path: '/dlt' },
    [C.LOTTERY_ID.SD11X5]: { name: '山东11选5', icon: 'sd11x5', path: '/sd11x5' },
    [C.LOTTERY_ID.JX11X5]: { name: '江西11选5', icon: 'jx11x5', path: '/jx11x5' },
    [C.LOTTERY_ID.PL3]: { name: '排列3', icon: 'pl3', path: '/pl3' },
    [C.LOTTERY_ID.PL5]: { name: '排列5', icon: 'pl5', path: '/pl5' },
    [C.LOTTERY_ID.JXK3]: { name: '快3', icon: 'jxk3', path: '/jxk3' },
    [C.LOTTERY_ID.GXK3]: { name: '新快3', icon: 'gxk3', path: '/xk3' },
    [C.LOTTERY_ID.JLK3]: { name: '开心快3', icon: 'jlk3', path: '/jlk3' },
    [C.LOTTERY_ID.JSK3]: { name: '幸运快3', icon: 'jsk3', path: '/jsk3' }, // 江苏快三
    [C.LOTTERY_ID.GD11X5]: { name: '幸运11选5', icon: 'gd11x5', path: '/gd11x5' },
    [C.LOTTERY_ID.XJ11X5]: { name: '欢乐11选5', icon: 'xj11x5', path: '/xj11x5' },
    [C.LOTTERY_ID.HB11X5]: { name: '好运11选5', icon: 'hb11x5', path: '/hb11x5' },
    [C.LOTTERY_ID.JCZQ]: { name: '竞彩足球', icon: 'jczq', path: '/jczq' },
    [C.LOTTERY_ID.BJDC]: { name: '北京单场', icon: 'bjdc', path: '/bjdc', },
    [C.LOTTERY_ID.JCLQ]: { name: '竞彩篮球', icon: 'jclq', path: '/jclq' }
};

/**
 * @desc 快三列表
 */
export const QUICK3_LIST = [
    C.LOTTERY_ID.JXK3,
    C.LOTTERY_ID.JLK3,
    C.LOTTERY_ID.GXK3
];

/**
 * @desc 十一选五列表
 */
export const ELEVENFIVE_LIST = [
    C.LOTTERY_ID.GD11X5,
    C.LOTTERY_ID.HB11X5,
    C.LOTTERY_ID.SD11X5,
    C.LOTTERY_ID.XJ11X5,
    C.LOTTERY_ID.JX11X5,
];
