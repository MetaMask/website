import React from 'react'
import PropTypes from 'prop-types'
import ConsenSysResources from '../ConsenSysResources'

const ContentfulConsenSysResources = props => {
  const {
    moduleConfig: { title, categoryId, numberOfItem, linkText, link, showDate },
  } = props
  return (
    <ConsenSysResources
      title={title}
      categoryId={categoryId}
      numberOfItem={numberOfItem}
      linkText={linkText}
      link={link}
      showDate={showDate}
    />
  )
}

export default ContentfulConsenSysResources

ContentfulConsenSysResources.propTypes = {
  moduleConfig: PropTypes.shape({
    title: PropTypes.string,
    ctaText: PropTypes.string,
    ctaLink: PropTypes.string,
    backgroundColor: PropTypes.string,
  }),
}
