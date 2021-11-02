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
      sideImage,
      eyebrowLogo,
      hideHeadline,
      showLearnMore,
      showFavIcon,
      hubSpotForm,
    },
  } = props
  const { childMarkdownRemark: { html } = {} } = description || {}
  const bgUrl = parseContentfulAssetUrl(backgroundImage)
  const sideImageUrl=parseContentfulAssetUrl(sideImage)

  return (
    <Hero
      headline={headline}
      description={html}
      eyebrowLogo={eyebrowLogo}
      backgroundImage={bgUrl || ''}
      ctaText={ctaText}
      ctaLink={ctaLink}
      modules={modules}
      sideImage={sideImageUrl}
      hideHeadline={hideHeadline}
      showLearnMore={showLearnMore}
      showFavIcon={showFavIcon}
      hubSpotForm={hubSpotForm}
    />
  )
}

export default ContentfulLayoutHero

ContentfulLayoutHero.propTypes = {
  moduleConfig: PropTypes.shape({
    eyebrowLogo: PropTypes.object,
    sideImage: PropTypes.object,
    backgroundImage: PropTypes.object,
    ctaLink: PropTypes.string,
    ctaText: PropTypes.string,
    backgroundColor: PropTypes.string,
    layout: PropTypes.string,
    description: PropTypes.object,
    headline: PropTypes.string,
    hideHeadline: PropTypes.bool,
  }),
}
