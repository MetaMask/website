"use strict";(self.webpackChunkmetamask_io=self.webpackChunkmetamask_io||[]).push([[570],{67069:function(e,t,o){o.r(t);var n=o(17563),i=o(67294),l=o(12788),r=o(17300),a=o(23949),d=o(35657),s=o(8811),u=o(94739);const c=l.default.div.withConfig({displayName:"preview__PreviewInfo",componentId:"sc-kbl5x2-0"})(["width:140px;height:35px;background-color:lightyellow;color:red;text-align:center;line-height:31px;font-weight:bold;border:2px solid lightgoldenrodyellow;border-radius:10px 10px 0 0;position:fixed;top:200px;left:-53px;z-index:2000;transform:rotate(90deg);"]);t.default=()=>{const{0:e,1:t}=(0,i.useState)(!0),{0:o,1:l}=(0,i.useState)(null),{0:p,1:v}=(0,i.useState)(null);return(0,i.useEffect)((()=>{(async()=>{var e;const{location:o}=window,i=n.parse(null!==(e=o.search)&&void 0!==e?e:""),r=i.module_id;if(i.environment&&"master"===i.environment)return delete i.environment,window.location.href="https://metamask.io"+o.pathname+"?"+n.stringify(i);try{if(!r)return t(!1),void v({message:"No module id provided to preview"});const e=await(0,a.oG)(r);if(!e)return t(!1),void v({message:"Failed to fetch contentful type name"});const{data:o}=await(0,a.pN)(e,r);if(o){var d,s;const e=null===(d=o.previewContent)||void 0===d?void 0:d.__typename,n=(null===(s=o.previewContent)||void 0===s?void 0:s.sys.id)||void 0,i={...o.previewContent,internal:{type:(0,a.kU)(e)},contentful_id:n};return t(!1),void l(i)}}catch(p){console.log("Fetch preview data error: ",p)}t(!1),v({message:"Failed to fetch preview data"})})()}),[]),e?i.createElement(r.Z,null):"/portfolio/"===(null==o?void 0:o.slug)?i.createElement(u.default,{data:o}):o?i.createElement(s.Z,{themeColor:null==o?void 0:o.themeColor,h2FontSize:null==o?void 0:o.h2FontSize,widerContainer:null==o?void 0:o.widerContainer},i.createElement(c,null,"Preview mode"),(0,d.F)(o)):i.createElement("h4",null,"Failed to load preview component: ",null==p?void 0:p.message)}}}]);
//# sourceMappingURL=component---src-pages-preview-js-a8c8965704202d301670.js.map