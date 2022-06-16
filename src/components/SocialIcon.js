import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Twitter from '../images/icons/twitter.svg'

const SocialIcon = props => {
  const { name } = props

  return <Icon>{'twitter' === name && <Twitter />}</Icon>
}

SocialIcon.propTypes = {
  name: PropTypes.string,
}

export default SocialIcon

const Icon = styled.span`
  display: flex;
  padding-right: 8px;
`
