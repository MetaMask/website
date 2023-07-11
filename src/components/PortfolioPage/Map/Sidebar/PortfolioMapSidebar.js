import React, { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import styled, { keyframes } from 'styled-components'
import { useFrame } from '@studio-freight/hamo'
import Lenis from '@studio-freight/lenis'
import classnames from 'classnames'
import { useMediaQuery } from 'react-responsive'
import { useDeviceDetect } from '../../../../hooks/useDeviceDetect'

import Image from '../../../Image'
import Link from '../../../Link'
import { pageData } from '../../Portfolio.data'
import ButtonShadow from '../../Shared/ButtonShadow'
import RiveIcon from './Elements/RiveIcon'
import VideoModal from './Elements/VideoModal'
import VideoButton from './Elements/VideoButton'
import IconLink from '../../../../images/icons/icon-link.svg'
import IconLinkBlack from '../../../../images/icons/icon-link-black.svg'

/**
 * @name PortfolioMapSidebar
 * @summary -
 * @description - Portfolio page - Map sidebar
 */

const PortfolioMapSidebar = props => {
  const { canvas, detailPage, setDetailPage, setHideNav } = props
  const [detailPageData, setDetailPageData] = useState(null)
  const [show, setShow] = useState(false)
  const [reset, setReset] = useState(false)
  const [lenis, setLenis] = useState()
  const [showVideo, setShowVideo] = useState(false)
  const wrapperRef = useRef()
  const contentRef = useRef()
  const isDesktop = useMediaQuery({
    query: `(min-width: 993px)`,
  })
  const el = useRef(null)
  const q = gsap.utils.selector(el)
  const barRef = useRef(null)

  const { isWindows, isSafari } = useDeviceDetect()
  const lerp = isWindows || isSafari ? 1 : 0.2
  const wheelMultiplier = isWindows || isSafari ? 1 : 0.7

  const animationIn = () => {
    const sidebar = q(`.${Sidebar.styledComponentId}`)
    const bgOverlay = q(`.${BgOverlay.styledComponentId}`)
    const content = q(`.${ContentInner.styledComponentId}`)
    const contentOuter = q(`.${ContentOuter.styledComponentId}`)
    const scrollBarContainer = q(`.${ScrollBarContainer.styledComponentId}`)

    gsap.set([el?.current, sidebar], { clearProps: 'all' })
    gsap
      .timeline({
        defaults: {
          ease: 'expo.out',
        },
      })
      .addLabel('start')
      .fromTo(
        [contentOuter, scrollBarContainer],
        {
          xPercent: () => (isDesktop ? -100 : 0),
        },
        {
          xPercent: 0,
          duration: 0.75,
        },
        'start'
      )
      .fromTo(
        content,
        {
          autoAlpha: () => (isDesktop ? 1 : 1),
          xPercent: () => (isDesktop ? 0 : 0),
        },
        {
          autoAlpha: () => (isDesktop ? 1 : 1),
          xPercent: () => (isDesktop ? 0 : 0),
          delay: isDesktop ? 0 : 0.25,
          duration: isDesktop ? 0.75 : 0.5,
          ease: 'expo.out',
        },
        'start'
      )
      .fromTo(
        el?.current,
        {
          autoAlpha: () => (isDesktop ? 1 : 0.25),
          yPercent: () => (isDesktop ? 0 : 10),
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.75,
        },
        'start'
      )
      .fromTo(
        bgOverlay,
        {
          autoAlpha: 0,
          yPercent: () => (isDesktop ? 0 : -10),
        },
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: 0.75,
        },
        'start'
      )
  }

  const animationOut = onCompleteFn => {
    const bgOverlay = q(`.${BgOverlay.styledComponentId}`)
    const contentOuter = q(`.${ContentOuter.styledComponentId}`)
    const scrollBarContainer = q(`.${ScrollBarContainer.styledComponentId}`)

    gsap
      .timeline({
        defaults: {
          ease: 'expo.inOut',
        },
      })
      .addLabel('start')
      .fromTo(
        [contentOuter, scrollBarContainer],
        {
          xPercent: 0,
        },
        {
          xPercent: () => (isDesktop ? -100 : 0),
          duration: 0.75,
          onComplete: () => {
            onCompleteFn && onCompleteFn()
            gsap.set(barRef?.current, { scaleY: () => (isDesktop ? 0 : 1) })
            gsap.set(barRef?.current, { scaleX: () => (isDesktop ? 1 : 0) })
          },
        },
        'start'
      )
      .fromTo(
        el?.current,
        {
          autoAlpha: 1,
          yPercent: 0,
        },
        {
          autoAlpha: () => (isDesktop ? 1 : 0),
          yPercent: () => (isDesktop ? 0 : 10),
          duration: 0.75,
        },
        'start'
      )
      .fromTo(
        bgOverlay,
        {
          autoAlpha: 1,
          yPercent: 0,
        },
        {
          autoAlpha: 0,
          yPercent: () => (isDesktop ? 0 : -10),
          duration: 0.75,
        },
        'start'
      )
  }

  useEffect(() => {
    const lenis = new Lenis({
      wrapper: wrapperRef.current, // element which has overflow
      content: contentRef.current, // usually wrapper's direct child
      lerp: lerp,
      smoothWheel: true,
      normalizeWheel: true,
      wheelMultiplier: wheelMultiplier,
      smoothTouch: false,
      touchInertiaMultiplier: 15,
      syncTouch: true,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      infinite: false,
    })

    lenis.start()
    setLenis(lenis)

    return () => {
      lenis.destroy()
    }
  }, [])

  useFrame(time => {
    lenis?.raf(time)
  }, [])

  useEffect(() => {
    if (reset) {
      lenis?.scrollTo(0, { immediate: true })
      setReset(false)
    }
  }, [reset])

  const handleClickClose = () => {
    setDetailPage(null)
    canvas.current.unfocus()
  }

  const onCompleteFn = () => {
    setShow(false)
    setHideNav(false)
  }

  useEffect(() => {
    if (detailPage !== null) {
      setDetailPageData(pageData?.features[detailPage])
      setReset(true)
      setShow(true)
      animationIn()
      setHideNav(!isDesktop)
    }

    return () => {
      if (detailPage !== null) {
        animationOut(onCompleteFn)
      }
    }
  }, [detailPage, setShow])

  const updateScroll = event => {
    if (barRef) {
      if (event.scroll === 0) {
        isDesktop
          ? (barRef.current.style.transform = `scaleY(0)`)
          : (barRef.current.style.transform = `scaleX(0)`)
      } else {
        isDesktop
          ? (barRef.current.style.transform = `scaleY(${event.progress})`)
          : (barRef.current.style.transform = `scaleX(${event.progress})`)
      }
    }
  }

  useEffect(() => {
    if (show) {
      lenis?.on('scroll', updateScroll)

      const contentOuter = q(`.${ContentOuter.styledComponentId}`)
      if (el?.current.offsetHeight === contentOuter[0].scrollHeight) {
        isDesktop
          ? (barRef.current.style.transform = `scaleY(1)`)
          : (barRef.current.style.transform = `scaleX(1)`)
      }
    }

    return () => {
      updateScroll && lenis?.off('scroll', updateScroll)
    }
  }, [lenis, show, barRef, isDesktop])

  return (
    <Wrapper
      ref={el}
      $isVisible={show}
      className={classnames({
        show: detailPage !== null,
        showVideo: showVideo,
      })}
    >
      <ContentWrapper ref={wrapperRef}>
        <Content ref={contentRef}>
          <BgOverlay onClick={handleClickClose}></BgOverlay>

          <Sidebar>
            <ScrollBarContainer>
              <ScrollBar>
                <Bar ref={barRef} $color={detailPageData?.color}></Bar>
              </ScrollBar>
            </ScrollBarContainer>

            <ContentOuter>
              <ContentInner>
                {show && (
                  <RiveIcon
                    src={detailPageData?.riveIcon}
                    color={detailPageData?.color}
                  />
                )}

                <Heading>{detailPageData?.detailPage?.title}</Heading>

                <SubHeading
                  dangerouslySetInnerHTML={{
                    __html: detailPageData?.detailPage?.subtitle,
                  }}
                />

                <Hr />

                <Description
                  dangerouslySetInnerHTML={{
                    __html: detailPageData?.detailPage?.description,
                  }}
                />

                {detailPageData?.detailPage?.logos && (
                  <>
                    <Hr />

                    {detailPageData?.detailPage?.logosTitle && (
                      <>
                        <Description
                          dangerouslySetInnerHTML={{
                            __html: detailPageData?.detailPage?.logosTitle,
                          }}
                        />
                        <br />
                      </>
                    )}

                    <Networks>
                      {detailPageData?.detailPage?.logos.map(
                        ({ label, icon }, i) => {
                          return (
                            <Network key={i}>
                              <NetworkInner>
                                <NetworkIconWrapper>
                                  <NetworkIcon>
                                    <NetworkIconImage src={icon} />
                                  </NetworkIcon>
                                </NetworkIconWrapper>
                                <NetworkLabel>{label}</NetworkLabel>
                              </NetworkInner>
                            </Network>
                          )
                        }
                      )}
                    </Networks>
                  </>
                )}

                {detailPageData?.detailPage?.extraLogos && (
                  <>
                    <br />

                    {detailPageData?.detailPage?.extraLogos && (
                      <>
                        <Description
                          dangerouslySetInnerHTML={{
                            __html:
                              detailPageData?.detailPage?.extraLogos.title,
                          }}
                        />
                        <br />
                      </>
                    )}

                    <Networks>
                      {detailPageData?.detailPage?.extraLogos.logos.map(
                        ({ label, icon }, i) => {
                          return (
                            <Network key={i}>
                              <NetworkIcon>
                                <NetworkIconImage src={icon} />
                              </NetworkIcon>
                              <NetworkLabel>{label}</NetworkLabel>
                            </Network>
                          )
                        }
                      )}
                    </Networks>
                  </>
                )}

                {detailPageData?.detailPage?.video && (
                  <>
                    <Hr $fullWidth={true} />

                    <SubHeading>
                      {detailPageData?.detailPage?.video.title}
                    </SubHeading>

                    <VideoButton
                      posterImage={
                        detailPageData?.detailPage?.video.posterImage
                      }
                      onClick={() => setShowVideo(true)}
                    />
                  </>
                )}

                {detailPageData?.detailPage?.links && (
                  <>
                    <Hr $fullWidth={true} />

                    <SubHeading>
                      {detailPageData?.detailPage?.links?.title}
                    </SubHeading>

                    <Resources>
                      {detailPageData?.detailPage?.links?.list.map(
                        ({ label, url, newTab, badge }, i) => {
                          return (
                            <Resource key={i}>
                              <Link to={url} newTab={newTab}>
                                {badge && <Badge>{badge}</Badge>}
                                <ResourceInner>
                                  {label}
                                  <IconLinkWrapper>
                                    <IconLink />
                                    <IconLinkBlack />
                                  </IconLinkWrapper>
                                </ResourceInner>
                              </Link>
                            </Resource>
                          )
                        }
                      )}
                    </Resources>
                  </>
                )}
              </ContentInner>
            </ContentOuter>
          </Sidebar>
        </Content>
      </ContentWrapper>

      {showVideo && (
        <VideoModal
          embedUrl={detailPageData?.detailPage?.video?.embedUrl}
          setShowVideo={setShowVideo}
        ></VideoModal>
      )}

      <ButtonsWrapper>
        <CtaWrapper>
          <ButtonShadow
            as="a"
            href="https://portfolio.metamask.io/"
            target="_blank"
            rel='"noopener noreferrer'
            short
            hoverCircle
          >
            Try Portfolio
          </ButtonShadow>
        </CtaWrapper>

        <CloseBtnWrapper>
          <CloseBtn
            iconClose
            isCircular={true}
            onClick={handleClickClose}
          ></CloseBtn>
        </CloseBtnWrapper>
      </ButtonsWrapper>
    </Wrapper>
  )
}

export default PortfolioMapSidebar

const PMSBtnFadeIn = keyframes`
  0% {
    scale: 0;
    opacity: 0.4;
  }

  100% {
    scale: 1;
    opacity: 1;
  }
`

const PMSBtnFadeOut = keyframes`
  0% {
    scale: 1;
    opacity: 1;
  }
  
  100% {
    scale: 0.5;
    opacity: 0;
  }
`

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: ${({ $isVisible }) => ($isVisible ? 'block' : 'none')};
  z-index: 40;

  &.showVideo {
    z-index: 50;
  }

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    z-index: 31;
  }
`

const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none !important;
  -ms-overflow-style: none;
  z-index: 31;

  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    overflow-x: hidden;
    width: calc(100vw - 40px);
    height: calc(100svh - 140px);
    margin: 20px;
    border-radius: 8px;
  }

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    width: calc(100vw - 30px);
    height: calc(100svh - 100px);
    margin: 15px;
  }

  @media only screen and (max-device-width: 1366px) and (orientation: landscape) {
    height: 100svh;
  }
`

const ScrollBarContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  max-width: 600px;
  display: flex;
  justify-content: flex-end;
  top: 0;
  left: 0;
  z-index: 31;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    position: sticky;
    top: 0;
    left: 0;
    height: 15px;
    max-width: none;
    justify-content: flex-start;
  }

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    height: 9px;
  }
`

const ScrollBar = styled.div`
  position: relative;
  width: 9px;
  height: 100%;
  background-color: #e7e7e7;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    width: 100%;
    height: 15px;
  }

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    height: 9px;
  }
`

const Bar = styled.div`
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: top;
  transform: scaleY(0);
  background-color: ${({ $color }) => ($color ? $color : 'black')};

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    transform-origin: left center;
  }
`

const BgOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(30, 31, 37, 0.4);
`

const Content = styled.div`
  position: relative;

  @media only screen and (max-device-width: 1024px) and (orientation: portrait) {
    -ms-touch-action: none;
    touch-action: none;
    overflow: hidden;
  }

  @media only screen and (max-device-width: 1366px) and (orientation: landscape) {
    -ms-touch-action: none;
    touch-action: none;
    overflow: hidden;
  }
`

const Sidebar = styled.div`
  position: relative;
  pointer-events: none;
`

const ContentOuter = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  min-height: 100vh;
  padding: 50px 50px 80px;
  background-color: #ffffff;
  z-index: 30;
  pointer-events: all;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    padding: 30px 105px 50px;
    max-width: none;
  }

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    padding: 30px 45px 50px;
  }
`
const ContentInner = styled.div`
  position: relative;
  color: #161616;
`

const Heading = styled.h2`
  font-weight: 400;
  font-size: 50px;
  line-height: 1;
  text-align: center;
  margin: 10px 0 50px;
  letter-spacing: -0.02em;
  color: #161616;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 40px;
    line-height: 1.1;
    margin: 10px 0 30px;
  }
`

const SubHeading = styled.h3`
  font-weight: 400;
  font-size: 24px;
  line-height: 1.35;
  color: #161616;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 16px;
    line-height: 1.5;
  }

  a {
    color: #161616;
    text-decoration-line: underline !important;
    text-underline-offset: 3px !important;

    &:hover {
      color: #7e7e7e;
    }
  }
`

const Hr = styled.div`
  position: relative;
  padding: ${({ $fullWidth }) => ($fullWidth ? '50px 0' : '25px 0')};
  width: ${({ $fullWidth }) => ($fullWidth ? 'calc(100% + 100px)' : 'auto')};
  margin: ${({ $fullWidth }) => ($fullWidth ? ' 0 -50px' : '0')};

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    padding: ${({ $fullWidth }) => ($fullWidth ? '30px 0' : '20px 0')};
  }

  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: #ececec;
  }
`

const Description = styled.p`
  margin: 0;

  a {
    color: #161616;
    text-decoration-line: underline !important;
    text-underline-offset: 3px !important;

    &:hover {
      color: #7e7e7e;
    }
  }
`

const Networks = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  gap: 37px;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    gap: 37px 0;
  }
`

const Network = styled.li`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  list-style: none;
  width: 52px;
  margin: 0;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    gap: 0;
    min-width: 33.33%;
    max-width: 33.33%;
    flex-basis: 33.33%;

    &:nth-child(3n + 1) {
      justify-content: flex-start;
    }

    &:nth-child(3n + 2) {
      justify-content: center;
    }

    &:nth-child(3n) {
      justify-content: flex-end;
    }
  }
`

const NetworkInner = styled.div`
  position: relative;
`

const NetworkIconWrapper = styled.div`
  position: relative;
  width: 52px;
  height: 45px;
  display: flex;
  justify-content: center;
`

const NetworkIcon = styled.div`
  position: relative;
  width: 45px;
  height: 45px;
`

const NetworkIconImage = styled(Image)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const NetworkLabel = styled.div`
  margin-top: 10px;
  font-weight: 500;
  font-size: 10px;
  line-height: 1;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    width: 52px;
  }
`

const Resources = styled.ul`
  margin: 12px 0 0;
`
const Resource = styled.li`
  margin: 0;
  border-bottom: 1px solid #ececec;
  list-style: none;

  a {
    display: block;
    width: 100%;
    padding: 12px 0;
    color: inherit;
  }
`
const ResourceInner = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 14px;
    line-height: 1.575;

    svg {
      min-width: 30px;
      max-width: 30px;
      min-height: 30px;
      max-height: 30px;
      margin-left: 12px;
    }
  }
`
const IconLinkWrapper = styled.div`
  position: relative;
  display: flex;

  svg {
    &:nth-child(2) {
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      stroke-dasharray: 110;
      stroke-dashoffset: 110;
      transition: stroke-dashoffset 0.4s ease-out;

      ${Resource}:hover & {
        stroke-dashoffset: 0;
      }
    }
  }
`

const Badge = styled.span`
  display: block;
  width: max-content;
  padding: 6px;
  background: linear-gradient(85.33deg, #fcefe3 0%, #ffe466 100%);
  border-radius: 4px;
  font-weight: 500;
  font-size: 8px;
  line-height: 1;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #000000;
`

const ButtonsWrapper = styled.div`
  display: flex;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    position: absolute;
    top: auto;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 31;
  }
`

const CloseBtn = styled(ButtonShadow)``

const CloseBtnWrapper = styled.div`
  position: absolute;
  top: 50vh;
  left: 630px;
  z-index: 31;
  transform: scale(1);
  opacity: 0;
  transition: all 0.3s;
  animation: ${PMSBtnFadeOut} 0.35s ease-out forwards;

  .show & {
    animation: ${PMSBtnFadeIn} 0.35s ease-out 0.75s forwards;
  }

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    position: relative;
    top: auto;
    left: auto;
  }
`

const CtaWrapper = styled.div`
  position: relative;
  pointer-events: all;
  margin-right: 15px;
  width: fit-content;
  transform: scale(1);
  opacity: 0;
  transition: all 0.3s;
  animation: ${PMSBtnFadeOut} 0.35s ease-out forwards;

  .show & {
    animation: ${PMSBtnFadeIn} 0.35s ease-out 0.75s forwards;
  }

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    width: max-content;
    margin-right: 10px;
  }
`
