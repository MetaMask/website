import React from 'react'
import PropTypes from 'prop-types'
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser'
import Hero from '../HeroContainer'

const ContentfulLayoutHero = props => {
  const {
    moduleConfig: {
      backgroundImage,
      cta,
      description,
      headline,
      modules,
      sideImage = {},
      sideImageDarkMode = {},
      sideImageFlex = false,
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
      previewMode,
    },
  } = props
  const { childMarkdownRemark: { html } = {} } = description || {}
  const bgUrl = parseContentfulAssetUrl(backgroundImage)
  const sideImageUrl = parseContentfulAssetUrl(sideImage)
  const sideImageDarkModeUrl = parseContentfulAssetUrl(sideImageDarkMode)
  const backgroundColorMobile = sideImageFlex ? 'white' : ''
  return (
    <Hero
      sectionPadding={sectionPadding}
      isFaq={isFaq}
      headline={headline}
      description={previewMode ? description : html}
      eyebrow={eyebrow}
      eyebrowLogo={eyebrowLogo}
      eyebrowMobileLogo={eyebrowMobileLogo}
      eyebrowLogoDarkMode={eyebrowLogoDarkMode}
      eyebrowMobileLogoDarkMode={eyebrowMobileLogoDarkMode}
      backgroundImage={bgUrl || ''}
      modules={modules}
      sideImageUrl={sideImageUrl || ''}
      sideImageDarkModeUrl={sideImageDarkModeUrl || ''}
      sideImage={sideImage}
      hideHeadline={hideHeadline}
      showLearnMore={showLearnMore}
      showFavIcon={showFavIcon}
      hubSpotForm={hubSpotForm}
      contentAlignment={contentAlignment}
      backgroundColor={backgroundColor}
      headlineBorderBottom={headlineBorderBottom}
      sideImageFlex={sideImageFlex}
      backgroundColorMobile={backgroundColorMobile}
      cta={cta}
    />
  )
}

export default ContentfulLayoutHero

ContentfulLayoutHero.propTypes = {
  moduleConfig: PropTypes.shape({
    eyebrowLogo: PropTypes.object,
    eyebrowMobileLogo: PropTypes.object,
    sideImage: PropTypes.object,
    backgroundImage: PropTypes.object,
    ctaLink: PropTypes.string,
    ctaText: PropTypes.string,
    backgroundColor: PropTypes.string,
    layout: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    headline: PropTypes.string,
    hideHeadline: PropTypes.bool,
    headlineBorderBottom: PropTypes.bool,
    sideImageFlex: PropTypes.bool,
    eyebrow: PropTypes.string,
    sectionPadding: PropTypes.string,
  }),
}
