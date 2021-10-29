import React from 'react'
import PropTypes from 'prop-types'
import Feature from '../Feature'

const ContentfulLayoutFeature = props => {
  const {
    moduleConfig: {
      ctaLink,
      ctaText,
      headline,
      description,
      image,
      imageMobile,
      imageLink,
      contentAlignment,
      eyebrow,
      withContent,
      imageWidth,
      imageAlignment,
    },
  } = props

  const { childMarkdownRemark: { html } = {} } = description || {}

  return (
    <Feature
      imageMobile={imageMobile}
      imageLink={imageLink}
      eyebrow={eyebrow}
      description={html}
      headline={headline}
      ctaLink={ctaLink}
      ctaText={ctaText}
      image={image}
      contentAlignment={contentAlignment}
      withContent={withContent}
      imageWidth={imageWidth}
      imageAlignment={imageAlignment}
    />
  )
}

export default ContentfulLayoutFeature

ContentfulLayoutFeature.propTypes = {
  moduleConfig: PropTypes.shape({
    eyebrow: PropTypes.object,
    headline: PropTypes.string,
    description: PropTypes.object,
    ctaLink: PropTypes.string,
    ctaText: PropTypes.string,
  }),
}
