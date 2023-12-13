import React from 'react'
import PropTypes from 'prop-types'
import Hero from '../HeroContainer'
import isEmpty from 'lodash/isEmpty'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'

const ContentfulLayoutHero = props => {
  const {
    moduleConfig: {
      backgroundImage,
      backgroundImageDarkMode,
      ctas,
      description,
      descriptionPortfolio,
      note,
      headline,
      headlinePortfolio,
      modules,
      sideImage = {},
      sideImagePortfolio = {},
      sideImageDarkMode = {},
      sideImagePortfolioDarkMode = {},
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
      contentful_id,
      previewMode = false,
      customClass,
    },
  } = props

  const { childMarkdownRemark: { html } = {} } = description || {}
  const htmlPortfolio = descriptionPortfolio?.childMarkdownRemark?.html || {}

  return (
    <Hero
      sectionPadding={sectionPadding}
      isFaq={isFaq}
      headline={headline}
      headlinePortfolio={headlinePortfolio ?? headline}
      description={previewMode ? description : html}
      descriptionPortfolio={
        previewMode
          ? !isEmpty(descriptionPortfolio)
            ? descriptionPortfolio
            : description
          : !isEmpty(htmlPortfolio)
          ? htmlPortfolio
          : html
      }
      note={note}
      eyebrow={eyebrow}
      eyebrowLogo={eyebrowLogo}
      eyebrowMobileLogo={eyebrowMobileLogo}
      eyebrowLogoDarkMode={eyebrowLogoDarkMode}
      eyebrowMobileLogoDarkMode={eyebrowMobileLogoDarkMode}
      backgroundImage={backgroundImage}
      backgroundImageDarkMode={backgroundImageDarkMode}
      modules={modules}
      sideImage={sideImage}
      sideImagePortfolio={
        !isEmpty(sideImagePortfolio) ? sideImagePortfolio : sideImage
      }
      sideImageDarkMode={sideImageDarkMode}
      sideImagePortfolioDarkMode={
        !isEmpty(sideImagePortfolioDarkMode)
          ? sideImagePortfolioDarkMode
          : sideImageDarkMode
      }
      hideHeadline={hideHeadline}
      showLearnMore={showLearnMore}
      showFavIcon={showFavIcon}
      hubSpotForm={hubSpotForm}
      contentAlignment={contentAlignment}
      backgroundColor={backgroundColor}
      headlineBorderBottom={headlineBorderBottom}
      sideImageFlex={sideImageFlex}
      sideImageFoxAnimation={sideImageFoxAnimation}
      ctas={ctas}
      contentfulId={contentful_id}
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
    sideImageDarkMode: PropTypes.object,
    sideImagePortfolio: PropTypes.object,
    sideImagePortfolioDarkMode: PropTypes.object,
    backgroundImage: PropTypes.object,
    backgroundImageDarkMode: PropTypes.object,
    ctaLink: PropTypes.string,
    ctaText: PropTypes.string,
    backgroundColor: PropTypes.string,
    layout: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    descriptionPortfolio: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
    ]),
    note: PropTypes.string,
    headline: PropTypes.string,
    headlinePortfolio: PropTypes.string,
    hideHeadline: PropTypes.bool,
    headlineBorderBottom: PropTypes.bool,
    sideImageFlex: PropTypes.bool,
    sideImageFoxAnimation: PropTypes.bool,
    eyebrow: PropTypes.string,
    sectionPadding: PropTypes.string,
    previewMode: PropTypes.bool,
  }),
}
