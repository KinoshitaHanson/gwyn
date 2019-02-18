
function _merge(target, v) {
    for (let [kk, vv] of Object.entries(v)) {
        target[kk] = vv;
    }
}

function Interactive(options = {}) {
    if (options.modules) {
        for (let [k, v] of Object.entries(options.modules)) {
            if (!this[k]) this[k] = {};
            _merge(this[k], v);
        }
    }
    for (let [k, v] of Object.entries(options)) {
        if (k !== 'modules') this[k] = v;
    }
}

Interactive.prototype.install = function(Vue, options) {
    Object.defineProperties(Vue.prototype, { $bridge: { value: this, writable: false }});
};

export default Interactive;
