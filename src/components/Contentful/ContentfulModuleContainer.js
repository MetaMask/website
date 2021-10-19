import React from 'react'
import PropTypes from 'prop-types'
import ContentWrapper from '../ContentWrapper'

const ContentfulModuleContainer = props => {
  return (
    <ContentWrapper>
    </ContentWrapper>
  )
}

export default ContentfulModuleContainer

ContentfulModuleContainer.propTypes = {
  moduleConfig: PropTypes.shape({
    columns: PropTypes.number,
    modules: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  }),
}
