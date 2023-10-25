import React from 'react'
import PropTypes from 'prop-types'
import ConsenSysResources from '../ConsenSysResources'
import ConsensysCommunityEvent from '../ConsensysCommunityEvent'

const ContentfulConsenSysResources = props => {
  const {
    moduleConfig: { categoryId, numberOfItem, linkText, link, showDate },
  } = props

  if (categoryId === 'community-event')
    return (
      <ConsensysCommunityEvent
        numberOfItem={numberOfItem}
        showDate={showDate}
        link={link}
      />
    )
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
