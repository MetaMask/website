import React from 'react'
import PropTypes from 'prop-types'
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser'
import Hero from '../HeroContainer'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'

const ContentfulLayoutHero = props => {
  const {
    moduleConfig: {
      backgroundImage,
      backgroundImageDarkMode,
      ctas,
      description,
      note,
      headline,
      modules,
      sideImage = {},
      sideImageDarkMode = {},
      sideImageFlex = false,
      sideImageFoxAnimation = false,
      eyebrow,
      eyebrowLogo,
      eyebrowMobileLogo,
      eyebrowLogoDarkMode,
      eyebrowMobileLogoDarkMode,
      hideHeadline,
      showLearnMore,
      showFavIcon,
      hubSpotForm,
      contentAlignment,
      backgroundColor,
      headlineBorderBottom,
      isFaq,
      sectionPadding,
      previewMode = false,
      customClass,
    },
  } = props
  const { childMarkdownRemark: { html } = {} } = description || {}
  const bgUrl = parseContentfulAssetUrl(backgroundImage, previewMode)
  const bgDarkModeUrl = parseContentfulAssetUrl(
    backgroundImageDarkMode,
    previewMode
  )
  const sideImageUrl = parseContentfulAssetUrl(sideImage, previewMode)
  const sideImageDarkModeUrl = parseContentfulAssetUrl(
    sideImageDarkMode,
    previewMode
  )
  const backgroundColorMobile = sideImageFlex ? 'white' : ''
  return (
    <Hero
      sectionPadding={sectionPadding}
      isFaq={isFaq}
      headline={headline}
      description={previewMode ? description : html}
      note={note}
      eyebrow={eyebrow}
      eyebrowLogo={eyebrowLogo}
      eyebrowMobileLogo={eyebrowMobileLogo}
      eyebrowLogoDarkMode={eyebrowLogoDarkMode}
      eyebrowMobileLogoDarkMode={eyebrowMobileLogoDarkMode}
      backgroundImage={bgUrl || ''}
      backgroundImageDarkMode={bgDarkModeUrl || ''}
      modules={modules}
      sideImageUrl={sideImageUrl || ''}
      sideImageDarkModeUrl={sideImageDarkModeUrl || ''}
      sideImage={sideImage}
      sideImageDarkMode={sideImageDarkMode}
      hideHeadline={hideHeadline}
      showLearnMore={showLearnMore}
      showFavIcon={showFavIcon}
      hubSpotForm={hubSpotForm}
      contentAlignment={contentAlignment}
      backgroundColor={backgroundColor}
      headlineBorderBottom={headlineBorderBottom}
      sideImageFlex={sideImageFlex}
      sideImageFoxAnimation={sideImageFoxAnimation}
      backgroundColorMobile={backgroundColorMobile}
      ctas={ctas}
      customClass={customClass}
      previewMode={previewMode}
    />
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig.previewContent || data.moduleConfig
  const { ctasCollection } = data

  const dataUpdate = {
    moduleConfig: {
      previewMode: true,
      ctas: ctasCollection?.items,
      ...data,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(ContentfulLayoutHero)

ContentfulLayoutHero.propTypes = {
  moduleConfig: PropTypes.shape({
    eyebrowLogo: PropTypes.object,
    eyebrowMobileLogo: PropTypes.object,
    sideImage: PropTypes.object,
    backgroundImage: PropTypes.object,
    backgroundImageDarkMode: PropTypes.object,
    ctaLink: PropTypes.string,
    ctaText: PropTypes.string,
    backgroundColor: PropTypes.string,
    layout: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    note: PropTypes.string,
    headline: PropTypes.string,
    hideHeadline: PropTypes.bool,
    headlineBorderBottom: PropTypes.bool,
    sideImageFlex: PropTypes.bool,
    sideImageFoxAnimation: PropTypes.bool,
    eyebrow: PropTypes.string,
    sectionPadding: PropTypes.string,
    previewMode: PropTypes.bool,
  }),
}
