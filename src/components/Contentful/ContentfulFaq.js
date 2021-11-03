import React from 'react'
import PropTypes from 'prop-types'
import Faq from '../Faq'

const ContentfulFaq = props => {
  const {
    moduleConfig: { question, answer, activeId, setActiveId, contentful_id },
  } = props
  const { childMarkdownRemark: { html } = {} } = answer || {}
  return <Faq answer={html} question={question} activeId={activeId} setActiveId={setActiveId} id={contentful_id}></Faq>
}

export default ContentfulFaq

ContentfulFaq.propTypes = {
  moduleConfig: PropTypes.shape({
    question: PropTypes.string,
    answer: PropTypes.string,
    contentful_id: PropTypes.string,
  }),
}
