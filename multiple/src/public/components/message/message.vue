<template>
    <transition name="fade" mode="out-in">
        <div class="toast-layer show" v-show="visible">
            <div class="toast-mask"></div>
            <div class="toast-main">
                <div class="toast-inner" :class="{'single':type!='success'}">
                    <div class="toast-icon" v-show="type=='success'"></div>
                    <div class="toast-txt">{{message}}</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import './toast.css';

export default {
    name: 'Message',

    data() {
        return {
            type: 'success',
            duration: 2000,
            visible: false,
            message: '',
            timer: null
        };
    },

    methods: {
        close() {
            this.visible = false;
        },

        clearTimer() {
            clearTimeout(this.timer);
        },

        startTimer() {
            if (this.duration > 0) {
                this.clearTimer();
                this.timer = setTimeout(() => {
                    this.close();
                    this.$emit('closed');
                }, this.duration);
            }
        },

        show() {
            this.visible = true;
            this.startTimer();
        }
    },

    mounted() {
        // this.startTimer();
    }
};
</script>

<style scoped>

</style>
