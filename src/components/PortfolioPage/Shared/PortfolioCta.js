import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import classnames from 'classnames'

import styled from 'styled-components'

/**
 * @name PortfolioCta
 * @summary -
 * @description - Portfolio page - Cta
 */

const PortfolioCta = props => {
  const {
    variant = 'primary',
    children,
    onClick,
    width,
    backgroundColor,
    textColor,
    animationInit = false,
    animationDelay = 0.15,
  } = props

  const el = useRef()
  const q = gsap.utils.selector(el)

  const animationIn = () => {
    const label = q(`.${Label.styledComponentId}`)

    gsap
      .timeline({
        defaults: {
          ease: 'expo.inOut',
        },
      })
      .addLabel('start')
      .fromTo(
        el?.current,
        {
          autoAlpha: 0,
        },
        {
          delay: animationDelay,
          autoAlpha: 1,
          duration: 0.2,
        },
        'start'
      )
      .fromTo(
        el?.current,
        {
          width: 57,
        },
        {
          delay: animationDelay,
          width: width ? width : 200,
          duration: 0.55,
        },
        'start'
      )
      .fromTo(
        label,
        {
          autoAlpha: 0,
        },
        {
          delay: () => animationDelay + 0.15,
          autoAlpha: 1,
          duration: 0.25,
        },
        'start'
      )
  }

  useEffect(() => {
    el && animationInit && animationIn()
  }, [el, animationInit])

  return (
    <Button
      ref={el}
      $width={width}
      $opacity={animationInit}
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      onClick={onClick}
      className={classnames({
        [variant]: variant,
      })}
    >
      <Label>{children}</Label>
    </Button>
  )
}

export default PortfolioCta

const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $width }) => $width || '200px'};
  height: 57px;
  border: 0;
  border-radius: 100px;
  padding: 0 25px;
  cursor: pointer;
  opacity: ${({ $opacity }) => ($opacity ? 0 : 1)};

  color: ${({ $textColor }) => $textColor || '#ffffff'};
  background-color: ${({ $backgroundColor }) => $backgroundColor || '#000000'};

  font-weight: 500;
  font-size: 16px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-align: center;
  overflow: hidden;
  will-change: transform;

  &.primary {
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

    &:hover {
      cursor: pointer;
      text-decoration: none;

      &::after {
        transform: translate(-50%, -50%);
      }
    }
  }
`

const Label = styled.span`
  flex: none;
`
