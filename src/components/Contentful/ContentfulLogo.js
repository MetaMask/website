import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Image } from '../Logo'
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser'

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
  const { title: titleFile, description: descriptionFile } = logo || {}
  const url = parseContentfulAssetUrl(logo)
  return (
    <Wrapper
      link={link}
      opensNewTab={linkOpensNewTab}
      child={hasModuleContainer}
      cleanStyle={cleanStyle}
    >
      {url ? (
        <Image
          src={url}
          alt={descriptionFile || titleFile || title}
          width={widthLogo}
        />
      ) : null}
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
