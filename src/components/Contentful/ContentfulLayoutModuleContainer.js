import React from 'react'
import PropTypes from 'prop-types'
import ContentWrapper from '../ContentWrapper'
import styled from 'styled-components'

const ContentfulModuleContainer = props => {
  const {
    moduleConfig: {
      moduleName,
      displayModuleName,
    },
  } = props

  return (
    <ContentWrapper>
      {displayModuleName ? <Title>{moduleName}</Title> : null}
    </ContentWrapper>
  )
}

export default ContentfulModuleContainer

ContentfulModuleContainer.propTypes = {
  moduleConfig: PropTypes.shape({
    columns: PropTypes.number,
    modules: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    containerWidth: PropTypes.string,
  }),
}

const Title = styled.h2`
  margin-bottom: 1rem;
  @media (min-width: ${({ theme }) => theme.device.desktop}) {
    margin-bottom: 2rem;
  }
`
