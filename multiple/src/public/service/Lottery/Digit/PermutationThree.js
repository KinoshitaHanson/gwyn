import { Digit } from './Digit';

/**
 * 排列3
 *
 * @export
 * @class PermutationThree
 * @extends {Digit}
 */
export class PermutationThree extends Digit {
    Type = null;

    /**
     * Creates an instance of PermutationThree.
     * @param {PermutationThreeTypeEnum} type
     * @memberof PermutationThree
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
     * @memberof PermutationThree
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
            [PermutationThreeTypeEnum.Directly]: () => {
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
            [PermutationThreeTypeEnum.CombinationThree]: () => {
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
            [PermutationThreeTypeEnum.CombinationSix]: () => {
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
     * @memberof PermutationThree
     */
    Random() {
        let FomulaMap = {
            [PermutationThreeTypeEnum.Directly]: () => {
                let hundreds = super.Random([0, 9], 1);
                let tens = super.Random([0, 9], 1);
                let ones = super.Random([0, 9], 1);
                return {
                    hundreds,
                    tens,
                    ones
                };
            },
            [PermutationThreeTypeEnum.CombinationThree]: () => {
                let hundreds = super.Random([0, 9], 2);
                return {
                    hundreds,
                    tens: [],
                    ones: []
                };
            },
            [PermutationThreeTypeEnum.CombinationSix]: () => {
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
     * @memberof PermutationThree
     */
    JettonCalc(amount) {
        let FomulaMap = {
            [PermutationThreeTypeEnum.Directly]: () => amount.ones * amount.tens * amount.hundreds,
            [PermutationThreeTypeEnum.CombinationThree]: () => amount.hundreds * (amount.hundreds - 1),
            [PermutationThreeTypeEnum.CombinationSix]: () => amount.hundreds * (amount.hundreds - 1) * (amount.hundreds - 2) / (2 * 3)
        };
        return FomulaMap[this.Type]();
    }

    /**
     * 获取方案字符串
     *
     * @memberof PermutationThree
     */
    GetSelectedString(selected) {
        let res;
        if (this.Type == PermutationThreeTypeEnum.Directly) {
            res = selected.hundreds.join(' ') + '|' + selected.tens.join(' ') + '|' + selected.ones.join(' ');
        } else {
            res = selected.hundreds.join(' ');
        }
        return res;
    }

    /**
     * 玩法名称
     *
     * @returns
     * @memberof PermutationThree
     */
    GetTypeName() {
        return PermutationThreeTypeNameEnum[this.Type];
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
     * @memberof PermutationThree
     */
    GetOrderString(list) {
        return list.map(m => {
            let hundreds,
                tens,
                ones,
                num;
            if (m.playType == PermutationThreeTypeEnum.Directly || m.playType == PermutationThreeTypeEnum.DirectlySingle) {
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
     * @memberof PermutationThree
     */
    HighLightBetNumber(selected, result) {
        const hightColor = '#e23a3a';

        let FomulaMap = {
            [PermutationThreeTypeEnum.DirectlySingle]: _item => {
                let item = _item.split('');

                return item.map((m, i) => {
                    return {
                        color: result[i] == m ? hightColor : '',
                        value: m
                    };
                });
            },
            [PermutationThreeTypeEnum.Directly]: Directly,
            [PermutationThreeTypeEnum.CombinationThree]: _item => {
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
            [PermutationThreeTypeEnum.CombinationSix]: _item => {
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
                for (let i = 0; i < selected.length; i++) {
                    res.push({ color: '', value: selected[i] });
                }
            }

            return res;
        }

        return FomulaMap[this.Type](selected);
    }
}

/**
 * 排列3玩法枚举
 */
export const PermutationThreeTypeEnum = {
    // 直选单式
    DirectlySingle: 6301,
    // 直选复式
    Directly: 6302,
    // 组选3
    CombinationThree: 6305,
    // 组选6
    CombinationSix: 6304
};

/**
 * 排列3玩法名称枚举
 */
export const PermutationThreeTypeNameEnum = {
    [PermutationThreeTypeEnum.DirectlySingle]: '直选',
    [PermutationThreeTypeEnum.Directly]: '直选',
    [PermutationThreeTypeEnum.CombinationThree]: '组选3',
    [PermutationThreeTypeEnum.CombinationSix]: '组选6'
};
