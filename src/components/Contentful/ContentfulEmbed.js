import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

const ContentfulEmbed = props => {
  const {
    moduleConfig: {
      embed: { embed },
      title,
      displayTitle,
    },
  } = props
  console.log(embed)
  return (
    <div>
      {title ? (
        <Title
          className={classnames({
            hidden: !displayTitle,
          })}
        >
          {title}
        </Title>
      ) : null}
      <EmbedHtml dangerouslySetInnerHTML={{ __html: embed }} />
    </div>
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
  }),
}

const Title = styled.h2`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  text-align: center;
  margin-bottom: 32px;
`

const EmbedHtml = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
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
