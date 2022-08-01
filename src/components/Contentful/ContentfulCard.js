import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card'
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser'

const ContentfulCard = props => {
  const {
    moduleConfig: {
      description,
      title,
      image,
      imageDarkMode,
      link,
      cta,
      newTab,
      backgroundColor,
      backgroundImage,
      backgroundImageMobile,
      imageMargin,
      previewMode,
      layoutType,
      layoutSize,
      hubSpotForm,
    },
  } = props
  const { childMarkdownRemark: { html } = {} } = description || {}
  const bgUrl = parseContentfulAssetUrl(backgroundImage)
  const bgMobileUrl = parseContentfulAssetUrl(backgroundImageMobile)

  return (
    <Card
      {...props.moduleConfig}
      description={previewMode ? description : html}
      title={title}
      image={image}
      imageDarkMode={imageDarkMode}
      link={link}
      newTab={newTab}
      backgroundColor={backgroundColor}
      backgroundImage={bgUrl || ''}
      backgroundImageMobile={bgMobileUrl || ''}
      imageMargin={imageMargin}
      layoutType={layoutType}
      layoutSize={layoutSize}
      cta={cta}
      hubSpotForm={hubSpotForm}
    />
  )
}

export default ContentfulCard

ContentfulCard.propTypes = {
  moduleConfig: PropTypes.shape({
    description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    link: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.object,
    newTab: PropTypes.bool,
    backgroundColor: PropTypes.string,
    backgroundImage: PropTypes.object,
    backgroundImageMobile: PropTypes.object,
    cta: PropTypes.array,
    imageMargin: PropTypes.bool,
    layoutType: PropTypes.string,
    layoutSize: PropTypes.string,
  }),
}
