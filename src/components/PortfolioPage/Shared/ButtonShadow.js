import React from 'react'
import styled, { keyframes } from 'styled-components'
import classnames from 'classnames'

/**
 * @name ButtonShadow
 * @summary -
 * @description - Portfolio page - ButtonS with hadow
 */

const ButtonShadow = props => {
  const {
    children,
    onClick,
    onMouseEnter,
    onMouseLeave,
    as,
    href,
    target,
    rel,
    isCircular,
    backgroundColor,
    textColor,
    iconClose = false,
    short = false,
    darkMobile = false,
    hoverCircle = false,
    styles = '',
    ...rest
  } = props

  return (
    <ButtonElement
      as={as}
      href={href}
      target={target}
      rel={rel}
      $isCircular={isCircular}
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      $isShort={short}
      $hoverCircle={hoverCircle}
      className={classnames({ darkMobile: darkMobile })}
      $styles={styles}
      {...rest}
    >
      {iconClose ? (
        <Cross>
          <Line1>
            <div />
          </Line1>
          <Line2>
            <div />
          </Line2>
        </Cross>
      ) : (
        children
      )}
    </ButtonElement>
  )
}

export default ButtonShadow

const CrossBtnCloseFadeIn = keyframes`
  0% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(0deg);
  }
`

const CrossBtnCloseFadeOut = keyframes`
  0% {
    transform: rotate(0deg);
  }
  
  100% {
    transform: rotate(180deg);
  }
`

const BtnFadeIn = keyframes`
  0% {
    scale: 0;
    opacity: 0.4;
  }

  100% {
    scale: 1;
    opacity: 1;
  }
`

const BtnFadeOut = keyframes`
  0% {
    scale: 1;
    opacity: 1;
  }
  
  100% {
    scale: 0.5;
    opacity: 0;
  }
`

const Cross = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  animation: ${CrossBtnCloseFadeOut} 0.35s ease-out forwards;

  .show & {
    animation: ${CrossBtnCloseFadeIn} 0.35s ease-out 0.75s forwards;
  }
`

const Line1 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: all 0.25s ease-in-out;

  & > div {
    width: 1.76px;
    height: 13.41px;
    background-color: #161616;
    border-radius: 0.88px;
    transform: rotate(45deg);
    transform-origin: center;
    will-change: transform;

    @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
      .darkMobile & {
        background-color: #ffffff;
      }
    }
  }
`

const Line2 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: all 0.25s ease-in 0.1s;

  & > div {
    width: 1.76px;
    height: 13.41px;
    background-color: #161616;
    border-radius: 0.88px;
    transform: rotate(-45deg);
    transform-origin: center;
    will-change: transform;

    @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
      .darkMobile & {
        background-color: #ffffff;
      }
    }
  }
`

const ButtonElement = styled.button`
  position: relative;
  width: ${({ $isCircular }) => ($isCircular ? '52px' : 'auto')};
  height: ${({ $isShort }) => ($isShort ? '49px' : '52px')};
  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: 100px;
  padding: ${({ $isCircular }) => ($isCircular ? '0' : ' 0 25px')};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  color: ${({ $textColor }) => $textColor || '#1E1F25'};
  background-color: ${({ $backgroundColor }) => $backgroundColor || '#ffffff'};

  font-weight: 500;
  font-size: 16px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-align: center;
  overflow: hidden;
  pointer-events: all;

  .show & {
    animation: ${BtnFadeIn} 0.35s ease-out 0.75s forwards;
  }

  .hide & {
    animation: ${BtnFadeOut} 0.35s ease-out forwards;
  }

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    height: 38px;
    width: ${({ $isCircular }) => ($isCircular ? '38px' : 'auto')};
  }

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    &.darkMobile {
      background-color: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
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
    display: ${({ $hoverCircle }) => ($hoverCircle ? 'block' : 'none')};
  }

  &:focus {
    outline: none;
  }

  &:hover {
    ${Line1} {
      transform: rotate(90deg);
    }

    ${Line2} {
      transform: rotate(90deg);
    }

    &::after {
      transform: translate(-50%, -50%);
    }
  }

  ${({ $styles }) => $styles || ''};
`
