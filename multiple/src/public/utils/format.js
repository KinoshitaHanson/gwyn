/**
 * 根据时间获取星期几
 * @param input
 * @returns {*}
 */
export function getWeek(input) {
    let strDate = input.replace(/-/g, '/');
    let date = new Date(strDate);
    let wk = date.getDay();
    return getWeekByDay(wk);
}

/**
 * 根据第几天返回周几
 * @param index
 * @returns {*}
 */
export function getWeekByDay(_index) {
    let index = _index;
    if (typeof index == 'string') {
        index = parseInt(index);
    }
    switch (index) {
        case 1:
            return '周一';
        case 2:
            return '周二';
        case 3:
            return '周三';
        case 4:
            return '周四';
        case 5:
            return '周五';
        case 6:
            return '周六';
        case 0:
        case 7:
            return '周日';
    }
}

/**
 * 倒计时
 * @param diff
 * @param loadTime
 * @param item
 * @param callback
 */
export function countDown(diff, loadTime, item, callback) {
    // let t = true;

    function round($diff) {
        let dd = parseInt($diff / 1000 / 60 / 60 / 24, 10);// 计算剩余的天数
        let hh = parseInt($diff / 1000 / 60 / 60 % 24, 10);// 计算剩余的小时数
        let mm = parseInt($diff / 1000 / 60 % 60, 10);// 计算剩余的分钟数
        let ss = parseInt($diff / 1000 % 60, 10);// 计算剩余的秒数

        function checkTime(_a) {
            let a = _a;
            if (a < 10) {
                a = '0' + a;
            }
            return a.toString();
        }

        item.conttainer = {
            ddhh: checkTime(dd * 24 + hh),
            dd: checkTime(dd),
            hh: checkTime(hh),
            mm: checkTime(mm),
            ss: checkTime(ss)
        };

        if (item.conttainer.dd > 0 || item.conttainer.hh > 0 || item.conttainer.mm > 0 || item.conttainer.ss > 0) {
            item.t = window.setTimeout(function () {
                let $diff = diff + 2000 - (new Date() - loadTime);
                round($diff);
            }, 1000);
        } else {
            if (callback) { callback() }
        }
    }

    round((diff + 2000 - (new Date() - loadTime)));
}
