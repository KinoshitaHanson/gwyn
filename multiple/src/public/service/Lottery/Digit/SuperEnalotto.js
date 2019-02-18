import { Digit } from './Digit';

/**
 *  大乐透
 *
 * @export
 * @class SuperEnalotto
 * @extends {Digit}
 */
export class SuperEnalotto extends Digit {
    /**
     * 红球总数
     *
     * @memberof SuperEnalotto
     */
    RED_COUNT = 35;

    /**
     * 蓝球总数
     *
     * @memberof SuperEnalotto
     */
    BLUE_COUNT = 12;

    constructor() {
        super();
    }

    static PlayTypeEnum = {
        /**
         * 单式
         */
        Single: 3901,
        /**
         * 复式
         */
        Compound: 3902,
        /**
         * 单式追加
         */
        Single_Additon: 3903,
        /**
         * 复式追加
         */
        Compound_Additon: 3904,
        /**
         * 胆拖
         */
        DanTuo: 3907,
        /**
         * 胆拖追加
         */
        DanTuo_Additon: 3908,
    };

    /**
     * 初始化大乐透球盘
     * 生成35个红球，12个蓝球
     * @param {Object} option -配置项
     * @param {Object[]} option.leaveout -遗漏
     * @param {Number} option.leaveout[].num -遗漏数值
     * @param {Number} option.leaveout[].count -遗漏期次
     * @returns
     * @memberof SuperEnalotto
     */
    Init(option = {}) {
        let red = super.GenerateNumber(1, this.RED_COUNT, { zeroize: true }).map(m => {
            return { num: m };
        });
        let blue = super.GenerateNumber(1, this.BLUE_COUNT, { zeroize: true }).map(m => {
            return { num: m };
        });
        if (option.leaveout) {
            if (option.leaveout.Front) {
                addLeaveout(red, 'Front');
            }
            if (option.leaveout.Back) {
                addLeaveout(blue, 'Back');
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
            red,
            blue
        };
    }

    /**
     * 机选
     *
     * @returns
     * @memberof SuperEnalotto
     */
    Random() {
        let red = super.Random([1, this.RED_COUNT], 5, { zeroize: true });
        let blue = super.Random([1, this.BLUE_COUNT], 2, { zeroize: true });
        return {
            red,
            blue
        };
    }

    /**
     * 大乐透补全
     * 不足的补全，足够的保持不变
     * @param {String[]} red   -已选红球
     * @param {String[]} blue  -已选蓝球
     * @memberof SuperEnalotto
     */
    CompleteBall(red, blue) {
        let completeRed =
            red.length > 4 ? red : red.concat(super.Random([1, this.RED_COUNT], 5 - red.length, { except: red, zeroize: true }));
        let completeBlue =
            blue.length > 2 ? blue : blue.concat(super.Random([1, this.BLUE_COUNT], 2 - blue.length, { except: blue, zeroize: true }));
        return {
            red: completeRed,
            blue: completeBlue
        };
    }

    /**
     * 计算注数
     *
     * @param {Number} red  -红球数
     * @param {Number} blue -蓝球数
     * @returns
     * @memberof SuperEnalotto
     */
    JettonCalc(red, blue) {
        return super.Factorial(red, red - 4) / super.Factorial(5, 1) * (super.Factorial(blue, blue - 1) / super.Factorial(2, 1));
    }

    /**
     * 大乐透胆拖注数计算
     * @param nl_f_dm 红球胆码个数
     * @param nl_b_dm 蓝球胆码个数
     * @param nl_f_tm 红球拖码个数
     * @param nl_b_tm 蓝球拖码个数
     * @returns {number}
     */
    calDanTuoZhuShu(nl_f_dm, nl_b_dm = 0, nl_f_tm, nl_b_tm) {
        let zhushu = 0;
        if (nl_f_dm >= 1 && nl_f_tm >= 2 && nl_b_tm >= 2 && (nl_f_dm + nl_f_tm) >= 6 && (nl_b_dm + nl_b_tm) >= 2) {
            zhushu = (super.Factorial(nl_f_tm, nl_f_tm + nl_f_dm - 4) / super.Factorial(5 - nl_f_dm, 1)) * (super.Factorial(nl_b_tm, nl_b_tm + nl_b_dm - 1) / super.Factorial(2 - nl_b_dm, 1));
        }
        return zhushu;
    }

    /**
     * 获取玩法(单式、复式)
     *
     * @param {Number} red
     * @param {Number} blue
     * @param {Boolean} addition 是否追加
     * @memberof SuperEnalotto
     */
    // GetPlayType(red, blue, addition = false) {
    //     return red.length + blue.length > 7 ? [addition ? 3904 : 3902, "复式"] : [addition ? 3903 : 3901, "单式"];
    // }

    GetPlayType(selected, addition) {
        let { red, blue, redBile, blueBile } = selected,
            PlayTypeEnum = SuperEnalotto.PlayTypeEnum;
        if ((redBile && redBile.length !== 0) || (blueBile && blueBile.length !== 0)) {
            return [addition ? PlayTypeEnum.DanTuo_Additon : PlayTypeEnum.DanTuo, '胆拖'];
        }
        return red.length + blue.length > 7 ? [addition ? PlayTypeEnum.Compound_Additon : PlayTypeEnum.Compound, '复式'] : [addition ? PlayTypeEnum.Single_Additon : PlayTypeEnum.Single, '单式'];
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
     * @memberof SuperEnalotto
     */
    GetOrderString(list, isAddition = false) {
        function bileJoin(arr = []) {
            return (arr && arr.length != 0) ? `${arr.join(' ')} , ` : '';
        }
        return list.map(m => {
            let { red, blue, redBile, blueBile } = m.selected;
            return {
                number: `${bileJoin(redBile)}${red.join(' ')} + ${bileJoin(blueBile)}${blue.join(' ')}`,
                playid: this.GetPlayType(m.selected, isAddition)[0]
            };
        });
    }

    /**
     * 高亮中奖号码
     *
     * @param {String} selected
     * @param {object} result
     * @param {string[]} result.red
     * @param {string[]} result.blue
     * @returns {object[]} res
     * @memberof SuperEnalotto
     */
    HighLightBetNumber(selected, result) {
        const hightColor = '#e23a3a';
        const hightColorBlue = '#547bca';

        function format(arr, resultArr, isBlue = false) {
            let res = arr.map(m => {
                return {
                    color: resultArr.includes(m) ? (isBlue ? hightColorBlue : hightColor) : '',
                    value: m
                };
            });

            let index = res.findIndex((item) => item.value === ',');
            if (index != -1) {
                res.unshift({
                    color: '',
                    value: '('
                });
                res[index + 1].value = ')';
            }
            return res;
        }

        let red = selected.split(' + ')[0].split(' ');
        let blue = selected.split(' + ')[1].split(' ');

        let redRes = format(red, result.red),
            blueRes = format(blue, result.blue, true);

        return redRes.concat({
            color: '',
            value: '+'
        }, blueRes);
    }
}
