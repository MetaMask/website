export default `
const DEV_WRITE_KEY = "PZkSwsTBxW1BrbyIYEUjFBEumGvTyjcz", PROD_WRITE_KEY = "MHae0tTVRqyHDim9qQ9ablSZpvm3Tvzc";
const params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop), });
const WRITE_KEY = (params.env == "production") ? PROD_WRITE_KEY : DEV_WRITE_KEY;

!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey=WRITE_KEY;analytics.SNIPPET_VERSION="4.15.2";
  analytics.load(WRITE_KEY);
  // only ping Segment if an id exists
  if (params.mmi) {
    // identify user by anonId
    analytics.identify(atob(params.mmi));
    analytics.track('App Uninstalled', {
      app_version: params.av
    });
  }

  const checkReasons = function () {
    const checkboxes = document.getElementsByName('reasons');
    let count = 0;
    for (var i=0; i<checkboxes.length; i++) {
       if (checkboxes[i].checked) {
          count ++;
       }
    }
    document.getElementById('submitSurvey').disabled = !count;
  };

  const submitSurvey = function() {
    let reasons = [];
    const checkboxes = document.getElementsByName('reasons');
    for (let i=0; i<checkboxes.length; i++) {
       if (checkboxes[i].checked) {
          reasons.push(checkboxes[i].value);
       }
    }
    if(reasons.length > 0) {
      document.getElementById('submitSurvey').style.display = 'none';
      analytics.track('Survey Submitted', {
        survey_type: "mm_ext_uninstall",
        field_reason: reasons,
      });
      document.getElementById('uninstall_survey').innerHTML = 'Thank you for your feedback.';
    }
  };

  setTimeout(function () {
    const checkboxes = document.getElementsByName('reasons');
    for (let i=0; i<checkboxes.length; i++) {
      checkboxes[i].onchange = checkReasons;
    }
    const submitSurveyButton = document.getElementById('submitSurvey');
    if(submitSurveyButton) {
      submitSurveyButton.onclick = submitSurvey;
    }
  }, 1000);
}}();
`
