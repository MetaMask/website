import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Image } from '../Logo'

const ContentfulLogo = props => {
  const {
    moduleConfig: { logo, link, linkOpensNewTab, title, hasModuleContainer, cleanStyle },
  } = props
  return (
    <Wrapper
      link={link}
      opensNewTab={linkOpensNewTab}
      child={hasModuleContainer}
      cleanStyle={cleanStyle}
    >
      {logo && logo.file && <Image src={logo.file.url} alt={title} />}
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
