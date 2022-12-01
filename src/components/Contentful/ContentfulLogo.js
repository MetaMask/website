import React from 'react'
import PropTypes from 'prop-types'
import { Wrapper, Image } from '../Logo'
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'

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
      previewMode = false,
    },
  } = props
  const { title: titleFile, description: descriptionFile } = logo || {}
  const url = parseContentfulAssetUrl(logo, previewMode)
  const urlDarkMode = parseContentfulAssetUrl(logoDarkMode, previewMode)
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

export default withProcessPreviewData(parsePreviewData)(ContentfulLogo)
ContentfulLogo.propTypes = {
  moduleConfig: PropTypes.shape({
    splitTextBody: PropTypes.object,
    splitTextDescription: PropTypes.object,
    previewMode: PropTypes.bool,
  }),
}
