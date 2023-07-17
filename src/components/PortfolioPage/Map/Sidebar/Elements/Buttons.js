import React from 'react'
import styled, { css } from 'styled-components'

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
      <ButtonShadow
        as="a"
        href={pageData.header.rightCta.href}
        target="_blank"
        rel="noopener noreferrer"
        short
        hoverCircle
        styles={Cta}
      >
        {pageData.header.rightCta.label}
      </ButtonShadow>

      <CloseBtn iconClose isCircular={true} onClick={handleClickClose} />
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

const CloseBtn = styled(ButtonShadow)`
  position: absolute;
  top: 50vh;
  left: 630px;
  z-index: 31;
  transform: scale(1);
  opacity: 0;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    position: relative;
    top: auto;
    left: auto;
  }
`

const Cta = css`
  position: relative;
  pointer-events: all;
  margin-right: 15px;
  width: fit-content;
  transform: scale(1);
  opacity: 0;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    width: max-content;
    margin-right: 10px;
  }
`
