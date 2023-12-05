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
    mapData,
  } = props
  const canvasWrapper = useRef()

  useEffect(() => {
    const resolvedData = mapData.reduce((acc, cur) => {
      acc.push({
        name: cur.title,
        maskChannel: JSON.parse(cur.maskChannel),
        x: cur.canvasX,
        y: cur.canvasY,
        width: cur.canvasWidth,
        height: cur.canvasHeight,
        color: cur.themeColor,
        pinPos: JSON.parse(cur.pinPos),
      })
      return acc
    }, [])
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
        data: resolvedData,
      },
    })
    window.canvas = canvas.current

    return () => {
      canvas.current.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
