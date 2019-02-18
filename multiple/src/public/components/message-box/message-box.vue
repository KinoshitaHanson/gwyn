<template>
    <div class="layermmain" v-show="visible" @touchmove.prevent>
        <div class="laymshade"></div>
        <div class="section">
            <div style="z-index:301" class="layermchild layer-msg-02 layermanim">
                <div class="layermcont">
                    <div class="layer-title" v-html="title" v-if="!!title"></div>
                    <div class="txt" v-html="message"></div>
                </div>
                <div class="layermbtn">
                    <span type="0" @click="cancel" v-if="type=='confirm'">{{cancelText}}</span>
                    <span type="1" @click="confirm">{{confirmText}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MessageBox',

    props: {
        type: String, // alert,confirm
        message: String,
        title: String,
    },

    data() {
        return {
            visible: false,
            confirmCallback: null,
            cancelCallback: null,
            confirmText: '确定',
            cancelText: '取消'
        };
    },

    methods: {
        confirm() {
            this.visible = false;
            if (this.confirmCallback) this.confirmCallback();
            this.$emit('confirmClick');
        },

        cancel() {
            this.visible = false;
            if (this.cancelCallback) this.cancelCallback();
            this.$emit('cancelClick');
        }
    }
};
</script>

<style scoped>
    /*适配*/

    @media only screen and (min-width: 321px) and (max-width: 360px) {
        .layer-msg-01 .ok {
            width: 28px;
            height: 28px;
        }
        .layer-msg-01 .txt {
            font-size: 17px;
        }
        .layer-msg-02 .txt {
            font-size: 17px
        }
        .layer-msg-02 .layermbtn span {
            font-size: 16px;
        }
    }

    @media only screen and (min-width: 361px) and (max-width: 376px) {
        .layer-msg-01 .ok {
            width: 29px;
            height: 29px;
        }
        .layer-msg-01 .txt {
            font-size: 18px;
            line-height: 24px;
        }
        .layer-msg-02 .txt {
            font-size: 18px;
            line-height: 24px;
        }
        .layer-msg-02 .layermbtn span {
            font-size: 17px;
        }
    }

    @media only screen and (min-width: 377px) and (max-width: 414px) {
        .layer-msg-01 .ok {
            width: 32px;
            height: 32px;
        }
        .layer-msg-01 .txt {
            font-size: 20px;
            line-height: 26px;
        }
        .layer-msg-02 .txt {
            font-size: 20px;
            line-height: 26px;
        }
        .layer-msg-02 .layermbtn span {
            font-size: 18px;
        }
    }

    @media only screen and (min-width:415px) and (max-width: 640px) {
        .layer-msg-01 .ok {
            width: 50px;
            height: 50px;
        }
        .layer-msg-01 .txt {
            font-size: 30px;
            line-height: 32px;
        }
        .layer-msg-02 .txt {
            font-size: 30px;
            line-height: 32px;
        }
        .layer-msg-02 .layermbtn span {
            font-size: 28px;
        }
    }

    @media screen and (min-width:768px) {
        .layer-msg-01 .ok {
            width: 60px;
            height: 60px;
        }
        .layer-msg-01 .txt {
            font-size: 36px;
            line-height: 38px;
        }
        .layer-msg-02 .txt {
            font-size: 36px;
            line-height: 38px;
        }
        .layer-msg-02 .layermbtn span {
            font-size: 34px;
        }
    }

    .layer-msg-02 {
        width: 72%;
        border-radius: 5px;
        background-color: #fff;
        margin: 0 auto;
        -moz-box-shadow: 0 1px 8px rgba(0, 0, 0, .35);
        -webkit-box-shadow: 0 1px 8px rgba(0, 0, 0, .35);
        box-shadow: 0 1px 8px rgba(0, 0, 0, .35);
    }
    /* layer弹层移动版样式 */

    .layermbox {
        position: relative;
        z-index: 19891014;
    }

    .laymshade,
    .layermmain {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 300;
    }

    .laymshade {
        background-color: rgba(0, 0, 0, .5);
        pointer-events: auto;
    }

    .layermmain {
        display: table;
        font-family: Helvetica, arial, sans-serif;
        pointer-events: none;
    }

    .layermmain .section {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }

    .layermchild {
        position: relative;
        display: inline-block;
        text-align: left;
        background-color: #fff;
        font-size: 14px;
        border-radius: 3px;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
        pointer-events: auto;
    }

    .layermborder {
        border: 1px solid #999;
    }

    .layermbox0 .layermchild {
        max-width: 90%;
        min-width: 48%;
    }

    .layermbox1 .layermchild {
        border: none;
        border-radius: 0;
    }

    .layermbox2 .layermchild {
        width: auto;
        max-width: 260px;
        min-width: 40px;
        border: none;
        background: none;
        box-shadow: none;
        color: #fff;
    }

    .layermchild h3 {
        padding: 0 45px 0 10px;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #dedede;
        font-size: 16px;
        font-weight: 400;
        border-radius: 3px 3px 0 0;
        border-bottom: 1px solid #dedede;
    }

    .layermchild h3,
    .layermbtn span {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .layermcont {
        padding: 20px 15px;
        line-height: 22px;
        text-align: center;
    }

    .layermbox1 .layermcont {
        padding: 0;
        text-align: left;
    }

    .layermbox2 .layermcont {
        text-align: center;
        padding: 0;
        line-height: 0;
    }

    .layermbox2 .layermcont i {
        width: 25px;
        height: 25px;
        margin-left: 8px;
        display: inline-block;
        background-color: #fff;
        border-radius: 100%;
    }

    .layermbox2 .layermcont>div {
        line-height: 22px;
        padding-top: 7px;
        margin-bottom: 20px;
        font-size: 14px;
    }

    .layermbtn {
        position: relative;
        height: 40px;
        line-height: 40px;
        font-size: 0;
        text-align: center;
        border-top: 1px solid #dedede;
    }

    .layermbtn span {
        position: relative;
        height: 39px;
        display: inline-block;
        width: 50%;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
        border-radius: 0 3px 0 0;
        border-left: 1px solid #dedede;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .layermbtn span:first-child {
        background-color: #fff;
        border-radius: 0 0 0 3px;
        border: 0;
    }

    .layermbtn:before {
        content: '\20';
        position: absolute;
        width: 0;
        height: 39px;
        left: 50%;
        top: 0;
        background-color: #dedede;
    }

    .layermend {
        position: absolute;
        right: 7px;
        top: 10px;
        width: 30px;
        height: 30px;
        border: 0;
        font-weight: 400;
        background: transparent;
        cursor: pointer;
        -webkit-appearance: none;
        font-size: 30px;
    }

    .layermend::before,
    .layermend::after {
        position: absolute;
        left: 5px;
        top: 15px;
        content: '';
        width: 18px;
        height: 1px;
        background-color: #999;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        border-radius: 3px;
    }

    .layermend::after {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
    }

    .layer-msg-02 {
        width: 72%;
        border-radius: 5px;
        background-color: #fff;
        margin: 0 auto;
        -moz-box-shadow: 0 1px 8px rgba(0, 0, 0, .35);
        -webkit-box-shadow: 0 1px 8px rgba(0, 0, 0, .35);
        box-shadow: 0 1px 8px rgba(0, 0, 0, .35);
    }

    .layer-title {
        padding-bottom: 8px;
        font-size: 16px;
        font-weight: bold;
    }
</style>
