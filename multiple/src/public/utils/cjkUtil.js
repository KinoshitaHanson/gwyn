/**
 * 彩金卡工具类
 *
 * @param data
 * @param currentTime
 * @param listType 4 可使用 ,1 待派发,5 过期/用完
 * @returns {Array}
 */
export function parse(data, currentTime, listType) {
    let CurrentTime = currentTime.replace(/-/g, '/');
    let i,
        len,
        item,
        list = [],
        cYear = (new Date(CurrentTime)).getFullYear();
    for (i = 0, len = data.length; i < len; i++) {
        item = data[i];
        item.MinSchemeMoney = parseFloat(item.MinSchemeMoney); // 最小使用金额
        item.TotalMoney = parseFloat(item.TotalMoney); // 总额
        item.UsableMoney = item.UsableMoney ? parseFloat(item.UsableMoney) : parseFloat(item.TotalMoney); // 可用金额
        // item.UnusableMoney = item.TotalMoney - item.UsableMoney; // 已用金额
        if (item.IsOneTimeUsedCode != undefined && item.IsOneTimeUsedCode == 0) { // IsOneTimeUsedCode 0多次 1 是一次, //是否一次用完的code
            // 多次
            item.p4 = '面额: ' + item.TotalMoney + '元';
            item.yeshow = true;
        }
        else {
            // 1次
            item.p4 = '';
            item.yeshow = false;
        }
        item.p0 = item.MinSchemeMoney > 0 ? ('满' + item.MinSchemeMoney + '减' + item.TotalMoney) : (item.TotalMoney + '元');

        if (item.StatusCode == 1) {
            item.p1 = ' ' + item.StartTime + ' 0点派发';
        } else {
            let year = parseInt(item.Availabilitytime.substr(0, 4));

            if (year >= cYear + 50) {
                item.p1 = ' 永久有效 ';
            } else {
                item.p1 = ' 有效期至 ' + item.Availabilitytime;
            }
        }
        item.p2 = item.MinSchemeMoney > 0 ? ('单笔订单' + item.p0) : '可多次使用';// 可多次使用
        // item.p3 = (item.UseFor == 0 ? '' : '限') + item.UseForName;
        item.p3 = (item.UseForCode == 0 ? '' : '限') + item.UseForName;
        let s1 = new Date(item.Availabilitytime.replace(/-/g, '/'));
        let s2 = new Date(CurrentTime);
        let hourDiff = Math.floor((s1.getTime() - s2.getTime()) / (1000 * 60 * 60));
        if (hourDiff < 24) {
            if (hourDiff <= 0) {
                let minDiff = Math.floor((s1.getTime() - s2.getTime()) / (1000 * 60));
                item.days = '还有 ' + minDiff + ' 分钟过期';
            } else {
                item.days = '还有 ' + Math.floor(hourDiff) + ' 小时过期';
            }
        } else if (Math.floor(hourDiff / 24) <= 7) {
            item.days = '还有 ' + Math.floor(hourDiff / 24) + ' 天过期';
        } else {
            item.days = '';
        }
        if (listType == 5) {
            item.expiredStatus = '已过期';
            if (item.UsableMoney == 0) {
                item.expiredStatus = '已用完';
            }
            if (item.IsOneTimeUsedCode != undefined && item.IsOneTimeUsedCode == 0) {
                // none
            } else {
                item.UsableMoney = item.TotalMoney;
            }
        }
        item.lottid = item.UseFor;
        // item.sort = (item.StatusCode == 5 || item.StatusCode == 6) ? '56' : item.StatusCode;
        list.push(item);
    }
    return list;
}
