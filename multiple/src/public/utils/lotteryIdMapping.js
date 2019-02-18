const h5Url = `//` + location.host;

/**
 * 彩种映射表（后端 afterEndGroup--数据组 dataGroup）
 */
export const LotteryType = {
    /**
     * 数字彩
     * @type {String}
     */
    Digit: '1',
    /**
     * 高频彩
     * @type {String}
     */
    Frequency: '2',
    /**
     * 竞技彩
     * @type {String}
     */
    Athletics: '3',
};

/**
 * 快3公共玩法说明url
 * @type {string}
 */
export const K3URL = `${h5Url}/communal/help/rules/k3`;

/**
 * 11选5公共玩法说明url
 * @type {string}
 */
export const SYX5URL = `${h5Url}/communal/help/rules/syx5`;

export const map = {
    /* --------------全国彩种 超级大乐透、双色球、福彩3D、排列三、排列五、七星彩、七乐彩、胜负彩(任选九)、6场半全场、4场进球彩、竞彩足球、竞彩篮球、足球单场 ------------ */
    /**
     * 大乐透
     */
    DLT: { dataGroup: 1000, afterEndGroup: 39, name: 'DLT', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/dlt` },
    /**
     * 双色球
     */
    SSQ: { dataGroup: 1001, afterEndGroup: 5, name: 'SSQ', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/ssq` },
    /**
     * 福彩3
     */
    FC3D: { dataGroup: 1002, afterEndGroup: 6, name: 'FC3D', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/fc3d` },
    /**
     * 排列3
     */
    PL3: { dataGroup: 1003, afterEndGroup: 63, name: 'PL3', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/pl3` },
    /**
     * 排列5
     */
    PL5: { dataGroup: 1004, afterEndGroup: 64, name: 'PL5', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/pl5` },
    /**
     * 七星彩
     */
    QXC: { dataGroup: 1005, afterEndGroup: 3, name: 'QXC', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/qxc` },
    /**
     * 七乐彩
     */
    QLC: { dataGroup: 1006, afterEndGroup: 13, name: 'QLC', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/qlc` },
    /**
     * 胜负彩
     */
    SFC: { dataGroup: 3001, afterEndGroup: 1, name: 'SFC', type: LotteryType.Athletics, rulePath: `${h5Url}/communal/help/rules/sfc` },
    /**
     * 6球半全场
     */
    LQBQC: { dataGroup: 3002, afterEndGroup: '', name: 'LQBQC', type: LotteryType.Athletics, rulePath: `${h5Url}/communal/help/rules/lcbqc` },
    /**
     * 4场进球彩
     */
    SCJQC: { dataGroup: 3003, afterEndGroup: '', name: 'SCJQC', type: LotteryType.Athletics, rulePath: `${h5Url}/communal/help/rules/scjqc` },
    /**
     * 竞彩足球
     */
    JCZQ: { dataGroup: 3004, afterEndGroup: 90, name: 'JCZQ', type: LotteryType.Athletics, rulePath: `${h5Url}/communal/help/rules/jczq` },
    /**
     * 竞彩篮球
     */
    JCLQ: { dataGroup: 3005, afterEndGroup: 91, name: 'JCLQ', type: LotteryType.Athletics, rulePath: `${h5Url}/communal/help/rules/jclq` },
    /**
     * 北京单场
     */
    BJDC: { dataGroup: 3006, afterEndGroup: 45, name: 'BJDC', type: LotteryType.Athletics, rulePath: `${h5Url}/communal/help/rules/bjdc` },
    /* ---------全国彩种结束--------- */

    /* ---------- 华东六省 ----------------- */
    /*
     * 福彩6+1
     */
    HDLSFCLJY: { dataGroup: 1024, afterEndGroup: '', name: 'HDLSFCLJY', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/fcljy` },
    /*
     * 15选5
     */
    HDLSSWXW: { dataGroup: 1044, afterEndGroup: '', name: 'HDLSSWXW', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hdls15x5` },
    /*
     * 6+1
     */
    HDLSLJY: { dataGroup: 1048, afterEndGroup: '', name: 'HDLSLJY', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/ljy` },
    /* ---------- 华东六省结束 ----------------- */


    /* ---------- 北京市开始 ----------------- */
    /**
     * 11选5
     */
    BJ11X5: { dataGroup: 2020, afterEndGroup: '', name: 'BJ11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * PK拾
     */
    PK10: { dataGroup: 2067, afterEndGroup: '', name: 'PK10', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/pk10` },
    /**
     * 快中彩
     */
    BJKZC: { dataGroup: 2072, afterEndGroup: '', name: 'BJKZC', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/kzc` },
    /**
     * 北京快3
     */
    BJK3: { dataGroup: 2065, afterEndGroup: '', name: 'BJK3', type: LotteryType.Frequency, rulePath: K3URL },
    /**
     * 快乐8
     */
    BJKLB: { dataGroup: 2066, afterEndGroup: '', name: '2066', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/klb` },
    /* ---------- 北京市结束 ----------------- */

    /* ---------- 天津市结束 ----------------- */
    /**
     * 泳坛夺金
     */
    TJYTDJ: { dataGroup: 2027, afterEndGroup: '', name: 'TJYTDJ', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/ytdj` },
    /**
     * 11选5
     */
    TJ11X5: { dataGroup: 2022, afterEndGroup: '', name: 'TJ11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 快乐十分
     */
    TJKLSF: { dataGroup: 2063, afterEndGroup: '', name: 'TJKLSF', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/tjsklsf` },
    /**
     * 时时彩
     */
    TJSSC: { dataGroup: 2064, afterEndGroup: '', name: 'TJSSC', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/ssc` },
    /* ---------- 天津市结束 ----------------- */


    /* ----------河北省开始 ----------------- */
    /**
     * 排列5
     */
    HBSPL5: { dataGroup: 1034, afterEndGroup: '', name: 'HBSPL5', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hbspl5` },
    /**
     * 河北快3
     */
    HBSK3: { dataGroup: 2076, afterEndGroup: '', name: 'HBSK3', type: LotteryType.Frequency, rulePath: K3URL },
    /**
     * 20选5
     */
    HBS20X5: { dataGroup: 1033, afterEndGroup: '', name: 'HBS20X5', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hye` },
    /**
     * 河北11选5
     */
    HBS11X5: { dataGroup: 2013, afterEndGroup: '', name: 'HBS11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 快乐扑克
     */
    HBSKLPK: { dataGroup: 2029, afterEndGroup: '', name: 'HBSKLPK', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/klpk` },
    /**
     * 好运2
     */
    HBSHY2: { dataGroup: 1046, afterEndGroup: '', name: 'HBSHY2', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hye` },
    /**
     * 排列7
     */
    HBSPL7: { dataGroup: 1035, afterEndGroup: '', name: 'HBSPL7', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/pl7` },
    /**
     * 好运3
     */
    HBSHY3: { dataGroup: 1047, afterEndGroup: '', name: 'HBSHY3', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hye` },

    /* ----------河北省结束 ----------------- */

    /* ----------山西省开始 ----------------- */
    /**
     * 泳坛夺金
     */
    SXYTDJ: { dataGroup: 2080, afterEndGroup: '', name: 'SXYTDJ', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/sxsytdj` },
    /**
     * 山西11选5
     */
    SX11X5: { dataGroup: 2007, afterEndGroup: '', name: 'SX11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 快乐十分
     */
    SXKLSF: { dataGroup: 2081, afterEndGroup: '', name: 'SXKLSF', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/sxsklsf` },
    /* ----------山西省结束 ----------------- */


    /* ----------内蒙古开始 ----------------- */
    /**
     * 内蒙古11选5
     */
    NMG11X5: { dataGroup: 2023, afterEndGroup: '', name: 'NMG11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 内蒙古快3
     */
    NMGK3: { dataGroup: 2062, afterEndGroup: '', name: 'NMGK3', type: LotteryType.Frequency, rulePath: K3URL },
    /* ----------内蒙古结束 ----------------- */


    /* ----------辽宁省开始 ----------------- */
    /**
     * 全运彩（11选5）
     */
    LNQYC: { dataGroup: 2012, afterEndGroup: '', name: 'LNQYC', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 快乐12
     */
    LNKL12: { dataGroup: 2068, afterEndGroup: '', name: 'LNKL12', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/klse` },
    /**
     * 东方6＋1
     */
    LNDF6J1: { dataGroup: 1036, afterEndGroup: '', name: 'LNDF6J1', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/dfljy` },
    /**
     * 35选7
     */
    LN35X7: { dataGroup: 1037, afterEndGroup: '', name: 'LN35X7', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/sswxq` },
    /**
     * 11选5
     */
    LN11X5: { dataGroup: 2086, afterEndGroup: '', name: 'LN11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /* ----------辽宁省结束 ----------------- */


    /* ----------吉林省开始 ----------------- */
    /**
     * 吉林11选5
     */
    JL11X5: { dataGroup: 2025, afterEndGroup: '', name: 'JL11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 吉林快3（开心快3）
     */
    JLK3: { dataGroup: 2039, afterEndGroup: 69, name: 'JLK3', type: LotteryType.Frequency, rulePath: K3URL },
    /**
     * 吉林时时彩
     */
    JLSSC: { dataGroup: 2040, afterEndGroup: 29, name: 'JLSSC', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/jlssc` },
    /* ----------吉林省结束 ----------------- */


    /* ----------黑龙江省开始 ----------------- */
    /**
     * 6+1
     */
    HLJS6J1: { dataGroup: 1008, afterEndGroup: '', name: 'HLJS6J1', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hljljy` },
    /**
     * 36选7
     */
    HLJS36X7: { dataGroup: 1030, afterEndGroup: '', name: 'HLJS36X7', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hljsslxq` },
    /**
     * 快乐十分
     */
    HLJSKLSF: { dataGroup: 2061, afterEndGroup: '', name: 'HLJSKLSF', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/hljsklsf` },
    /**
     * p62
     */
    HLJSP62: { dataGroup: 1032, afterEndGroup: '', name: 'HLJSP62', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hljsp62` },
    /**
     * 22选5
     */
    HLJS22X5: { dataGroup: 1031, afterEndGroup: '', name: 'HLJS22X5', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hljs22x5` },
    /**
     * 11选5
     */
    HLJS11X5: { dataGroup: 2040, afterEndGroup: '', name: 'HLJS11X5', type: LotteryType.Frequency, rulePath: SYX5URL },



    /* ----------上海市开始 ----------------- */
    /**
     * 东方6＋1
     */
    SHSDF6J1: { dataGroup: 1040, afterEndGroup: '', name: 'SHSDF6J1', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/shsdfljy` },
    /**
     * 时时乐
     */
    SHSSSL: { dataGroup: 2070, afterEndGroup: '', name: 'SHSSSL', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/ssl` },
    /**
     * 天天彩选4
     */
    SHSTTXC4: { dataGroup: 1038, afterEndGroup: '', name: 'SHSTTXC4', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/ttxcs` },
    /**
     * 15选5
     */
    SHS11x5: { dataGroup: 1039, afterEndGroup: '', name: 'SHS11x5', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hdls15x5` },
    /**
     * 上海快3
     */
    SHK3: { dataGroup: 2069, afterEndGroup: '', name: 'SHK3', type: LotteryType.Frequency, rulePath: K3URL },
    /**
     * 上海11选5
     */
    SH11X5: { dataGroup: 2021, afterEndGroup: '', name: 'SH11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /* ----------上海市结束 ----------------- */



    /* ----------江苏省开始 ----------------- */
    /**
     * 7位数
     */
    JS7WS: { dataGroup: 1043, afterEndGroup: '', name: 'JS7WS', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/qws` },
    /**
     * 江苏11选5
     */
    JS11X5: { dataGroup: 2011, afterEndGroup: '', name: 'JS11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 江苏快3
     */
    JSK3: { dataGroup: 2071, afterEndGroup: 65, name: 'JSK3', type: LotteryType.Frequency, rulePath: K3URL },
    /**
     * 东方6＋1
     */
    JS6J1: { dataGroup: 1042, afterEndGroup: '', name: 'JS6J1', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/ljy` },
    /**
     * 15选5
     */
    JS15X5: { dataGroup: 1041, afterEndGroup: '', name: 'JS15X5', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hdls15x5` },
    /* ----------江苏省结束 ----------------- */


    /* ----------浙江省开始 ----------------- */
    /**
     * 6+1
     */
    ZJ6J1: { dataGroup: 1009, afterEndGroup: '', name: 'ZJ6J1', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/ljy` },
    /**
     * 15选5
     */
    ZJ15X5: { dataGroup: 1029, afterEndGroup: '', name: 'ZJ15X5', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hdls15x5` },
    /**
     * 12选5
     */
    ZJ12X5: { dataGroup: 1028, afterEndGroup: '', name: 'ZJ12X5', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/zjs12x5` },
    /**
     * 浙江11选5
     */
    ZJ11X5: { dataGroup: 2010, afterEndGroup: '', name: 'ZJ11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 快2
     */
    ZJK2: { dataGroup: 2060, afterEndGroup: '', name: 'ZJK2', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/zjsk2` },
    /**
     * 20选5
     */
    ZJ20X5: { dataGroup: 1010, afterEndGroup: '', name: 'ZJ20X5', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/zjs20x5` },
    /**
     * 飞鱼
     */
    ZJFY: { dataGroup: 2033, afterEndGroup: '', name: 'ZJFY', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/zjsfy` },
    /* ----------浙江省结束 ----------------- */

    /* ----------安徽省开始 ----------------- */
    /**
     * 安徽11选5
     */
    AH11X5: { dataGroup: 2009, afterEndGroup: '', name: 'AH11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 安徽快3
     */
    AHK3: { dataGroup: 2059, afterEndGroup: '', name: 'AHK3', type: LotteryType.Frequency, rulePath: K3URL },
    /**
     * 25选5
     */
    AH22X5: { dataGroup: 1027, afterEndGroup: '', name: 'AH22X5', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/ahs22x5` },
    /**
     * 15选5
     */
    AH15X5: { dataGroup: 1026, afterEndGroup: '', name: 'AH15X5', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hdls15x5` },
    /* ----------安徽省结束 ----------------- */


    /* ----------福建省开始 ----------------- */
    /**
     * 福建快3
     */
    FJK3: { dataGroup: 2058, afterEndGroup: '', name: 'FJK3', type: LotteryType.Frequency, rulePath: K3URL },
    /**
     * 36选7
     */
    FJ36X7: { dataGroup: 1011, afterEndGroup: '', name: 'FJ36X7', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/fjs36x7` },
    /**
     * 31选7
     */
    FJ31X7: { dataGroup: 1012, afterEndGroup: '', name: 'FJ31X7', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/fjs31x7` },
    /**
     * 即乐彩
     */
    FJKLC: { dataGroup: 2008, afterEndGroup: '', name: 'FJKLC', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 福建11选5
     */
    FJ11X5: { dataGroup: 2082, afterEndGroup: '', name: 'FJ11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 22选5
     */
    FJ22X5: { dataGroup: 1013, afterEndGroup: '', name: 'FJ22X5', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/fjs22x5` },
    /**
     * 15选5
     */
    FJ15X5: { dataGroup: 1025, afterEndGroup: '', name: 'FJ15X5', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hdls15x5` },
    /* ----------福建省结束 ----------------- */

    /* ----------江西省开始 ----------------- */
    /**
     * 江西快3（快3）
     */
    JXK3: { dataGroup: 2035, afterEndGroup: 67, name: 'JXK3', type: LotteryType.Frequency, rulePath: K3URL },
    /**
     * 时时彩
     */
    JXSSC: { dataGroup: 2087, afterEndGroup: '', name: 'JXSSC', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/jxsssc` },
    /**
     * 江西11选5
     */
    JX11X5: { dataGroup: 2088, afterEndGroup: 75, name: 'JX11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 15选5
     */
    JX15X5: { dataGroup: 1023, afterEndGroup: '', name: 'JX15X5', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hdls15x5` },
    /**
     * 多乐彩（11选5）
     */
    JXDLC: { dataGroup: 2005, afterEndGroup: '', name: 'JXDLC', type: LotteryType.Frequency, rulePath: SYX5URL },
    /* ----------江西省结束 ----------------- */


    /* ----------山东省开始 ----------------- */
    /**
     * 山东11选5（老11选5、十一运夺金）
     */
    SD11X5: { dataGroup: 2001, afterEndGroup: 62, name: 'SD11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 快乐扑克3
     */
    SDKLPK3: { dataGroup: 2031, afterEndGroup: '', name: 'SDKLPK3', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/sdsklpk3` },
    /**
     * 群英会
     */
    SDQYH: { dataGroup: 2057, afterEndGroup: '', name: 'SDQYH', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/sdsqyh` },
    /* ----------山东省结束 ----------------- */


    /* ----------河南省开始 ----------------- */
    /**
     * 河南快3
     */
    HNK3: { dataGroup: 2055, afterEndGroup: '', name: 'HNK3', type: LotteryType.Frequency, rulePath: K3URL },
    /**
     * 幸运彩
     */
    HNXYC: { dataGroup: 2056, afterEndGroup: '', name: 'HNXYC', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 22选5
     */
    HN22X5: { dataGroup: 1022, afterEndGroup: '', name: 'HN22X5', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hns22x5` },
    /**
     * 快赢481
     */
    HNKY481: { dataGroup: 2028, afterEndGroup: '', name: 'HNKY481', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/hnsky481` },
    /**
     * 河南11选5
     */
    HN11X5: { dataGroup: 2075, afterEndGroup: '', name: 'HN11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /* ----------河南省结束 ----------------- */


    /* ----------湖北省开始 ----------------- */
    /**
     * 湖北11选5（好运11选5）
     */
    HB11X5: { dataGroup: 2004, afterEndGroup: 78, name: 'HB11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 湖北快3
     */
    HBK3: { dataGroup: 2047, afterEndGroup: '', name: 'HBK3', type: LotteryType.Frequency, rulePath: K3URL },
    /**
     * 30选5
     */
    HB30X5: { dataGroup: 1017, afterEndGroup: '', name: 'HB30X5', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hbs30x5` },
    /* ----------湖北省结束 ----------------- */

    /* ----------湖南省开始 ----------------- */
    /**
     * 快乐十分
     */
    HNKLSF: { dataGroup: 2083, afterEndGroup: '', name: 'HNKLSF', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/hnsklsf` },
    /**
     * 幸运赛车
     */
    XYSC: { dataGroup: 2030, afterEndGroup: '', name: 'XYSC', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/hnsxysc` },
    /**
     * 动物总动员
     */
    HNDWZDY: { dataGroup: 2046, afterEndGroup: '', name: 'HNDWZDY', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/hnsklsf` },
    /* ----------湖南省结束----------------- */

    /* ----------广东省开始 ----------------- */
    /**
     * 36选7
     */
    GD36X7: { dataGroup: 1019, afterEndGroup: '', name: 'GD36X7', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/gds36x7` },
    /**
     * 26选5
     */
    GD26X5: { dataGroup: 1020, afterEndGroup: '', name: 'GD26X5', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/gds26x5` },
    /**
     * 深圳风彩
     */
    GDSZFC: { dataGroup: 1045, afterEndGroup: '', name: 'GDSZFC', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/szfc` },
    /**
     * 广东11选5（幸运11选5）
     */
    GD11X5: { dataGroup: 2002, afterEndGroup: 72, name: 'GD11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 好彩1
     */
    GDHC1: { dataGroup: 1021, afterEndGroup: '', name: 'GDHC1', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/gdshc1` },
    /**
     * 快乐十分
     */
    GDKLSF: { dataGroup: 2038, afterEndGroup: '', name: 'GDKLSF', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/gdsklsf` },
    /* ----------广东省结束 ----------------- */



    /* ----------广西自治区开始 ----------------- */
    /**
     * 快乐双彩
     */
    GXKLSC: { dataGroup: 1018, afterEndGroup: '', name: 'GXKLSC', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/gxklsc` },
    /**
     * 广西快3（新快3）
     */
    GXK3: { dataGroup: 2036, afterEndGroup: 68, name: 'GXK3', type: LotteryType.Frequency, rulePath: K3URL },
    /**
     * 快乐十分
     */
    GXKLSF: { dataGroup: 2037, afterEndGroup: '', name: 'GXKLSF', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/gxklsf` },
    /**
     * 广西11选5
     */
    GX11X5: { dataGroup: 2006, afterEndGroup: '', name: 'GX11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /* ----------广西自治区结束 ----------------- */



    /* ----------海南省开始 ----------------- */
    /**
     * 飞鱼
     */
    HNFY: { dataGroup: 2032, afterEndGroup: '', name: 'HNFY', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/hnsfy` },
    /**
     * 4+1
     */
    HN4J1: { dataGroup: 1007, afterEndGroup: '', name: 'HN4J1', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/hnssjy` },
    /**
     * 环岛赛
     */
    HNHDS: { dataGroup: 2019, afterEndGroup: '', name: 'HNHDS', type: LotteryType.Frequency, rulePath: `` },
    /**
     * 快3.快乐三宝
     */
    HNSK3: { dataGroup: 2054, afterEndGroup: '', name: 'HNSK3', type: LotteryType.Frequency, rulePath: K3URL },
    /* ----------海南省结束 ----------------- */


    /* ----------重庆市开始 ----------------- */
    /**
     * 快乐扑克
     */
    CQKLPK: { dataGroup: 2026, afterEndGroup: 81, name: 'CQKLPK', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/cqsklpk` },
    /**
     * 重庆快乐十分
     */
    CQKLSF: { dataGroup: 2084, afterEndGroup: '', name: 'CQKLSF', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/xync` },
    /**
     * 幸运农场
     */
    CQKXYNC: { dataGroup: 2042, afterEndGroup: '', name: 'CQKXYNC', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/xync` },
    /**
     * 时时彩
     */
    CQSSC: { dataGroup: 2041, afterEndGroup: 28, name: 'CQSSC', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/cqsssc` },
    /**
     * 百变王牌
     */
    CQBBWP: { dataGroup: 2085, afterEndGroup: '', name: 'CQBBWP', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/cqsklpk` },
    /* ----------重庆市结束 ----------------- */

    /* ----------四川省开始 ----------------- */
    /**
     * 金7乐
     */
    SCJ7L: { dataGroup: 2034, afterEndGroup: '', name: 'SCJ7L', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/scj7l` },
    /**
     * 11选5
     */
    SC11X5: { dataGroup: 2077, afterEndGroup: '', name: 'SC11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 快乐12
     */
    SCKL12: { dataGroup: 2053, afterEndGroup: '', name: 'SCKL12', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/sckl12` },
    /**
     * 扑克彩
     */
    SCPKC: { dataGroup: 2078, afterEndGroup: '', name: 'SCPKC', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/scpkc` },
    /* ----------四川省结束 ----------------- */



    /* ----------贵州省开始 ----------------- */
    /**
     * 贵州11选5
     */
    GZ11X5: { dataGroup: 2015, afterEndGroup: '', name: 'GZ11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 贵州快3
     */
    GZK3: { dataGroup: 2043, afterEndGroup: '', name: 'GZK3', type: LotteryType.Frequency, rulePath: K3URL },
    /* ----------贵州省结束 ----------------- */


    /* ----------云南省开始 ----------------- */
    /**
     * 时时彩
     */
    YNSSC: { dataGroup: 2051, afterEndGroup: '', name: 'YNSSC', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/ynssc` },
    /**
     * 快乐十分
     */
    YNKLSF: { dataGroup: 2052, afterEndGroup: '', name: 'YNKLSF', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/ynklsf` },
    /**
     * 云南11选5
     */
    YN11X5: { dataGroup: 2017, afterEndGroup: '', name: 'YN11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /* ----------云南省结束 ----------------- */


    /* ----------陕西省开始 ----------------- */
    /**
     * 陕西11选5
     */
    SXS11X5: { dataGroup: 2016, afterEndGroup: '', name: 'SXS11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 陕西 快乐十分
     */
    SXSKLSF: { dataGroup: 2079, afterEndGroup: '', name: 'SXSKLSF', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/sxklsf` },



    /* ----------甘肃省开始 ----------------- */
    /**
     * 甘肃快3
     */
    GSK3: { dataGroup: 2050, afterEndGroup: '', name: 'GSK3', type: LotteryType.Frequency, rulePath: K3URL },
    /**
     * 甘肃11选5
     */
    GS11X5: { dataGroup: 2014, afterEndGroup: '', name: 'GS11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /* ----------甘肃省开始 ----------------- */

    /* ----------青海省开始 ----------------- */
    /**
     * 青海快3
     */
    QHK3: { dataGroup: 2049, afterEndGroup: '', name: 'QHK3', type: LotteryType.Frequency, rulePath: K3URL },
    /**
     * 青海11选5
     */
    QH11X5: { dataGroup: 2018, afterEndGroup: '', name: 'QH11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /* ----------青海省结束 ----------------- */


    /* ----------宁夏自治区开始 ----------------- */
    /**
     * 宁夏快3
     */
    NXK3: { dataGroup: 2048, afterEndGroup: '', name: 'NXK3', type: LotteryType.Frequency, rulePath: K3URL },
    /**
     * 宁夏11选5
     */
    NX11X5: { dataGroup: 2024, afterEndGroup: '', name: 'NX11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /* ----------宁夏自治区结束 ----------------- */


    /* ----------新疆自治区开始 ----------------- */
    /**
     * 新疆11选5（欢乐11选5）
     */
    XJ11X5: { dataGroup: 2003, afterEndGroup: 74, name: 'XJ11X5', type: LotteryType.Frequency, rulePath: SYX5URL },
    /**
     * 25选7
     */
    XJ25X7: { dataGroup: 1015, afterEndGroup: '', name: 'XJ25X7', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/xj25x7` },
    /**
     * 18选7
     */
    XJ18X7: { dataGroup: 1016, afterEndGroup: '', name: 'XJ18X7', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/xj18x7` },
    /**
     * 时时彩
     */
    XJSSC: { dataGroup: 2044, afterEndGroup: '', name: 'XJSSC', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/xjssc` },
    /**
     * 喜乐彩
     */
    XJXLC: { dataGroup: 2045, afterEndGroup: '', name: 'XJXLC', type: LotteryType.Frequency, rulePath: `${h5Url}/communal/help/rules/xjxlc` },
    /**
     * 35选7
     */
    XJ35X7: { dataGroup: 1014, afterEndGroup: '', name: 'XJ35X7', type: LotteryType.Digit, rulePath: `${h5Url}/communal/help/rules/xj35x7` },
    /* ----------新疆自治区结束 ----------------- */
};

/**
 * 根据类型、彩种id 找到对应的彩种信息
 * @param type [dataGroup、afterEndGroup]
 * @param id
 * @returns {*|string}
 */
export function findById(type, id) {
    let res = {};
    Object.values(map).forEach(m => {
        if (m[type] == id) {
            res = m;
        }
    });
    return res;
    // return Object.values(map).find(m => m[type] == id) || {};
}
