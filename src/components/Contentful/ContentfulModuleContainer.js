import React from 'react'
import PropTypes from 'prop-types'
import ContentWrapper from '../ContentWrapper'
import styled from 'styled-components'

const ContentfulModuleContainer = props => {
  const {
    moduleConfig: {
      title,
      description,
      columns,
      contentAlignment,
      splitModules,
      displayTitle,
    },
  } = props

  const { childMarkdownRemark: { html } = {} } = description || {}

  return <ContentWrapper>
    {displayTitle ? <Title>{title}</Title> : null}
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </ContentWrapper>
}

export default ContentfulModuleContainer

ContentfulModuleContainer.propTypes = {
  moduleConfig: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.object,
    columns: PropTypes.number,
    contentAlignment: PropTypes.string,
    splitModules: PropTypes.bool,
  }),
}

const Title = styled.h2`
  margin-bottom: 1rem;
  @media (min-width: ${({ theme }) => theme.device.desktop}) {
    margin-bottom: 2rem;
  }
`
