import React from 'react'
import PropTypes from 'prop-types'
import { useContentfulInspectorMode } from '@contentful/live-preview/react'
import { Wrapper, Image } from '../Logo'
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
      contentful_id,
    },
  } = props
  const { title: titleFile, description: descriptionFile } = logo || {}
  const inspectorProps = useContentfulInspectorMode()

  return (
    <Wrapper
      link={link}
      opensNewTab={linkOpensNewTab}
      child={hasModuleContainer}
      cleanStyle={cleanStyle}
      backgroundColor={backgroundColor}
      {...(previewMode
        ? inspectorProps({
            entryId: contentful_id,
            fieldId: 'logo',
          })
        : {})}
    >
      {logo ? (
        <Image
          src={logo}
          alt={descriptionFile || titleFile || title}
          width={widthLogo}
          srcDarkMode={logoDarkMode}
          previewMode={previewMode}
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
