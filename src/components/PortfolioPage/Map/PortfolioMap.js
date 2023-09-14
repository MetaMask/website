import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { gsap } from 'gsap'
import { useMediaQuery } from 'react-responsive'
import {
  PortfolioMapNav as Nav,
  PortfolioMapCanvas as Canvas,
  PortfolioMapSidebar as Sidebar,
  PortfolioMapMarkers as Markers,
} from '../index'
import FullScreenBtn from '../Shared/ButtonFullscreen'
import FooterBtn from '../Shared/ButtonFooter'
import withProcessPreviewData from '../../../lib/utils/withProcessPreviewData'

/**
 * @name PortfolioMap
 * @summary -
 * @description - Portfolio page - Map
 */

const PortfolioMap = props => {
  const {
    canvas,
    setCanvasHandleReady,
    showIntro,
    showFooter,
    setShowFooter,
    showNav,
    mapData,
  } = props

  const [activeFeature, setActiveFeature] = useState(null)
  const [detailPage, setDetailPage] = useState(null)
  const [hideNav, setHideNav] = useState(false)
  const canvasWrapperRef = useRef()
  const isDesktop = useMediaQuery({
    query: `(min-width: 993px)`,
  })

  const setActiveFeatureByName = name => {
    const activeIndex = mapData.features.findIndex(
      feature => feature.title === name
    )
    setActiveFeature(activeIndex)
  }

  const handleClickFooterBtn = () => {
    setShowFooter(true)
  }

  useEffect(() => {
    if (detailPage !== null) {
      canvas.current.pauseRendering()
    } else {
      canvas.current.resumeRendering()
    }

    if (isDesktop) {
      const isOpening = detailPage !== null
      gsap
        .timeline({
          defaults: {
            ease: isOpening ? 'expo.out' : 'expo.out',
          },
        })
        .fromTo(
          canvasWrapperRef.current,
          {
            xPercent: () => (isOpening ? 0 : 15),
          },
          {
            xPercent: isOpening ? 15 : 0,
            duration: isOpening ? 0.75 : 0.75,
          }
        )
    }
  }, [detailPage])

  useEffect(() => {
    if (showFooter) {
      canvas.current.pauseRendering()
      setHideNav(true)
    } else {
      canvas.current.resumeRendering()
      setTimeout(() => {
        setHideNav(false)
      }, 850)
    }

    if (isDesktop) {
      const isOpening = showFooter
      gsap
        .timeline({
          defaults: {
            ease: isOpening ? 'expo.out' : 'expo.out',
          },
        })
        .fromTo(
          canvasWrapperRef.current,
          {
            yPercent: () => (isOpening ? 0 : -15),
          },
          {
            yPercent: isOpening ? -15 : 0,
            duration: isOpening ? 0.75 : 0.75,
          }
        )
    }
  }, [showFooter])

  return (
    <Wrapper>
      <CanvasWrapper ref={canvasWrapperRef}>
        <Canvas
          canvas={canvas}
          setCanvasHandleReady={setCanvasHandleReady}
          setActiveFeature={setActiveFeature}
          setActiveFeatureByName={setActiveFeatureByName}
        />

        <Markers
          canvas={canvas}
          activeFeature={activeFeature}
          setDetailPage={setDetailPage}
          featuresList={mapData.features}
        />
      </CanvasWrapper>

      {!showIntro && (
        <BottomWrapper>
          <FullScreenBtn />

          <FooterBtn onClick={handleClickFooterBtn} />
        </BottomWrapper>
      )}

      {showNav && !hideNav ? (
        <Nav
          canvas={canvas}
          activeFeature={activeFeature}
          setActiveFeature={setActiveFeature}
          featuresList={mapData.features}
        />
      ) : null}

      <Sidebar
        canvas={canvas}
        detailPage={detailPage}
        setDetailPage={setDetailPage}
        setHideNav={setHideNav}
        featuresList={mapData.features}
      />
    </Wrapper>
  )
}

const parsePreviewData = data => {
  const dataUpdate = {
    previewMode: true,
    ...data,
    mapData: {
      ...data.mapData,
      features: data.mapData?.featuresCollection?.items,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(PortfolioMap)

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    height: 100svh;
  }

  @media only screen and (max-device-width: 1024px) and (orientation: portrait) {
    height: 100svh;
  }

  @media only screen and (max-device-width: 1366px) and (orientation: landscape) {
    height: 100svh;
  }
`

const CanvasWrapper = styled.div`
  position: relative;
`

const BottomWrapper = styled.div`
  position: absolute;
  width: 180px;
  height: 52px;
  bottom: 30px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  pointer-events: none;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    height: 36px;
    width: 100%;
    bottom: auto;
    top: 30px;
    justify-content: flex-end;

    .show-footer & {
      display: none;
    }
  }
`
