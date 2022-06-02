import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Link from './Link'
import classnames from 'classnames'
import Image from './Image'
const Button = props => {
  const {
    link,
    text,
    newTab,
    color = 'primary',
    size,
    customClick,
    fontSize,
    className,
    buttonGradient = false,
    iconUrl,
    iconPosition,
    hide,
  } = props

  return (
    <ButtonWrapper
      to={link}
      newTab={newTab}
      color={color}
      size={size}
      onClick={customClick}
      gradient={buttonGradient}
      className={classnames('button', className)}
      fontSize={fontSize}
      hide={hide}
    >
      {iconPosition === 'start' && iconUrl ? (
        <Icon>
          <Image src={iconUrl} />
        </Icon>
      ) : null}
      <span>
        {text}
      </span>
      {iconPosition === 'end' && iconUrl ? (
        <Icon>
          <Image src={iconUrl} />
        </Icon>
      ) : null}
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

const Icon = styled.span`
  display: inline-flex;
  &:first-child {
    margin-right: 8px;
  }
  &:last-child {
    margin-left: 8px;
  }
  img {
    width: 32px;
    height: 32px;
  }
`;
const ButtonWrapper = styled(Link)`
  color: #fff;
  opacity: ${({hide}) => hide ? 0 : 1};
  ${({ gradient, color, theme }) =>
    color && theme['button'] && theme['button'][color]
      ? `
  background: ${
    gradient ? theme['button'][color].gradient : theme['button'][color].bg
  };
  color: ${theme['button'][color].text};
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

  ${({ color, size, theme }) =>
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

  ${({ color, theme }) =>
    color === 'secondary'
      ? `
  background: transparent !important;
  color: ${theme.darkBlue};
  border: 2px solid ${theme.darkBlue};
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
