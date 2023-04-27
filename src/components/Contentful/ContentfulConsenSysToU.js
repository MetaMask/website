import React from 'react'
import PropTypes from 'prop-types'
import ConsenSysToU from '../ConsenSysToU'

const ContentfulConsenSysToU = props => {
  const {
    moduleConfig: { pageId },
  } = props
  return <ConsenSysToU pageId={pageId} />
}

export default ContentfulConsenSysToU

ContentfulConsenSysToU.propTypes = {
  moduleConfig: PropTypes.shape({
    pageId: PropTypes.string,
  }),
}
