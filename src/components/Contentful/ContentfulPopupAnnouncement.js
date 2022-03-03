import React from 'react'
import PropTypes from 'prop-types'
import PopupAnnouncement from '../PopupAnnouncement';

const ContentfulPopupAnnouncement = props => {
  const {
    moduleConfig: {
      title,
      ctaText,
      ctaLink,
      backgroundColor
    },
  } = props
  return (
    <PopupAnnouncement title={title} ctaText={ctaText} ctaLink={ctaLink} backgroundColor={backgroundColor} />
  )
}

export default ContentfulPopupAnnouncement

ContentfulPopupAnnouncement.propTypes = {
  moduleConfig: PropTypes.shape({
    title: PropTypes.string,
    ctaText: PropTypes.string,
    ctaLink: PropTypes.string,
    backgroundColor: PropTypes.string
  }),
}
