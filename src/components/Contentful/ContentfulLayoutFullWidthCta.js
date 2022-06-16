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
      ctas,
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
      ctas={ctas}
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
    hubSpotForm: PropTypes.object,
    ctaLink: PropTypes.string,
    ctaText: PropTypes.string,
    backgroundColor: PropTypes.string,
    showLogoAnimation: PropTypes.bool,
    marginBottom: PropTypes.string,
    ctas: PropTypes.array,
    sectionPadding: PropTypes.string,
  }),
}
