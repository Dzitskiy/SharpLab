import { TextEncoder, TextDecoder } from 'util';
import { Crypto } from '@peculiar/webcrypto';
import Vue from 'vue';

let error: (Error & { vm?: Vue; info?: string })|undefined|null;

Vue.config.warnHandler = (msg, vm, trace) => {
    error = new Error(msg + trace);
    error.vm = vm;
    throw error;
};

// eslint-disable-next-line @typescript-eslint/unbound-method
Vue.config.errorHandler = (err, vm, info) => {
    error = (typeof err === 'string') ? new Error(err) : err;
    error.vm = vm;
    error.info = info;
    throw error;
};

Object.defineProperty(global, 'crypto', {
    value: new Crypto()
});

global.TextDecoder = TextDecoder as typeof global.TextDecoder;
global.TextEncoder = TextEncoder;