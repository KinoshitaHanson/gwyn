/**
 * 北京单场
 */

/**
 * playId
 * @type {{RQSPF: number, ZJQ: number, SXDS: number, CBF: number, BQC: number}}
 */
export const BjdcPlayIdEnum = {
    /**
     * 让球胜平负
     */
    RQSPF: 4501,
    /**
     * 总进球
     */
    ZJQ: 4502,
    /**
     * 上下单双
     */
    SXDS: 4503,
    /**
     * 猜比分
     */
    CBF: 4504,
    /**
     * 半全场
     */
    BQC: 4505,
};

/**
 * 北京单场的玩法
 * @type {{}}
 */
export const BjdcNameEnum = {
    [BjdcPlayIdEnum.RQSPF]: '让球胜平负',
    [BjdcPlayIdEnum.ZJQ]: '进球数',
    [BjdcPlayIdEnum.SXDS]: '上下单双',
    [BjdcPlayIdEnum.CBF]: '比分',
    [BjdcPlayIdEnum.BQC]: '半全场'
};

/**
 * 让球胜平负sp转化
 * @param spf
 * @returns {Array}
 */
export function rqspf(_spList) {
    let spList = _spList == '' ? Array(3).fill('-').join('|') : _spList;
    // 北单有的时候赔率是 0 或者是空
    let spfArr = [],
        strArr = ['主胜', '平', '客胜'];
    spList.split('|').forEach((item, i) => {
        spfArr.push({
            str: strArr[i],
            sp: item,
            checked: false,
            status: item != '' ? 1 : 0,
        });
    });
    return spfArr;
}

/**
 * 上下单双sp转化
 * @param spList
 * @returns {Array}
 */
export function sxds(_spList) {
    let spList = _spList == '' ? Array(4).fill('-').join('|') : _spList;
    let spfArr = [],
        strArr = ['上单', '上双', '下单', '下双'];
    spList.split('|').forEach((item, i) => {
        spfArr.push({
            str: strArr[i],
            sp: item,
            checked: false,
            status: item != '' ? 1 : 0,
        });
    });
    return spfArr;
}

/**
 * 总进球sp转换
 * @param spList
 * @returns {Array}
 */
export function zjq(_spList) {
    let spList = _spList == '' ? Array(8).fill('-').join('|') : _spList;
    let arr = [];
    spList.split('|').forEach((item, i) => {
        arr.push({
            str: i == 7 ? '7+' : i,
            sp: item,
            checked: false,
            status: item != '' ? 1 : 0,
        });
    });
    return arr;
}

/**
 * 猜比分sp转换
 * @param spList
 * @returns {{win: Array, draw: Array, loss: Array}}
 */
export function cbf(_spList) { // 猜比分
    let spList = _spList == '' ? Array(25).fill('-').join('|') : _spList;
    let arr = [];
    let strArr = ['1:0', '2:0', '2:1', '3:0', '3:1', '3:2', '4:0', '4:1', '4:2', '胜其他', '0:0', '1:1', '2:2', '3:3', '平其他', '0:1', '0:2', '1:2', '0:3', '1:3', '2:3', '0:4', '1:4', '2:4', '负其他'];
    spList.split('|').forEach((item, i) => {
        arr.push({
            str: strArr[i],
            sp: item,
            checked: false,
            status: item != '' ? 1 : 0,
        });
    });
    return arr;
}

/**
 * 半全场sp转换
 * @param spList
 * @returns {Array}
 */
export function bqc(_spList) { // 半全场
    let spList = _spList == '' ? Array(9).fill('-').join('|') : _spList;
    let arr = [];
    spList.split('|').forEach((item, i) => {
        let str = '';
        switch (i) {
            case 0:
                str = '胜胜';
                break;
            case 1:
                str = '胜平';
                break;
            case 2:
                str = '胜负';
                break;
            case 3:
                str = '平胜';
                break;
            case 4:
                str = '平平';
                break;
            case 5:
                str = '平负';
                break;
            case 6:
                str = '负胜';
                break;
            case 7:
                str = '负平';
                break;
            case 8:
                str = '负负';
                break;
            // break;
        }
        arr.push({
            str: str,
            sp: item,
            checked: false,
            status: item != '' ? 1 : 0,
        });
    });
    return arr;
}

/**
 * 计算注数
 * @param cgArr 格式 [{checked : true,index: 1,label:"单关"},[checked : true index : 2 label : "2串1"]}
 * @param matches
 * @returns {{totalZs: number, zuhe: Array}}
 */
export function calZhuShu(cgArr, matches) {
    let totalZs = 0;// 注数
    let zuhe = [];
    cgArr.forEach((item) => {
        if (item.checked) {
            zuhe = zuhe.concat(choose(matches, item.index));
        }

        function choose(arr, size) {
            let allResult = [];
            (function f(arr, size, result) {
                let arrLen = arr.length;
                if (size > arrLen) {
                    return;
                }
                if (size == arrLen) {
                    allResult.push([].concat(result, arr));
                } else {
                    for (let i = 0; i < arrLen; i++) {
                        let newResult = [].concat(result);
                        newResult.push(arr[i]);
                        if (size == 1) {
                            allResult.push(newResult);
                        } else {
                            let newArr = [].concat(arr);
                            newArr.splice(0, i + 1);
                            f(newArr, size - 1, newResult);
                        }
                    }
                }
            })(arr, size, []);
            return allResult;
        }
    });

    zuhe.forEach((item) => {
        let onceTotal = 0;
        item.forEach((match, index) => {
            if (index === 0) {
                onceTotal = match.matchCheckedLen;// matchCheckedLen:每个比赛 选中的选项的总个数
            } else {
                onceTotal = onceTotal * match.matchCheckedLen;
            }
        });
        totalZs += onceTotal;
    });
    return {
        totalZs: totalZs,
        zuhe: zuhe
    };
}

/**
 * 计算串关列表
 * @param selected
 */
export function calCgArr(matches, playId, isDG) {
    let len = matches.length,
        cgArr = [];
    if (len >= 15) {  // 让球胜平负15串1
        len = 15;
    }

    if (len > 3 && BjdcPlayIdEnum.CBF == playId) {    // 猜比分
        len = 3;
    }
    if (len > 6 && (BjdcPlayIdEnum.BQC == playId || BjdcPlayIdEnum.SXDS == playId || BjdcPlayIdEnum.ZJQ == playId)) { // 半全场、上下单双、总进球
        len = 6;
    }

    if (isDG) {
        cgArr.push({// 插入单关
            index: 1,
            name: '单关',
            checked: false
        });
    }

    for (let i = 2; i <= len; i++) { // 插入几串几
        cgArr.push({
            index: i,
            name: i + '串1',
            checked: false
        });
    }
    return cgArr;
}

/**
 * 几串几投注
 * @param matches
 * @returns {Array}
 */
export function cgTZ(matches, playId) {
    let arr = [],
        cbfstr;
    matches.forEach((match) => {
        if (match.matchCheckedLen > 0) {
            let str = '';
            if (BjdcPlayIdEnum.RQSPF == playId) { // 让球胜平负
                match.RQSPF.spList.forEach((sp, i) => {

                    if (i == 0 && sp.checked) {
                        str += '3';
                    } else if (i == 1 && sp.checked) {
                        if (str.length > 0) {
                            str += '/';
                        }
                        str += '1';
                    } else if (i == 2 && sp.checked) {
                        if (str.length > 0) {
                            str += '/';
                        }
                        str += '0';
                    }
                });
            } else if (BjdcPlayIdEnum.CBF == playId) { // 猜比分
                match.CBF.spList.forEach((sp, i) => {
                    if (sp.checked) {
                        cbfstr = sp.str;
                        if (cbfstr == '胜其他') {
                            cbfstr = '9:0';
                        } else if (cbfstr == '负其他') {
                            cbfstr = '0:9';
                        } else if (cbfstr == '平其他') {
                            cbfstr = '9:9';
                        }
                        if (str.length > 0) {
                            str += ('/' + cbfstr);
                        } else {
                            str += cbfstr;
                        }
                    }
                });
            } else if (BjdcPlayIdEnum.BQC == playId) { // 半全场
                let bqcStr = ['3-3', '3-1', '3-0', '1-3', '1-1', '1-0', '0-3', '0-1', '0-0'];
                match.BQC.spList.forEach((sp, i) => { // 半全场
                    if (sp.checked) {
                        if (str.length > 0) {
                            str += '/' + bqcStr[i];
                        } else {
                            str += bqcStr[i];
                        }
                    }
                });
            } else if (BjdcPlayIdEnum.SXDS == playId) { // 上下单双
                let sxdsStr = ['3', '2', '1', '0'];
                match.SXDS.spList.forEach((sp, i) => { // 半全场
                    if (sp.checked) {
                        if (str.length > 0) {
                            str += '/' + sxdsStr[i];
                        } else {
                            str += sxdsStr[i];
                        }
                    }
                });
            } else if (BjdcPlayIdEnum.ZJQ == playId) { // 总进球
                match.ZJQ.spList.forEach((sp, i) => { // 总进球
                    if (sp.checked) {
                        if (str.length > 0) {
                            str += '/' + (sp.str == '7+' ? 7 : sp.str);
                        } else {
                            str += (sp.str == '7+' ? 7 : sp.str);
                        }
                    }
                });
            }
            arr.push(match.issueNo + '=' + str);
        }
    });
    return arr;
}
