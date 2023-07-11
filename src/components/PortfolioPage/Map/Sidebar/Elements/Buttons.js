import React from 'react'
import styled, { keyframes } from 'styled-components'

import ButtonShadow from '../../../Shared/ButtonShadow'
import { pageData } from '../../../Portfolio.data'

/**
 * @name Buttons
 * @summary -
 * @description - Portfolio page - Buttons
 */

const Buttons = props => {
  const { handleClickClose } = props

  return (
    <ButtonsWrapper>
      <CtaWrapper>
        <ButtonShadow
          as="a"
          href={pageData.header.rightCta.href}
          target="_blank"
          rel='"noopener noreferrer'
          short
          hoverCircle
        >
          {pageData.header.rightCta.label}
        </ButtonShadow>
      </CtaWrapper>

      <CloseBtnWrapper>
        <CloseBtn iconClose isCircular={true} onClick={handleClickClose} />
      </CloseBtnWrapper>
    </ButtonsWrapper>
  )
}

export default Buttons

const ButtonsWrapper = styled.div`
  display: flex;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    position: absolute;
    top: auto;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 31;
  }
`

const CloseBtn = styled(ButtonShadow)``

const PMSBtnFadeIn = keyframes`
  0% {
    scale: 0;
    opacity: 0.4;
  }

  100% {
    scale: 1;
    opacity: 1;
  }
`

const PMSBtnFadeOut = keyframes`
  0% {
    scale: 1;
    opacity: 1;
  }
  
  100% {
    scale: 0.5;
    opacity: 0;
  }
`

const CloseBtnWrapper = styled.div`
  position: absolute;
  top: 50vh;
  left: 630px;
  z-index: 31;
  transform: scale(1);
  opacity: 0;
  transition: all 0.3s;
  animation: ${PMSBtnFadeOut} 0.35s ease-out forwards;

  .show & {
    animation: ${PMSBtnFadeIn} 0.35s ease-out 0.75s forwards;
  }

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    position: relative;
    top: auto;
    left: auto;
  }
`

const CtaWrapper = styled.div`
  position: relative;
  pointer-events: all;
  margin-right: 15px;
  width: fit-content;
  transform: scale(1);
  opacity: 0;
  transition: all 0.3s;
  animation: ${PMSBtnFadeOut} 0.35s ease-out forwards;

  .show & {
    animation: ${PMSBtnFadeIn} 0.35s ease-out 0.75s forwards;
  }

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    width: max-content;
    margin-right: 10px;
  }
`
