/* tslint:disable */
import * as wasm from './synthrs_wasm_bg';

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

