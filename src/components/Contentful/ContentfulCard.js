import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'

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
      previewMode = false,
      layoutType,
      layoutSize,
      hubSpotForm,
      contentful_id,
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
      backgroundImage={backgroundImage}
      backgroundImageMobile={backgroundImageMobile}
      imageMargin={imageMargin}
      layoutType={layoutType}
      layoutSize={layoutSize}
      cta={cta}
      hubSpotForm={hubSpotForm}
      previewMode={previewMode}
      contentfulId={contentful_id}
    />
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig.previewContent || data.moduleConfig
  const { ctaCollection } = data

  const dataUpdate = {
    moduleConfig: {
      previewMode: true,
      cta: ctaCollection?.items,
      ...data,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(ContentfulCard)

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
