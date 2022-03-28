import React from 'react'
import styled from 'styled-components'
import AngleRight from '../../images/icons/icon-angle-right.svg'

/**
 * @name Card
 * @summary -
 * @description - Module for card feature
 */

const CTAAngleIcon = props => {
  const { text, styleOverride } = props

  return (
    <CTA styleOverride={styleOverride}>
      {text}
      <AngleRight />
    </CTA>
  )
}

export default CTAAngleIcon

const CTA = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: ${({ theme }) => theme.primaryColor};
  text-align: left;
  display: flex;
  align-items: center;

  svg {
    margin-left: 16px;
  }
  ${({ styleOverride }) => styleOverride}
`
