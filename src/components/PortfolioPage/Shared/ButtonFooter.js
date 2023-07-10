import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import ButtonShadow from '../Shared/ButtonShadow'
import { useRive } from '@rive-app/react-canvas'
import IconFooterTablet from '../../../images/icons/icon-footer-tablet.svg'
import IconFooterMobile from '../../../images/icons/icon-footer-mobile.svg'

/**
 * @name ButtonFullscreen
 * @summary -
 * @description - Portfolio page - Button Fullscreen
 */

const ButtonFooter = props => {
  const { onClick } = props

  const intervalId = useRef()
  const { rive, RiveComponent } = useRive({
    src: '/images/portfolio/rive-icons/footer-1-hover-out.riv',
    autoplay: false,
  })

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
    <ButtonShadow
      isCircular={true}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <RiveContainer>
        <RiveComponent />
      </RiveContainer>

      <IconTabletWrapper>
        <IconFooterTablet />
      </IconTabletWrapper>

      <IconMobileWrapper>
        <IconFooterMobile />
      </IconMobileWrapper>
    </ButtonShadow>
  )
}

export default ButtonFooter

const RiveContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    display: none;
  }
`

const IconTabletWrapper = styled.div`
  display: none;

  @media (min-width: 769px) and (max-width: ${({ theme }) =>
      theme.device.miniDesktop}) {
    display: flex;
  }
`

const IconMobileWrapper = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    display: flex;
  }
`
