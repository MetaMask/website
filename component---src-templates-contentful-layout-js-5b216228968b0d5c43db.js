(self.webpackChunkmetamask_io=self.webpackChunkmetamask_io||[]).push([[459],{1037:function(n,e,t){"use strict";t.r(e),t.d(e,{default:function(){return v}});var a=t(96540),r=t(35314),i=t(78325),s=t.n(i),o=t(56449),c=t.n(o),l=t(22636);var u=t(86462),d=t(68154),p=t(95799),y=t(83673),m=t.n(y),f=t(58156),h=t.n(f);var v=n=>{const{data:{header:e,footer:t,seo:i,heroes:o,features:y,featureSliders:f,richTexts:v,layoutModuleContainers:k,moduleContainers:g,cards:w,ctas:_,faqs:b,embeds:x,logos:E,hubspotForms:S,fullWidthCtas:I},pageContext:{modules:T,pathBuild:C,slug:B,themeColor:A,isFaqLayout:P,h2FontSize:R,widerContainer:j,extraData:F,locale:L=p.F3,translation:M,localizedPages:q,sharedCopy:O},path:W,...D}=n,K=(0,u.useLocation)().pathname;let N="451393",Y="";K.includes("/institutions")&&(N="4249353",Y="7714137");const z='_linkedin_partner_id = "'+N+'";',H='<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid='+N+(Y?"&conversionId="+Y:"")+'&fmt=gif"/>',V=n=>{if(n)return c()(n.edges)?V(n.edges):c()(n)?n.map((n=>n.node)):n},Q=s()([o,y,f,v,k,g,w,_,b,x,E,S,I],V).reduce(((n,e)=>{if(!e||!e.contentful_id)return n;const t=T.indexOf(e.contentful_id);return n.splice(t,1,e),n}),Array(T.length-1)),U=[e,...Q,t],Z=P?(n=>{const e=n=>"object"!=typeof n?null:Array.isArray(n.modules)?s()(n.modules,e):"ContentfulFaq"===n.internal.type?n:null,t=m()(s()(n,e)).map((n=>{const e=n.question,t=h()(n,"answer.childMarkdownRemark.html");return e&&t?{"@type":"Question",name:e,acceptedAnswer:{"@type":"Answer",text:t}}:null}));return t.length?{"@context":"https://schema.org","@type":"FAQPage",mainEntity:t}:null})(Q):null;return a.createElement(l.A,Object.assign({},D,{themeColor:A,h2FontSize:R,extraData:F,widerContainer:j,locale:L,localizedPages:q,sharedCopy:O,translation:M}),i&&(0,r.P)({...i,pagePath:C,originalSlug:B,translation:M}),Z&&a.createElement(d.A,null,a.createElement("script",{type:"application/ld+json"},JSON.stringify(Z))),K.includes("/uninstalled")&&a.createElement(d.A,{script:[{type:"text/javascript",innerHTML:'\nconst DEV_WRITE_KEY = "PZkSwsTBxW1BrbyIYEUjFBEumGvTyjcz", PROD_WRITE_KEY = "MHae0tTVRqyHDim9qQ9ablSZpvm3Tvzc";\nconst params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop), });\nconst WRITE_KEY = (params.env == "production") ? PROD_WRITE_KEY : DEV_WRITE_KEY;\n\n!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey=WRITE_KEY;analytics.SNIPPET_VERSION="4.15.2";\n  analytics.load(WRITE_KEY);\n  // only ping Segment if an id exists\n  if (params.mmi) {\n    // identify user by anonId\n    analytics.identify(atob(params.mmi));\n    analytics.track(\'App Uninstalled\', {\n      app_version: params.av,\n      wallets_installed: window.walletsInstalled.split(\',\'),\n    });\n  }\n}}();\n\nwindow.addEventListener(\'load\', setupSurvey)\n\nfunction setupSurvey() {\n  const checkboxes = document.getElementsByName(\'reasons\')\n  const submitSurveyButton = document.getElementById(\'submitSurvey\')\n  const uninstallSurvey = document.getElementById(\'uninstall_survey\')\n\n  checkboxes.forEach(checkbox => {\n    checkbox.onchange = checkReasons\n  })\n\n  if (submitSurveyButton) {\n    submitSurveyButton.addEventListener(\'click\', submitSurvey)\n  }\n\n  function checkReasons() {\n    const checkedCount = Array.from(checkboxes).filter(\n      checkbox => checkbox.checked\n    ).length\n    submitSurveyButton.disabled = checkedCount === 0\n  }\n\n  function submitSurvey() {\n    const reasons = Array.from(checkboxes)\n      .filter(checkbox => checkbox.checked)\n      .map(checkbox => checkbox.value)\n\n    if (reasons.length > 0) {\n      submitSurveyButton.style.display = \'none\'\n\n      analytics.track(\'Survey Submitted\', {\n        survey_type: \'mm_ext_uninstall\',\n        field_reason: reasons,\n        wallets_installed: window.walletsInstalled.split(\',\'),\n      })\n\n      uninstallSurvey.innerHTML = \'Thank you for your feedback.\'\n    }\n  }\n}\n'}]}),U.map((n=>(0,r.P)({...n,isFaq:P,translation:M},L))),a.createElement("script",{type:"text/javascript",dangerouslySetInnerHTML:{__html:z+'\nwindow._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];\nwindow._linkedin_data_partner_ids.push(_linkedin_partner_id);\n(function(l) {\n  if (!l){window.lintrk = function(a,b){\n    window.lintrk.q.push([a,b])};\n    window.lintrk.q=[]}\n    var s = document.getElementsByTagName("script")[0];\n    var b = document.createElement("script");\n    b.type = "text/javascript";\n    b.async = true;\n    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";\n    s.parentNode.insertBefore(b, s);\n  })(window.lintrk);\n'}}),a.createElement("noscript",{dangerouslySetInnerHTML:{__html:H}}))}},80909:function(n,e,t){var a=t(30641),r=t(38329)(a);n.exports=r},83120:function(n,e,t){var a=t(14528),r=t(45891);n.exports=function n(e,t,i,s,o){var c=-1,l=e.length;for(i||(i=r),o||(o=[]);++c<l;){var u=e[c];t>0&&i(u)?t>1?n(u,t-1,i,s,o):a(o,u):s||(o[o.length]=u)}return o}},86649:function(n,e,t){var a=t(83221)();n.exports=a},30641:function(n,e,t){var a=t(86649),r=t(95950);n.exports=function(n,e){return n&&a(n,e,r)}},5128:function(n,e,t){var a=t(80909),r=t(64894);n.exports=function(n,e){var t=-1,i=r(n)?Array(n.length):[];return a(n,(function(n,a,r){i[++t]=e(n,a,r)})),i}},38329:function(n,e,t){var a=t(64894);n.exports=function(n,e){return function(t,r){if(null==t)return t;if(!a(t))return n(t,r);for(var i=t.length,s=e?i:-1,o=Object(t);(e?s--:++s<i)&&!1!==r(o[s],s,o););return t}}},83221:function(n){n.exports=function(n){return function(e,t,a){for(var r=-1,i=Object(e),s=a(e),o=s.length;o--;){var c=s[n?o:++r];if(!1===t(i[c],c,i))break}return e}}},45891:function(n,e,t){var a=t(51873),r=t(72428),i=t(56449),s=a?a.isConcatSpreadable:void 0;n.exports=function(n){return i(n)||r(n)||!!(s&&n&&n[s])}},83673:function(n){n.exports=function(n){for(var e=-1,t=null==n?0:n.length,a=0,r=[];++e<t;){var i=n[e];i&&(r[a++]=i)}return r}},78325:function(n,e,t){var a=t(83120),r=t(55378);n.exports=function(n,e){return a(r(n,e),Infinity)}},55378:function(n,e,t){var a=t(34932),r=t(15389),i=t(5128),s=t(56449);n.exports=function(n,e){return(s(n)?a:i)(n,r(e,3))}}}]);
//# sourceMappingURL=component---src-templates-contentful-layout-js-5b216228968b0d5c43db.js.map