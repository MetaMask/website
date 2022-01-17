export default `
// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-37075177-6', {'anonymize_ip': true});

// Add Events
if (gtag) {
  var downloadButtonNav = document.getElementsByClassName("downloadButtonNav");
  if(downloadButtonNav.length) {
    downloadButtonNav.onclick = function(){
      gtag('event', 'Click', {
          'event_category': 'Download',
          'event_label': 'Nav Bar Button'
      });
    }
  }
  
  var downloadHomeButtonTop = document.getElementsByClassName("downloadHomeButtonTop");
  if(downloadHomeButtonTop.length) {
    downloadHomeButtonTop.onclick = function(){
      gtag('event', 'Click', {
        'event_category': 'Download',
        'event_label': 'Home Page Button Top'
      });
    }
  } 
  
  var downloadHomeButtonBottom = document.getElementsByClassName("downloadHomeButtonBottom");
  if(downloadHomeButtonBottom.length) {
    downloadHomeButtonBottom.onclick = function(){
      gtag('event', 'Click', {
        'event_category': 'Download',
        'event_label': 'Home Page Button Bottom'
      });
    }
  } 
  
  var downloadSwapsButtonTop = document.getElementsByClassName("downloadSwapsButtonTop");
  if(downloadSwapsButtonTop.length) {
    downloadSwapsButtonTop.onclick = function(){
      gtag('event', 'Click', {
        'event_category': 'Download',
        'event_label': 'Swaps Page Button Top'
      });
    }
  } 
  
  var downloadSwapsButtonBottom = document.getElementsByClassName("downloadSwapsButtonBottom");
  if(downloadSwapsButtonBottom.length) {
    downloadSwapsButtonBottom.onclick = function(){
      gtag('event', 'Click', {
        'event_category': 'Download',
        'event_label': 'Swaps Page Button Bottom'
      });
    }
  }
  
  var downloadChromeButton = document.getElementsByClassName("downloadChromeButton");
  if(downloadChromeButton.length) {
    downloadChromeButton.onclick = function(){
      gtag('event', 'Click', {
        'event_category': 'Download',
        'event_label': 'Store Link Chrome Button'
      });
    }
  }
  
  var downloadFirefoxButton = document.getElementsByClassName("downloadFirefoxButton");
  if(downloadFirefoxButton.length) {
    downloadFirefoxButton.onclick = function(){
      gtag('event', 'Click', {
        'event_category': 'Download',
        'event_label': 'Store Link Firefox Button'
      });
    }
  }
  
  var downloadEdgeButton = document.getElementsByClassName("downloadEdgeButton");
  if(downloadEdgeButton.length) {
    downloadEdgeButton.onclick = function(){
      gtag('event', 'Click', {
        'event_category': 'Download',
        'event_label': 'Store Link Edge Button'
      });
    }
  }
  
  var downloadiPhoneButton = document.getElementsByClassName("downloadiPhoneButton");
  if(downloadiPhoneButton.length) {
    downloadiPhoneButton.onclick = function(){
      gtag('event', 'Click', {
        'event_category': 'Download',
        'event_label': 'Store Link iPhone Button'
      });
    }
  }
  
  var downloadAndroidButton = document.getElementsByClassName("downloadAndroidButton");
  if(downloadAndroidButton.length) {
    downloadAndroidButton.onclick = function(){
      gtag('event', 'Click', {
        'event_category': 'Download',
        'event_label': 'Store Link Android Button'
      });
    }
  }
  
  var downloadFlaskButtonTop = document.getElementsByClassName("downloadFlaskButtonTop");
  if(downloadFlaskButtonTop.length) {
    downloadFlaskButtonTop.onclick = function(){
      gtag('event', 'Click', {
        'event_category': 'Download',
        'event_label': 'Flask Store Link Button Top'
      });
    }
  }
  
  var downloadFlaskButtonBottom = document.getElementsByClassName("downloadFlaskButtonBottom");
  if(downloadFlaskButtonBottom.length) {
    downloadFlaskButtonBottom.onclick = function(){
      gtag('event', 'Click', {
        'event_category': 'Download',
        'event_label': 'Flask Store Link Button Bottom'
      });
    }
  }
  
}

`
