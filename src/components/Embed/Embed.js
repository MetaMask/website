import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import parseIframe from './parseIframe';

const EmbedHtml = props => {
  const {
    html
  } = props
  let htmlParse = html;
  if (htmlParse.includes('<iframe')) {
    htmlParse = parseIframe(htmlParse);
  }

  return (
    <EmbedHtmlWrapper
        dangerouslySetInnerHTML={{
          __html: htmlParse,
        }}
    />
  )
}

export default EmbedHtml

EmbedHtml.propTypes = {
  moduleConfig: PropTypes.shape({
    displayTitle: PropTypes.bool,
    title: PropTypes.string,
    embed: PropTypes.oneOfType([
      PropTypes.shape({
        embed: PropTypes.string.isRequired,
      }),
      PropTypes.string,
    ]),
    moduleId: PropTypes.string,
  }),
}

const EmbedHtmlWrapper = styled.div`
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
