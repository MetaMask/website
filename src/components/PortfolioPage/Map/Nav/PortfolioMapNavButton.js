import React from 'react'
import styled from 'styled-components'
import { useRive } from '@rive-app/react-canvas'

/**
 * @name PortfolioMapNav
 * @summary -
 * @description - Portfolio page - Map nav
 */

const PortfolioMapNavButton = props => {
  const { name, riveIcon, onClick } = props

  const { rive, RiveComponent } = useRive({
    src: riveIcon,
    autoplay: false,
  })

  function onMouseEnter() {
    setTimeout(() => {
      if (rive) {
        rive.reset()
        rive.play()
      }
    }, 250)
  }

  return (
    <Button onClick={onClick} onMouseEnter={onMouseEnter}>
      <IconWrapper>
        <RiveComponent />
      </IconWrapper>

      <Text className="navButtonText">
        <span>{name}</span>
      </Text>
    </Button>
  )
}

export default PortfolioMapNavButton

const Button = styled.button`
  display: flex;
  align-items: center;
  min-width: 40px;
  padding: 0;
  border: 0;
  background-color: transparent;
  border: none;
  color: inherit;
  font-weight: 500;
  letter-spacing: -0.02em;
  padding: 5px;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    min-width: 35px;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }
`

const Text = styled.div`
  overflow: hidden;
  max-width: 0;
  transition: 0.25s cubic-bezier(0.7, 0, 0.4, 0.9) max-width;
  white-space: nowrap;

  span {
    padding: 0 10px 0 2px;
    display: inline-block;
  }
`

const IconWrapper = styled.div`
  width: 30px;
  height: 30px;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    width: 25px;
    height: 25px;
  }
`
