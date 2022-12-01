import React from 'react'
import PropTypes from 'prop-types'
import RichText from '../RichText'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'

const ContentfulRichText = props => {
  const {
    moduleConfig: {
      title,
      htmlBody,
      displayTitle,
      moduleId,
      previewMode = false,
    },
  } = props

  const { childMarkdownRemark: { html } = {}, content } = htmlBody || {}

  return (
    <RichText
      title={title}
      html={previewMode ? htmlBody : html}
      content={previewMode ? htmlBody : content}
      displayTitle={displayTitle}
      moduleId={moduleId}
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

export default withProcessPreviewData(parsePreviewData)(ContentfulRichText)

ContentfulRichText.propTypes = {
  moduleConfig: PropTypes.shape({
    moduleConfig: PropTypes.shape({
      title: PropTypes.string,
      htmlBody: PropTypes.oneOfType([
        PropTypes.shape({
          childMarkdownRemark: PropTypes.shape({
            html: PropTypes.string,
          }),
        }),
        PropTypes.string,
      ]),
      previewMode: PropTypes.bool,
      hasModuleContainer: PropTypes.bool,
      displayTitle: PropTypes.bool,
      moduleId: PropTypes.string,
    }),
  }),
}
