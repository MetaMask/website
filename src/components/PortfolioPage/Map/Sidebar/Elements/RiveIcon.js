import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useRive } from '@rive-app/react-canvas'

/**
 * @name RiveIcon
 * @summary -
 * @description - Portfolio page - Rive icon
 */

const RiveIcon = props => {
  const { src, color } = props
  const intervalId = useRef()

  const { rive, RiveComponent } = useRive({
    src: src,
    autoplay: false,
  })

  useEffect(() => {
    setTimeout(() => {
      if (rive) {
        rive.play()

        intervalId.current = setInterval(() => {
          rive.reset()
          rive.play()
        }, 5000)
      }
    }, 750)
  }, [rive])

  useEffect(() => {
    return () => clearInterval(intervalId.current)
  }, [])

  return (
    <IconWrapper>
      <Icon $color={color}>
        <RiveComponent />
      </Icon>
    </IconWrapper>
  )
}

export default RiveIcon

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: ${({ $color }) => ($color ? $color : 'grey')};

  > div {
    width: 25px !important;
    height: 25px !important;
    filter: invert(1);
  }
`
