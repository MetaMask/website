(self.webpackChunkmetamask_io=self.webpackChunkmetamask_io||[]).push([[525],{76886:function(n,r,e){"use strict";e.r(r);var t=e(67294),i=e(29945),o=e(35657),u=e(40776),a=e(75472),l=e.n(a),c=e(69579),f=e.n(c),v=e(18963);r.default=function(n){var r,e,a,c;const{data:{header:s,footer:d,author:{name:g,position:h,image:p,expertise:x,education:m,description:k,twitter:b,linkedin:w,seo:D,news:Z},heroBg:B,heroBgDark:I,bgImage:U,bgImageDark:C},pageContext:{pathBuild:F,localizedPages:P}}=n,j=(0,i.Z)(null==B||null===(r=B.file)||void 0===r?void 0:r.url),y=(0,i.Z)(null==I||null===(e=I.file)||void 0===e?void 0:e.url),z=(0,i.Z)(null==U||null===(a=U.file)||void 0===a?void 0:a.url),A=(0,i.Z)(null==C||null===(c=C.file)||void 0===c?void 0:c.url),{childMarkdownRemark:{html:E}={}}=k||{},{childMarkdownRemark:{html:M}={}}=m||{};let O=l()(Z,(n=>new Date(n.publishDate)),"asc");return O=f()(O,3),t.createElement(u.Z,{localizedPages:P},D&&(0,o.F)({...D,pagePath:F}),s&&(0,o.F)(s),t.createElement(v.Z,{name:g,position:h,description:E,education:M,image:p,expertise:x,twitter:b,linkedin:w,relatedNews:O,heroBgUrl:j,heroBgDarkUrl:y,bgImageUrl:z,bgImageDarkUrl:A}),d&&(0,o.F)(d))}},89881:function(n,r,e){var t=e(47816),i=e(99291)(t);n.exports=i},28483:function(n,r,e){var t=e(25063)();n.exports=t},47816:function(n,r,e){var t=e(28483),i=e(3674);n.exports=function(n,r){return n&&t(n,r,i)}},69199:function(n,r,e){var t=e(89881),i=e(98612);n.exports=function(n,r){var e=-1,o=i(n)?Array(n.length):[];return t(n,(function(n,t,i){o[++e]=r(n,t,i)})),o}},82689:function(n,r,e){var t=e(29932),i=e(97786),o=e(67206),u=e(69199),a=e(71131),l=e(7518),c=e(85022),f=e(6557),v=e(1469);n.exports=function(n,r,e){r=r.length?t(r,(function(n){return v(n)?function(r){return i(r,1===n.length?n[0]:n)}:n})):[f];var s=-1;r=t(r,l(o));var d=u(n,(function(n,e,i){return{criteria:t(r,(function(r){return r(n)})),index:++s,value:n}}));return a(d,(function(n,r){return c(n,r,e)}))}},14259:function(n){n.exports=function(n,r,e){var t=-1,i=n.length;r<0&&(r=-r>i?0:i+r),(e=e>i?i:e)<0&&(e+=i),i=r>e?0:e-r>>>0,r>>>=0;for(var o=Array(i);++t<i;)o[t]=n[t+r];return o}},71131:function(n){n.exports=function(n,r){var e=n.length;for(n.sort(r);e--;)n[e]=n[e].value;return n}},26393:function(n,r,e){var t=e(33448);n.exports=function(n,r){if(n!==r){var e=void 0!==n,i=null===n,o=n==n,u=t(n),a=void 0!==r,l=null===r,c=r==r,f=t(r);if(!l&&!f&&!u&&n>r||u&&a&&c&&!l&&!f||i&&a&&c||!e&&c||!o)return 1;if(!i&&!u&&!f&&n<r||f&&e&&o&&!i&&!u||l&&e&&o||!a&&o||!c)return-1}return 0}},85022:function(n,r,e){var t=e(26393);n.exports=function(n,r,e){for(var i=-1,o=n.criteria,u=r.criteria,a=o.length,l=e.length;++i<a;){var c=t(o[i],u[i]);if(c)return i>=l?c:c*("desc"==e[i]?-1:1)}return n.index-r.index}},99291:function(n,r,e){var t=e(98612);n.exports=function(n,r){return function(e,i){if(null==e)return e;if(!t(e))return n(e,i);for(var o=e.length,u=r?o:-1,a=Object(e);(r?u--:++u<o)&&!1!==i(a[u],u,a););return e}}},25063:function(n){n.exports=function(n){return function(r,e,t){for(var i=-1,o=Object(r),u=t(r),a=u.length;a--;){var l=u[n?a:++i];if(!1===e(o[l],l,o))break}return r}}},75472:function(n,r,e){var t=e(82689),i=e(1469);n.exports=function(n,r,e,o){return null==n?[]:(i(r)||(r=null==r?[]:[r]),i(e=o?void 0:e)||(e=null==e?[]:[e]),t(n,r,e))}},69579:function(n,r,e){var t=e(14259),i=e(40554);n.exports=function(n,r,e){var o=null==n?0:n.length;return o?(r=e||void 0===r?1:i(r),t(n,(r=o-r)<0?0:r,o)):[]}}}]);
//# sourceMappingURL=component---src-templates-author-profile-layout-js-affea44661e0616a835c.js.map