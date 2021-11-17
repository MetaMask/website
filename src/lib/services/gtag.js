export default `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-37075177-6', {'anonymize_ip': true});

// Add gtag events
if (gtag) {
  var downloadButtonsNav = document.getElementsByClassName("downloadButtonNav");
  if(downloadButtonsNav.length) {
    downloadButtonsNav.onclick = function(){
      gtag('event', 'Click', {
          'event_category': 'Download',
          'event_label': 'Nav Bar Button'
      });
    }
  }
  
  var downloadButtons = document.getElementsByClassName("downloadButtonPage");
  if(downloadButtons.length) {
    downloadButtons.onclick = function(){
      gtag('event', 'Click', {
        'event_category': 'Download',
        'event_label': 'Store Link Button'
      });
    }
  }
  
  var downloadButtonsPageHome = document.getElementsByClassName("downloadButtonPageHome");
  if(downloadButtonsPageHome.length) {
    downloadButtonsPageHome.onclick = function(){
      gtag('event', 'Click', {
        'event_category': 'Download',
        'event_label': 'Home Page Buttons'
      });
    }
  } 
  
  var downloadButtonsPageSwaps = document.getElementsByClassName("downloadButtonPageSwaps");
  if(downloadButtonsPageSwaps.length) {
    downloadButtonsPageSwaps.onclick = function(){
      gtag('event', 'Click', {
        'event_category': 'Download',
        'event_label': 'Swaps Page Buttons'
      });
    }
  } 
}

`
