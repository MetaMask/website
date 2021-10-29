import React from 'react'
import PropTypes from 'prop-types'

import ContentWrapper from '../ContentWrapper'

const ContentfulFaq = props => {
  const {
    moduleConfig: { question, answer, hasModuleContainer },
  } = props

  const El = !hasModuleContainer
    ? ({ children, ...props }) => (
        <ContentWrapper {...props}>{children}</ContentWrapper>
      )
    : React.Fragment

  return <El></El>
}

export default ContentfulFaq

ContentfulFaq.propTypes = {
  moduleConfig: PropTypes.shape({
    question: PropTypes.string,
    answer: PropTypes.string,
  }),
}
