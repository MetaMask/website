"use strict";(self.webpackChunkmetamask_io=self.webpackChunkmetamask_io||[]).push([[70],{51684:function(e,t,a){a.d(t,{Z:function(){return s}});var r={};a.r(r),a.d(r,{contain:function(){return o},cover:function(){return n},wrapper:function(){return i}});var o="picture-module--contain--200cf",n="picture-module--cover--9358b",i="picture-module--wrapper--6ddfa",l=a(67294);var s=e=>{let{src:t,alt:a,width:o,height:n,fit:s,className:d,lazy:c=!0}=e;const u=(n/o*100).toFixed(2);return l.createElement("div",{className:i+" "+(s?r[s]:"")+" "+(null!=d?d:""),style:{"--pb":u+"%"}},l.createElement("picture",null,l.createElement("source",{srcSet:t.replace(/\.[^.]+$/,".avif"),type:"image/avif"}),l.createElement("source",{srcSet:t.replace(/\.[^.]+$/,".webp"),type:"image/webp"}),l.createElement("img",{src:t,alt:a,draggable:"false",decoding:"async",loading:c?"lazy":"eager"})))}},25675:function(e,t,a){var r=a(67294),o=a(12788),n=a(38753),i=function(e){return r.createElement("svg",e,r.createElement("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M0.396 1.28534C0.422808 1.06019 0.502289 0.844368 0.628113 0.655048C0.753937 0.465728 0.922628 0.308146 1.12075 0.194851C1.31887 0.0815572 1.54094 0.0156823 1.76929 0.00247362C1.99763 -0.0107351 2.22593 0.0290874 2.436 0.118769C3.498 0.568744 5.878 1.63818 8.898 3.36573C11.919 5.09427 14.044 6.60376 14.967 7.28864C15.755 7.8744 15.757 9.03601 14.968 9.62375C14.054 10.3047 11.955 11.7943 8.898 13.5447C5.838 15.295 3.486 16.3516 2.434 16.7956C1.528 17.1792 0.514 16.5974 0.396 15.629C0.258 14.4972 0 11.9271 0 8.45619C0 4.98722 0.257 2.4182 0.396 1.28534Z",fill:"#1E1F25"}))};i.defaultProps={width:"16",height:"17",viewBox:"0 0 16 17",fill:"none",xmlns:"http://www.w3.org/2000/svg"};t.Z=e=>{const{posterImage:t,onClick:a}=e,{0:o,1:n}=(0,r.useState)(!1);return r.createElement(l,null,r.createElement(s,{onClick:a},r.createElement(d,{$visible:o},r.createElement(c,{onLoad:()=>n(!0),src:t}),r.createElement(u,null,r.createElement(i,null),r.createElement("svg",{viewBox:"0 0 100 100",fill:"none",xmlns:"http://www.w3.org/2000/svg"},r.createElement("rect",{x:"0",y:"0",width:"100",height:"100",rx:"50",stroke:"currentColor",strokeWidth:"2"}))))))};const l=o.default.div.withConfig({displayName:"VideoButton__VideoPlayerWrapper",componentId:"sc-ai1069-0"})(["position:relative;"]),s=o.default.button.withConfig({displayName:"VideoButton__VideoPlayer",componentId:"sc-ai1069-1"})(["position:relative;width:100%;margin-top:35px;border:0;padding:56.25% 0 0 0;border-radius:8px;overflow:hidden;cursor:pointer;background-color:#e7e7e7;&::after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.085);opacity:0;transition:transform 0.4s cubic-bezier(0.455,0.03,0.515,0.955),opacity 0.4s cubic-bezier(0.455,0.03,0.515,0.955);pointer-events:none;}&:hover{::after{opacity:1;}}"]),d=o.default.div.withConfig({displayName:"VideoButton__Content",componentId:"sc-ai1069-2"})(["opacity:",";transition:opacity 0.25s ease-out;"],(e=>{let{$visible:t}=e;return t?"1":"0"})),c=(0,o.default)(n.Z).withConfig({displayName:"VideoButton__PosterImage",componentId:"sc-ai1069-3"})(["position:absolute;width:100%;height:100%;top:0;left:0;object-fit:cover;pointer-events:none;"]),u=o.default.div.withConfig({displayName:"VideoButton__PlayButton",componentId:"sc-ai1069-4"})(["position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:100px;height:100px;display:flex;justify-content:center;align-items:center;background:#ffffff;border:0;box-shadow:0px 0px 8px rgba(0,0,0,0.2);border-radius:100px;overflow:hidden;z-index:2;svg{&:nth-child(2){position:absolute;top:0;left:0;width:100%;height:100%;stroke-dasharray:320;stroke-dashoffset:320;transition:stroke-dashoffset 0.4s ease-out;",":hover &{stroke-dashoffset:0;}}}"],s)},36330:function(e,t,a){var r=a(67294),o=a(95716),n=a(12788),i=a(94184),l=a.n(i),s=a(32174);t.Z=e=>{const{embedUrl:t,setVideoEmbedUrl:a}=e,n=(0,r.useRef)(null),i=o.p8.utils.selector(n),{0:s,1:p}=(0,r.useState)(!1),{0:h,1:g}=(0,r.useState)(!1),w=()=>{g(!0),p(!1),y(b)},b=()=>{a(null),g(!0)},y=e=>{const t=i("."+c.styledComponentId),a=i("."+u.styledComponentId);o.p8.timeline({defaults:{ease:"expo.inOut"}}).addLabel("start").fromTo(a,{scale:1,autoAlpha:1},{scale:.9,autoAlpha:0,duration:.75,onComplete:()=>e&&e()},"start").fromTo(t,{autoAlpha:1},{autoAlpha:0,duration:.75},"start")};return(0,r.useEffect)((()=>(p(!0),(()=>{const e=i("."+c.styledComponentId),t=i("."+u.styledComponentId);o.p8.timeline({defaults:{ease:"expo.out"}}).addLabel("start").fromTo(t,{scale:.9,autoAlpha:0},{scale:1,autoAlpha:1,duration:.75},"start").fromTo(e,{autoAlpha:0},{autoAlpha:1,duration:.75},"start")})(),()=>a(null))),[]),r.createElement(d,{ref:n,className:l()({showVideo:s,hideVideo:h})},r.createElement(c,{onClick:w}),r.createElement("div",null,r.createElement(u,null,r.createElement(m,{width:"100%",height:"100%",src:t,title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowfullscreen:!0}))),r.createElement(f,{iconClose:!0,isCircular:!0,onClick:w}))};const d=n.default.div.withConfig({displayName:"VideoModal__Wrapper",componentId:"sc-g40upd-0"})(["position:fixed;top:0;left:0;width:100%;height:100vh;display:flex;justify-content:center;align-items:center;z-index:40;"]),c=n.default.div.withConfig({displayName:"VideoModal__BgOverlay",componentId:"sc-g40upd-1"})(["position:fixed;width:100%;height:100%;top:0;left:0;background-color:rgba(30,31,37,0.8);@media (max-width:","){background-color:rgba(0,0,0,0.8);}"],(e=>{let{theme:t}=e;return t.device.miniDesktop})),u=n.default.div.withConfig({displayName:"VideoModal__Content",componentId:"sc-g40upd-2"})(["position:relative;display:table-cell;width:77vw;max-width:2200px;padding-top:56.25%;background-color:black;@media (min-width:",") and (max-height:800px){width:57vw;}@media (min-width:",") and (max-height:550px){width:47vw;}@media (max-width:","){width:100vw;max-width:none;}"],(e=>{let{theme:t}=e;return t.device.miniDesktop}),(e=>{let{theme:t}=e;return t.device.miniDesktop}),(e=>{let{theme:t}=e;return t.device.miniDesktop})),m=n.default.iframe.withConfig({displayName:"VideoModal__VideoEmbed",componentId:"sc-g40upd-3"})(["position:absolute;width:100%;height:100%;top:0;left:0;border:0;"]),p=(0,n.keyframes)(["0%{scale:1;opacity:1;transform:rotate(0deg);}100%{scale:0.5;opacity:0;transform:rotate(180deg);}"]),f=(0,n.default)(s.Z).withConfig({displayName:"VideoModal__CloseBtn",componentId:"sc-g40upd-4"})(["position:absolute;top:3vh;left:50%;margin-left:-26px;transform:scale(1);transition:all 0.3s;transform-origin:center;z-index:10;opacity:0;.hideVideo &{animation:"," 0.35s ease-out forwards;}@media (max-width:","){margin-left:-19px;}"],p,(e=>{let{theme:t}=e;return t.device.tablet}))},32174:function(e,t,a){var r=a(67294),o=a(12788),n=a(94184),i=a.n(n);t.Z=e=>{const{children:t,onClick:a,onMouseEnter:o,onMouseLeave:n,as:l,href:s,target:d,rel:c,isCircular:h,backgroundColor:g,textColor:w,iconClose:b=!1,short:y=!1,darkMobile:v=!1,hoverCircle:k=!1,styles:E="",...x}=e;return r.createElement(f,Object.assign({as:l,href:s,target:d,rel:c,$isCircular:h,$backgroundColor:g,$textColor:w,onClick:a,onMouseEnter:o,onMouseLeave:n,$isShort:y,$hoverCircle:k,className:i()({darkMobile:v}),$styles:E},x),b?r.createElement(u,null,r.createElement(m,null,r.createElement("div",null)),r.createElement(p,null,r.createElement("div",null))):t)};const l=(0,o.keyframes)(["0%{transform:rotate(180deg);}100%{transform:rotate(0deg);}"]),s=(0,o.keyframes)(["0%{transform:rotate(0deg);}100%{transform:rotate(180deg);}"]),d=(0,o.keyframes)(["0%{scale:0;opacity:0.4;}100%{scale:1;opacity:1;}"]),c=(0,o.keyframes)(["0%{scale:1;opacity:1;}100%{scale:0.5;opacity:0;}"]),u=o.default.div.withConfig({displayName:"ButtonShadow__Cross",componentId:"sc-136udbh-0"})(["position:relative;width:10px;height:10px;animation:"," 0.35s ease-out forwards;.show &{animation:"," 0.35s ease-out 0.75s forwards;}"],s,l),m=o.default.div.withConfig({displayName:"ButtonShadow__Line1",componentId:"sc-136udbh-1"})(["position:absolute;top:0;left:0;display:flex;justify-content:center;align-items:center;width:100%;height:100%;transition:all 0.25s ease-in-out;& > div{width:1.76px;height:13.41px;background-color:#161616;border-radius:0.88px;transform:rotate(45deg);transform-origin:center;will-change:transform;@media (max-width:","){.darkMobile &{background-color:#ffffff;}}}"],(e=>{let{theme:t}=e;return t.device.miniDesktop})),p=o.default.div.withConfig({displayName:"ButtonShadow__Line2",componentId:"sc-136udbh-2"})(["position:absolute;top:0;left:0;display:flex;justify-content:center;align-items:center;width:100%;height:100%;transition:all 0.25s ease-in 0.1s;& > div{width:1.76px;height:13.41px;background-color:#161616;border-radius:0.88px;transform:rotate(-45deg);transform-origin:center;will-change:transform;@media (max-width:","){.darkMobile &{background-color:#ffffff;}}}"],(e=>{let{theme:t}=e;return t.device.miniDesktop})),f=o.default.button.withConfig({displayName:"ButtonShadow__ButtonElement",componentId:"sc-136udbh-3"})(["position:relative;width:",";height:",";display:flex;align-items:center;justify-content:center;border:0;border-radius:100px;padding:",";box-shadow:0px 0px 8px rgba(0,0,0,0.2);cursor:pointer;color:",";background-color:",";font-weight:500;font-size:16px;line-height:1.2;letter-spacing:-0.02em;text-align:center;overflow:hidden;pointer-events:all;.show &{animation:"," 0.35s ease-out 0.75s forwards;}.hide &{animation:"," 0.35s ease-out forwards;}@media (max-width:","){height:38px;width:",";}@media (max-width:","){&.darkMobile{background-color:transparent;border:1px solid rgba(255,255,255,0.2);}}&::after{content:'';left:50%;top:100%;width:150%;height:auto;aspect-ratio:1/1;border-radius:50%;position:absolute;transform:translate(-50%,0);z-index:1;transition:transform 0.4s cubic-bezier(0.455,0.03,0.515,0.955);background-color:rgba(0,0,0,0.085);pointer-events:none;display:",";}&:focus{outline:none;}&:hover{","{transform:rotate(90deg);}","{transform:rotate(90deg);}&::after{transform:translate(-50%,-50%);}}",";"],(e=>{let{$isCircular:t}=e;return t?"52px":"auto"}),(e=>{let{$isShort:t}=e;return t?"49px":"52px"}),(e=>{let{$isCircular:t}=e;return t?"0":" 0 25px"}),(e=>{let{$textColor:t}=e;return t||"#1E1F25"}),(e=>{let{$backgroundColor:t}=e;return t||"#ffffff"}),d,c,(e=>{let{theme:t}=e;return t.device.tablet}),(e=>{let{$isCircular:t}=e;return t?"38px":"auto"}),(e=>{let{theme:t}=e;return t.device.miniDesktop}),(e=>{let{$hoverCircle:t}=e;return t?"block":"none"}),m,p,(e=>{let{$styles:t}=e;return t||""}))},12696:function(e,t,a){a.r(t),a.d(t,{default:function(){return oe}});var r={};a.r(r),a.d(r,{description:function(){return c},featureVideo:function(){return u},title:function(){return m},wrapper:function(){return p}});var o={};a.r(o),a.d(o,{btn:function(){return b},freedom:function(){return y},green:function(){return v},left:function(){return k},right:function(){return E}});var n={};a.r(n),a.d(n,{blue:function(){return L},connect:function(){return I},description:function(){return T},download:function(){return V},downloadNow:function(){return B},intro:function(){return $},left:function(){return W},right:function(){return Z},subTitle:function(){return D},titleWrapper:function(){return z},wrapper:function(){return P}});var i={};a.r(i),a.d(i,{cardDescription:function(){return H},cardTitle:function(){return R},featureCard:function(){return q},featureList:function(){return U},featureListWrapper:function(){return O},sideImageLeft:function(){return X},sideImageRight:function(){return Y},title:function(){return G},whySwap:function(){return J},wrapper:function(){return K},yellow:function(){return Q}});var l=a(67294),s=a(25675),d=a(36330),c="featureVideo-module--description--749ff",u="featureVideo-module--featureVideo--cee20",m="featureVideo-module--title--207d4",p="featureVideo-module--wrapper--2d97d";function f(e){var t,a,r="";if("string"==typeof e||"number"==typeof e)r+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(a=f(e[t]))&&(r&&(r+=" "),r+=a)}else for(a in e)e[a]&&(r&&(r+=" "),r+=a);return r}var h=function(){for(var e,t,a=0,r="",o=arguments.length;a<o;a++)(e=arguments[a])&&(t=f(e))&&(r&&(r+=" "),r+=t);return r};var g=e=>{let{bgColor:t,sectionId:a,youtubeCode:o,title:n,description:i}=e;const f="https://www.youtube-nocookie.com/embed/"+o,g="https://i3.ytimg.com/vi/"+o+"/maxresdefault.jpg",{0:w,1:b}=(0,l.useState)(null);return l.createElement("section",{id:a,className:h(u,[r[t]],{show:w})},l.createElement("div",{className:h(p,"wrapper")},l.createElement("div",null,l.createElement(s.Z,{posterImage:g,onClick:()=>b(f)})),l.createElement("div",null,l.createElement("h3",{className:m,dangerouslySetInnerHTML:{__html:n}}),l.createElement("div",{className:c,dangerouslySetInnerHTML:{__html:i}}))),w&&l.createElement(d.Z,{embedUrl:w,setVideoEmbedUrl:b}))},w=g,b="freedom-module--btn--527c5",y="freedom-module--freedom--d2815",v="freedom-module--green--d8a71",k="freedom-module--left--fa39c",E="freedom-module--right--ae01a",x=a(51684);var C=e=>{let{href:t,target:a,rel:r,className:o,stroke:n,white:i,children:s}=e;return l.createElement("a",{href:t,target:a,rel:r,className:"btn-module--btn--4bb74 "+(null!=o?o:"")+" "+(n?"btn-module--stroke--b30ab":"")+" "+(i?"btn-module--white--3106b":"")},s)};var N=e=>{let{title:t,text:a,btnLabel:r,btnLink:n,bgColor:i,image:s}=e;return l.createElement("section",{className:h(y,[o[i]])},l.createElement(x.Z,{src:"/images/landing/multitoken-swap/freedom.png",alt:"The freedom ofself-custody meets the safety of MetaMask",width:652,height:593,className:k}),l.createElement("div",{className:E},l.createElement("h2",{dangerouslySetInnerHTML:{__html:t}}),l.createElement("p",null,a),l.createElement(C,{href:n,target:"_blank",rel:"noopener noreferrer",className:b},r)))},_=N;var M=e=>{let{title:t,btnLabel:a,btnLink:r}=e;return l.createElement("header",{className:"header-module--header--a5b94 wrapper"},l.createElement("h1",null,l.createElement("a",{href:r,target:"_blank",rel:"noopener noreferrer"},t)),l.createElement(C,{href:r,target:"_blank",rel:"noopener noreferrer"},a))},S=M,L="intro-module--blue--dbd73",I="intro-module--connect--2337c",T="intro-module--description--ba390",V="intro-module--download--f0294",B="intro-module--downloadNow--d7394",$="intro-module--intro--7039d",W="intro-module--left--14fb7",Z="intro-module--right--1968a",D="intro-module--subTitle--30824",z="intro-module--titleWrapper--8a03f",P="intro-module--wrapper--c1522";var j=e=>{let{title:t,subTitle:a,description:r,firstBtnLabel:o,firstBtnLink:i,text:s,secondBtnLabel:d,secondBtnLink:c,bgColor:u,sectionId:m}=e;return l.createElement("section",{id:m,className:h($,[n[u]])},l.createElement("div",{className:P+" wrapper"},l.createElement("div",{className:W},l.createElement("div",{className:z},l.createElement("h2",{dangerouslySetInnerHTML:{__html:t}}),a&&l.createElement("h3",{className:D,dangerouslySetInnerHTML:{__html:a}})),r&&l.createElement("div",{className:T,dangerouslySetInnerHTML:{__html:r}}),l.createElement(C,{href:i,target:"_blank",rel:"noopener noreferrer",className:I},o),l.createElement("p",{className:B},s,d&&l.createElement(C,{href:c,target:"_blank",rel:"noopener noreferrer",className:V,stroke:!0},d))),l.createElement(x.Z,{src:"/images/landing/multitoken-swap/intro.png",alt:"Metamask Portfolio | Swaps",width:825,height:643,className:Z})))},A=j;var F=()=>l.createElement("section",{className:h("supportedNetwork-module--supportedNetwork--dc0cc")},l.createElement("div",{className:h("supportedNetwork-module--wrapper--27bd4","wrapper")},l.createElement("div",null,l.createElement("h3",{className:"supportedNetwork-module--title--de4f1"},"Supported Networks"),l.createElement("div",{className:"supportedNetwork-module--listLogoWrapper--5231a"},l.createElement("div",{className:"supportedNetwork-module--listLogo--2669f"},[{id:1,src:"/images/landing/network-logos/ethereum.jpg",alt:"ethereum logo",large:!0},{id:2,src:"/images/landing/network-logos/polygon.png",alt:"polygon logo",large:!0},{id:3,src:"/images/landing/network-logos/bnb-chain.png",alt:"bnb chain logo"},{id:4,src:"/images/landing/network-logos/avalanche.png",alt:"avalanche logo",large:!0},{id:5,src:"/images/landing/network-logos/optimism.png",alt:"optimism logo"},{id:6,src:"/images/landing/network-logos/arbitrum.png",alt:"arbitrum logo",large:!0},{id:7,src:"/images/landing/network-logos/linea.png",alt:"linea logo"}].map((e=>l.createElement("img",{className:h("supportedNetwork-module--logo--e4796",{"supportedNetwork-module--large--20cb9":e.large}),key:e.id,src:e.src,alt:e.alt})))))))),H="whySwap-module--cardDescription--17059",R="whySwap-module--cardTitle--bd4e5",q="whySwap-module--featureCard--c2361",U="whySwap-module--featureList--5b0d5",O="whySwap-module--featureListWrapper--c0596",X="whySwap-module--sideImageLeft--a2c1a",Y="whySwap-module--sideImageRight--ffce2",G="whySwap-module--title--f160f",J="whySwap-module--whySwap--c3d13",K="whySwap-module--wrapper--62752",Q="whySwap-module--yellow--af64c";var ee=e=>{let{bgColor:t}=e;return l.createElement("section",{className:h(J,[i[t]])},l.createElement("div",{className:h(K,"wrapper")},l.createElement("div",null,l.createElement("h3",{className:G},"Why Swap with MetaMask?"),l.createElement("div",{className:O},l.createElement("div",{className:U},[{id:1,title:"Find competitive rates every time",description:"The swap feature ensures that you always have access to the largest selection of tokens and the most competitive prices by providing prices from multiple aggregators and individual market makers in one place."},{id:2,title:"Reduced gas costs",description:"We pursue a different path to locate the best trade. Each route requires a varying amount of gas fees to execute the transaction. We source available quotes and determine which liquidity source is the most gas efficient for every trade."},{id:3,title:"Fewer approvals",description:"You only need to approve each token once to gain access to all the available liquidity on DeFi, reducing time and gas costs."},{id:4,title:"Slippage protection",description:"Large swaps are often subject to wild price swings when there is insufficient liquidity available on a particular DEX. When swapping with MetaMask Portfolio, orders are spread across virtually all DEXs to reduce slippage impact on the final price."}].map((e=>l.createElement("div",{className:q,key:e.id},l.createElement("p",{className:R},e.title),l.createElement("p",{className:H},e.description)))))))),l.createElement(x.Z,{src:"/images/landing/multitoken-swap/why-swap-left.png",alt:"Swap multiple tokens to one, in a single transaction",width:592,height:2076,className:X}),l.createElement(x.Z,{src:"/images/landing/multitoken-swap/why-swap-right.png",alt:"Swap multiple tokens to one, in a single transaction",width:933,height:1260,className:Y}))},te=a(8811),ae=a(35657),re=a(15133);var oe=e=>{let{data:t,pageContext:a}=e;const{seo:r,footer:o}=t,{pathBuild:n,widerContainer:i}=a;return(0,l.useEffect)((()=>(document.documentElement.classList.add(re.m),()=>document.documentElement.classList.remove(re.m)))),l.createElement(te.Z,{widerContainer:i},r&&(0,ae.F)({...r,pagePath:n}),l.createElement("article",{className:"page-swap-with-portfolio"},l.createElement(S,{title:"Metamask | Portfolio",btnLabel:"Try Portfolio",btnLink:"https://portfolio.metamask.io/"}),l.createElement(A,{title:"The most trusted way to swap your tokens",subTitle:"Swap from anywhere, anytime",description:"Swap tokens directly from the MetaMask browser extension, mobile wallet, and <a href='https://portfolio.metamask.io/swap' target='_blank'>MetaMask Portfolio</a>. The swap feature combines data from decentralized exchange aggregators, market makers, and DEXs, to ensure you get competitive rates with the lowest network fees.",firstBtnLabel:"Swap with MetaMask",firstBtnLink:"https://portfolio.metamask.io/swap",bgColor:"blue",sectionId:"swap-with-portfolio"}),l.createElement(w,{title:"How to Swap with MetaMask",description:"Unlike other crypto wallets out there, MetaMask is built to be privacy-first. We empower you to access, store and swap tokens, without having to worry about dapps or exchanges accessing more personal data than you’ve consented to give. Whether you’re participating in decentralized finance or exploring web3, with MetaMask, you are always in complete control of your data.",youtubeCode:"q9uG6Ra-w54"}),l.createElement(ee,{bgColor:"yellow"}),l.createElement(F,null),l.createElement(_,{title:"Connect your wallet and start swapping",text:"MetaMask is the leading self-custodial wallet. The safe and simple way to access blockchain applications and web3.",btnLabel:"Try Portfolio",btnLink:"https://portfolio.metamask.io/",bgColor:"green",image:"/images/landing/multitoken-swap/freedom-v2.svg"}),o&&(0,ae.F)(o)))}},15133:function(e,t,a){a.d(t,{m:function(){return r}});var r="swap-module--is-landing--1e4ac"}}]);
//# sourceMappingURL=component---src-templates-swap-with-portfolio-layout-js-fbe4ff6bcbff435e4cde.js.map