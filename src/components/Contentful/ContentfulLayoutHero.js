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
      sideImageFlex = false,
      eyebrow,
      eyebrowLogo,
      eyebrowMobileLogo,
      hideHeadline,
      showLearnMore,
      showFavIcon,
      hubSpotForm,
      contentAlignment,
      backgroundColor,
      headlineBorderBottom,
      isFaq,
    },
  } = props
  const { childMarkdownRemark: { html } = {} } = description || {}
  const bgUrl = parseContentfulAssetUrl(backgroundImage)
  const sideImageUrl = parseContentfulAssetUrl(sideImage)
  const backgroundColorMobile = sideImageFlex ? 'white' : ''
  return (
    <Hero
      isFaq={isFaq}
      headline={headline}
      description={html}
      eyebrow={eyebrow}
      eyebrowLogo={eyebrowLogo}
      eyebrowMobileLogo={eyebrowMobileLogo}
      backgroundImage={bgUrl || ''}
      modules={modules}
      sideImageUrl={sideImageUrl || ''}
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
    description: PropTypes.object,
    headline: PropTypes.string,
    hideHeadline: PropTypes.bool,
    headlineBorderBottom: PropTypes.bool,
    sideImageFlex: PropTypes.bool,
    eyebrow: PropTypes.string,
  }),
}
