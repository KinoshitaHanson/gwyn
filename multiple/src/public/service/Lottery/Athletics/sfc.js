/**
 * 胜负彩的投注playid
 * @type {{simplex: number, compound: number}}
 */
export const playTypeEnum = {
    simplex: 101, // 单式
    compound: 102// 复式
};

/**
 * 根据注数返回playid
 * @param zhushu
 * @returns {number}
 */
export function getPlayType(zhushu) {
    return zhushu == 1 ? playTypeEnum.simplex : playTypeEnum.compound;
}

/**
 * 获取投注选项
 * @param matches
 * @returns {string}
 */
export function cgTZ(matches) {
    let arr = [],
        option = [3, 1, 0];
    matches.forEach(match => {
        let str = '';
        match.SPF.spList.forEach((sp, index) => {
            if (sp.checked) {
                str += option[index];
            }
        });
        arr.push(str);
    });
    return arr.join(',');
}
