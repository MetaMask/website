import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import parseIframe from './parseIframe'
import Popup from '../Popup'

const EmbedHtml = props => {
  const { html, playOnPopup, thumbnailUrl, cardRef, hidePlayerIcon } = props
  // image filed is only for iframe image
  const [popupId, setPopupId] = React.useState('')
  const contentRef = React.useRef(null)
  let htmlParse = html
  let iframePopupData
  if (htmlParse?.includes('<iframe')) {
    const { htmlString, iframeList } = parseIframe(
      htmlParse,
      playOnPopup,
      thumbnailUrl,
      hidePlayerIcon
    )
    htmlParse = htmlString
    iframePopupData = iframeList
  }

  const onClosePopup = () => {
    setPopupId('')
  }

  useEffect(() => {
    if (playOnPopup && iframePopupData?.length) {
      if (cardRef?.current) {
        cardRef.current.onclick = () => {
          setPopupId('0')
        }
      } else {
        const popupTargets = contentRef.current.querySelectorAll(
          '.embed-popup-target'
        )
        if (popupTargets && popupTargets.length) {
          popupTargets.forEach(e => {
            e.onclick = () => {
              const id = e.dataset.id
              setPopupId(id)
            }
          })
        }
      }
    }
  }, [cardRef, playOnPopup, iframePopupData?.length])

  return (
    <>
      <EmbedHtmlWrapper
        ref={contentRef}
        playOnPopup={playOnPopup}
        dangerouslySetInnerHTML={{
          __html: htmlParse,
        }}
      />
      {playOnPopup ? (
        <Popup
          width={'800px'}
          showPopup={!!popupId}
          onClosePopup={onClosePopup}
          hideCloseIcon
        >
          {!!popupId && (
            <EmbedHtmlPopup
              dangerouslySetInnerHTML={{
                __html: iframePopupData[popupId],
              }}
            ></EmbedHtmlPopup>
          )}
        </Popup>
      ) : null}
    </>
  )
}

export default EmbedHtml

EmbedHtml.propTypes = {
  moduleConfig: PropTypes.shape({
    html: PropTypes.string,
    playOnPopup: PropTypes.bool,
    thumbnailUrl: PropTypes.string,
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
  .displayEmbedAsNormal & {
    border-radius: 12px;
    .embed-popup-target {
      &:before {
        padding-bottom: 56.25%;
      }
    }
  }
  .embedHeight20 & {
    .embed-popup-target {
      &:before {
        padding-bottom: 20%;
      }
    }
  }
  .embedHeight50 & {
    .embed-popup-target {
      &:before {
        padding-bottom: 50%;
      }
    }
  }
  .displayEmbedAsNormalOnMobile & {
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      border-radius: 12px;
      .embed-popup-target {
        &:before {
          padding-bottom: 56.25%;
        }
      }
    }
  }

  ${({ playOnPopup, theme }) =>
    playOnPopup
      ? `
    border-radius: 12px 12px 0 0;
  `
      : `
    @media (max-width: ${theme.device.desktopMediaMax}) {
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
  `}
`
const EmbedHtmlPopup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 2;
  overflow: hidden;

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
`
