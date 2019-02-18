export default {
    install: function (Vue) {
        Vue.directive('err-src', {
            bind: (el, binding) => {
                if (el.tagName.toLowerCase() !== 'img') return;
                let count = 3;
                el.onerror = function () {
                    count--;
                    if (count < 0) return;
                    el.src = binding.value ? binding.value : require('./images/default.png');
                };
            }
        });
    }
};
