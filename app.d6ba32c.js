!function(e){function t(t){for(var o,a,i=t[0],c=t[1],l=t[2],u=0,d=[];u<i.length;u++)a=i[u],r[a]&&d.push(r[a][0]),r[a]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);for(f&&f(t);d.length;)d.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var e,t=0;t<s.length;t++){for(var n=s[t],o=!0,a=1;a<n.length;a++){var i=n[a];0!==r[i]&&(o=!1)}o&&(s.splice(t--,1),e=c(c.s=n[0]))}return e}var o={},r={0:0},s=[];var a={};var i={"./src/wasm/bindgen/synthrs_wasm_bg.wasm":function(){return{}}};function c(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise(function(t,o){n=r[e]=[t,o]});t.push(n[2]=o);var s,l=document.getElementsByTagName("head")[0],u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=function(e){return c.p+""+({}[e]||e)+".d6ba32c.js"}(e),s=function(t){u.onerror=u.onload=null,clearTimeout(d);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src,a=new Error("Loading chunk "+e+" failed.\n("+o+": "+s+")");a.type=o,a.request=s,n[1](a)}r[e]=void 0}};var d=setTimeout(function(){s({type:"timeout",target:u})},12e4);u.onerror=u.onload=s,l.appendChild(u)}return({2:["./src/wasm/bindgen/synthrs_wasm_bg.wasm"]}[e]||[]).forEach(function(e){var n=a[e];if(n)t.push(n);else{var o,r=i[e](),s=fetch(c.p+""+{"./src/wasm/bindgen/synthrs_wasm_bg.wasm":"1f6c66ec3cede89f0146"}[e]+".module.wasm");if(r instanceof Promise&&"function"==typeof WebAssembly.compileStreaming)o=Promise.all([WebAssembly.compileStreaming(s),r]).then(function(e){return WebAssembly.instantiate(e[0],e[1])});else if("function"==typeof WebAssembly.instantiateStreaming)o=WebAssembly.instantiateStreaming(s,r);else{o=s.then(function(e){return e.arrayBuffer()}).then(function(e){return WebAssembly.instantiate(e,r)})}t.push(a[e]=o.then(function(t){return c.w[e]=(t.instance||t).exports}))}}),Promise.all(t)},c.m=e,c.c=o,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)c.d(n,o,function(t){return e[t]}.bind(null,o));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="./",c.oe=function(e){throw console.error(e),e},c.w={};var l=window.webpackJsonp=window.webpackJsonp||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var f=u;s.push(["./src/index.tsx",1]),n()}({"./node_modules/css-loader/index.js!./src/components/App/legacy.css":function(e,t,n){(e.exports=n("./node_modules/css-loader/lib/css-base.js")(!1)).push([e.i,".app {\n  justify-content: flex-start;\n  margin: 0;\n  padding: var(--m-xl);\n}\n\n#root {\n  height: 100%;\n}\n",""])},"./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js!./src/components/App/styles.scss":function(e,t,n){(t=e.exports=n("./node_modules/css-loader/lib/css-base.js")(!1)).push([e.i,"@-webkit-keyframes _1yaKCUlEtIQ-iGPo5m-Br3{to{-webkit-transform:rotateX(1turn) rotateY(1turn) rotate(1turn);transform:rotateX(1turn) rotateY(1turn) rotate(1turn)}}@keyframes _1yaKCUlEtIQ-iGPo5m-Br3{to{-webkit-transform:rotateX(1turn) rotateY(1turn) rotate(1turn);transform:rotateX(1turn) rotateY(1turn) rotate(1turn)}}._2NJIZX_RcQUZUpdEbCsXNQ{-webkit-animation:_1yaKCUlEtIQ-iGPo5m-Br3 60s ease-in-out infinite;animation:_1yaKCUlEtIQ-iGPo5m-Br3 60s ease-in-out infinite;border-radius:50%;height:auto;width:160px;transition:all 1s}.k0IxfRu8Nb-cdAiNQ4DWp{border-radius:calc(var(--curve)*50);color:var(--orange-60);align-self:center;transition:border-radius .3s ease-in}.k0IxfRu8Nb-cdAiNQ4DWp ._2uLTF1NqLRDgFRDDjIM4oF{font-style:italic}.k0IxfRu8Nb-cdAiNQ4DWp:hover{border-radius:var(--curve)}.k0IxfRu8Nb-cdAiNQ4DWp:hover ._2uLTF1NqLRDgFRDDjIM4oF{color:red;text-decoration:underline}._Y5TZDnliC1I-neCaNLFa{display:grid;grid-gap:var(--m-m);grid-template-columns:1fr 1fr;grid-template-rows:1fr 2fr 2fr;margin:0 auto;max-width:calc(var(--m)*240)}@media (max-width:40em){._Y5TZDnliC1I-neCaNLFa{grid-template-columns:1fr}}._Y5TZDnliC1I-neCaNLFa ._2J6H8Y7c5fxcHGabNW7Lz2{grid-column-start:span 3}._Y5TZDnliC1I-neCaNLFa ._2oTSsqqs0CxgdG7fVoPyEf{display:flex;justify-content:center;align-items:center;width:100%;height:100%;min-height:300px;outline:solid 2px var(--grey-40);-webkit-transform-origin:center;transform-origin:center;transition:all .1s ease-in}._Y5TZDnliC1I-neCaNLFa ._2oTSsqqs0CxgdG7fVoPyEf:hover{outline:solid 5px var(--blue-40);-webkit-transform:scale(1.025);transform:scale(1.025)}._Y5TZDnliC1I-neCaNLFa ._2oTSsqqs0CxgdG7fVoPyEf:active{transition:-webkit-transform .05s;transition:transform .05s;transition:transform .05s,-webkit-transform .05s;-webkit-transform:scale(.975);transform:scale(.975)}._Y5TZDnliC1I-neCaNLFa ._2oTSsqqs0CxgdG7fVoPyEf>*{display:flex;justify-content:center;align-items:center;flex-direction:column;width:90%;height:90%}._Y5TZDnliC1I-neCaNLFa ._2oTSsqqs0CxgdG7fVoPyEf:nth-child(2n){grid-column:1/2}._Y5TZDnliC1I-neCaNLFa ._2oTSsqqs0CxgdG7fVoPyEf:nth-child(odd){grid-column:2/3}@media (max-width:40em){._Y5TZDnliC1I-neCaNLFa ._2oTSsqqs0CxgdG7fVoPyEf:nth-child(odd){grid-column:1}}",""]),t.locals={robot:"_2NJIZX_RcQUZUpdEbCsXNQ",spin:"_1yaKCUlEtIQ-iGPo5m-Br3",themedDiv:"k0IxfRu8Nb-cdAiNQ4DWp",sub:"_2uLTF1NqLRDgFRDDjIM4oF",grid:"_Y5TZDnliC1I-neCaNLFa",row:"_2J6H8Y7c5fxcHGabNW7Lz2",box:"_2oTSsqqs0CxgdG7fVoPyEf"}},"./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js!./src/styles/root.scss":function(e,t,n){(t=e.exports=n("./node_modules/css-loader/lib/css-base.js")(!1)).i(n("./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js!./src/styles/typography.scss"),""),t.i(n("./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js!./src/styles/variables.scss"),""),t.push([e.i,"body,html{height:100%;width:100%;padding:0;margin:0}a{color:var(--blue-60)}",""])},"./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js!./src/styles/typography.scss":function(e,t,n){(e.exports=n("./node_modules/css-loader/lib/css-base.js")(!1)).push([e.i,"html{font-size:1em}body{font-family:Arial,sans-serif;font-weight:400;line-height:1.45;color:#333}p{margin-bottom:1.3em}h1,h2,h3,h4{margin:1.414em 0 .5em;font-weight:inherit;line-height:1.2}h1{margin-top:0;font-size:3.157em}h2{font-size:2.369em}h3{font-size:1.777em}h4{font-size:1.333em}small{font-size:.75em}",""])},"./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js!./src/styles/variables.scss":function(e,t,n){(e.exports=n("./node_modules/css-loader/lib/css-base.js")(!1)).push([e.i,":root{--blue-40:#45a1ff;--blue-50:#0a84ff;--blue-60:#0a84ff;--blue-70:#003eaa;--blue-80:#002275;--blue-90:#000f40;--teal-40:#00feff;--teal-50:#00c8d7;--teal-60:#008ea4;--teal-70:#005a71;--teal-80:#002d3e;--magenta-50:#ff1ad9;--magenta-60:#ed00b5;--magenta-70:#b5007f;--magenta-80:#7d004f;--magenta-90:#440027;--green-50:#30e60b;--green-60:#12bc00;--green-70:#058b00;--green-80:#006504;--green-90:#003706;--yellow-50:#ffe900;--yellow-60:#d7b600;--yellow-70:#a47f00;--yellow-80:#715100;--yellow-90:#3e2800;--red-50:#ff0039;--red-60:#d70022;--red-70:#a4000f;--red-80:#5a0002;--red-90:#3e0200;--orange-50:#ff9400;--orange-60:#d76e00;--orange-70:#a44900;--orange-80:#712b00;--orange-90:#3e1300;--ink-70:#363959;--ink-80:#202340;--ink-90:#0f1126;--grey-10:#f9f9f9;--grey-20:#ededf0;--grey-30:#d7d7db;--grey-40:#b1b1b3;--grey-50:#737373;--grey-60:#4a4a4f;--grey-70:#38383d;--grey-80:#2a2a2e;--grey-90:#0c0c0d;--white:#fff;--black:#000;--m:4px;--m-s:calc(var(--m)*2);--m-m:calc(var(--m)*4);--m-l:calc(var(--m)*8);--m-xl:calc(var(--m)*16);--curve:2px}",""])},"./src/components/App/hello.jpg":function(e,t,n){e.exports=n.p+"./f/afa648da6fc4a46c.jpg"},"./src/components/App/legacy.css":function(e,t,n){var o=n("./node_modules/css-loader/index.js!./src/components/App/legacy.css");"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n("./node_modules/style-loader/lib/addStyles.js")(o,r);o.locals&&(e.exports=o.locals)},"./src/components/App/styles.scss":function(e,t,n){var o=n("./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js!./src/components/App/styles.scss");"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n("./node_modules/style-loader/lib/addStyles.js")(o,r);o.locals&&(e.exports=o.locals)},"./src/index.tsx":function(e,t,n){"use strict";n.r(t);var o=n("./node_modules/react/index.js"),r=n("./node_modules/react-dom/index.js"),s=n("./node_modules/react-redux/es/index.js"),a=n("./node_modules/redux/es/redux.js"),i=n("./node_modules/redux-thunk/es/index.js"),c=n("./node_modules/connected-react-router/lib/index.js"),l=n("./node_modules/history/createBrowserHistory.js"),u=n.n(l),d=n("./node_modules/history/createHashHistory.js"),f=n.n(d),m=n("./node_modules/react-router-dom/es/Switch.js"),p=n("./node_modules/react-router-dom/es/Route.js"),y={basePath:"/",publicPath:"./",historyType:"hash"};n("./node_modules/react-hot-loader/index.js");function b(e){return(b="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function g(e,t){return!t||"object"!==b(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function _(e){return(_=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}n("./src/components/App/hello.jpg");var j=n("./src/components/App/styles.scss");n("./src/styles/root.scss"),n("./src/components/App/legacy.css");var x={};n.e(2).then(n.bind(null,"./src/wasm/bindgen/synthrs_wasm.js")).then(function(e){x.dialtone=e.dialtone,x.busy=e.busy,x.offhook=e.offhook,x.ring=e.ring});var w=function(e){var t=new AudioContext,n=t.createBuffer(1,441e3,44100),o=x[e](10,44100);n.copyToChannel(o,0,0);var r=t.createBufferSource();r.buffer=n,r.connect(t.destination),r.start()},E=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),g(this,_(t).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(t,o["Component"]),function(e,t,n){t&&h(e.prototype,t),n&&h(e,n)}(t,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return o.createElement("div",{className:"app ".concat(j.grid)},"Hello!",o.createElement("button",{onClick:function(){w("busy")}},"Busy"),o.createElement("button",{onClick:function(){w("offhook")}},"Offhook"),o.createElement("button",{onClick:function(){w("dialtone")}},"Dial"),o.createElement("button",{onClick:function(){w("ring")}},"Ring"))}}]),t}(),O=n("./node_modules/typesafe-actions/dist/index.umd.js"),C=Object(O.createAction)("INCREMENT",function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return e({value:t})}}),P=Object(O.createAction)("DECREMENT",function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return e({value:t})}});function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){T(e,t,n[t])})}return e}function T(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var k={counters:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{value:0},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Object(O.getType)(C):return S({},e,{value:e.value+t.payload.value});case Object(O.getType)(P):return S({},e,{value:e.value-t.payload.value});default:return e}}},N=n("./node_modules/react-router-dom/es/Link.js");function D(e){return(D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function I(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function A(e,t){return!t||"object"!==D(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function L(e){return(L=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function R(e,t){return(R=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var q=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),A(this,L(t).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&R(e,t)}(t,o["Component"]),function(e,t,n){t&&I(e.prototype,t),n&&I(e,n)}(t,[{key:"render",value:function(){return o.createElement("div",{style:{alignItems:"center",display:"flex",flexDirection:"column",height:"100vh",justifyContent:"center",width:"100vw"}},o.createElement("div",{style:{fontSize:"25vh"}},"🔥"),o.createElement("h1",null,this.props.code),o.createElement("strong",null,this.props.message),o.createElement("p",{style:{textAlign:"center"}},"Change me in ",o.createElement("code",null,"components/ErrorPage/ErrorPage.tsx"),". ",o.createElement("br",null),"The 404 route is defined in ",o.createElement("code",null,"index.tsx"),"."),o.createElement(N.a,{to:y.basePath},"Back to index"))}}]),t}();function F(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}!function(e,t,n){t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n}(q,"defaultProps",{code:"?",message:"An error has occurred."});!function(){var e=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({actionsBlacklist:[]}):a.d,t=(0,{browser:u.a,hash:f.a}[y.historyType])({basename:y.basePath}),n=Object(a.c)(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){F(e,t,n[t])})}return e}({},k)),l=Object(c.connectRouter)(t)(n),d=[i.a,Object(c.routerMiddleware)(t)],b=Object(a.e)(l,e(a.a.apply(void 0,d)));r.render(o.createElement(s.Provider,{store:b},o.createElement(c.ConnectedRouter,{history:t},o.createElement(m.a,null,o.createElement(p.a,{path:"/counter",component:E}),o.createElement(p.a,{path:"/",exact:!0,component:E}),o.createElement(p.a,{path:"/",render:function(){return o.createElement(q,{code:"404",message:"Page not found"})}})))),document.getElementById("root"))}()},"./src/styles/root.scss":function(e,t,n){var o=n("./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js!./src/styles/root.scss");"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n("./node_modules/style-loader/lib/addStyles.js")(o,r);o.locals&&(e.exports=o.locals)}});