"use strict";(self.webpackChunkmetamask_io=self.webpackChunkmetamask_io||[]).push([[766],{2766:function(e,t,a){a.r(t);var n=a(35314),i=a(10159),o=a(92568),l=a(74716),r=a(96540),d=a(86225),m=a(58156),c=a.n(m),p=a(28840),s=a(5412);t.default=(0,o.withTheme)((e=>{var t;const{sharedCopy:a}=(0,r.useContext)(s.A),{item:o,id:m,previewMode:g}=e,{image:C,description:b}=o,v=g?b:null==b||null===(t=b.childMarkdownRemark)||void 0===t?void 0:t.html,k=(0,l.A)();let y,_,M,E,T,D,N=g?c()(o,"ctaCollection.items[0].downloadBrowsers"):c()(o,"cta[0].downloadBrowsers");N&&(N=g?N:N.map((e=>JSON.parse(e.internal.content))),y=N.find((e=>"ctaFirefox"===e.name)),_=N.find((e=>"ctaChrome"===e.name)),M=N.find((e=>"ctaOpera"===e.name)),E=N.find((e=>"ctaEdge"===e.name)),T=N.find((e=>"ctaChromeBrowser"===e.name)),D=N.find((e=>"ctaFirefoxBrowser"===e.name)));const B=g?c()(o,"ctaCollection.items"):o.cta,{0:F,1:I}=(0,r.useState)(y);let A,S;if((0,r.useEffect)((()=>{(async()=>{if("browser"===m&&"Firefox"===i.C0)try{const e=await fetch("https://addons.mozilla.org/api/v5/addons/addon/ether-metamask/"),t=await e.json(),a=c()(t,"current_version.file.url");a&&I({...F,ctaLink:a,newTab:!1})}catch(e){}})()}),[]),"browser"===m){const e="Chrome"===i.C0||"Brave"===i.C0,t="Firefox"===i.C0,n="Opera"===i.C0,o="Edge"===i.C0;k?A=[{..._,text:_.text.replace(/Chrome/g,"Chromium")}]:e||i.Fr?A=[_]:t?A=[F]:n?A=[M]:o?A=[E]:(S=i.C0+" "+a.browserNotSupported,A=[T,D]),A=A.map((e=>({displayText:e.text,internal:{type:"ContentfulCta"},ctaLink:e.link,buttonDisplay:!0,fontSize:"20px",newTab:!0,__typename:"Cta"})))}else A=B;return r.createElement(r.Fragment,null,v?r.createElement(f,null,r.createElement(d.A,null,v)):null,C?r.createElement(h,null,r.createElement(p.A,{image:C,previewMode:g})):null,r.createElement(u,null,S?r.createElement(x,null,S):null,r.createElement(w,null,A&&A.length?A.map((e=>(0,n.P)({...e,previewMode:g}))):null)))}));const f=o.default.h2.withConfig({displayName:"DownloadTab__Heading",componentId:"sc-f1ft5t-0"})(["font-size:35px;line-height:40px;font-weight:700;text-align:center;padding:20px 0;"]),h=o.default.div.withConfig({displayName:"DownloadTab__ImageWrapper",componentId:"sc-f1ft5t-1"})(["width:664px;max-width:100%;margin:20px auto 0;"]),u=o.default.div.withConfig({displayName:"DownloadTab__DownLoadWrapper",componentId:"sc-f1ft5t-2"})(["display:flex;padding:40px;align-items:center;justify-content:center;flex-direction:column;border-radius:10px;background-color:",";box-shadow:1px 1px 8px 1px ",";position:relative;text-align:center;@media (max-width:","){margin:0 -20px;}"],(e=>{let{theme:t}=e;return t.background.downloadCta}),(e=>{let{theme:t}=e;return t.background.downloadCtaShadow}),(e=>{let{theme:t}=e;return t.device.mobileMediaMax})),x=o.default.div.withConfig({displayName:"DownloadTab__HeadingCta",componentId:"sc-f1ft5t-3"})(["font-family:'Arial','Helvetica Neue','Helvetica',sans-serif;font-size:24px;margin-bottom:40px;line-height:1.3;max-width:880px;"]),w=o.default.div.withConfig({displayName:"DownloadTab__Buttons",componentId:"sc-f1ft5t-4"})(["display:flex;@media (max-width:","){display:block;text-align:center;}& > *{margin:0 20px;height:auto !important;padding:12px 20px !important;&:last-child:first-child{margin:0 !important;}@media (min-width:","){margin:0 60px;}@media (max-width:","){margin:10px;}@media (max-width:","){width:100%;}}"],(e=>{let{theme:t}=e;return t.device.tabletMediaMax}),(e=>{let{theme:t}=e;return t.device.miniDesktop}),(e=>{let{theme:t}=e;return t.device.tabletMediaMax}),(e=>{let{theme:t}=e;return t.device.mobileMediaMax}))}}]);
//# sourceMappingURL=766-fbd031d0a3d631ea26d0.js.map