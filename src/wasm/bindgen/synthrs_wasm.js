/* tslint:disable */
import * as wasm from './synthrs_wasm_bg';

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function passArray8ToWasm(arg) {
    const ptr = wasm.__wbindgen_malloc(arg.length * 1);
    getUint8Memory().set(arg, ptr / 1);
    return [ptr, arg.length];
}

let cachegetFloat32Memory = null;
function getFloat32Memory() {
    if (cachegetFloat32Memory === null || cachegetFloat32Memory.buffer !== wasm.memory.buffer) {
        cachegetFloat32Memory = new Float32Array(wasm.memory.buffer);
    }
    return cachegetFloat32Memory;
}

function getArrayF32FromWasm(ptr, len) {
    return getFloat32Memory().subarray(ptr / 4, ptr / 4 + len);
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}
/**
* @param {Uint8Array} arg0
* @returns {Float32Array}
*/
export function synth_midi(arg0) {
    const [ptr0, len0] = passArray8ToWasm(arg0);
    const retptr = globalArgumentPtr();
    wasm.synth_midi(retptr, ptr0, len0);
    const mem = getUint32Memory();
    const rustptr = mem[retptr / 4];
    const rustlen = mem[retptr / 4 + 1];
    if (rustptr === 0) return;
    const realRet = getArrayF32FromWasm(rustptr, rustlen).slice();
    wasm.__wbindgen_free(rustptr, rustlen * 4);
    return realRet;

}

/**
* @param {number} arg0
* @param {number} arg1
* @returns {Float32Array}
*/
export function dialtone(arg0, arg1) {
    const retptr = globalArgumentPtr();
    wasm.dialtone(retptr, arg0, arg1);
    const mem = getUint32Memory();
    const rustptr = mem[retptr / 4];
    const rustlen = mem[retptr / 4 + 1];

    const realRet = getArrayF32FromWasm(rustptr, rustlen).slice();
    wasm.__wbindgen_free(rustptr, rustlen * 4);
    return realRet;

}

/**
* @param {number} arg0
* @param {number} arg1
* @returns {Float32Array}
*/
export function busy(arg0, arg1) {
    const retptr = globalArgumentPtr();
    wasm.busy(retptr, arg0, arg1);
    const mem = getUint32Memory();
    const rustptr = mem[retptr / 4];
    const rustlen = mem[retptr / 4 + 1];

    const realRet = getArrayF32FromWasm(rustptr, rustlen).slice();
    wasm.__wbindgen_free(rustptr, rustlen * 4);
    return realRet;

}

/**
* @param {number} arg0
* @param {number} arg1
* @returns {Float32Array}
*/
export function offhook(arg0, arg1) {
    const retptr = globalArgumentPtr();
    wasm.offhook(retptr, arg0, arg1);
    const mem = getUint32Memory();
    const rustptr = mem[retptr / 4];
    const rustlen = mem[retptr / 4 + 1];

    const realRet = getArrayF32FromWasm(rustptr, rustlen).slice();
    wasm.__wbindgen_free(rustptr, rustlen * 4);
    return realRet;

}

/**
* @param {number} arg0
* @param {number} arg1
* @returns {Float32Array}
*/
export function ring(arg0, arg1) {
    const retptr = globalArgumentPtr();
    wasm.ring(retptr, arg0, arg1);
    const mem = getUint32Memory();
    const rustptr = mem[retptr / 4];
    const rustlen = mem[retptr / 4 + 1];

    const realRet = getArrayF32FromWasm(rustptr, rustlen).slice();
    wasm.__wbindgen_free(rustptr, rustlen * 4);
    return realRet;

}

const lTextDecoder = typeof TextDecoder === 'undefined' ? require('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

