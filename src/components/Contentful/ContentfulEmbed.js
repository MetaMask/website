import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SectionTitle } from '../StyledGeneral'

const ContentfulEmbed = props => {
  const {
    moduleConfig: {
      embed: { embed },
      title,
      displayTitle,
      moduleId,
    },
  } = props
  return (
    <Wrapper id={moduleId}>
      {title && displayTitle ? <Title>{title}</Title> : null}
      <EmbedHtml dangerouslySetInnerHTML={{ __html: embed }} />
    </Wrapper>
  )
}

export default ContentfulEmbed

ContentfulEmbed.propTypes = {
  moduleConfig: PropTypes.shape({
    displayTitle: PropTypes.bool,
    title: PropTypes.string,
    embed: PropTypes.shape({
      embed: PropTypes.string.isRequired,
    }).isRequired,
    moduleId: PropTypes.string,
  }),
}

const Wrapper = styled.div`
  display: block;
  width: 100%;
`

const Title = styled(SectionTitle)`
  text-align: center;
  margin-bottom: 32px;
`

const EmbedHtml = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
  border-radius: 12px;
  overflow: hidden;
  iframe {
    border-radius: 12px;
  }
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
