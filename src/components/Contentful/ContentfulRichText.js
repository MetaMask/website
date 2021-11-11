import React from 'react'
import PropTypes from 'prop-types'
import RichText from '../RichText'

const ContentfulRichText = props => {
  const {
    moduleConfig: { title, htmlBody, displayTitle, moduleId },
  } = props

  const { childMarkdownRemark: { html } = {} } = htmlBody || {}

  return (
    <RichText
      title={title}
      html={html}
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
      htmlBody: PropTypes.shape({
        childMarkdownRemark: PropTypes.shape({
          html: PropTypes.string,
        }),
      }),
      hasModuleContainer: PropTypes.bool,
      displayTitle: PropTypes.bool,
      moduleId: PropTypes.string,
    }),
  }),
}
