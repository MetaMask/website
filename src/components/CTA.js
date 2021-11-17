import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Arrow from './ArrowIcon'
import Link from './Link'
import Button from './Button'
import { kebabCase } from 'lodash'

const CTA = props => {
  const {
    link,
    text,
    align = 'left',
    newTab,
    iconConfig,
    color,
    button = false,
    isHideArrow = true,
    typeLayout = '',
    buttonSize,
    customClick,
    buttonDisplay,
    fontSize,
    buttonGradient,
    className,
  } = props
  const isButton = buttonDisplay || button
  const defaultIconConfig = { width: '1.5em', height: '0.5em', fill: 'black' }
  const icon = { ...defaultIconConfig, fill: color, ...iconConfig }
  const handleCustomClick = e => {
    e.preventDefault()
    customClick()
  }

  if (isButton) {
    return (
      <Button
        size={buttonSize}
        link={link}
        text={text}
        newTab={newTab}
        color={color}
        customClick={customClick ? handleCustomClick : null}
        fontSize={fontSize}
        buttonGradient={buttonGradient}
        className={className}
      />
    )
  }

  return (
    <CTAContainer className="ctaModuleContainer" align={align}>
      <ContentWrapper
        to={link}
        newTab={newTab}
        color={color}
        typeLayout={typeLayout}
        className={className}
        onClick={customClick ? handleCustomClick : null}
      >
        {text} {!isHideArrow ? <Arrow {...icon} /> : null}
      </ContentWrapper>
    </CTAContainer>
  )
}

export default CTA

CTA.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string,
  button: PropTypes.bool,
  align: PropTypes.string,
  iconConfig: PropTypes.object,
  isHideArrow: PropTypes.bool,
  newTab: PropTypes.bool,
}

const CTAContainer = styled.div`
  ${({ align }) =>
    align
      ? `
    display: flex;
    justify-content: ${alignMapping(align)}
  `
      : ''}
`

const ContentWrapper = styled(Link)`
  transition: all 0.15s ease;
  text-decoration: none;
 
  ${({ typeLayout, color, theme }) =>
    typeLayout === ''
      ? `
      color: ${color};
    &:hover {
      color: ${theme.darkBlue};
    }
  `
      : ``}
  ${({ typeLayout, theme }) =>
    typeLayout === 'header'
      ? `
    font-size: 16px;
    line-height: 22px;
    height: 56px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 4px;
    padding: 8px;
    border-radius: 4px;
    background-color: transparent;
    font-weight: 400;
    height: auto;
    color: #222;
    &:hover {
      background-color: #e6eaee;
      color: ${theme.darkBlue};
    }
  `
      : ``}
  ${({ typeLayout, theme }) =>
    typeLayout === 'footer'
      ? `
    color: rgba(0, 0, 0, 0.74);
    font-size: 12px;
    line-height: 30px;
    font-weight: 400;
    &:hover {
      color: ${theme.lightBlue};
    }
    @media (max-width: ${theme.device.mobileMediaMax}) {
      font-size: 16px;
      line-height: 44px;
    }
  `
      : ``}
`

const alignMapping = align => {
  if (align === 'right') return 'flex-end'
  if (align === 'middle' || align === 'center') return 'center'
  return 'flex-start'
}
