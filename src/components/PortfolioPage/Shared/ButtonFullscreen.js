import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import ButtonShadow from '../Shared/ButtonShadow'
import { useRive } from '@rive-app/react-canvas'
import toggleFullScreen from '../../../lib/utils/fullscreen'

/**
 * @name ButtonFullscreen
 * @summary -
 * @description - Portfolio page - Button Fullscreen
 */

const ButtonFullscreen = props => {
  const intervalId = useRef()
  const { rive, RiveComponent } = useRive({
    src: '/images/portfolio/rive-icons/fullscreen-1-hover-out.riv',
    autoplay: false,
  })

  const handleClick = () => {
    toggleFullScreen()
  }

  /*
  const handleMouseEnter = () => {
    if (rive) {
      rive.reset()
      rive.play()
    }
  }
  */

  const handleMouseEnter = () => {
    if (rive) {
      rive.reset()
      rive.play('Rollover')
    }
  }

  const handleMouseLeave = () => {
    if (rive) {
      rive.reset()
      rive.play('Rollout')
    }
  }

  useEffect(() => {
    return () => clearInterval(intervalId.current)
  }, [])

  return (
    <Container>
      <ButtonShadow
        isCircular={true}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <RiveContainer>
          <RiveComponent />
        </RiveContainer>
      </ButtonShadow>
    </Container>
  )
}

export default ButtonFullscreen

const Container = styled.div`
  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    display: none;
  }
`

const RiveContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;
`
