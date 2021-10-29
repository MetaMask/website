import React from 'react'
import PropTypes from 'prop-types'

import ContentWrapper from '../ContentWrapper'
import RichText from '../RichText'

const ContentfulRichText = props => {
  const {
    moduleConfig: { title, body, htmlBody, displayTitle, hasModuleContainer },
  } = props

  const El = !hasModuleContainer
    ? ({ children, ...props }) => (
        <ContentWrapper
          styleOverride={`@media(min-width: 992px) {margin: 5rem auto;}`}
          {...props}
        >
          {children}
        </ContentWrapper>
      )
    : React.Fragment

  const { content: { bodyConfig } = {} } = body || {}
  const { childMarkdownRemark: { htmlConfig } = {} } = htmlBody || {}

  return (
    <El>
      <RichText
        title={title}
        content={bodyConfig}
        html={htmlConfig}
        displayTitle={displayTitle}
      />
    </El>
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
