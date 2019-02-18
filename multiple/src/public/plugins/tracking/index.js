import tracking from 'public/utils/tracking';

const ctx = '@@track';

function bindClick(el, binding, vnode) {
    let directive = this;
    directive.trackClickHandler = function () {
        if (binding.value.id) {
            tracking(binding.value.id, binding.value.params);
        }
    };
    el.addEventListener('click', directive.trackClickHandler);
}

export default {
    install(Vue, options) {
        Object.defineProperties(Vue.prototype, { $tracking: { value: tracking, writable: false }});

        /**
         * act 动作
         * id 埋点id
         * params 附加字段
         * @type {[type]}
         */
        Vue.directive('track', {

            bind: (el, binding) => {
            },

            inserted: (el, binding, vnode) => {
                if (!(binding.value && binding.value.act)) return;
                el[ctx] = {
                    el,
                    vm: vnode.context,
                    value: binding.value
                };

                if (binding.value.act == 'click') {
                    bindClick.call(el[ctx], el, binding, vnode);
                }

            },

            unbind: (el) => {
                if (el && el[ctx]) { el.removeEventListener('click', el[ctx].trackClickHandler) }
            }
        });
    }
};
