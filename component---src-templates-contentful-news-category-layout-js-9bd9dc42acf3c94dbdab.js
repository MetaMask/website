(self.webpackChunkmetamask_io=self.webpackChunkmetamask_io||[]).push([[398],{98315:function(e,t,a){"use strict";a.r(t);var n=a(96540),r=a(64810),u=a(41231),o=a(35314),f=a(95799),i=a(86663),s=a(86462),c=a(14792),p=a.n(c);t.default=e=>{const{data:{seo:t,header:a,footer:c,layoutModuleContainer:l,hero:d,stories:g},pageContext:{pathBuild:v,locale:h=f.F3,totalItems:x,currentPage:P,category:m,localizedPages:C,totalPages:k,sharedCopy:y,slug:b,translation:E}={}}=e,L=(0,s.useLocation)(),{pathname:j,search:w}=L,A=g.nodes,D={...t};let M="Latest";return M=m?p()(m):"Latest",D.pageTitle="MetaMask | "+D.pageTitle+" | "+M,D.pageDescription=D.pageDescription+" | "+M,P&&P<k&&(D.paginationNext=1===P?v+"page/"+(P+1)+"/":v.replace(P,P+1)),P&&P>1&&(D.paginationPrev=2===P?v.replace("page/"+P+"/",""):v.replace(P,P-1)),(0,n.useEffect)((()=>{const e=i.parse(w),{page:t}=e;t>1&&(0,r.navigate)(j+"page/"+t+"/")}),[]),n.createElement(u.A,{locale:h,localizedPages:C,sharedCopy:y,translation:E},D&&(0,o.P)({...D,pagePath:v,originalSlug:b,translation:E}),a&&(0,o.P)({...a,translation:E}),d&&(0,o.P)(d),l&&(0,o.P)({...l,storiesData:{stories:A,totalItems:x,currentPage:P}}),c&&(0,o.P)(c))}},61074:function(e){e.exports=function(e){return e.split("")}},25160:function(e){e.exports=function(e,t,a){var n=-1,r=e.length;t<0&&(t=-t>r?0:r+t),(a=a>r?r:a)<0&&(a+=r),r=t>a?0:a-t>>>0,t>>>=0;for(var u=Array(r);++n<r;)u[n]=e[n+t];return u}},28754:function(e,t,a){var n=a(25160);e.exports=function(e,t,a){var r=e.length;return a=void 0===a?r:a,!t&&a>=r?e:n(e,t,a)}},12507:function(e,t,a){var n=a(28754),r=a(49698),u=a(63912),o=a(13222);e.exports=function(e){return function(t){t=o(t);var a=r(t)?u(t):void 0,f=a?a[0]:t.charAt(0),i=a?n(a,1).join(""):t.slice(1);return f[e]()+i}}},49698:function(e){var t=RegExp("[\\u200d\\ud800-\\udfff\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\ufe0e\\ufe0f]");e.exports=function(e){return t.test(e)}},63912:function(e,t,a){var n=a(61074),r=a(49698),u=a(42054);e.exports=function(e){return r(e)?u(e):n(e)}},42054:function(e){var t="\\ud800-\\udfff",a="["+t+"]",n="[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff]",r="\\ud83c[\\udffb-\\udfff]",u="[^"+t+"]",o="(?:\\ud83c[\\udde6-\\uddff]){2}",f="[\\ud800-\\udbff][\\udc00-\\udfff]",i="(?:"+n+"|"+r+")"+"?",s="[\\ufe0e\\ufe0f]?",c=s+i+("(?:\\u200d(?:"+[u,o,f].join("|")+")"+s+i+")*"),p="(?:"+[u+n+"?",n,o,f,a].join("|")+")",l=RegExp(r+"(?="+r+")|"+p+c,"g");e.exports=function(e){return e.match(l)||[]}},14792:function(e,t,a){var n=a(13222),r=a(55808);e.exports=function(e){return r(n(e).toLowerCase())}},55808:function(e,t,a){var n=a(12507)("toUpperCase");e.exports=n}}]);
//# sourceMappingURL=component---src-templates-contentful-news-category-layout-js-9bd9dc42acf3c94dbdab.js.map