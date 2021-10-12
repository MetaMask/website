import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Link from '../Link'

const Wrapper = props => {
  const { children, opensNewTab, link } = props

  return (
    <Item>
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
  padding: 0 18px;
`
