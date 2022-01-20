import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Link from './Link'
import classnames from 'classnames'

const Button = props => {
  const {
    link,
    text,
    newTab,
    color = 'primary',
    size,
    customClick,
    fontSize,
    buttonGradient = false,
  } = props

  return (
    <ButtonWrapper
      to={link}
      newTab={newTab}
      color={color}
      size={size}
      onClick={customClick}
      gradient={buttonGradient}
      className={classnames('button')}
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
  className: PropTypes.string,
  buttonGradient: PropTypes.bool,
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
  min-height: 40px !important;
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
  text-align: center;
  transition: all 300ms ease;
  color: #fff;
  min-height: 52px;
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
