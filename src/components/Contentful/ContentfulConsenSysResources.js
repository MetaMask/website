import React from 'react'
import PropTypes from 'prop-types'
import ConsenSysResources from '../ConsenSysResources'

const ContentfulConsenSysResources = props => {
  const {
    moduleConfig: { categoryId, numberOfItem, linkText, link, showDate },
  } = props
  return (
    <ConsenSysResources
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
    categoryId: PropTypes.string,
    numberOfItem: PropTypes.number,
    linkText: PropTypes.string,
    link: PropTypes.string,
    showDate: PropTypes.bool,
  }),
}
