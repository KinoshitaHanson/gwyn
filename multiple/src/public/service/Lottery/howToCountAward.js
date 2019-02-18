// 中奖怎么算，跳转路径
import * as C from 'public/utils/constant';

// 获取url
function GU(name, type = 1) {
    let path;
    if (type == 1) {
        path = '/communal/help/rules/';
    } else if (type == 2) {
        path = '/communal/bonusCalc/';
    }
    return `//${location.host}${path}${name}`;
}
/**
 * @desc 奖金怎么算
 */
export const HowToCountAward = {
    [C.LOTTERY_ID.JCZQ]: { name: '竞彩足球', getLink: () => GU('jczq', 2) },
    [C.LOTTERY_ID.JCLQ]: { name: '竞彩篮球', getLink: () => GU('jclq', 2) },
    [C.LOTTERY_ID.BJDC]: { name: '北京单场', getLink: () => GU('bjdc', 2) },
    [C.LOTTERY_ID.SFC]: { name: '胜负彩', getLink: () => GU('sfc', 2) },
    [C.LOTTERY_ID.RXJ]: { name: '任选9', getLink: () => GU('rx9', 2) },

    [C.LOTTERY_ID.JXK3]: { name: '快3', getLink: () => GU('k3zjzms', 1) },
    [C.LOTTERY_ID.SSQ]: { name: '双色球', getLink: () => GU('ssq', 1) },
    [C.LOTTERY_ID.DLT]: { name: '大乐透', getLink: () => GU('dlt', 1) },
    [C.LOTTERY_ID.QXC]: { name: '七星彩', getLink: () => GU('qxc', 1) },
    [C.LOTTERY_ID.PL5]: { name: '排列5', getLink: () => GU('pl5', 1) },
    [C.LOTTERY_ID.PL3]: { name: '排列3', getLink: () => GU('pl3', 1) },
    [C.LOTTERY_ID.FC3D]: { name: '福彩3D', getLink: () => GU('fc3d', 1) },
    [C.LOTTERY_ID.QLC]: { name: '七乐彩', getLink: () => GU('qlc', 1) },
    [C.LOTTERY_ID.JLSSC]: { name: '吉林时时彩', getLink: () => GU('jlssc', 1) },
    // [C.LOTTERY_ID.CGJ]: { name: "猜冠军", getLink: () => GU('cgj', 1) },
    // [C.LOTTERY_ID.GYJ]: { name: "冠亚军", getLink: () => GU('second', 1) },

    [C.LOTTERY_ID.SD11X5]: { name: '山东11选5', getLink: () => GU('syx5', 1) },
    [C.LOTTERY_ID.GD11X5]: { name: '幸运11选5', getLink: () => GU('syx5', 1) },
    [C.LOTTERY_ID.XJ11X5]: { name: '欢乐11选5', getLink: () => GU('syx5', 1) },
    [C.LOTTERY_ID.HB11X5]: { name: '好运11选5', getLink: () => GU('syx5', 1) },
    [C.LOTTERY_ID.JX11X5]: { name: '江西11选5', getLink: () => GU('syx5', 1) },
    [C.LOTTERY_ID.CQKLSF]: { name: '重庆快乐十分', getLink: () => GU('klsf', 1) },
    // [C.LOTTERY_ID.CQSSC]: { name: "重庆时时彩"},
    // [C.LOTTERY_ID.CQSSC]: { name: "重庆时时彩", icon: "cqssc" },
    // [C.LOTTERY_ID.GXK3]: { name: "新快3", icon: "gxk3", path: "/xk3" },
    // [C.LOTTERY_ID.JLK3]: { name: "开心快3", icon: "jlk3", path: "/jlk3" },
};
