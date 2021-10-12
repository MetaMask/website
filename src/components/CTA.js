import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import Arrow from './ArrowIcon'
import Link from './Link'

const CTA = props => {
  const {
    link,
    text,
    align = 'left',
    newTab,
    iconConfig,
    color,
    containerWidth,
    button = false,
  } = props

  const defaultIconConfig = { width: '1.5em', height: '0.5em', fill: 'black' }
  const icon = { ...defaultIconConfig, fill: color, ...iconConfig }

  return (
    <CTAContainer align={align} containerWidth={containerWidth}>
      <ContentWrapper to={link} newTab={newTab} color={color} button={button}>
        {button ? (
          text
        ) : (
          <>
            {text} <Arrow {...icon} />
          </>
        )}
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
}

const CTAContainer = styled.div`
  width: ${({ containerWidth, theme }) =>
    (containerWidth && theme.container[containerWidth]) || '100%'};
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
  color: ${({ color }) => color};
  font-size: ${({ theme }) => theme.font.size.xl}rem;
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  text-decoration: none;
  &:hover {
    opacity: 0.6;
  }
  ${({button, theme}) => button ? `
    background: ${theme.lightBlue};
    color: #fff;
    height: 56px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 12px 32px;
    border-radius: 3px;
    font-weight: 600;
    font-size: 13px;
    text-transform: uppercase;
  ` : ``}
`

const alignMapping = align => {
  if (align === 'right') return 'flex-end'
  if (align === 'middle' || align === 'center') return 'center'
  return 'flex-start'
}
