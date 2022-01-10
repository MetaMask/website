import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Link from '../Link'

const Wrapper = props => {
  const { children, opensNewTab, link, cleanStyle } = props

  return (
    <Item cleanStyle={cleanStyle}>
      <Link newTab={opensNewTab} to={link}>
        {children}
      </Link>
    </Item>
  )
}

export default Wrapper

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

const Item = styled.div`
  display: block;
`
