"use strict";(self.webpackChunkmetamask_io=self.webpackChunkmetamask_io||[]).push([[213],{19662:function(t,r,n){var e=n(60614),o=n(66330),i=TypeError;t.exports=function(t){if(e(t))return t;throw i(o(t)+" is not a function")}},96077:function(t,r,n){var e=n(60614),o=String,i=TypeError;t.exports=function(t){if("object"==typeof t||e(t))return t;throw i("Can't set "+o(t)+" as a prototype")}},19670:function(t,r,n){var e=n(70111),o=String,i=TypeError;t.exports=function(t){if(e(t))return t;throw i(o(t)+" is not an object")}},23013:function(t){t.exports="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView},90260:function(t,r,n){var e,o,i,u=n(23013),c=n(19781),a=n(17854),f=n(60614),p=n(70111),s=n(92597),y=n(70648),v=n(66330),l=n(68880),h=n(98052),g=n(47045),b=n(47976),d=n(79518),x=n(27674),m=n(5112),A=n(69711),w=n(29909),S=w.enforce,O=w.get,T=a.Int8Array,j=T&&T.prototype,_=a.Uint8ClampedArray,E=_&&_.prototype,P=T&&d(T),I=j&&d(j),M=Object.prototype,R=a.TypeError,C=m("toStringTag"),F=A("TYPED_ARRAY_TAG"),D="TypedArrayConstructor",k=u&&!!x&&"Opera"!==y(a.opera),U=!1,W={Int8Array:1,Uint8Array:1,Uint8ClampedArray:1,Int16Array:2,Uint16Array:2,Int32Array:4,Uint32Array:4,Float32Array:4,Float64Array:8},B={BigInt64Array:8,BigUint64Array:8},V=function(t){var r=d(t);if(p(r)){var n=O(r);return n&&s(n,D)?n[D]:V(r)}},z=function(t){if(!p(t))return!1;var r=y(t);return s(W,r)||s(B,r)};for(e in W)(i=(o=a[e])&&o.prototype)?S(i)[D]=o:k=!1;for(e in B)(i=(o=a[e])&&o.prototype)&&(S(i)[D]=o);if((!k||!f(P)||P===Function.prototype)&&(P=function(){throw R("Incorrect invocation")},k))for(e in W)a[e]&&x(a[e],P);if((!k||!I||I===M)&&(I=P.prototype,k))for(e in W)a[e]&&x(a[e].prototype,I);if(k&&d(E)!==I&&x(E,I),c&&!s(I,C))for(e in U=!0,g(I,C,{configurable:!0,get:function(){return p(this)?this[F]:void 0}}),W)a[e]&&l(a[e],F,e);t.exports={NATIVE_ARRAY_BUFFER_VIEWS:k,TYPED_ARRAY_TAG:U&&F,aTypedArray:function(t){if(z(t))return t;throw R("Target is not a typed array")},aTypedArrayConstructor:function(t){if(f(t)&&(!x||b(P,t)))return t;throw R(v(t)+" is not a typed array constructor")},exportTypedArrayMethod:function(t,r,n,e){if(c){if(n)for(var o in W){var i=a[o];if(i&&s(i.prototype,t))try{delete i.prototype[t]}catch(u){try{i.prototype[t]=r}catch(f){}}}I[t]&&!n||h(I,t,n?r:k&&j[t]||r,e)}},exportTypedArrayStaticMethod:function(t,r,n){var e,o;if(c){if(x){if(n)for(e in W)if((o=a[e])&&s(o,t))try{delete o[t]}catch(i){}if(P[t]&&!n)return;try{return h(P,t,n?r:k&&P[t]||r)}catch(i){}}for(e in W)!(o=a[e])||o[t]&&!n||h(o,t,r)}},getTypedArrayConstructor:V,isView:function(t){if(!p(t))return!1;var r=y(t);return"DataView"===r||s(W,r)||s(B,r)},isTypedArray:z,TypedArray:P,TypedArrayPrototype:I}},41589:function(t,r,n){var e=n(51400),o=n(26244),i=n(86135),u=Array,c=Math.max;t.exports=function(t,r,n){for(var a=o(t),f=e(r,a),p=e(void 0===n?a:n,a),s=u(c(p-f,0)),y=0;f<p;f++,y++)i(s,y,t[f]);return s.length=y,s}},94362:function(t,r,n){var e=n(41589),o=Math.floor,i=function(t,r){var n=t.length,a=o(n/2);return n<8?u(t,r):c(t,i(e(t,0,a),r),i(e(t,a),r),r)},u=function(t,r){for(var n,e,o=t.length,i=1;i<o;){for(e=i,n=t[i];e&&r(t[e-1],n)>0;)t[e]=t[--e];e!==i++&&(t[e]=n)}return t},c=function(t,r,n,e){for(var o=r.length,i=n.length,u=0,c=0;u<o||c<i;)t[u+c]=u<o&&c<i?e(r[u],n[c])<=0?r[u++]:n[c++]:u<o?r[u++]:n[c++];return t};t.exports=i},84326:function(t,r,n){var e=n(1702),o=e({}.toString),i=e("".slice);t.exports=function(t){return i(o(t),8,-1)}},70648:function(t,r,n){var e=n(51694),o=n(60614),i=n(84326),u=n(5112)("toStringTag"),c=Object,a="Arguments"===i(function(){return arguments}());t.exports=e?i:function(t){var r,n,e;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,r){try{return t[r]}catch(n){}}(r=c(t),u))?n:a?i(r):"Object"===(e=i(r))&&o(r.callee)?"Arguments":e}},49920:function(t,r,n){var e=n(47293);t.exports=!e((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},68880:function(t,r,n){var e=n(19781),o=n(3070),i=n(79114);t.exports=e?function(t,r,n){return o.f(t,r,i(1,n))}:function(t,r,n){return t[r]=n,t}},79114:function(t){t.exports=function(t,r){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:r}}},86135:function(t,r,n){var e=n(34948),o=n(3070),i=n(79114);t.exports=function(t,r,n){var u=e(r);u in t?o.f(t,u,i(0,n)):t[u]=n}},47045:function(t,r,n){var e=n(56339),o=n(3070);t.exports=function(t,r,n){return n.get&&e(n.get,r,{getter:!0}),n.set&&e(n.set,r,{setter:!0}),o.f(t,r,n)}},98052:function(t,r,n){var e=n(60614),o=n(3070),i=n(56339),u=n(13072);t.exports=function(t,r,n,c){c||(c={});var a=c.enumerable,f=void 0!==c.name?c.name:r;if(e(n)&&i(n,f,c),c.global)a?t[r]=n:u(r,n);else{try{c.unsafe?t[r]&&(a=!0):delete t[r]}catch(p){}a?t[r]=n:o.f(t,r,{value:n,enumerable:!1,configurable:!c.nonConfigurable,writable:!c.nonWritable})}return t}},13072:function(t,r,n){var e=n(17854),o=Object.defineProperty;t.exports=function(t,r){try{o(e,t,{value:r,configurable:!0,writable:!0})}catch(n){e[t]=r}return r}},19781:function(t,r,n){var e=n(47293);t.exports=!e((function(){return 7!==Object.defineProperty({},1,{get:function(){return 7}})[1]}))},4154:function(t){var r="object"==typeof document&&document.all,n=void 0===r&&void 0!==r;t.exports={all:r,IS_HTMLDDA:n}},80317:function(t,r,n){var e=n(17854),o=n(70111),i=e.document,u=o(i)&&o(i.createElement);t.exports=function(t){return u?i.createElement(t):{}}},68886:function(t,r,n){var e=n(88113).match(/firefox\/(\d+)/i);t.exports=!!e&&+e[1]},30256:function(t,r,n){var e=n(88113);t.exports=/MSIE|Trident/.test(e)},88113:function(t){t.exports="undefined"!=typeof navigator&&String(navigator.userAgent)||""},7392:function(t,r,n){var e,o,i=n(17854),u=n(88113),c=i.process,a=i.Deno,f=c&&c.versions||a&&a.version,p=f&&f.v8;p&&(o=(e=p.split("."))[0]>0&&e[0]<4?1:+(e[0]+e[1])),!o&&u&&(!(e=u.match(/Edge\/(\d+)/))||e[1]>=74)&&(e=u.match(/Chrome\/(\d+)/))&&(o=+e[1]),t.exports=o},98008:function(t,r,n){var e=n(88113).match(/AppleWebKit\/(\d+)\./);t.exports=!!e&&+e[1]},47293:function(t){t.exports=function(t){try{return!!t()}catch(r){return!0}}},34374:function(t,r,n){var e=n(47293);t.exports=!e((function(){var t=function(){}.bind();return"function"!=typeof t||t.hasOwnProperty("prototype")}))},46916:function(t,r,n){var e=n(34374),o=Function.prototype.call;t.exports=e?o.bind(o):function(){return o.apply(o,arguments)}},76530:function(t,r,n){var e=n(19781),o=n(92597),i=Function.prototype,u=e&&Object.getOwnPropertyDescriptor,c=o(i,"name"),a=c&&"something"===function(){}.name,f=c&&(!e||e&&u(i,"name").configurable);t.exports={EXISTS:c,PROPER:a,CONFIGURABLE:f}},75668:function(t,r,n){var e=n(1702),o=n(19662);t.exports=function(t,r,n){try{return e(o(Object.getOwnPropertyDescriptor(t,r)[n]))}catch(i){}}},21470:function(t,r,n){var e=n(84326),o=n(1702);t.exports=function(t){if("Function"===e(t))return o(t)}},1702:function(t,r,n){var e=n(34374),o=Function.prototype,i=o.call,u=e&&o.bind.bind(i,i);t.exports=e?u:function(t){return function(){return i.apply(t,arguments)}}},35005:function(t,r,n){var e=n(17854),o=n(60614);t.exports=function(t,r){return arguments.length<2?(n=e[t],o(n)?n:void 0):e[t]&&e[t][r];var n}},58173:function(t,r,n){var e=n(19662),o=n(68554);t.exports=function(t,r){var n=t[r];return o(n)?void 0:e(n)}},17854:function(t,r,n){var e=function(t){return t&&t.Math===Math&&t};t.exports=e("object"==typeof globalThis&&globalThis)||e("object"==typeof window&&window)||e("object"==typeof self&&self)||e("object"==typeof n.g&&n.g)||function(){return this}()||this||Function("return this")()},92597:function(t,r,n){var e=n(1702),o=n(47908),i=e({}.hasOwnProperty);t.exports=Object.hasOwn||function(t,r){return i(o(t),r)}},3501:function(t){t.exports={}},64664:function(t,r,n){var e=n(19781),o=n(47293),i=n(80317);t.exports=!e&&!o((function(){return 7!==Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},42788:function(t,r,n){var e=n(1702),o=n(60614),i=n(5465),u=e(Function.toString);o(i.inspectSource)||(i.inspectSource=function(t){return u(t)}),t.exports=i.inspectSource},29909:function(t,r,n){var e,o,i,u=n(94811),c=n(17854),a=n(70111),f=n(68880),p=n(92597),s=n(5465),y=n(6200),v=n(3501),l="Object already initialized",h=c.TypeError,g=c.WeakMap;if(u||s.state){var b=s.state||(s.state=new g);b.get=b.get,b.has=b.has,b.set=b.set,e=function(t,r){if(b.has(t))throw h(l);return r.facade=t,b.set(t,r),r},o=function(t){return b.get(t)||{}},i=function(t){return b.has(t)}}else{var d=y("state");v[d]=!0,e=function(t,r){if(p(t,d))throw h(l);return r.facade=t,f(t,d,r),r},o=function(t){return p(t,d)?t[d]:{}},i=function(t){return p(t,d)}}t.exports={set:e,get:o,has:i,enforce:function(t){return i(t)?o(t):e(t,{})},getterFor:function(t){return function(r){var n;if(!a(r)||(n=o(r)).type!==t)throw h("Incompatible receiver, "+t+" required");return n}}}},60614:function(t,r,n){var e=n(4154),o=e.all;t.exports=e.IS_HTMLDDA?function(t){return"function"==typeof t||t===o}:function(t){return"function"==typeof t}},68554:function(t){t.exports=function(t){return null==t}},70111:function(t,r,n){var e=n(60614),o=n(4154),i=o.all;t.exports=o.IS_HTMLDDA?function(t){return"object"==typeof t?null!==t:e(t)||t===i}:function(t){return"object"==typeof t?null!==t:e(t)}},31913:function(t){t.exports=!1},52190:function(t,r,n){var e=n(35005),o=n(60614),i=n(47976),u=n(43307),c=Object;t.exports=u?function(t){return"symbol"==typeof t}:function(t){var r=e("Symbol");return o(r)&&i(r.prototype,c(t))}},26244:function(t,r,n){var e=n(17466);t.exports=function(t){return e(t.length)}},56339:function(t,r,n){var e=n(1702),o=n(47293),i=n(60614),u=n(92597),c=n(19781),a=n(76530).CONFIGURABLE,f=n(42788),p=n(29909),s=p.enforce,y=p.get,v=String,l=Object.defineProperty,h=e("".slice),g=e("".replace),b=e([].join),d=c&&!o((function(){return 8!==l((function(){}),"length",{value:8}).length})),x=String(String).split("String"),m=t.exports=function(t,r,n){"Symbol("===h(v(r),0,7)&&(r="["+g(v(r),/^Symbol\(([^)]*)\)/,"$1")+"]"),n&&n.getter&&(r="get "+r),n&&n.setter&&(r="set "+r),(!u(t,"name")||a&&t.name!==r)&&(c?l(t,"name",{value:r,configurable:!0}):t.name=r),d&&n&&u(n,"arity")&&t.length!==n.arity&&l(t,"length",{value:n.arity});try{n&&u(n,"constructor")&&n.constructor?c&&l(t,"prototype",{writable:!1}):t.prototype&&(t.prototype=void 0)}catch(o){}var e=s(t);return u(e,"source")||(e.source=b(x,"string"==typeof r?r:"")),t};Function.prototype.toString=m((function(){return i(this)&&y(this).source||f(this)}),"toString")},74758:function(t){var r=Math.ceil,n=Math.floor;t.exports=Math.trunc||function(t){var e=+t;return(e>0?n:r)(e)}},3070:function(t,r,n){var e=n(19781),o=n(64664),i=n(3353),u=n(19670),c=n(34948),a=TypeError,f=Object.defineProperty,p=Object.getOwnPropertyDescriptor,s="enumerable",y="configurable",v="writable";r.f=e?i?function(t,r,n){if(u(t),r=c(r),u(n),"function"==typeof t&&"prototype"===r&&"value"in n&&v in n&&!n[v]){var e=p(t,r);e&&e[v]&&(t[r]=n.value,n={configurable:y in n?n[y]:e[y],enumerable:s in n?n[s]:e[s],writable:!1})}return f(t,r,n)}:f:function(t,r,n){if(u(t),r=c(r),u(n),o)try{return f(t,r,n)}catch(e){}if("get"in n||"set"in n)throw a("Accessors not supported");return"value"in n&&(t[r]=n.value),t}},79518:function(t,r,n){var e=n(92597),o=n(60614),i=n(47908),u=n(6200),c=n(49920),a=u("IE_PROTO"),f=Object,p=f.prototype;t.exports=c?f.getPrototypeOf:function(t){var r=i(t);if(e(r,a))return r[a];var n=r.constructor;return o(n)&&r instanceof n?n.prototype:r instanceof f?p:null}},47976:function(t,r,n){var e=n(1702);t.exports=e({}.isPrototypeOf)},27674:function(t,r,n){var e=n(75668),o=n(19670),i=n(96077);t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var t,r=!1,n={};try{(t=e(Object.prototype,"__proto__","set"))(n,[]),r=n instanceof Array}catch(u){}return function(n,e){return o(n),i(e),r?t(n,e):n.__proto__=e,n}}():void 0)},92140:function(t,r,n){var e=n(46916),o=n(60614),i=n(70111),u=TypeError;t.exports=function(t,r){var n,c;if("string"===r&&o(n=t.toString)&&!i(c=e(n,t)))return c;if(o(n=t.valueOf)&&!i(c=e(n,t)))return c;if("string"!==r&&o(n=t.toString)&&!i(c=e(n,t)))return c;throw u("Can't convert object to primitive value")}},84488:function(t,r,n){var e=n(68554),o=TypeError;t.exports=function(t){if(e(t))throw o("Can't call method on "+t);return t}},6200:function(t,r,n){var e=n(72309),o=n(69711),i=e("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},5465:function(t,r,n){var e=n(17854),o=n(13072),i="__core-js_shared__",u=e[i]||o(i,{});t.exports=u},72309:function(t,r,n){var e=n(31913),o=n(5465);(t.exports=function(t,r){return o[t]||(o[t]=void 0!==r?r:{})})("versions",[]).push({version:"3.32.1",mode:e?"pure":"global",copyright:"© 2014-2023 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.32.1/LICENSE",source:"https://github.com/zloirock/core-js"})},36293:function(t,r,n){var e=n(7392),o=n(47293),i=n(17854).String;t.exports=!!Object.getOwnPropertySymbols&&!o((function(){var t=Symbol("symbol detection");return!i(t)||!(Object(t)instanceof Symbol)||!Symbol.sham&&e&&e<41}))},51400:function(t,r,n){var e=n(19303),o=Math.max,i=Math.min;t.exports=function(t,r){var n=e(t);return n<0?o(n+r,0):i(n,r)}},19303:function(t,r,n){var e=n(74758);t.exports=function(t){var r=+t;return r!=r||0===r?0:e(r)}},17466:function(t,r,n){var e=n(19303),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},47908:function(t,r,n){var e=n(84488),o=Object;t.exports=function(t){return o(e(t))}},84590:function(t,r,n){var e=n(73002),o=RangeError;t.exports=function(t,r){var n=e(t);if(n%r)throw o("Wrong offset");return n}},73002:function(t,r,n){var e=n(19303),o=RangeError;t.exports=function(t){var r=e(t);if(r<0)throw o("The argument can't be less than 0");return r}},57593:function(t,r,n){var e=n(46916),o=n(70111),i=n(52190),u=n(58173),c=n(92140),a=n(5112),f=TypeError,p=a("toPrimitive");t.exports=function(t,r){if(!o(t)||i(t))return t;var n,a=u(t,p);if(a){if(void 0===r&&(r="default"),n=e(a,t,r),!o(n)||i(n))return n;throw f("Can't convert object to primitive value")}return void 0===r&&(r="number"),c(t,r)}},34948:function(t,r,n){var e=n(57593),o=n(52190);t.exports=function(t){var r=e(t,"string");return o(r)?r:r+""}},51694:function(t,r,n){var e={};e[n(5112)("toStringTag")]="z",t.exports="[object z]"===String(e)},66330:function(t){var r=String;t.exports=function(t){try{return r(t)}catch(n){return"Object"}}},69711:function(t,r,n){var e=n(1702),o=0,i=Math.random(),u=e(1..toString);t.exports=function(t){return"Symbol("+(void 0===t?"":t)+")_"+u(++o+i,36)}},43307:function(t,r,n){var e=n(36293);t.exports=e&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},3353:function(t,r,n){var e=n(19781),o=n(47293);t.exports=e&&o((function(){return 42!==Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype}))},94811:function(t,r,n){var e=n(17854),o=n(60614),i=e.WeakMap;t.exports=o(i)&&/native code/.test(String(i))},5112:function(t,r,n){var e=n(17854),o=n(72309),i=n(92597),u=n(69711),c=n(36293),a=n(43307),f=e.Symbol,p=o("wks"),s=a?f.for||f:f&&f.withoutSetter||u;t.exports=function(t){return i(p,t)||(p[t]=c&&i(f,t)?f[t]:s("Symbol."+t)),p[t]}},3462:function(t,r,n){var e=n(17854),o=n(46916),i=n(90260),u=n(26244),c=n(84590),a=n(47908),f=n(47293),p=e.RangeError,s=e.Int8Array,y=s&&s.prototype,v=y&&y.set,l=i.aTypedArray,h=i.exportTypedArrayMethod,g=!f((function(){var t=new Uint8ClampedArray(2);return o(v,t,{length:1,0:3},1),3!==t[1]})),b=g&&i.NATIVE_ARRAY_BUFFER_VIEWS&&f((function(){var t=new s(2);return t.set(1),t.set("2",1),0!==t[0]||2!==t[1]}));h("set",(function(t){l(this);var r=c(arguments.length>1?arguments[1]:void 0,1),n=a(t);if(g)return o(v,this,n,r);var e=this.length,i=u(n),f=0;if(i+r>e)throw p("Wrong length");for(;f<i;)this[r+f]=n[f++]}),!g||b)},33824:function(t,r,n){var e=n(17854),o=n(21470),i=n(47293),u=n(19662),c=n(94362),a=n(90260),f=n(68886),p=n(30256),s=n(7392),y=n(98008),v=a.aTypedArray,l=a.exportTypedArrayMethod,h=e.Uint16Array,g=h&&o(h.prototype.sort),b=!(!g||i((function(){g(new h(2),null)}))&&i((function(){g(new h(2),{})}))),d=!!g&&!i((function(){if(s)return s<74;if(f)return f<67;if(p)return!0;if(y)return y<602;var t,r,n=new h(516),e=Array(516);for(t=0;t<516;t++)r=t%4,n[t]=515-t,e[t]=t-2*r+3;for(g(n,(function(t,r){return(t/4|0)-(r/4|0)})),t=0;t<516;t++)if(n[t]!==e[t])return!0}));l("sort",(function(t){return void 0!==t&&u(t),d?g(this,t):c(v(this),function(t){return function(r,n){return void 0!==t?+t(r,n)||0:n!=n?-1:r!=r?1:0===r&&0===n?1/r>0&&1/n<0?1:-1:r>n}}(t))}),!d||b)}}]);
//# sourceMappingURL=62f7dd16cbc2d88284fc5ae01a14ef8af72b1a3c-a02fafe0dcb4baef9ea5.js.map