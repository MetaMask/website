import React from 'react'
import PropTypes from 'prop-types'
import Faq from '../Faq'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'

const ContentfulFaq = props => {
  const {
    moduleConfig: {
      question,
      answer,
      contentful_id,
      backgroundColor,
      containerBgColor,
      previewMode = false,
    },
  } = props
  const { childMarkdownRemark: { html } = {} } = answer || {}
  return (
    <Faq
      answer={previewMode ? answer : html}
      question={question}
      id={contentful_id}
      backgroundColor={backgroundColor}
      containerBgColor={containerBgColor}
      previewMode={previewMode}
    />
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig.previewContent || data.moduleConfig

  const dataUpdate = {
    moduleConfig: {
      contentful_id: data.sys?.id,
      previewMode: true,
      ...data,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(ContentfulFaq)

ContentfulFaq.propTypes = {
  moduleConfig: PropTypes.shape({
    question: PropTypes.string,
    answer: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    contentful_id: PropTypes.string,
    backgroundColor: PropTypes.string,
    containerBgColor: PropTypes.string,
    previewMode: PropTypes.bool,
  }),
}
