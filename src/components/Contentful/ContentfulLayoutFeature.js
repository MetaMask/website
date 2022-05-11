import React from 'react'
import PropTypes from 'prop-types'
import Feature from '../Feature'

const ContentfulLayoutFeature = props => {
  const {
    moduleConfig: {
      headline,
      description,
      image,
      imageMobile,
      imageDarkMode,
      imageMobileDarkMode,
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
      noPaddingBottom,
      cta,
      previewMode,
      featureItems,
      imageShadow,
      hideImageOnMobile,
    },
  } = props

  const { childMarkdownRemark: { html } = {} } = description || {}

  return (
    <Feature
      imageMobile={imageMobile}
      imageLink={imageLink}
      eyebrow={eyebrow}
      description={previewMode ? description : html}
      headline={headline}
      image={image}
      imageDarkMode={imageDarkMode}
      imageMobileDarkMode={imageMobileDarkMode}
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
      noPaddingBottom={noPaddingBottom}
      cta={cta}
      featureItems={featureItems}
      imageShadow={imageShadow}
      hideImageOnMobile={hideImageOnMobile}
    />
  )
}

export default ContentfulLayoutFeature

ContentfulLayoutFeature.propTypes = {
  moduleConfig: PropTypes.shape({
    eyebrow: PropTypes.string,
    headline: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    cta: PropTypes.object,
    noPaddingBottom: PropTypes.bool,
    imageShadow: PropTypes.bool,
  }),
}
