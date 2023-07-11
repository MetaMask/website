import React, { useRef, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import classnames from 'classnames'
import { useRive } from '@rive-app/react-canvas'
import Magnetic from '../../../../lib/utils/magnetic'

/**
 * @name PortfolioMapNav
 * @summary -
 * @description - Portfolio page - Map nav
 */

const PortfolioMapMarkersButton = props => {
  const { name, riveIcon, onClick, active, markerMobileAlignement, id } = props

  const el = useRef()

  const { rive, RiveComponent } = useRive({
    src: riveIcon,
    autoplay: false,
  })

  function onMouseEnter() {
    if (rive) {
      rive.reset()
      rive.play()
    }
  }

  useEffect(() => {
    let magnetic = false
    if (active) {
      magnetic = new Magnetic({ el: el?.current })
    }

    return () => active && magnetic && magnetic.destroy()
  }, [el, active])

  return (
    <>
      <ButtonOuter
        className={classnames({
          buttonActive: active,
          markerMobileRight: markerMobileAlignement === 'right',
        })}
      >
        <ButtonWrapper ref={el}>
          <ButtonInner>
            <Button onClick={onClick} onMouseEnter={onMouseEnter}>
              <IconWrapper>
                <RiveComponent />
              </IconWrapper>

              <Text className="navButtonText">
                <span>{name}</span>
              </Text>
            </Button>
          </ButtonInner>
        </ButtonWrapper>
      </ButtonOuter>

      <ButtonDot
        className={classnames({
          dotActive: active,
        })}
      />
    </>
  )
}

export default PortfolioMapMarkersButton

const ButtonOuter = styled.div`
  pointer-events: none;
  position: relative;
  transform: translate(-50%, -80px);
  z-index: 2;

  &.buttonActive {
    pointer-events: all;
    transform: translate(-50%, -90px);
  }

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    &.markerMobileRight.buttonActive {
      transform: translate(-75%, -80px) !important;
      transition: transform 0.3s ease-out 1.2s;
      will-change: transform;
    }
  }
`
const ButtonWrapper = styled.div`
  padding: 20px 20px;
`

const ButtonInner = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    .markerMobileRight.buttonActive & {
      transform: translateY(-10px);
    }
  }
`

const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  border: 0;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border-radius: 100px;
  color: inherit;
  font-weight: 500;
  font-size: 16px;
  line-height: 1;
  letter-spacing: -0.02em;
  color: #1e1f25;
  letter-spacing: -0.02em;
  padding: 8px 20px 8px 8px;
  background-color: var(--color);
  overflow: hidden;
  pointer-events: none;
  opacity: 0;
  transform-origin: left center;
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
  max-width: 46px;

  .buttonActive & {
    opacity: 1;
    pointer-events: all;
    max-width: 100%;
    padding: 8px 20px 8px 12px;
    transition: opacity 0.3s ease-out 0.8s, transform 0.3s ease-out 0.8s,
      max-width 0.3s ease-out 1.2s, padding 0.3s ease-out 1.2s;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

  &::after {
    content: '';
    left: 50%;
    top: 100%;
    width: 150%;
    height: auto;
    aspect-ratio: 1/1;
    border-radius: 50%;
    position: absolute;
    transform: translate(-50%, 0);
    z-index: 1;
    transition: transform 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955);
    background-color: rgba(0, 0, 0, 0.085);
    pointer-events: none;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: var(--color);
    cursor: pointer;
    text-decoration: none;

    &::after {
      transform: translate(-50%, -50%);
    }
  }
`

const Text = styled.div`
  span {
    width: max-content;
    display: inline-block;
    padding: 0 0 0 2px;
    opacity: 0;
    transition: none;

    .buttonActive & {
      opacity: 1;
      transition: opacity 0.4s cubic-bezier(0.455, 0.03, 0.515, 0.955) 1.4s;
    }
  }
`

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
  display: flex;
  position: relative;
  pointer-events: none;

  canvas {
    filter: invert(1);
    pointer-events: none;
  }
`

const Pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 var(--color);
    -webkit-box-shadow: 0 0 0 0 var(--color);
  }
  75% {
    box-shadow: 0 0 0 16px rgba(255, 255, 255, 0);
    -webkit-box-shadow: 0 0 0 16px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    -webkit-box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`

const ButtonDot = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  margin: 0;
  width: 14px;
  height: 14px;
  padding: 7px;
  border: 0;
  border-radius: 50%;
  background-color: #ffffff;
  pointer-events: all;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;

  &.dotActive {
    animation: ${Pulse} 1.5s ease-out infinite;
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
    pointer-events: all;
    //transition: opacity 0.25s ease-out 0.8s, transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) 0.8s;
    transition: opacity 0.3s ease-out 0.8s, transform 0.3s ease-out 0.8s;
  }
`
