const analytics = `
const DEV_WRITE_KEY = "PZkSwsTBxW1BrbyIYEUjFBEumGvTyjcz", PROD_WRITE_KEY = "MHae0tTVRqyHDim9qQ9ablSZpvm3Tvzc";
const params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop), });
const WRITE_KEY = (params.env == "production") ? PROD_WRITE_KEY : DEV_WRITE_KEY;

!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey=WRITE_KEY;analytics.SNIPPET_VERSION="4.15.2";
  analytics.load(WRITE_KEY);
  }}();

window.addEventListener('load', setupSurvey)

function setupSurvey() {
  // only ping Segment if an id exists
  if (params.mmi) {
    // identify user by anonId
    analytics.identify(atob(params.mmi));
    analytics.track('App Uninstalled', {
      app_version: params.av,
      wallets_installed: window.walletsInstalled?.split(',')
    });
  }

  const checkboxes = document.getElementsByName('reasons')
  const submitSurveyButton = document.getElementById('submitSurvey')
  const skipSurveyButton = document.getElementById('skipSurvey')
  const uninstallSurvey = document.getElementById('uninstall_survey')

  // Randomize input groups
  randomizeInputGroups()

  checkboxes.forEach(checkbox => {
    checkbox.onchange = checkReasons
  })

  if (submitSurveyButton) {
    submitSurveyButton.addEventListener('click', submitSurvey)
  }

  if (skipSurveyButton) {
    skipSurveyButton.addEventListener('click', skipSurvey)
  }

  function randomizeInputGroups() {
    const container = document.getElementById('uninstall_survey')
    const inputGroups = Array.from(container.getElementsByClassName('input-group'))
    const otherGroup = inputGroups.pop() // Remove the "Other" group

    // Shuffle the remaining input groups
    for (let i = inputGroups.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [inputGroups[i], inputGroups[j]] = [inputGroups[j], inputGroups[i]]
    }

    // Reinsert the shuffled elements and the "Other" group
    inputGroups.forEach(group => container.appendChild(group))
    container.appendChild(otherGroup)
  }

  function checkReasons() {
    const checkedCount = Array.from(checkboxes).filter(checkbox => checkbox.checked).length
    submitSurveyButton.disabled = checkedCount === 0

    // Show/hide text inputs based on checkbox state
    checkboxes.forEach(checkbox => {
      const wrapper = checkbox.closest('.input-group');
      const textInput = wrapper.querySelector('input[type="text"]');
      if (textInput) {
        textInput.style.display = checkbox.checked ? 'block' : 'none';
      }
    });
  }

  function submitSurvey() {
    const reasons = Array.from(checkboxes)
              .filter(checkbox => checkbox.checked)
              .map(checkbox => {
                const wrapper = checkbox.closest('.input-group');
                const value = checkbox.value;
                if (wrapper.classList.contains('has-text-input')) {
                  const textInput = wrapper.querySelector('input[type="text"]');
                  return textInput && textInput.value ? value + ': ' + textInput.value : value;
                }
                return value;
              });

    if (reasons.length > 0) {
      submitSurveyButton.style.display = 'none'
      skipSurveyButton.style.display = 'none'

      analytics.track('Survey Submitted', {
        survey_type: 'mm_ext_uninstall',
        field_reason: reasons,
        wallets_installed: window.walletsInstalled?.split(','),
      })

      uninstallSurvey.innerHTML = 'Thank you for your feedback.'
    }
  }

  function skipSurvey(e) {
    e.preventDefault()
    submitSurveyButton.style.display = 'none'
    skipSurveyButton.style.display = 'none'
    uninstallSurvey.innerHTML = 'Sorry to see you go.'
  }
}
`

export default analytics
