import React from 'react'
import PropTypes from 'prop-types'
import Faq from '../Faq'

const ContentfulFaq = props => {
  const {
    moduleConfig: {
      question,
      answer,
      contentful_id,
      backgroundColor,
      containerBgColor,
    },
  } = props
  const { childMarkdownRemark: { html } = {} } = answer || {}
  return (
    <Faq
      answer={html}
      question={question}
      id={contentful_id}
      backgroundColor={backgroundColor}
      containerBgColor={containerBgColor}
    ></Faq>
  )
}

export default ContentfulFaq

ContentfulFaq.propTypes = {
  moduleConfig: PropTypes.shape({
    question: PropTypes.string,
    answer: PropTypes.object,
    contentful_id: PropTypes.string,
    backgroundColor: PropTypes.string,
    containerBgColor: PropTypes.string,
  }),
}
