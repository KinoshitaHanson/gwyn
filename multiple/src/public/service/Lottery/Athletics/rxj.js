/**
 * 任选九的投注playid
 * @type {{simplex: number, compound: number, NToNine: number}}
 */
export const playTypeEnum = {
    simplex: 1901, // 单式
    compound: 1902, // 复式
    NToNine: 1903// N转9
};

/**
 * 根据
 * @param matches
 * @param zhushu
 * @returns {number}
 */
export function getPlayType(matchesLength, zhushu) {
    if (matchesLength > 9) {
        return playTypeEnum.NToNine;
    } else if (matchesLength == 9) {
        return zhushu == 1 ? playTypeEnum.simplex : playTypeEnum.compound;
    }

}

/**
 * 计算注数
 * @param matches
 * @returns {number}
 */
export function getZhuShu(matches) {
    let allZhuShu = 0;
    let zuhe = choose(matches, 9);
    zuhe.forEach((item) => {
        let onceTotal = 0;
        item.forEach(function (match, index) {
            let allCheckedLen = match.SPF.spList.filter((sp) => sp.checked).length;
            if (index === 0) {
                onceTotal = allCheckedLen;
            } else {
                onceTotal = onceTotal * allCheckedLen;
            }
        });
        allZhuShu += onceTotal;

    });
    return allZhuShu;
}

export function choose(arr, size) {
    let allResult = [];
    (function f(arr, size, result) {
        let arrLen = arr.length;
        if (size > arrLen) {
            return;
        }
        if (size == arrLen) {
            allResult.push([].concat(result, arr));
        } else {
            for (let i = 0; i < arrLen; i++) {
                let newResult = [].concat(result);
                newResult.push(arr[i]);
                if (size == 1) {
                    allResult.push(newResult);
                } else {
                    let newArr = [].concat(arr);
                    newArr.splice(0, i + 1);
                    f(newArr, size - 1, newResult);
                }
            }
        }
    })(arr, size, []);
    return allResult;
}

/**
 * 计算投注项
 * @param matches
 */
export function cgTZ(matches) {
    let arr = [],
        option = [3, 1, 0];
    matches.forEach(match => {
        if (match.SPF.spList.filter(sp => sp.checked).length > 0) {
            let str = '';
            match.SPF.spList.forEach((sp, index) => {
                if (sp.checked) {
                    str += option[index];
                }
            });
            arr.push(str);
        } else {
            arr.push('#');
        }
    });
    return arr.join(',');
}
