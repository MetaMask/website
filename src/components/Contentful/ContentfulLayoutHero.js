import React from 'react'
import PropTypes from 'prop-types'
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser'
import Hero from '../HeroContainer'
import CTA from '../CTA'

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
    },
  } = props
  const { childMarkdownRemark: { html } = {} } = description || {}
  const eyebrowUrl = parseContentfulAssetUrl(eyebrowLogo)
  const bgUrl = parseContentfulAssetUrl(backgroundImage)

  let HeroCTA
  if (ctaLink) {
    HeroCTA = (
      <CTA text={ctaText} link={ctaLink} button={true} buttonSize="large" />
    )
  }

  return (
    <Hero
      headline={headline}
      description={html}
      eyebrowLogo={eyebrowUrl}
      backgroundImage={bgUrl || ''}
      CTA={HeroCTA}
      modules={modules}
      sideImage={sideImage}
      hideHeadline={hideHeadline}
      showLearnMore={showLearnMore}
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
