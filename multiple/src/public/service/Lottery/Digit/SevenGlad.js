import { Digit } from './Digit';

/**
 * 七乐彩
 *
 * @export
 * @class SevenGlad
 * @extends {Digit}
 */
export class SevenGlad extends Digit {

    /**
     * 玩法
     *
     * @memberof SevenGlad
     */
    Type = null;

    /**
     * 已选
     *
     * @memberof _HappyTen
     */
    Selected = {
        first: [],
    };

    /**
     * 球盘-供选项
     *
     * @memberof _HappyTen
     */
    Plate = {
        first: [],
    };

    /**
     * Creates an instance of SevenGlad.
     * @memberof SevenGlad
     */
    constructor() {
        super();
    }

    /**
     * 初始化球盘
     * 生成30个球
     * @param {Object} option -配置项
     * @returns
     * @memberof SevenGlad
     */
    Init(option = {}) {
        let first = super.GenerateNumber(1, 30, { zeroize: true }).map(m => {
            return {
                num: m
            };
        });

        if (option.leaveout) {
            if (option.leaveout.first) {
                addLeaveout(first, 'first');
            }
        }

        function addLeaveout(arr, type) {
            let leaveout;
            arr.forEach((item, index) => {
                leaveout = option.leaveout[type].find(m => m.num == item.num);
                item.leaveout = leaveout ? leaveout.count : '';
            });
        }

        this.Plate.first = first;

        return this.Plate;
    }

    /**
     * 机选
     *
     * @returns
     * @memberof SevenGlad
     */
    Random() {
        this.Selected = {
            first: super.Random([1, 30], 7, { zeroize: true }).sort((a, b) => a - b)
        };
        return this.Selected;
    }

    /**
     * 选号
     *
     * @param {string} item
     * @returns {string}
     * @memberof SevenGlad
     */
    Select(item) {
        let clickIndex = this.Selected.first.findIndex(m => m == item);
        if (clickIndex > -1) {
            this.Selected.first.splice(clickIndex, 1);
        } else {
            this.Selected.first.push(item);
        }
        this.Selected.first.sort((a, b) => a - b);
    }

    /**
     * 清空选号
     *
     * @memberof SevenGlad
     */
    Clear() {
        this.Selected = {
            first: [],
        };
    }

    /**
     * 补全选号
     * 不足的补全，足够的保持不变
     * @memberof SevenGlad
     */
    CompleteBall() {
        if (this.Selected.first.length < 7) {
            this.Selected.first = this.Selected.first.concat(
                super.Random([1, 30], 7 - this.Selected.first.length, { zeroize: true, except: this.Selected.first })
            ).sort((a, b) => a - b);
        }
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @param {Number} red  -红球数
     * @param {Number} blue -蓝球数
     * @returns
     * @memberof SevenGlad
     */
    JettonCalc() {
        return this.Selected.first.length < 7 ? 0 : super.Combination(this.Selected.first.length, 7);
    }

    /**
     * 获取玩法(单式、复式)
     *
     * @memberof SevenGlad
     */
    GetPlayType() {
        return this.Selected.first.length == 7 ? 1301 : 1302;
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
     * @memberof SevenGlad
     */
    GetOrderString() {
        return {
            number: this.Selected.first.join(' '),
            playid: this.GetPlayType(),
        };
    }

    /**
     * 高亮中奖号码
     *
     * @param {String} selected
     * @param {object} result
     * @param {string[]} result.red
     * @param {string[]} result.blue
     * @returns {object[]} res
     * @memberof SevenGlad
     */
    HighLightBetNumber(_selected, result) {
        const hightColor = '#e23a3a';
        const hightColorBlue = '#547bca';
        let selected = _selected.split(' ');

        return selected.map(m => {
            return {
                color: result.red.includes(m) ? hightColor : result.blue.includes(m) ? hightColorBlue : '',
                value: m
            };
        });
    }

    /**
     * 获取玩法(单式、复式)
     *
     * @memberof SevenGlad
     */
    static GetPlayType(selected) {
        return selected.first.length == 7 ? 1301 : 1302;
    }

    /**
     * 获取下单字符串
     *
     * @param {Object[]} list
     * @param {Object} list[].selected
     * @param {String[]} list[].selected.first
     * @returns
     * @memberof SevenGlad
     */
    static GetOrderString(list) {
        return list.map(m => {
            return {
                number: m.selected.first.join(' '),
                playid: SevenGlad.GetPlayType(m.selected)
            };
        });
    }

}
