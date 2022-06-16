import React from 'react'
import PropTypes from 'prop-types'

const ContentfulNewsletter = props => {
  const {
    moduleConfig: {
      ctaText,
      hubSpotForm,
      showPopup
    },
  } = props

  return (
    <></>
  )
}

ContentfulNewsletter.propTypes = {
  ctaText: PropTypes.string,
  hubSpotForm: PropTypes.string,
  showPopup: PropTypes.bool,
}

export default ContentfulNewsletter
