import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Link from './Link'

const Button = props => {
  const {
    link,
    text,
    newTab,
    color = 'primary',
    size,
    customClick,
    gradient = false,
    fontSize,
  } = props

  return (
    <ButtonWrapper
      to={link}
      newTab={newTab}
      color={color}
      size={size}
      onClick={customClick}
      gradient={gradient}
      className={'button'}
      fontSize={fontSize}
    >
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
  ${({ gradient, color, forceColor, theme }) =>
    color && theme['button'] && theme['button'][color] && !forceColor
      ? `
  background: ${
    gradient ? theme['button'][color].gradient : theme['button'][color].bg
  };
  @media (min-width: ${theme.device.miniDesktop}){
    &:hover {
      background: ${
        gradient
          ? theme['button'][color].gradientHover
          : theme['button'][color].bgHover
      };
    }
  }
  `
      : `
      background: ${theme.button.primary.bg};
      @media (min-width: ${theme.device.miniDesktop}){
        &:hover {
          background: ${theme.button.primary.bgHover};
        }
  }`}

  ${({ color, theme }) =>
    color === 'white-outline'
      ? `
  background: transparent !important;
  color: #fff;
  border: 2px solid #fff;
  transition: background-color 300ms ease, border 300ms ease, color 300ms ease;
  @media (min-width: ${theme.device.miniDesktop}){
    &:hover {
      border-color: ${theme.darkerBlue};
      color: ${theme.darkerBlue};
    }
  }
  `
      : ''}

  cursor: pointer;
  transition: all 300ms ease;
  color: #fff;
  height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  border-radius: 999px;
  font-size: 16px;
  line-height: 1.3;

  ${({ fontSize }) =>
    fontSize
      ? `
    font-size: ${fontSize};
  `
      : ''}
`
