import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Image } from '../Logo'
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser'

const ContentfulLogo = props => {
  const {
    moduleConfig: {
      logo,
      logoDarkMode,
      link,
      linkOpensNewTab,
      title,
      hasModuleContainer,
      cleanStyle,
      widthLogo,
      backgroundColor,
    },
  } = props
  const { title: titleFile, description: descriptionFile } = logo || {}
  const url = parseContentfulAssetUrl(logo)
  const urlDarkMode = parseContentfulAssetUrl(logoDarkMode)
  return (
    <Wrapper
      link={link}
      opensNewTab={linkOpensNewTab}
      child={hasModuleContainer}
      cleanStyle={cleanStyle}
      backgroundColor={backgroundColor}
    >
      {url ? (
        <Image
          src={url}
          alt={descriptionFile || titleFile || title}
          width={widthLogo}
          srcDarkMode={urlDarkMode}
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
