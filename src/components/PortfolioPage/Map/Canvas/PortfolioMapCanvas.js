import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Canvas from './Gl/imog/Canvas'

/**
 * @name PortfolioMapCanvas
 * @summary -
 * @description - Portfolio page - Map canvas
 */

const PortfolioMapCanvas = props => {
  const {
    canvas,
    setCanvasHandleReady,
    setActiveFeatureByName,
    setActiveFeature,
  } = props
  const canvasWrapper = useRef()

  useEffect(() => {
    canvas.current = new Canvas({
      options: {
        domElement: canvasWrapper.current,
        handleReady: () => {
          setCanvasHandleReady(true)
        },
        handleHotspotFocus: ({ name }) => {
          setActiveFeatureByName(name)
        },
        handleHotspotUnfocus: () => {
          setActiveFeature(null)
        },
      },
    })
    window.canvas = canvas.current

    return () => {
      canvas.current.destroy()
    }
  }, [])

  return (
    <Wrapper>
      <div ref={canvasWrapper}></div>
    </Wrapper>
  )
}

export default PortfolioMapCanvas

const Wrapper = styled.div`
  position: relative;
  // position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
`

const MapImageTemp = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`
