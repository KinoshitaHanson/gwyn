import Vue from 'vue';
import messageBox from './message-box.vue';

let instance;

const MessageBoxConstructor = Vue.extend(messageBox);

const initInstance = () => {
    instance = new MessageBoxConstructor({
        el: document.createElement('div')
    });
    document.body.appendChild(instance.$el);
};

const MessageBox = function (option, callback) {
    if (!instance) {
        initInstance();
    }

    instance.type = option.type || 'alert';
    instance.message = option.message;
    instance.title = option.title;
    instance.confirmCallback = option.confirmCallback;
    instance.cancelCallback = option.cancelCallback;

    Vue.nextTick(() => {
        instance.confirmText = option.confirmText || '确定';
        instance.cancelText = option.cancelText || '取消';
        instance.visible = true;
    });
};

/* eslint-disable no-param-reassign */
// TODO 待优化
MessageBox.alert = (message, callback, confirmText, title = '温馨提示') => {
    if (Object.prototype.toString.call(message) === '[object Object]') {
        let option = message;
        callback = option.callback;
        confirmText = option.confirmText || '确定';
        title = option.title || '温馨提示';
        message = option.message;
    }

    MessageBox({
        message,
        title,
        type: 'alert',
        confirmText: confirmText,
        confirmCallback: () => {
            if (callback) callback();
        }
    });
};

MessageBox.confirm = (message, confirmCallback, cancelCallback, confirmText, cancelText, title = '温馨提示') => {
    if (Object.prototype.toString.call(message) === '[object Object]') {
        let option = message;
        confirmCallback = option.confirmCallback;
        cancelCallback = option.cancelCallback;
        confirmText = option.confirmText || '确定';
        cancelText = option.cancelText || '取消';
        title = option.title || '温馨提示';
        message = option.message;
    }
    MessageBox({
        message,
        title,
        type: 'confirm',
        confirmText,
        cancelText,
        confirmCallback: () => {
            if (confirmCallback) confirmCallback();
        },
        cancelCallback: () => {
            if (cancelCallback) cancelCallback();
        }
    });
};

MessageBox.error = () => {};

MessageBox.success = () => {};

MessageBox.close = () => {
    Vue.nextTick(() => {
        instance.visible = false;
    });
};

export default MessageBox;
