import React from 'react'
import PropTypes from 'prop-types'
import FullwidthCta from '../FullWidthCta'

const ContentfulLayoutFullWidthCta = props => {
  const {
    moduleConfig: {
      ctaLink,
      ctaText,
      headline,
      showLogoAnimation,
      backgroundColor,
      description,
      hubSpotForm,
    },
  } = props
  const { childMarkdownRemark: { html } = {} } = description || {}
  return (
    <FullwidthCta
      ctaText={ctaText}
      ctaLink={ctaLink}
      description={html}
      showLogoAnimation={showLogoAnimation}
      backgroundColor={backgroundColor}
      headline={headline}
      hubSpotForm={hubSpotForm}
    />
  )
}

export default ContentfulLayoutFullWidthCta

ContentfulLayoutFullWidthCta.propTypes = {
  moduleConfig: PropTypes.shape({
    description: PropTypes.string,
    headline: PropTypes.string,
    ctaLink: PropTypes.string,
    ctaText: PropTypes.string,
    backgroundColor: PropTypes.string,
    showLogoAnimation: PropTypes.bool,
  }),
}
