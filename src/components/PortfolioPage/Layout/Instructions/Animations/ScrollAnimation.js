import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useRive } from '@rive-app/react-canvas'

/**
 * @name ScrollAnimation
 * @summary -
 * @description - Portfolio page - Scroll Animation
 */

const ScrollAnimation = () => {
  const el = useRef()
  const { rive, RiveComponent } = useRive({
    src: '/images/portfolio/rive-icons/zoom-the-map.riv',
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

export default ScrollAnimation

const Wrapper = styled.div`
  width: 150px;
  height: 150px;
`
