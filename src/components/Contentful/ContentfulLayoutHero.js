import React from 'react'
import PropTypes from 'prop-types'
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser'
import Hero from '../HeroContainer'

const ContentfulLayoutHero = props => {
  const {
    moduleConfig: {
      backgroundImage,
      ctaLink,
      ctaText,
      description,
      headline,
      modules,
      sideImage = {},
      eyebrowLogo,
      eyebrowMobileLogo,
      hideHeadline,
      showLearnMore,
      showFavIcon,
      hubSpotForm,
      contentAlignment,
      backgroundColor,
      headlineBorderBottom,
    },
  } = props
  const { childMarkdownRemark: { html } = {} } = description || {}
  const bgUrl = parseContentfulAssetUrl(backgroundImage)
  const sideImageUrl = parseContentfulAssetUrl(sideImage)

  return (
    <Hero
      headline={headline}
      description={html}
      eyebrowLogo={eyebrowLogo}
      eyebrowMobileLogo={eyebrowMobileLogo}
      backgroundImage={bgUrl || ''}
      ctaText={ctaText}
      ctaLink={ctaLink}
      modules={modules}
      sideImage={sideImageUrl || ''}
      hideHeadline={hideHeadline}
      showLearnMore={showLearnMore}
      showFavIcon={showFavIcon}
      hubSpotForm={hubSpotForm}
      contentAlignment={contentAlignment}
      backgroundColor={backgroundColor}
      headlineBorderBottom={headlineBorderBottom}
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
  }),
}
