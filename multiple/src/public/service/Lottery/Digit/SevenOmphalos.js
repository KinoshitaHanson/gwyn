import { Digit } from './Digit';

/**
 * 七星彩
 *
 * @export
 * @class SevenOmphalos
 * @extends {Digit}
 */
export class SevenOmphalos extends Digit {

    /**
     * 玩法
     *
     * @memberof SevenOmphalos
     */
    Type = null;

    /**
     * 已选
     *
     * @memberof _HappyTen
     */
    Selected = {
        first: [],
        second: [],
        third: [],
        fourth: [],
        fifth: [],
        sixth: [],
        seventh: []
    };

    /**
     * 球盘-供选项
     *
     * @memberof _HappyTen
     */
    Plate = {
        first: [],
        second: [],
        third: [],
        fourth: [],
        fifth: [],
        sixth: [],
        seventh: []
    };

    /**
     * Creates an instance of SevenOmphalos.
     * @memberof SevenOmphalos
     */
    constructor() {
        super();
    }

    /**
     * 初始化球盘
     * 生成30个球
     * @param {Object} option -配置项
     * @returns
     * @memberof SevenOmphalos
     */
    Init(option = {}) {
        let first = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
            return {
                num: m
            };
        });
        let second = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
            return {
                num: m
            };
        });
        let third = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
            return {
                num: m
            };
        });
        let fourth = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
            return {
                num: m
            };
        });
        let fifth = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
            return {
                num: m
            };
        });
        let sixth = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
            return {
                num: m
            };
        });
        let seventh = super.GenerateNumber(0, 9, { zeroize: false }).map(m => {
            return {
                num: m
            };
        });

        if (option.leaveout) {
            if (option.leaveout.first) {
                addLeaveout(first, 'first');
            }
        }
        if (option.leaveout) {
            if (option.leaveout.second) {
                addLeaveout(second, 'second');
            }
        }
        if (option.leaveout) {
            if (option.leaveout.third) {
                addLeaveout(third, 'third');
            }
        }
        if (option.leaveout) {
            if (option.leaveout.fourth) {
                addLeaveout(fourth, 'fourth');
            }
        }
        if (option.leaveout) {
            if (option.leaveout.fifth) {
                addLeaveout(fifth, 'fifth');
            }
        }
        if (option.leaveout) {
            if (option.leaveout.sixth) {
                addLeaveout(sixth, 'sixth');
            }
        }
        if (option.leaveout) {
            if (option.leaveout.seventh) {
                addLeaveout(seventh, 'seventh');
            }
        }

        function addLeaveout(arr, type) {
            let leaveout;
            arr.forEach((item, index) => {
                leaveout = option.leaveout[type].find(m => m.num == item.num);
                item.leaveout = leaveout ? leaveout.count : '';
            });
        }

        this.Plate = {
            first,
            second,
            third,
            fourth,
            fifth,
            sixth,
            seventh
        };

        return this.Plate;
    }

    /**
     * 机选
     *
     * @returns
     * @memberof SevenOmphalos
     */
    Random() {
        this.Selected = {
            first: super.Random([0, 9], 1, { zeroize: false }),
            second: super.Random([0, 9], 1, { zeroize: false }),
            third: super.Random([0, 9], 1, { zeroize: false }),
            fourth: super.Random([0, 9], 1, { zeroize: false }),
            fifth: super.Random([0, 9], 1, { zeroize: false }),
            sixth: super.Random([0, 9], 1, { zeroize: false }),
            seventh: super.Random([0, 9], 1, { zeroize: false }),
        };
        return this.Selected;
    }

    /**
     * 选号
     *
     * @param {string} item
     * @returns {string}
     * @memberof SevenOmphalos
     */
    Select(item, type) {
        let clickIndex = this.Selected[type].findIndex(m => m == item);
        if (clickIndex > -1) {
            this.Selected[type].splice(clickIndex, 1);
        } else {
            this.Selected[type].push(item);
        }
        this.Selected[type].sort((a, b) => a - b);
    }

    /**
     * 清空选号
     *
     * @memberof SevenOmphalos
     */
    Clear() {
        this.Selected = {
            first: [],
            second: [],
            third: [],
            fourth: [],
            fifth: [],
            sixth: [],
            seventh: [],
        };
    }

    /**
     * 补全选号
     * 不足的补全，足够的保持不变
     * @memberof SevenOmphalos
     */
    CompleteBall() {
        if (this.Selected.first.length < 1) {
            this.Selected.first = super.Random([0, 9], 1);
        }
        if (this.Selected.second.length < 1) {
            this.Selected.second = super.Random([0, 9], 1);
        }
        if (this.Selected.third.length < 1) {
            this.Selected.third = super.Random([0, 9], 1);
        }
        if (this.Selected.fourth.length < 1) {
            this.Selected.fourth = super.Random([0, 9], 1);
        }
        if (this.Selected.fifth.length < 1) {
            this.Selected.fifth = super.Random([0, 9], 1);
        }
        if (this.Selected.sixth.length < 1) {
            this.Selected.sixth = super.Random([0, 9], 1);
        }
        if (this.Selected.seventh.length < 1) {
            this.Selected.seventh = super.Random([0, 9], 1);
        }
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @returns
     * @memberof SevenOmphalos
     */
    JettonCalc() {
        return this.Selected.first.length * this.Selected.second.length * this.Selected.third.length * this.Selected.fourth.length * this.Selected.fifth.length * this.Selected.sixth.length * this.Selected.seventh.length;
    }

    /**
     * 获取玩法(单式301、复式302)
     *
     * @memberof SevenOmphalos
     */
    GetPlayType() {
        return this.Selected.first.length > 1
            || this.Selected.second.length > 1
            || this.Selected.third.length > 1
            || this.Selected.fourth.length > 1
            || this.Selected.fifth.length > 1
            || this.Selected.sixth.length > 1
            || this.Selected.seventh.length > 1 ? 302 : 301;
    }

    /**
     * 获取下单字符串
     *
     * @param {Object[]} list
     * @param {Object} list[].selected
     * @param {String[]} list[].selected.red
     * @param {String[]} list[].selected.blue
     * @param {boolean} [isAddition=false]
     * @returns
     * @memberof SevenOmphalos
     */
    GetOrderString() {
        const format = type => (this.Selected[type].length > 1 ? ('(' + this.Selected[type].join('') + ')') : this.Selected[type].join(''));

        return {
            number: format('first') + format('second') + format('third') + format('fourth') + format('fifth') + format('sixth') + format('seventh'),
            playid: this.GetPlayType(),
        };
    }

    /**
     * 高亮中奖号码
     *
     * @param {String} selected
     * @param {object} result
     * @returns {object[]} res
     * @memberof SevenOmphalos
     */
    HighLightBetNumber(selected, result) {
        const hightColor = '#e23a3a';
        let res = [];
        let index = 0;
        if (selected.indexOf('(') > -1) { // 复式
            let tmp = selected.split('');
            tmp.forEach(m => {
                if (m == '(' || m == ')') {
                    res.push({
                        color: '',
                        value: m
                    });
                } else {
                    res.push({
                        color: m == result[index] ? hightColor : '',
                        value: m
                    });
                }
                if (m == ')') {
                    index++;
                }
            });
        } else {
            let tmp = selected.split('');
            tmp.forEach((m, i) => {
                res.push({
                    color: m == result[i] ? hightColor : '',
                    value: m
                });
            });
        }

        return res;
    }

    /**
     * 获取玩法(单式、复式)
     *
     * @memberof SevenOmphalos
     */
    static GetPlayType(selected) {
        return selected.first.length > 1
            || selected.second.length > 1
            || selected.third.length > 1
            || selected.fourth.length > 1
            || selected.fifth.length > 1
            || selected.sixth.length > 1
            || selected.seventh.length > 1 ? 302 : 301;
    }

    /**
     * 获取下单字符串
     *
     * @param {Object[]} list
     * @param {Object} list[].selected
     * @param {String[]} list[].selected.first
     * @returns
     * @memberof SevenOmphalos
     */
    static GetOrderString(list) {
        function format(data) {
            return data.length > 1 ? ('(' + data.join('') + ')') : data.join('');
        }

        return list.map(m => {
            return {
                number: format(m.selected.first) + format(m.selected.second) + format(m.selected.third) + format(m.selected.fourth) + format(m.selected.fifth) + format(m.selected.sixth) + format(m.selected.seventh),
                playid: SevenOmphalos.GetPlayType(m.selected)
            };
        });
    }

}
