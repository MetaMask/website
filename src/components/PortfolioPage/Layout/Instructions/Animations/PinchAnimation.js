import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useRive } from '@rive-app/react-canvas'

/**
 * @name PinchAnimation
 * @summary -
 * @description - Portfolio page - Pinch Animation
 */

const PinchAnimation = () => {
  const el = useRef()
  const { rive, RiveComponent } = useRive({
    src: '/images/portfolio/rive-icons/pinch-to-zoom-mobile.riv',
    autoplay: false,
  })

  useEffect(() => {
    if (rive) {
      rive.play()
      setTimeout(() => el.current && rive.play('Drag the map loop'), 1500)
    }
  }, [rive])

  return (
    <Wrapper ref={el}>
      <RiveComponent />
    </Wrapper>
  )
}

export default PinchAnimation

const Wrapper = styled.div`
  width: 150px;
  height: 150px;
`
