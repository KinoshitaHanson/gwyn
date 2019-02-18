import { Digit } from './Digit';

/**
 * 福彩3D
 *
 * @export
 * @class WelfareLottery3D
 * @extends {Digit}
 */
export class WelfareLottery3D extends Digit {
    Type = null;

    /**
     * Creates an instance of WelfareLottery3D.
     * @param {WelfareLottery3DTypeEnum} type
     * @memberof WelfareLottery3D
     */
    constructor(type) {
        super();
        this.Type = type;
    }

    /**
     * 初始化球盘
     * 生成个十百位
     * @param {Object} option -配置项
     * @returns
     * @memberof WelfareLottery3D
     */
    Init(option) {
        let ones = super.GenerateNumber(0, 9);
        let tens = super.GenerateNumber(0, 9);
        let hundreds = super.GenerateNumber(0, 9);
        return {
            hundreds,
            tens,
            ones
        };
    }

    /**
     * 补全号码
     * @param selected
     * @returns {*}
     * @constructor
     */
    CompleteBall(selected) {
        let FomulaMap = {
            [WelfareLottery3DTypeEnum.Directly]: () => {
                let hundreds = selected.hundreds,
                    tens = selected.tens,
                    ones = selected.ones;
                if (selected.hundreds.length < 1) {
                    hundreds = super.Random([0, 9], 1);
                }
                if (selected.tens.length < 1) {
                    tens = super.Random([0, 9], 1);
                }
                if (selected.ones.length < 1) {
                    ones = super.Random([0, 9], 1);
                }
                return {
                    hundreds,
                    tens,
                    ones
                };
            },
            [WelfareLottery3DTypeEnum.CombinationThree]: () => {
                let hundreds = selected.hundreds;
                if (selected.hundreds.length < 2) {
                    hundreds = hundreds.concat(super.Random([0, 9], 2 - selected.hundreds.length, {
                        zeroize: false,
                        except: selected.hundreds
                    }));
                }
                return {
                    hundreds,
                    tens: [],
                    ones: []
                };
            },
            [WelfareLottery3DTypeEnum.CombinationSix]: () => {
                let hundreds = selected.hundreds;
                if (selected.hundreds.length < 3) {
                    hundreds = hundreds.concat(super.Random([0, 9], 3 - selected.hundreds.length, {
                        zeroize: false,
                        except: selected.hundreds
                    }));
                }
                return {
                    hundreds,
                    tens: [],
                    ones: []
                };
            }
        };
        return FomulaMap[this.Type]();
    }

    /**
     * 机选
     *
     * @returns
     * @memberof WelfareLottery3D
     */
    Random() {
        let FomulaMap = {
            [WelfareLottery3DTypeEnum.Directly]: () => {
                let hundreds = super.Random([0, 9], 1);
                let tens = super.Random([0, 9], 1);
                let ones = super.Random([0, 9], 1);
                return {
                    hundreds,
                    tens,
                    ones
                };
            },
            [WelfareLottery3DTypeEnum.CombinationThree]: () => {
                let hundreds = super.Random([0, 9], 2);
                return {
                    hundreds,
                    tens: [],
                    ones: []
                };
            },
            [WelfareLottery3DTypeEnum.CombinationSix]: () => {
                let hundreds = super.Random([0, 9], 3);
                return {
                    hundreds,
                    tens: [],
                    ones: []
                };
            }
        };

        return FomulaMap[this.Type]();
    }

    /**
     * 计算注数
     *
     * @param {Object} amount  -数量
     * @param {Number} amount.ones  -个位数量
     * @param {Number} amount.tens  -十位数量
     * @param {Number} amount.hundreds  -百位数量
     * @returns
     * @memberof WelfareLottery3D
     */
    JettonCalc(amount) {
        let FomulaMap = {
            [WelfareLottery3DTypeEnum.Directly]: () => amount.ones * amount.tens * amount.hundreds,
            [WelfareLottery3DTypeEnum.CombinationThree]: () => amount.hundreds * (amount.hundreds - 1),
            [WelfareLottery3DTypeEnum.CombinationSix]: () => amount.hundreds * (amount.hundreds - 1) * (amount.hundreds - 2) / (2 * 3)
        };
        return FomulaMap[this.Type]();
    }

    /**
     * 获取下单字符串
     *
     * @param {Object[]} list
     * @param {Object} list[].selected
     * @param {String[]} list[].selected.hundreds
     * @param {String[]} list[].selected.tens
     * @param {String[]} list[].selected.ones
     * @param {String} list[].playType
     * @returns
     * @memberof WelfareLottery3D
     */
    GetOrderString(list) {
        return list.map(m => {
            let num,
                hundreds,
                tens,
                ones;
            if (m.playType == WelfareLottery3DTypeEnum.Directly || m.playType == WelfareLottery3DTypeEnum.DirectlySingle) {
                hundreds = m.selected.hundreds.length > 1 ? `(${m.selected.hundreds.join('')})` : m.selected.hundreds.join('');
                tens = m.selected.tens.length > 1 ? `(${m.selected.tens.join('')})` : m.selected.tens.join('');
                ones = m.selected.ones.length > 1 ? `(${m.selected.ones.join('')})` : m.selected.ones.join('');

                num = hundreds + tens + ones;
            } else {
                num = m.selected.hundreds.join('');
            }

            return {
                number: num,
                playid: m.playType
            };
        });
    }

    /**
     * 高亮中奖号码
     *
     * @param {string} selected
     * @param {string[]} result
     * @returns {object[]} res
     * @memberof WelfareLottery3D
     */
    HighLightBetNumber(selected, result) {
        const hightColor = '#e23a3a';

        let FomulaMap = {
            [WelfareLottery3DTypeEnum.DirectlySingle]: _item => {
                let item = _item.split('');

                return item.map((m, i) => {
                    return {
                        color: result[i] == m ? hightColor : '',
                        value: m
                    };
                });
            },
            [WelfareLottery3DTypeEnum.Directly]: Directly,
            [WelfareLottery3DTypeEnum.CombinationThree]: _item => {
                let item = _item.split('');
                let distinct = [...new Set(result)];
                // 去重后如果只有2个表示有重号，判断2个号码是否是已购号码（是否中奖） 中奖标红、不中不标
                if (distinct.length == 2 && distinct.every(m => item.includes(m))) {
                    return item.map(m => {
                        return {
                            color: hightColor,
                            value: m
                        };
                    });
                } else {
                    return item.map(m => {
                        return {
                            color: '',
                            value: m
                        };
                    });
                }


            },
            [WelfareLottery3DTypeEnum.CombinationSix]: _item => {
                let item = _item.split('');

                return item.map(m => {
                    return {
                        color: result.includes(m) ? hightColor : '',
                        value: m
                    };
                });
            }
        };

        function Directly(item) {
            let res = [];
            if (result.length > 0) {
                res.push({ color: '', value: '(' });
                let t = item.substring(1, item.length - 1);
                t = t.split(')(');

                for (let index = 0; index < result.length; index++) {

                    res = res.concat(
                        t[index].split('').map(m => {
                            return {
                                color: result[index] == m ? hightColor : '',
                                value: m
                            };
                        })
                    );
                    res.push({ color: '', value: index == result.length - 1 ? ')' : ')(' });
                }
            } else {
                for (let i = 0; i < item.length; i++) {
                    res.push({ color: '', value: item[i] });
                }
            }

            return res;
        }

        return FomulaMap[this.Type](selected);
    }
}

/**
 * 福彩3D玩法枚举
 */
export const WelfareLottery3DTypeEnum = {
    /**
     * 直选单式
     */
    DirectlySingle: 601,
    /**
     * 直选
     */
    Directly: 602,
    /**
     * 组选3
     */
    CombinationThree: 605,
    /**
     * 组选6
     */
    CombinationSix: 604
};

/**
 * 福彩3D玩法名称枚举
 */
export const WelfareLottery3DTypeNameEnum = {
    [WelfareLottery3DTypeEnum.Directly]: '直选',
    [WelfareLottery3DTypeEnum.DirectlySingle]: '直选',
    [WelfareLottery3DTypeEnum.CombinationThree]: '组选三',
    [WelfareLottery3DTypeEnum.CombinationSix]: '组选六'
};
