import React from 'react'
import PropTypes from 'prop-types'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import ContentWrapper from '../ContentWrapper'
import styled from 'styled-components'

const ContentfulModuleContainer = props => {
  const {
    moduleConfig: {
      moduleName,
      displayModuleName,
      columns,
      containerWidth = 'wide',
      modules,
      childHeroContainer,
      fontWeightManual,
    },
  } = props

  return (
    <ContentWrapper size={containerWidth}>
      {displayModuleName ? <Title>{moduleName}</Title> : null}
      <ContentWrapper
        size={containerWidth}
        columns={columns}
        styleOverride={`margin-top: 0 !important;margin-bottom: 0!important;`}
      >
        {modules.map(m =>
          contentfulModuleToComponent({
            ...m,
            hasModuleContainer: true,
            containerWidth,
            childHeroContainer,
            fontWeightManual,
          })
        )}
      </ContentWrapper>
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
  @media(min-width: ${({theme}) => theme.device.desktop}) {
    margin-bottom: 2rem;
  }
`
