import { Digit } from '../Digit';

/**
 * 时时彩
 *
 * @export
 * @class WhilstLottery
 * @extends {Digit}
 */
export class _WhilstLottery extends Digit {
    /**
     * 时时彩玩法
     *
     * @memberof _WhilstLottery
     */
    Type = null;

    /**
     * 复式玩法
     *
     * @memberof OneNumber
     */
    TypeCompound = null;

    /**
     * 已选
     *
     * @memberof _WhilstLottery
     */
    Selected = {
        first: [], // 万
        second: [], // 千
        third: [], // 百
        fourth: [], // 十
        fifth: [] // 个
    };

    /**
     * 球盘-供选项
     *
     * @memberof _WhilstLottery
     */
    Plate = {
        first: [], // 万
        second: [], // 千
        third: [], // 百
        fourth: [], // 十
        fifth: [] // 个
    };

    /**
     * Creates an instance of _WhilstLottery.
     * @param {any} type
     * @param {any} type_compound
     * @memberof _WhilstLottery
     */
    constructor(type, type_compound = null) {
        super();
        this.Type = type;
        this.TypeCompound = type_compound;
    }

    /**
     * 初始化球盘
     * @param {Object} option -配置项
     * @param {Object[]} option.leaveout -遗漏
     * @param {Number} option.leaveout[].num -遗漏数值
     * @param {Number} option.leaveout[].count -遗漏期次
     * @returns {object[]}
     * @memberof _WhilstLottery
     */
    Init(option = {}) {
        let first = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
            return { num: m };
        });
        let second = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
            return { num: m };
        });
        let third = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
            return { num: m };
        });
        let fourth = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
            return { num: m };
        });
        let fifth = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
            return { num: m };
        });

        if (option.leaveout) {
            if (option.leaveout.first) {
                addLeaveout(first, 'first');
            }
            if (option.leaveout.second) {
                addLeaveout(second, 'second');
            }
            if (option.leaveout.third) {
                addLeaveout(third, 'third');
            }
            if (option.leaveout.fourth) {
                addLeaveout(fourth, 'fourth');
            }
            if (option.leaveout.fifth) {
                addLeaveout(fifth, 'fifth');
            }
        }

        function addLeaveout(arr, type) {
            let leaveout;
            arr.forEach((item, index) => {
                leaveout = option.leaveout[type].find(m => m.num == item.num);
                item.leaveout = leaveout ? leaveout.count : '';
            });
        }

        return {
            first, // 万
            second, // 千
            third, // 百
            fourth, // 十
            fifth // 个
        };
    }

    /**
     * 获取下单字符串
     *
     * @param {Object[]} selected
     * @param {object} selected[].selected
     * @param {string} selected[].selected.first
     * @param {string} selected[].selected.second
     * @param {string} selected[].selected.third
     * @param {string} selected[].selected.fourth
     * @param {string} selected[].selected.fifth
     * @param {PlayTypeEnum} selected[].playType
     * @param {string} join
     * @param {string} join2
     * @returns
     * @memberof _WhilstLottery
     */
    GetOrderString(selected, join = '', join2 = '') {
        return selected.map(m => {
            return {
                number: Object.values(m.selected)
                    .filter(s => s.length > 0)
                    .map(s => s.join(join))
                    .join(join2),
                playid: m.playType
            };
        });
    }

    /**
     * 选择
     *
     * @param {object} item
     * @param {string} item.num
     * @param {string} type selected字段属性
     * @memberof _WhilstLottery
     */
    Select(item, type) {
        let clickIndex = this.Selected[type].findIndex(m => m == item);
        if (clickIndex > -1) {
            this.Selected[type].splice(clickIndex, 1);
        } else {
            this.Selected[type].push(item);
        }
    }

    Clear() {
        this.Selected = {
            first: [], // 万
            second: [], // 千
            third: [], // 百
            fourth: [], // 十
            fifth: [] // 个
        };
    }

    _HighLightBetNumberByType(type, [selected, result, num]) {
        // 把个位放到 result[0]，方便后面 与selected进行对比，标红
        const hightColor = '#e23a3a',
            splitString = ',';


        switch (Number(type)) {
            case 1:
            {
                // 一二三四五星直选
                // 单式格式 12312，复式格式 33,312,312,312
                // 举例： 个位 ，转换成 单式[[1]], 复式[[3],[3]]
                // 最后concat拼接成[{value:'',color:''}]格式
                // 复式 需要在个位,十位 中间 加入 {value:',',color:''}
                let reResult = [...result].reverse(),
                    splitBy = selected.indexOf(splitString) != -1 ? splitString : '', // 判断式单式还是复式
                    arr = selected.split(splitBy).reverse();
                    // 反转成从个位开始的数组
                let newArr = arr.map((a, i) =>
                    a.split('').map(b => ({
                        value: b,
                        color: b == reResult[i] ? hightColor : ''
                    }))
                );
                return newArr.reduce((a, b) => {
                    let r;
                    if (splitBy) {
                        r = a.concat([{ value: splitString, color: '' }]);
                    } else {
                        r = a;
                    }
                    return r.concat(b);
                }).reverse(); // 再次反转数组，把个位放到最后
            }
            case 2: // 任选一二三
            {
                let arr = selected.split('');

                return arr.map((a, i) => ({
                    value: a,
                    color: result[i] == a ? hightColor : ''
                }));
            }
            case 3: // 和值
            {
                let reResult = result.slice(-1 * num),
                    sum = reResult.reduce((a, b) => (Number(a)) + (Number(b)), 0);
                return [{
                    value: selected,
                    color: reResult.length == 0 ? '' : selected == sum ? hightColor : ''
                }];
            }
            default:
                break;
        }
    }
}
