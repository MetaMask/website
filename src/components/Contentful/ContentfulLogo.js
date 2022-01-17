import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Image } from '../Logo'

const ContentfulLogo = props => {
  const {
    moduleConfig: {
      logo,
      link,
      linkOpensNewTab,
      title,
      hasModuleContainer,
      cleanStyle,
      widthLogo,
    },
  } = props
  const { title: titleFile, description: descriptionFile, file } = logo || {}
  return (
    <Wrapper
      link={link}
      opensNewTab={linkOpensNewTab}
      child={hasModuleContainer}
      cleanStyle={cleanStyle}
    >
      {logo && file && (
        <Image
          src={file.url}
          alt={descriptionFile || titleFile || title}
          width={widthLogo}
        />
      )}
    </Wrapper>
  )
}

export default ContentfulLogo

ContentfulLogo.propTypes = {
  moduleConfig: PropTypes.shape({
    splitTextBody: PropTypes.object,
    splitTextDescription: PropTypes.object,
  }),
}
