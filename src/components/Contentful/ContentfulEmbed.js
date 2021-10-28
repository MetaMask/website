import React from 'react'
import PropTypes from 'prop-types'
import ContentWrapper from '../ContentWrapper'
import styled from 'styled-components'

const ContentfulEmbed = props => {
  const {
    moduleConfig: {
      hasModuleContainer,
      embed: { embed },
    },
  } = props
  const El = !hasModuleContainer
    ? ({ children, ...props }) => (
        <ContentWrapper htmlEmbed {...props}>
          {children}
        </ContentWrapper>
      )
    : React.Fragment

  return (
    <El>
      <EmbedHtml dangerouslySetInnerHTML={{ __html: embed }} />
    </El>
  )
}

export default ContentfulEmbed

ContentfulEmbed.propTypes = {
  moduleConfig: PropTypes.shape({
    embedTag: PropTypes.shape({
      embedTag: PropTypes.string.isRequired,
    }).isRequired,
  }),
}

const EmbedHtml = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
  position: relative;
  @media (max-width: ${({ theme }) => theme.device.desktopMediaMax}) {
    &:before {
      content: '';
      display: block;
      padding-bottom: 56.25%;
    }

    iframe {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      margin: 0 !important;
    }
  }
`
