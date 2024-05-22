import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'
import PropTypes from 'prop-types'
import Feature from '../Feature'
import React from 'react'

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
      removeSectionPaddingBottomOnDesktop,
      cta,
      ctaSecond,
      embed,
      previewMode = false,
      featureItems,
      showFeatureItemsAsSlideImage,
      imageShadow,
      hideImageOnMobile,
      launchDarklyFlag,
      contentful_id,
      moduleId,
      customClass,
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
      backgroundImage={backgroundImage}
      backgroundImageDarkMode={backgroundImageDarkMode}
      backgroundImageMobile={backgroundImageMobile}
      headlineMarginTop0={headlineMarginTop0}
      sectionPadding={sectionPadding}
      noPaddingBottom={noPaddingBottom}
      removeSectionPaddingBottomOnDesktop={removeSectionPaddingBottomOnDesktop}
      cta={cta}
      ctaSecond={ctaSecond}
      embed={embed}
      featureItems={featureItems}
      showFeatureItemsAsSlideImage={showFeatureItemsAsSlideImage}
      imageShadow={imageShadow}
      hideImageOnMobile={hideImageOnMobile}
      customClass={customClass}
      previewMode={previewMode}
      contentfulId={contentful_id}
      moduleId={moduleId}
      launchDarklyFlag={launchDarklyFlag}
    />
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig.previewContent || data.moduleConfig
  const { featureItemsCollection, embed } = data
  const dataUpdate = {
    moduleConfig: {
      previewMode: true,
      featureItems: featureItemsCollection?.items,
      ...data,
      embed: embed
        ? {
            embed: embed,
            thumbnail: embed.thumbnail,
            playOnPopup: embed.playOnPopup,
          }
        : undefined,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(ContentfulLayoutFeature)

ContentfulLayoutFeature.propTypes = {
  moduleConfig: PropTypes.shape({
    eyebrow: PropTypes.string,
    headline: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    cta: PropTypes.object,
    noPaddingBottom: PropTypes.bool,
    removeSectionPaddingBottomOnDesktop: PropTypes.bool,
    imageShadow: PropTypes.bool,
  }),
}
