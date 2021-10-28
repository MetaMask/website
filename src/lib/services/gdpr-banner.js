export default `
window.getGDPRCookie = function ( ) {
  if (document.cookie.length > 0) {
    var cookies = "; " + document.cookie;
    var parts = cookies.split("; " + "gdpr-consent" + "="); // segment gdpr cookie from rest of the string value
    const val =  parts.pop().split(";").shift(); // pull value from gdpr-consent ccookie

    if(val === "true") return true;
    else if (val === "false") return false;
    else return undefined
  }
};

window.addGTM = function () {  
  // Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-37075177-6');
  
  // Google Tag Manager
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-NPKJZHW');
  
  // adds GTM antibot prevention to body
  var ns = document.createElement('noscript');
  var i = document.createElement('iframe');
  i.src = "https://www.googletagmanager.com/ns.html?id=GTM-NPKJZHW";
  i.height = "0";
  i.width = "0";
  i.style= "display:none;visibility:hidden";

  ns.append(i);
  document.body.append(ns);
};

window.removeGDPRBanner = function () {
  var consent = window.getGDPRCookie();
  if(consent !== undefined) {
    var banner = document.getElementById('gdpr-banner');
    if(banner) banner.remove();
  }
};

var __injectGTMPrepageLoad = function () {
  if(window.getGDPRCookie()) window.addGTM();
  return;
}

__injectGTMPrepageLoad();

// if no gdpr response has been accepted  make banner visible and add listeners
if(window.getGDPRCookie() === undefined) {
  window.onGDPRResponse = function ( e ) {
    e.preventDefault();
    var consent = e.target.value;
    if(typeof consent !== undefined) {
      var bool = (consent === "true" && true) || false;
      window.setGDPRConsent(bool);
      window.removeGDPRBanner();
    }
  };

  window.setGDPRConsent = function ( consent ) {
    var d = new Date;
    // GDPR says consent can last for up to one year before needing to be renewed
    // If we do not get consenst, ask again if they return to the site after one week
    var days = (consent && 364) || 7; 
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = "gdpr-consent=" + consent + ";path=/;expires=" + d.toGMTString();
    if(consent) addGTM();
    return window.getGDPRCookie() !== undefined; // return true if cookie has been properly set to use in callbacks
  };

  var requestGDPRConsent = function () {
    var banner = document.getElementById("gdpr-banner")
    var gdprButtons = document.getElementsByClassName("gdpr-response");
    banner.style.visibility = "visible";

    if(gdprButtons.length > 0) {
      for (var i = 0; i < gdprButtons.length; i++) {
        gdprButtons[i].addEventListener('click', onGDPRResponse, false);
      }
    }
  };

  window.addEventListener("load", requestGDPRConsent);
} else {
  window.addEventListener("load", window.removeGDPRBanner);
}

`
