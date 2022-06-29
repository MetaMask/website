import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Twitter from '../images/icons/twitter.svg'
import Facebook from '../images/icons/facebook.svg'
import Linkedin from '../images/icons/linkedin.svg'
import Copy from '../images/icons/icon-copy.svg'

const SocialIcon = props => {
  const { name, text, customColor } = props
  return (
    <Icon customColor={customColor}>
      {'copy' === name && <Copy />}
      {'twitter' === name && <Twitter />}
      {'facebook' === name && <Facebook />}
      {'linkedin' === name && <Linkedin />}
      {text ? <span>{text}</span> : null}
    </Icon>
  )
}

SocialIcon.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  customColor: PropTypes.string,
}

export default SocialIcon

const Icon = styled.span`
  display: flex;
  padding: 10px;
  svg {
    width: 20px;
    height: 20px;
    ${({ customColor }) =>
      customColor
        ? `
        path {
          fill: ${customColor};
        }
      `
        : ''}
  }
  span {
    ${({ customColor }) =>
      customColor
        ? `
        color: #bbc0c5;
      `
        : ''}
    padding-left: 6px;
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      display: none;
    }
  }
`
