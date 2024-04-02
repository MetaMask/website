import React, { useState } from 'react'
import styled from 'styled-components'
import Image from '../../../../Image'
import PlayButtonIcon from '../../../../../images/icons/icon-play.svg'

/**
 * @name VideoButton
 * @summary -
 * @description - Portfolio page - Video Button
 */

const VideoButton = props => {
  const { posterImage, onClick, visible = false } = props
  const [imageLoaded, setImageLoaded] = useState(visible)

  return (
    <VideoPlayerWrapper>
      <VideoPlayer onClick={onClick}>
        <Content $visible={imageLoaded}>
          <PosterImage onLoad={() => setImageLoaded(true)} src={posterImage} />
          <PlayButton>
            <PlayButtonIcon />
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0"
                y="0"
                width="100"
                height="100"
                rx="50"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </PlayButton>
        </Content>
      </VideoPlayer>
    </VideoPlayerWrapper>
  )
}

export default VideoButton

const VideoPlayerWrapper = styled.div`
  position: relative;
`

const VideoPlayer = styled.button`
  position: relative;
  width: 100%;
  margin-top: 35px;
  border: 0;
  padding: 56.25% 0 0 0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background-color: #e7e7e7;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.085);
    opacity: 0;
    transition: transform 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955),
      opacity 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    pointer-events: none;
  }

  &:hover {
    ::after {
      opacity: 1;
    }
  }
`

const Content = styled.div`
  opacity: ${({ $visible }) => ($visible ? '1' : '0')};
  transition: opacity 0.25s ease-out;
`

const PosterImage = styled(Image)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  pointer-events: none;
`

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border: 0;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 100px;
  overflow: hidden;
  z-index: 2;

  svg {
    &:nth-child(2) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      stroke-dasharray: 320;
      stroke-dashoffset: 320;
      transition: stroke-dashoffset 0.4s ease-out;

      ${VideoPlayer}:hover & {
        stroke-dashoffset: 0;
      }
    }
  }
`
