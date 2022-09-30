import React from 'react'
import PropTypes from 'prop-types'
import Feature from '../Feature'
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser'

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
      backgroundImage,
      backgroundImageDarkMode,
      backgroundImageMobile,
      headlineMarginTop0,
      sectionPadding,
      noPaddingBottom,
      cta,
      embed,
      previewMode,
      featureItems,
      imageShadow,
      hideImageOnMobile,
      customClass,
    },
  } = props

  const { childMarkdownRemark: { html } = {} } = description || {}
  const bgUrl = parseContentfulAssetUrl(backgroundImage)
  const bgDarkUrl = parseContentfulAssetUrl(backgroundImageDarkMode)
  const bgMobileUrl = parseContentfulAssetUrl(backgroundImageMobile)

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
      backgroundImage={bgUrl || ''}
      backgroundImageDarkMode={bgDarkUrl || ''}
      backgroundImageMobile={bgMobileUrl || ''}
      headlineMarginTop0={headlineMarginTop0}
      sectionPadding={sectionPadding}
      noPaddingBottom={noPaddingBottom}
      cta={cta}
      embed={embed}
      featureItems={featureItems}
      imageShadow={imageShadow}
      hideImageOnMobile={hideImageOnMobile}
      customClass={customClass}
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
