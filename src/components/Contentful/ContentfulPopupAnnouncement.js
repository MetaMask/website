import React from 'react'
import PropTypes from 'prop-types'
import PopupAnnouncement from '../PopupAnnouncement'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'

const ContentfulPopupAnnouncement = props => {
  const {
    moduleConfig: {
      title,
      ctaText,
      ctaLink,
      backgroundColor,
      image,
      previewMode = false,
    },
  } = props
  return (
    <PopupAnnouncement
      title={title}
      ctaText={ctaText}
      ctaLink={ctaLink}
      backgroundColor={backgroundColor}
      image={image}
      previewMode={previewMode}
    />
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig.previewContent || data.moduleConfig

  const dataUpdate = {
    moduleConfig: {
      previewMode: true,
      ...data,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(
  ContentfulPopupAnnouncement
)

ContentfulPopupAnnouncement.propTypes = {
  moduleConfig: PropTypes.shape({
    title: PropTypes.string,
    ctaText: PropTypes.string,
    ctaLink: PropTypes.string,
    backgroundColor: PropTypes.string,
  }),
}
