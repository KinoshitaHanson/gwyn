import { Digit } from './Digit';
// 普通方案501 复试502  胆拖503
// 胆拖的格式 \"number\":\"18 19 , 05 11 12 14 13 20 + 05 04\

/**
 * 双色球
 *
 * @export
 * @class DoubleChromosphere
 * @extends {Digit}
 */
export class DoubleChromosphere extends Digit {
    /**
     * 红球总数
     *
     * @memberof DoubleChromosphere
     */
    RED_COUNT = 33;

    /**
     * 蓝球总数
     *
     * @memberof DoubleChromosphere
     */
    BLUE_COUNT = 16;

    constructor() {
        super();
    }

    /**
     * 初始化双色球盘
     * 生成33个红球，16个蓝球
     * @param {Object} option -配置项
     * @param {Object[]} option.leaveout -遗漏
     * @param {Number} option.leaveout[].num -遗漏数值
     * @param {Number} option.leaveout[].count -遗漏期次
     * @returns
     * @memberof DoubleChromosphere
     */
    Init(option = {}) {
        let red = super.GenerateNumber(1, this.RED_COUNT, { zeroize: true }).map(m => {
            return { num: m };
        });
        let blue = super.GenerateNumber(1, this.BLUE_COUNT, { zeroize: true }).map(m => {
            return { num: m };
        });
        if (option.leaveout) {
            if (option.leaveout.Red) {
                addLeaveout(red, 'Red');
            }
            if (option.leaveout.Blue) {
                addLeaveout(blue, 'Blue');
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
     * @memberof DoubleChromosphere
     */
    Random() {
        let red = super.Random([1, this.RED_COUNT], 6, { zeroize: true }).sort((a, b) => a - b);
        let blue = super.Random([1, this.BLUE_COUNT], 1, { zeroize: true });
        return {
            red,
            blue
        };
    }

    /**
     * 双色球补全
     * 不足的补全，足够的保持不变
     * @param {Array} red   -已选红球
     * @param {Array} blue  -已选蓝球
     * @memberof DoubleChromosphere
     */
    CompleteBall(red, blue) {
        let completeRed =
            red.length > 5 ? red : red.concat(super.Random([1, this.RED_COUNT], 6 - red.length, { except: red, zeroize: true }));
        let completeBlue =
            blue.length > 1 ? blue : blue.concat(super.Random([1, this.BLUE_COUNT], 1 - blue.length, { except: blue, zeroize: true }));
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
     * @memberof DoubleChromosphere
     */
    JettonCalc(red, blue) {
        return super.Factorial(red, red - 5) / super.Factorial(6, 1) * blue;
    }

    /**
     * 双色球胆拖注数计算
     * @param nl_dm 胆码
     * @param nl_tm 拖码
     * @param nl_blue 篮球
     * @returns {number}
     */
    calDanTuoZhuShu(nl_dm, nl_tm, nl_blue) {
        let zhushu = 0;
        if (nl_dm > 0 && nl_dm + nl_tm > 6 && nl_blue > 0) {
            zhushu = super.Factorial(nl_tm, nl_tm + nl_dm - 5) / super.Factorial(6 - nl_dm, 1) * nl_blue;
        }
        return zhushu;
    }

    static PlayTypeEnum = {
        /**
         * 单式
         */
        Single: 501,
        /**
         * 复式
         */
        Compound: 502,
        /**
         * 胆拖
         */
        DanTuo: 503,
    };

    /**
     * 获取玩法(单式、复式)
     *
     * @param {String[]} red
     * @param {String[]} blue
     * @param {String[]} redBile
     * @memberof DoubleChromosphere
     */
    GetBetType(red, blue, redBile) {
        let PlayTypeEnum = DoubleChromosphere.PlayTypeEnum;
        if (redBile && redBile.length !== 0) {
            return [PlayTypeEnum.DanTuo, '胆拖'];
        }
        return red.length + blue.length > 7 ? [PlayTypeEnum.Compound, '复式'] : [PlayTypeEnum.Single, '单式'];
    }

    /**
     * 获取下单字符串
     *
     * @param {Object[]} list
     * @param {Object} list[].selected
     * @param {String[]} list[].selected.red
     * @param {String[]} list[].selected.blue
     * @returns
     * @memberof DoubleChromosphere
     */
    GetOrderString(list, isAddition = false) {
        function bileJoin(arr = []) {
            return (arr && arr.length != 0) ? `${arr.join(' ')} , ` : '';
        }
        return list.map(m => {
            let { redBile, red, blue } = m.selected;
            return {
                number: `${bileJoin(redBile)}${red.join(' ')} + ${blue.join(' ')}`,
                playid: this.GetBetType(red, blue, redBile)[0]
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
     * @memberof DoubleChromosphere
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
