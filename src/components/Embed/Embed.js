import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import parseIframe from './parseIframe'
import Popup from '../Popup'

const EmbedHtml = props => {
  const { html, playOnPopup, thumbnailUrl, cardRef, hidePlayerIcon } = props
  // image filed is only for iframe image
  const [popupId, setPopupId] = React.useState('')
  const [showOverlay, setShowOverlay] = React.useState(true)
  const contentRef = React.useRef(null)
  let htmlParse = html
  let iframePopupData
  let youtubeId
  if (htmlParse?.includes('<iframe')) {
    const { htmlString, iframeList, idYoutube } = parseIframe(
      htmlParse,
      playOnPopup,
      thumbnailUrl,
      hidePlayerIcon
    )
    htmlParse = htmlString
    iframePopupData = iframeList
    youtubeId = idYoutube
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
  }, [playOnPopup, iframePopupData?.length])

  return (
    <Wrapper $playOnPopup={playOnPopup}>
      <EmbedHtmlWrapper
        ref={contentRef}
        $playOnPopup={playOnPopup}
        dangerouslySetInnerHTML={{
          __html: htmlParse,
        }}
      />
      {!playOnPopup && showOverlay && (
        <>
          <img
            className="thumbnail-image"
            src={
              thumbnailUrl ||
              `https://i.ytimg.com/vi_webp/${youtubeId}/sddefault.webp`
            }
            width={1200}
            height={630}
            alt="Youtube overlay image"
          />
          <VideoOverlay onClick={() => setShowOverlay(false)}>
            <span className="icon-play">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="28"
                viewBox="0 0 23 28"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.976562 13.7469V25.0549C0.976562 26.6431 2.73876 27.5977 4.0691 26.7301L21.4079 15.4222C22.6178 14.6331 22.6178 12.8608 21.4079 12.0717L4.0691 0.763819C2.73876 -0.103793 0.976562 0.850786 0.976562 2.43904V13.7469Z"
                  fill="white"
                />
              </svg>
            </span>
          </VideoOverlay>
        </>
      )}
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
            />
          )}
        </Popup>
      ) : null}
    </Wrapper>
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

  ${({ $playOnPopup, theme }) =>
    $playOnPopup
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

const VideoOverlay = styled.div`
  position: absolute;
  width: 100%;
  inset: 0;
  margin: auto;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  color: white;
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  transition: background 300ms ease;
  cursor: pointer;

  .icon-play {
    width: 60px;
    height: 60px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #037dd6;
    transition: background 200ms ease;
    border-radius: 100%;

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  }

  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`

const Wrapper = styled.div`
  ${({ $playOnPopup, theme }) =>
    $playOnPopup
      ? ''
      : `
  position: relative;
  overflow-y: hidden;
  border-radius: 12px;
  margin: 0 auto;
  @media (min-width: ${theme.device.desktop}) {
    width: fit-content;
  }
  .thumbnail-image {
    position:absolute;
    width:100%;
    inset: 0;
    margin:auto;
    z-index: 3;
  }`}
`
