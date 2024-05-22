import styled from 'styled-components'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Image from './Image'
import React from 'react'
import Link from './Link'

const Button = props => {
  const {
    attr,
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
    hasCaretDownIcon,
  } = props

  return (
    <ButtonWrapper
      {...attr}
      to={link}
      newTab={newTab}
      color={color}
      size={size}
      onClick={customClick}
      $gradient={buttonGradient}
      className={classnames('button', className)}
      fontSize={fontSize}
      $hide={hide}
    >
      {iconPosition === 'start' && iconUrl ? (
        <Icon>
          <Image src={iconUrl} />
        </Icon>
      ) : null}
      <ButtonText>{text}</ButtonText>
      {iconPosition === 'end' && iconUrl ? (
        <Icon hasBg>
          <Image src={iconUrl} />
        </Icon>
      ) : null}
      {hasCaretDownIcon ? (
        <Icon className="w-icon w-icon-dropdown-toggle" />
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
  ${({ hasBg }) =>
    hasBg
      ? `
      background: #FFFFFF;
      border-radius: 50%;
      height: 32px;
      width: 32px;
      img {
        width: 28px;
        height: 28px;
        margin: auto !important;
      }
    `
      : `
      img {
        width: 32px;
        height: 32px;
      }
    `}
`
const ButtonWrapper = styled(Link)`
  color: #fff;
  opacity: ${({ $hide }) => ($hide ? 0 : 1)};
  &:hover {
    .arrowAnimation:after {
      margin-left: 6px;
    }
  }

  ${({ $gradient, color, theme }) =>
    color && theme['button'] && theme['button'][color]
      ? `
  background: ${
    $gradient ? theme['button'][color].gradient : theme['button'][color].bg
  };
  color: ${theme['button'][color].text};
  @media (min-width: ${theme.device.miniDesktop}){
    &:hover {
      background: ${
        $gradient
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
  border: 1px solid #fff;
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
    color: ${theme.button.primary.bg};
    border: 1px solid ${theme.button.primary.bg};
    @media (min-width: ${theme.device.miniDesktop}){
      &:hover {
        border-color: ${theme.button.primary.bgHover};
        color: ${theme.button.primary.bgHover};
      }
    }

    body:not(.dark-mode) .theme-dark && {
      background: #fff !important;
    }
  `
      : ''}

  cursor: pointer;
  text-align: center;
  transition: background-color 300ms ease, border 300ms ease, color 300ms ease;
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

  .theme-dark &{
    min-height: 42px;
    padding: 6px 24px;
  }
  .cta-w-377 & {
    max-width: 377px;
  }
`
const ButtonText = styled.span`
  .cta-p-59 & {
    padding: 0 59px;
  }
`
