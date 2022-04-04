import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card'

const ContentfulCard = props => {
  const {
    moduleConfig: {
      description,
      title,
      image,
      imageDarkMode,
      link,
      newTab,
      backgroundColor,
      imageMargin,
      previewMode,
      layoutType,
      layoutSize
    },
  } = props
  const { childMarkdownRemark: { html } = {} } = description || {}

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
      imageMargin={imageMargin}
      layoutType={layoutType}
      layoutSize={layoutSize}
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
    imageMargin: PropTypes.bool,
    layoutType: PropTypes.string,
    layoutSize: PropTypes.string,
  }),
}
