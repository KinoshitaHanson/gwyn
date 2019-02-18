import { TDL } from  'common/config/api.js';

/**
 * 合并
 * @param {*} target
 */
export const merge = function (target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
        let source = arguments[i] || {};
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                let value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }

    return target;
};

/**
 * 等待
 *
 * @param {Number} millisecond
 * @returns
 */
export const sleep = function (millisecond) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, millisecond);
    });
};

/**
 * 是否拥有class
 *
 * @param {Object} elements -元素
 * @param {String} cName -class名称
 * @returns {Boolean}
 */
export const hasClass = function (elements, cName) {
    return !!elements.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)'));
};

/**
 * 增加class
 *
 * @param {Object} elements
 * @param {String} cName
 */
export const addClass = function (elements, cName) {
    if (!hasClass(elements, cName)) {
        elements.className += ' ' + cName;
    }
};

/**
 * 移除class
 *
 * @param {Object} elements
 * @param {String} cName
 */
export const removeClass = function (elements, cName) {
    if (hasClass(elements, cName)) {
        elements.className = elements.className.replace(new RegExp('(\\s|^)' + cName + '(\\s|$)'), ' '); // replace方法是替换
    }
};

/**
 * 是否允许页面滚动
 *
 * @param {Boolean} allow true-允许；false-禁止
 */
export const toggleScroll = function (allow) {
    if (!allow) {
        addClass(document.querySelector('body'), 'o-hidden');
        addClass(document.querySelector('html'), 'o-hidden');
    } else {
        removeClass(document.querySelector('body'), 'o-hidden');
        removeClass(document.querySelector('html'), 'o-hidden');
    }
};

/**
 * 类型判断
 *
 */
export const is = {
    Object(o) {
        return Object.prototype.toString.call(o) == '[object Object]';
    },

    Array(o) {
        return Object.prototype.toString.call(o) == '[object Array]';
    },

    Null(o) {
        return Object.prototype.toString.call(o) == '[object Null]';
    },

    Date(o) {
        return Object.prototype.toString.call(o) == '[object Date]';
    },

    Function(o) {
        return Object.prototype.toString.call(o) == '[object Function]';
    }
};

/**
 * LocalStorage
 *
 */
export const localStorage = {
    /**
     * 存储localStorage
     * @param {*} name 键
     * @param {*} content 值
     */
    set(key, _value) {
        if (!key) return;
        let value = _value;
        if (typeof value !== 'string') {
            value = JSON.stringify(value);
        }
        window.localStorage.setItem(key, value);
    },

    /**
     * 获取localStorage
     * @param {*} name 键
     */
    get(key) {
        if (!key) return;
        let value = window.localStorage.getItem(key);
        try {
            value = JSON.parse(value);
        } catch (error) { }
        return value;
    },

    /**
     * 删除localStorage
     * @param {*} name 键
     */
    remove(key) {
        if (!key) return;
        window.localStorage.removeItem(key);
    }
};

/**
 * 判断数组相等
 *
 * @param {Array} arr1
 * @param {Array} arr2
 * @returns
 */
export const arrayEqual = function (arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1.length != arr2.length) return false;
    for (let i = 0; i < arr1.length; ++i) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
};

/**
 * 设置光标位置
 * @param textDom
 * @param pos
 */
export function setCaretPosition(textDom, pos) {
    if (textDom.setSelectionRange) {
        // IE Support
        textDom.focus();
        textDom.setSelectionRange(pos, pos);
    } else if (textDom.createTextRange) {
        // Firefox support
        let range = textDom.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}

/**
 * 动态加载脚本
 *
 * @export
 * @param {any} url
 * @param {any} callback
 */
export function loadScript(url, callback = function () { }, attr = {}) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    Object.entries(attr).forEach(m => {
        script.setAttribute(m[0], m[1]);
    });
    if (script.readyState) {
        // IE
        script.onreadystatechange = function () {
            if (script.readyState == 'loaded' || script.readyState == 'complete') {
                script.onreadystatechange = null;
                callback(true);
            } else {
                callback(false);
            }
        };
    } else {
        // Others
        script.onload = function () {
            callback(true);
        };
        script.onerror = function () {
            callback(false);
        };
    }
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

/**
 * 滚动到指定元素
 *
 * @export
 * @param {any} container
 * @param {any} selected
 * @returns
 */
export function scrollIntoView(container, selected) {
    if (!selected) {
        container.scrollTop = 0;
        return;
    }

    const top = selected.offsetTop;
    const bottom = selected.offsetTop + selected.offsetHeight;
    const viewRectTop = container.scrollTop;
    const viewRectBottom = viewRectTop + container.clientHeight;

    if (top < viewRectTop) {
        container.scrollTop = top;
    } else if (bottom > viewRectBottom) {
        container.scrollTop = bottom - container.clientHeight;
    }
}

/**
 * 滚到到指定高度
 *
 * @export
 * @param {any} to
 * @param {any} time
 * @param {any} callback
 */
export function scrollTo(container, _to, _time, callback) {
    let scrollFrom = parseInt(container.scrollTop),
        i = 0,
        runEvery = 5;
    let to = parseInt(_to);
    let time = _time / runEvery;
    let interval = setInterval(function () {
        i++;
        container.scrollTop = (to - scrollFrom) / time * i + scrollFrom;
        if (i >= time) {
            if (callback) callback();
            clearInterval(interval);
        }
    }, runEvery);
}

/**
 * 获取顶级域名
 * @return {string} [顶级域名]
 */
export function getTDL() {
    return /([0-9]{1,3}\.{1}){3}[0-9]{1,3}/.test(location.host) || location.host.indexOf('localhost') > -1 ?
        TDL :
        location.host
            .split('.')
            .slice(-2)
            .join('.');
}

/**
 * 乘法精度问题
 * @param a
 * @param b
 * @returns {number}
 */
export function mul(a, b) {
    let c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split('.')[1].length;
    } catch (f) {
    }
    try {
        c += e.split('.')[1].length;
    } catch (f) {
    }
    return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c);
}
