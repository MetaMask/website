import React from 'react'
import PropTypes from 'prop-types'
import RichText from '../RichText'

const ContentfulRichText = props => {
  const {
    moduleConfig: { title, htmlBody, displayTitle, moduleId, previewMode },
  } = props

  const { childMarkdownRemark: { html } = {} } = htmlBody || {}

  return (
    <RichText
      title={title}
      html={previewMode ? htmlBody : html}
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
      hasModuleContainer: PropTypes.bool,
      displayTitle: PropTypes.bool,
      moduleId: PropTypes.string,
    }),
  }),
}
