import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Twitter from '../images/icons/twitter.svg'
import Facebook from '../images/icons/facebook.svg'
import Linkedin from '../images/icons/linkedin.svg'
import Coppy from '../images/icons/icon-coppy.svg'

const SocialIcon = props => {
  const { name, text } = props
  console.log(text);
  return (
    <Icon>
      {'coppy' === name && <Coppy />}
      {'twitter' === name && <Twitter />}
      {'facebook' === name && <Facebook />}
      {'linkedin' === name && <Linkedin />}
      {text ? (<span>{text}</span>) : null}
    </Icon>
  ) 
}

SocialIcon.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
}

export default SocialIcon

const Icon = styled.span`
  display: flex;
  svg {
    width: 20px;
    height: 20px;
    path {
      fill: #BBC0C5;
    }
  }
  span {
    color: #BBC0C5;
    padding-left: 6px;
  }
`
