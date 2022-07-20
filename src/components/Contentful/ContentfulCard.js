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
      imageMargin,
      previewMode,
      layoutType,
      layoutSize,
    },
  } = props
  const { childMarkdownRemark: { html } = {} } = description || {}
  const bgUrl = parseContentfulAssetUrl(backgroundImage)

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
      imageMargin={imageMargin}
      layoutType={layoutType}
      layoutSize={layoutSize}
      cta={cta}
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
    cta: PropTypes.array,
    imageMargin: PropTypes.bool,
    layoutType: PropTypes.string,
    layoutSize: PropTypes.string,
  }),
}
