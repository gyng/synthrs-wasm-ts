(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{"./src/wasm/bindgen/synthrs_wasm.js":function(n,r,t){"use strict";t.r(r),function(n,e){t.d(r,"__wbg_call_9a6451120c0e32db",function(){return v}),t.d(r,"js_generator",function(){return h}),t.d(r,"synth_midi_wav",function(){return S}),t.d(r,"synth_midi",function(){return A}),t.d(r,"dialtone",function(){return E}),t.d(r,"busy",function(){return T}),t.d(r,"offhook",function(){return k}),t.d(r,"ring",function(){return F}),t.d(r,"__wbindgen_object_drop_ref",function(){return D}),t.d(r,"__wbindgen_number_new",function(){return J}),t.d(r,"__wbindgen_number_get",function(){return U}),t.d(r,"__wbindgen_is_null",function(){return I}),t.d(r,"__wbindgen_is_undefined",function(){return q}),t.d(r,"__wbindgen_boolean_get",function(){return z}),t.d(r,"__wbindgen_is_symbol",function(){return B}),t.d(r,"__wbindgen_string_get",function(){return G}),t.d(r,"__wbindgen_throw",function(){return K});var u=t("./src/wasm/bindgen/synthrs_wasm_bg.wasm");function o(n){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}function i(n,r){return function(n){if(Array.isArray(n))return n}(n)||function(n,r){var t=[],e=!0,u=!1,o=void 0;try{for(var i,c=n[Symbol.iterator]();!(e=(i=c.next()).done)&&(t.push(i.value),!r||t.length!==r);e=!0);}catch(n){u=!0,o=n}finally{try{e||null==c.return||c.return()}finally{if(u)throw o}}return t}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var c="undefined"==typeof Function?null:Function.prototype.call||function(){throw new Error("wasm-bindgen: Function.call does not exist")},f=null;function a(){return null!==f&&f.buffer===u.g.buffer||(f=new Uint32Array(u.g.buffer)),f}var l=[{obj:void 0},{obj:null},{obj:!0},{obj:!1}],s=l.length;function d(n){s===l.length&&l.push(l.length+1);var r=s,t=l[r];return s=t,l[r]={obj:n,cnt:1},r<<1}var b=[];function _(n){return 1==(1&n)?b[n>>1]:l[n>>1].obj}function v(n,r,t,e){try{return d(c.call(_(n),_(r),_(t)))}catch(n){var u=a();u[e/4]=1,u[e/4+1]=d(n)}}var y=null;function w(n,r){return(null!==y&&y.buffer===u.g.buffer||(y=new Float32Array(u.g.buffer)),y).subarray(n/4,n/4+r)}var g=null;function m(){return null===g&&(g=u.b()),g}function h(n,r){var t=m();try{u.f(t,n,function(n){return b.push(n),b.length-1<<1|1}(r));var e=a(),o=e[t/4],i=e[t/4+1],c=w(o,i).slice();return u.a(o,4*i),c}finally{b.pop()}}var p=null;function j(){return null!==p&&p.buffer===u.g.buffer||(p=new Uint8Array(u.g.buffer)),p}function x(n){var r=u.c(1*n.length);return j().set(n,r/1),[r,n.length]}function S(n){var r=i(x(n),2),t=r[0],e=r[1],o=m();u.k(o,t,e);var c=a(),f=c[o/4],l=c[o/4+1];if(0!==f){var s=function(n,r){return j().subarray(n/1,n/1+r)}(f,l).slice();return u.a(f,1*l),s}}function A(n){var r=i(x(n),2),t=r[0],e=r[1],o=m();u.j(o,t,e);var c=a(),f=c[o/4],l=c[o/4+1];if(0!==f){var s=w(f,l).slice();return u.a(f,4*l),s}}function E(n,r){var t=m();u.e(t,n,r);var e=a(),o=e[t/4],i=e[t/4+1],c=w(o,i).slice();return u.a(o,4*i),c}function T(n,r){var t=m();u.d(t,n,r);var e=a(),o=e[t/4],i=e[t/4+1],c=w(o,i).slice();return u.a(o,4*i),c}function k(n,r){var t=m();u.h(t,n,r);var e=a(),o=e[t/4],i=e[t/4+1],c=w(o,i).slice();return u.a(o,4*i),c}function F(n,r){var t=m();u.i(t,n,r);var e=a(),o=e[t/4],i=e[t/4+1],c=w(o,i).slice();return u.a(o,4*i),c}function D(n){!function(n){if(!((n>>=1)<4)){var r=l[n];r.cnt-=1,r.cnt>0||(l[n]=s,s=n)}}(n)}function J(n){return d(n)}function U(n,r){var t=_(n);return"number"==typeof t?t:(j()[r]=1,0)}function I(n){return null===_(n)?1:0}function q(n){return void 0===_(n)?1:0}function z(n){var r=_(n);return"boolean"==typeof r?r?1:0:2}function B(n){return"symbol"===o(_(n))?1:0}var C=new(void 0===n?t("./node_modules/util/util.js").TextEncoder:n)("utf-8");function G(n,r){var t=_(n);if("string"!=typeof t)return 0;var e=i(function(n){var r=C.encode(n),t=u.c(r.length);return j().set(r,t),[t,r.length]}(t),2),o=e[0],c=e[1];return a()[r/4]=c,o}var H=new(void 0===e?t("./node_modules/util/util.js").TextDecoder:e)("utf-8");function K(n,r){throw new Error(function(n,r){return H.decode(j().subarray(n,n+r))}(n,r))}}.call(this,t("./node_modules/text-encoding/index.js").TextEncoder,t("./node_modules/text-encoding/index.js").TextDecoder)},"./src/wasm/bindgen/synthrs_wasm_bg.wasm":function(n,r,t){"use strict";var e=t.w[n.i];n.exports=e;t("./src/wasm/bindgen/synthrs_wasm.js");e.l()}}]);