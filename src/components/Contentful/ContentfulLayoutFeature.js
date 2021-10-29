import React from 'react'
import PropTypes from 'prop-types'
import CTA from '../CTA'

const ContentfulLayoutFeature = props => {
  const {
    moduleConfig: { ctaLink, ctaText },
  } = props

  return <CTA text={ctaText} link={ctaLink} />
}

export default ContentfulLayoutFeature

ContentfulLayoutFeature.propTypes = {
  moduleConfig: PropTypes.shape({
    eyebrow: PropTypes.object,
    headline: PropTypes.string,
    description: PropTypes.string,
    ctaLink: PropTypes.string,
    ctaText: PropTypes.string,
    backgroundColor: PropTypes.string,
  }),
}
