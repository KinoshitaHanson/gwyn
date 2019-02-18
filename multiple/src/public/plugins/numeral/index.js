import numeral from 'numeral';

export default {
    install(Vue, options) {
        Object.defineProperties(Vue.prototype, { $numeral: { value: numeral, writable: false }});
    }
};
