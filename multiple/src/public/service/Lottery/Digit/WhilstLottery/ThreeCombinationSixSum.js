import { _WhilstLottery } from './WhilstLottery';

/**
 * 三星组六和值
 *
 * @class ThreeCombinationSixSum
 * @extends {_WhilstLottery}
 */
export class ThreeCombinationSixSum extends _WhilstLottery {
    TypeName = '三星组六和值';

    constructor(type) {
        super(type);
        this.Plate = this.Init();
    }

    /**
     * 初始化球盘
     * @param {Object} option -配置项
     * @param {Object[]} option.leaveout -遗漏
     * @param {Number} option.leaveout[].num -遗漏数值
     * @param {Number} option.leaveout[].count -遗漏期次
     * @returns {object[]}
     * @memberof ThreeCombinationSixSum
     */
    Init(option = {}) {
        let fifth = super.GenerateNumber(3, 24, { zeroize: false }).map(m => {
            return { num: m };
        });

        if (option.leaveout) {
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
            first: [],
            second: [],
            third: [],
            fourth: [],
            fifth
        };
    }

    /**
     * 机选一注
     *
     * @returns
     * @memberof ThreeCombinationSixSum
     */
    Random() {
        this.Selected = {
            first: [],
            second: [],
            third: [],
            fourth: [],
            fifth: super.Random([3, 24], 1)
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof ThreeCombinationSixSum
     */
    JettonCalc() {
        let map = {
            '3': 1,
            '4': 1,
            '5': 2,
            '6': 3,
            '7': 4,
            '8': 5,
            '9': 7,
            '10': 8,
            '11': 9,
            '12': 10,
            '13': 10,
            '14': 10,
            '15': 10,
            '16': 9,
            '17': 8,
            '18': 7,
            '19': 5,
            '20': 4,
            '21': 4,
            '22': 2,
            '23': 1,
            '24': 1
        };
        return this.Selected.fifth.length > 0 ? map[this.Selected.fifth[0]] : 0;
    }

    /**
     * 最高奖金计算
     *
     * @memberof ThreeCombinationSixSum
     */
    AwardCalc() {
        return 160;
    }

    /**
     * 补全一注
     *
     * @memberof ThreeCombinationSixSum
     */
    CompleteBall() {
        if (this.Selected.fifth.length < 1) {
            this.Selected.fifth = super.Random([3, 24], 1);
        }
        return this.Selected;
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
     * @returns
     * @memberof ThreeCombinationSixSum
     */
    GetOrderString(selected) {
        return super.GetOrderString(selected);
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof ThreeCombinationSixSum
     */
    Select(item) {
        let clickIndex = this.Selected.fifth.findIndex(m => m == item);
        if (clickIndex > -1) {
            this.Selected.fifth.splice(clickIndex, 1);
        } else {
            this.Selected.fifth = [].concat(item);
        }
    }


    HighLightBetNumber(selected, result) {
        const hightColor = '#e23a3a';
        let reResult = result.slice(-1 * 3),
            sum = reResult.reduce((a, b) => (Number(a)) + (Number(b)), 0);
        if (reResult[0] != reResult[1] && reResult[0] != reResult[2] && reResult[2] != reResult[1]) {
            return [{
                value: selected,
                color: reResult.length == 0 ? '' : selected == sum ? hightColor : ''
            }];
        } else {
            return [{
                value: selected,
                color: ''
            }];
        }
    }
}
