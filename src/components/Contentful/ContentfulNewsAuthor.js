import React from 'react'
import PropTypes from 'prop-types'
import Author from '../Author'

const ContentfulNewsAuthor = props => {
  const {
    moduleConfig: { name, image, imageDarkMode, link },
  } = props

  return (
    <Author
      name={name}
      image={image}
      imageDarkMode={imageDarkMode}
      link={link}
    />
  )
}

export default ContentfulNewsAuthor

ContentfulNewsAuthor.propTypes = {
  moduleConfig: PropTypes.shape({
    link: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.object,
    imageDarkMode: PropTypes.object,
  }),
}
