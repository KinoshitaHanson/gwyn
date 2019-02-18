import Vue from 'vue';
import message from './message.vue';

let instance;

const MessageConstructor = Vue.extend(message);

const initInstance = () => {
    instance = new MessageConstructor({
        el: document.createElement('div')
    });
    document.body.appendChild(instance.$el);
};

const Message = function(option, callback) {
    if (!instance) {
        initInstance();
    }
    instance.type = option.type;
    instance.message = option.message;
    instance.duration = option.duration || 2000;
    instance.$off('closed');
    if (callback) {
        instance.$on('closed', callback);
    }

    Vue.nextTick(() => {
        instance.show();
    });
};

Message.success = (message, callback) => {
    Message(
        {
            message,
            type: 'success'
        },
        callback
    );
};

Message.info = (message, callback) => {
    Message(
        {
            message,
            type: 'info'
        },
        callback
    );
};

Message.error = () => {};

Message.close = () => {
    Vue.nextTick(() => {
        instance.visible = false;
    });
};

export default Message;
