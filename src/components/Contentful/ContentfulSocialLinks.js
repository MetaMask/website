import React from 'react'
import PropTypes from 'prop-types'
import SocialLinks from '../SocialLinks'

const ContentfulSocialLinks = props => {
  const {
    moduleConfig: {
      name,
      displayText,
      link,
      newTab,
    },
  } = props
  
  return (
    <SocialLinks name={name} displayText={displayText} link={link} newTab={newTab} />
  )
}

export default ContentfulSocialLinks

ContentfulSocialLinks.propTypes = {
    name: PropTypes.string,
    displayText: PropTypes.string,
    link: PropTypes.string,
    newTab: PropTypes.bool,
}

