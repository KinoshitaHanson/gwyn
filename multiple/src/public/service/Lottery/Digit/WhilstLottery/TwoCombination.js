import { _WhilstLottery } from './WhilstLottery';

/**
 * 二星组选
 *
 * @class TwoCombination
 * @extends {_WhilstLottery}
 */
export class TwoCombination extends _WhilstLottery {
    TypeName = '二星组选';

    constructor(type, type_compound) {
        super(type, type_compound);
        this.Plate = this.Init();
    }

    /**
     * 机选一注
     *
     * @returns
     * @memberof TwoCombination
     */
    Random() {
        this.Selected = {
            first: [],
            second: [],
            third: [],
            fourth: [],
            fifth: super.Random([0, 9], 2)
        };
        return this.Selected;
    }

    /**
     * 计算注数
     *
     * @memberof TwoCombination
     */
    JettonCalc() {
        if (this.Selected.fifth.length < 2) return 0;
        return this.Selected.fifth.length > 2 ? this.Selected.fifth.length * (this.Selected.fifth.length + 1) / 2 : 1;
    }

    /**
     * 最高奖金计算
     *
     * @memberof TwoCombination
     */
    AwardCalc() {
        return 48;
    }

    /**
     * 补全一注
     *
     * @memberof TwoCombination
     */
    CompleteBall() {
        if (this.Selected.fifth.length < 2) {
            this.Selected.fifth = this.Selected.fifth.concat(
                super.Random([0, 9], 2 - this.Selected.fifth.length, { except: this.Selected.fifth })
            );
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
     * @memberof TwoCombination
     */
    GetOrderString(selected) {
        return super.GetOrderString(
            selected.map(m => {
                m.playType = this.JettonCalc(m.selected) > 1 ? this.TypeCompound : this.Type;
                return m;
            })
        );
    }

    /**
     * 选择
     *
     * @param {string} item
     * @returns {string}
     * @memberof TwoCombination
     */
    Select(item) {
        let clickIndex = this.Selected.fifth.findIndex(m => m == item);
        if (clickIndex > -1) {
            this.Selected.fifth.splice(clickIndex, 1);
        } else {
            if (this.Selected.fifth.length >= 6) {
                return '最多选择6个号码!';
            }
            this.Selected.fifth.push(item);
        }
    }

    HighLightBetNumber(selected, result) {
        // 二星组选 单式复式 数字中有  与result的个位 或者十位 相同就标红
        const hightColor = '#e23a3a',
            twoArr = [...result].reverse().slice(0, 2); // 取个位和十位

        let selectedArr = selected.split('');
        return selectedArr.map(a => ({
            value: a,
            color: twoArr.includes(a) ? hightColor : ''
        }));
    }
}
