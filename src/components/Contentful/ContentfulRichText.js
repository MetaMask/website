import React from 'react'
import PropTypes from 'prop-types'
import RichText from '../RichText'

const ContentfulRichText = props => {
  const {
    moduleConfig: {
      title,
      htmlBody,
      displayTitle,
      moduleId,
      previewMode,
      previewContent,
    },
  } = props

  const { childMarkdownRemark: { html } = {}, content } = htmlBody || {}

  return (
    <RichText
      title={title}
      html={previewMode ? htmlBody : html}
      content={previewMode ? previewContent : content}
      displayTitle={displayTitle}
      moduleId={moduleId}
    />
  )
}

export default ContentfulRichText

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
      previewContent: PropTypes.string,
      hasModuleContainer: PropTypes.bool,
      displayTitle: PropTypes.bool,
      moduleId: PropTypes.string,
    }),
  }),
}
