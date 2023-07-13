import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styled, { keyframes } from 'styled-components'
import classnames from 'classnames'

import ButtonShadow from '../../../Shared/ButtonShadow'

/**
 * @name VideoModal
 * @summary -
 * @description - Portfolio page - Video Modal
 */

const VideoModal = props => {
  const { embedUrl, setShowVideo } = props
  const el = useRef(null)
  const q = gsap.utils.selector(el)

  const [show, setShow] = useState(false)
  const [hide, setHide] = useState(false)

  const handleClickClose = () => {
    setHide(true)
    setShow(false)
    animationOut(onCompleteFn)
  }

  const onCompleteFn = () => {
    setShowVideo(false)
    setHide(true)
  }

  const animationIn = () => {
    const bgOverlay = q(`.${BgOverlay.styledComponentId}`)
    const content = q(`.${Content.styledComponentId}`)

    gsap
      .timeline({
        defaults: {
          ease: 'expo.out',
        },
      })
      .addLabel('start')
      .fromTo(
        content,
        {
          scale: 0.9,
          autoAlpha: 0,
        },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.75,
        },
        'start'
      )
      .fromTo(
        bgOverlay,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.75,
        },
        'start'
      )
  }

  const animationOut = onCompleteFn => {
    const bgOverlay = q(`.${BgOverlay.styledComponentId}`)
    const content = q(`.${Content.styledComponentId}`)

    gsap
      .timeline({
        defaults: {
          ease: 'expo.inOut',
        },
      })
      .addLabel('start')
      .fromTo(
        content,
        {
          scale: 1,
          autoAlpha: 1,
        },
        {
          scale: 0.9,
          autoAlpha: 0,
          duration: 0.75,
          onComplete: () => onCompleteFn && onCompleteFn(),
        },
        'start'
      )
      .fromTo(
        bgOverlay,
        {
          autoAlpha: 1,
        },
        {
          autoAlpha: 0,
          duration: 0.75,
        },
        'start'
      )
  }

  useEffect(() => {
    setShow(true)
    animationIn()

    return () => setShowVideo(false)
  }, [])

  return (
    <Wrapper
      ref={el}
      className={classnames({ showVideo: show, hideVideo: hide })}
    >
      <BgOverlay onClick={handleClickClose}></BgOverlay>

      <div>
        <Content>
          <VideoEmbed
            width="100%"
            height="100%"
            src={embedUrl}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></VideoEmbed>
        </Content>
      </div>

      <CloseBtn
        iconClose
        isCircular={true}
        onClick={handleClickClose}
      ></CloseBtn>
    </Wrapper>
  )
}

export default VideoModal

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 40;
`

const BgOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(30, 31, 37, 0.8);

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    background-color: rgba(0, 0, 0, 0.8);
  }
`

const Content = styled.div`
  position: relative;
  display: table-cell;
  width: 77vw;
  max-width: 2200px;
  padding-top: 56.25%;
  background-color: black;

  @media (min-width: ${({ theme }) =>
      theme.device.miniDesktop}) and (max-height: 800px) {
    width: 57vw;
  }

  @media (min-width: ${({ theme }) =>
      theme.device.miniDesktop}) and (max-height: 550px) {
    width: 47vw;
  }

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    width: 100vw;
    max-width: none;
  }
`

const VideoEmbed = styled.iframe`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 0;
`

const VMBtnFadeOut = keyframes`
  0% {
    scale: 1;
    opacity: 1;
    transform: rotate(0deg);
  }
  
  100% {
    scale: 0.5;
    opacity: 0;
    transform: rotate(180deg);
  }
`

const CloseBtn = styled(ButtonShadow)`
  position: absolute;
  top: 3vh;
  left: 50%;
  margin-left: -26px;
  transform: scale(1);
  transition: all 0.3s;
  transform-origin: center;
  z-index: 10;
  opacity: 0;

  .hideVideo & {
    animation: ${VMBtnFadeOut} 0.35s ease-out forwards;
  }

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    margin-left: -19px;
  }
`
