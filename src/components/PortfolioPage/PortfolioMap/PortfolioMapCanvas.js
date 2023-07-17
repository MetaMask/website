import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import Canvas from '../Map/Canvas/Gl/imog/Canvas'

/**
 * @name PortfolioMapCanvas
 * @summary -
 * @description - Portfolio page - Map canvas
 */

const PortfolioMapCanvas = props => {
  const canvasWrapper = useRef()
  const canvas = useRef()

  useEffect(() => {
    canvas.current = new Canvas({
      options: { domElement: canvasWrapper.current },
    })
    // console.log(canvas)
    return () => {
      console.log('destroy')
      canvas.current.destroy()
    }
  }, [])

  return (
    <Wrapper>
      {/* <TempMapImage
        src={'/images/temp/portfolio-map-temp.jpg'}
        alt={'Temporary map'}
      /> */}
      <div ref={canvasWrapper}></div>
    </Wrapper>
  )
}

export default PortfolioMapCanvas

const Wrapper = styled.div`
  // position: relative;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
`

const TempMapImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`
