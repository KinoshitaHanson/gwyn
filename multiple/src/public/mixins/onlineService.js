
export default {
    data() {
        return {

        };
    },

    computed: {

    },

    methods: {
        /**
         * 创建在线客服
         * @return {[type]} [description]
         */
        createOnlineService() {
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `//qiyukf.com/script/${BRAND_CONFIG.serviceCode}.js`;
            document.body.appendChild(s);
        },

        /**
         * 移除在线客服元素
         * @return {[type]} [description]
         */
        destoryOnlineService() {
            const ele = document.querySelector('#YSF-BTN-HOLDER');
            document.body.removeChild(ele);
        }
    },

    created() {
        this.createOnlineService();
    },

    beforeDestroy() {
        this.destoryOnlineService();
    }

};
