import React from 'react'
import styled from 'styled-components'

import ButtonShadow from '../../../Shared/ButtonShadow'

/**
 * @name Buttons
 * @summary -
 * @description - Portfolio page - Buttons
 */

const Buttons = props => {
  const { handleClickClose } = props

  return (
    <ButtonsWrapper>
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
