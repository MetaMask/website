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
      alignItemsCenter,
      contentAlignment,
      contentPaddingTop,
      eyebrow,
      withContent,
      imageWidth,
      imageAlignment,
      newTab,
      animation,
      backgroundColor,
      headlineMarginTop0,
      sectionPadding,
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
      alignItemsCenter={alignItemsCenter}
      contentAlignment={contentAlignment}
      contentPaddingTop={contentPaddingTop}
      withContent={withContent}
      imageWidth={imageWidth}
      imageAlignment={imageAlignment}
      newTab={newTab}
      animation={animation}
      backgroundColor={backgroundColor}
      headlineMarginTop0={headlineMarginTop0}
      sectionPadding={sectionPadding}
    />
  )
}

export default ContentfulLayoutFeature

ContentfulLayoutFeature.propTypes = {
  moduleConfig: PropTypes.shape({
    eyebrow: PropTypes.string,
    headline: PropTypes.string,
    description: PropTypes.object,
    ctaLink: PropTypes.string,
    ctaText: PropTypes.string,
  }),
}
