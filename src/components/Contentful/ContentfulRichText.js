import React from 'react'
import PropTypes from 'prop-types'
import RichText from '../RichText'

const ContentfulRichText = props => {
  const {
    moduleConfig: { title, body, htmlBody, displayTitle },
  } = props

  const { childMarkdownRemark: { htmlConfig } = {} } = htmlBody || {}
  const bodyConfig = body && body.internal ? JSON.parse(body.internal.content).content : ''

  return (
    <RichText
      title={title}
      content={bodyConfig}
      html={htmlConfig}
      displayTitle={displayTitle}
    />
  )
}

export default ContentfulRichText

ContentfulRichText.propTypes = {
  moduleConfig: PropTypes.shape({
    moduleConfig: PropTypes.shape({
      title: PropTypes.string,
      body: PropTypes.shape({
        internal: PropTypes.shape({
          content: PropTypes.string,
        }),
      }),
      htmlBody: PropTypes.shape({
        childMarkdownRemark: PropTypes.shape({
          html: PropTypes.string,
        }),
      }),
      hasModuleContainer: PropTypes.bool,
      displayTitle: PropTypes.bool,
    }),
  }),
}
