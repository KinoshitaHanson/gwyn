import { _WhilstLottery } from './WhilstLottery';

/**
 * 复选
 *
 * @class Repetition
 * @extends {_WhilstLottery}
 */
export class Repetition extends _WhilstLottery {
    TypeName = '复选';

    constructor(type) {
        super(type);
        this.Plate = this.Init();
    }

    /**
     * 机选一注
     *
     * @returns
     * @memberof Repetition
     */
    Random() {
        throw Error('复式玩法不支持机选');
    }

    /**
     * 计算注数
     *
     * @returns {number} 注数
     * @memberof Repetition
     */
    JettonCalc() {
        if (this.Selected.fifth.length == 1 && this.Selected.fourth.length == 1 && this.Selected.third.length == 0 && this.Selected.second.length == 0 && this.Selected.first.length == 0) return 2;
        if (this.Selected.fifth.length == 1 && this.Selected.fourth.length == 1 && this.Selected.third.length == 1 && this.Selected.second.length == 0 && this.Selected.first.length == 0) return 3;
        if (this.Selected.fifth.length == 1 && this.Selected.fourth.length == 1 && this.Selected.third.length == 1 && this.Selected.second.length == 1 && this.Selected.first.length == 0) return 4;
        if (this.Selected.fifth.length == 1 && this.Selected.fourth.length == 1 && this.Selected.third.length == 1 && this.Selected.second.length == 1 && this.Selected.first.length == 1) return 5;
        return 0;
        // let vs = Object.values(this.Selected).filter(m => m.length > 0);
        // return vs.length;
    }

    /**
     * 最高奖金计算
     *
     * @memberof Repetition
     */
    AwardCalc() {
        let jetton = this.JettonCalc(this.Selected);
        return jetton > 0 ? 98 * Math.pow(10, jetton - 2) : 0;
    }

    /**
     * 补全一注
     *
     * @memberof Repetition
     */
    CompleteBall() {
        throw Error('复式玩法不支持补全');
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
     * @memberof Repetition
     */
    GetOrderString(selected) {
        return super.GetOrderString(selected);
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof Repetition
     */
    Select(item, type) {
        // console.log(item);
        let clickIndex = this.Selected[type].findIndex(m => m == item);
        if (clickIndex > -1) {
            this.Selected[type].splice(clickIndex, 1);
        } else {
            this.Selected[type] = [].concat(item);
        }
    }

    HighLightBetNumber(selected, result) {
        const hightColor = '#e23a3a',
            reResult = [...result].reverse(),
            selectedArr = selected.split('').reverse();


        return selectedArr.map((a, i) => ({
            value: a,
            color: reResult[i] == a ? hightColor : ''
        })).reverse();
    }
}
