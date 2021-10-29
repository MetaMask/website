import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Link from './Link'

const Button = props => {
  const { link, text, newTab, color, size } = props

  return (
    <ButtonWrapper to={link} newTab={newTab} color={color} size={size}>
      {text}
    </ButtonWrapper>
  )
}

export default Button

Button.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string,
  newTab: PropTypes.bool,
  color: PropTypes.string,
}

const ButtonWrapper = styled(Link)`
  background: ${({ theme }) => theme.darkBlue};
  color: #fff;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  border-radius: 999px;
  font-size: 16px;
  line-height: 22px;
  ${({ size }) =>
    size === 'large'
      ? `
  padding: 12px 20px;
  height: 56px;
  font-size: 20px;
  `
      : ''}
  @media (min-width: ${({ theme }) => theme.device.miniDesktop}){
    &:hover {
      background: ${({ theme }) => theme.darkerBlue};
    }
  }
  
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    width: 100%;
  }
`
