import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import ArrowIcon from '../images/icons/icon-arrow-right.svg'
import Link from './Link'

const SimpleCta = props => {
  const { text, link, color } = props

  return (
    <Cta to={link} color={color}>
      <CtaTitle>{text}</CtaTitle>
      <ArrowIcon />
    </Cta>
  )
}

export default withTheme(SimpleCta)

SimpleCta.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
}

const Cta = styled(Link)`
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  font-size: 13px;
  line-height: 14px;
  text-transform: uppercase;
  color : ${({color, theme}) => color || theme.primaryColor};

  svg {
    width: 20px;
    margin-left: 8px;

    path {
      fill : ${({color, theme}) => color || theme.primaryColor};
    }
  }
  
`

const CtaTitle = styled.span`
  display: inline-flex;
`
