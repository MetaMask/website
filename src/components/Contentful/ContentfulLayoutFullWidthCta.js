import React from 'react'
import PropTypes from 'prop-types'
import FullwidthCta from '../FullWidthCta'

const ContentfulLayoutFullWidthCta = props => {
  const {
    moduleConfig: {
      headline,
      showLogoAnimation,
      backgroundColor,
      description,
      hubSpotForm,
      marginBottom = '',
      cta,
      logoType,
      sectionPadding,
      previewMode,
    },
  } = props
  const { childMarkdownRemark: { html } = {} } = description || {}
  return (
    <FullwidthCta
      description={previewMode ? description : html}
      showLogoAnimation={showLogoAnimation}
      backgroundColor={backgroundColor}
      headline={headline}
      hubSpotForm={hubSpotForm}
      marginBottom={marginBottom}
      cta={cta}
      logoType={logoType}
      sectionPadding={sectionPadding}
    />
  )
}

export default ContentfulLayoutFullWidthCta

ContentfulLayoutFullWidthCta.propTypes = {
  moduleConfig: PropTypes.shape({
    description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    headline: PropTypes.string,
    ctaLink: PropTypes.string,
    ctaText: PropTypes.string,
    backgroundColor: PropTypes.string,
    showLogoAnimation: PropTypes.bool,
    marginBottom: PropTypes.string,
    cta: PropTypes.object,
    sectionPadding: PropTypes.string,
  }),
}
