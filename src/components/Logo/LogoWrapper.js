import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Link from '../Link'

const Wrapper = props => {
  const { children, opensNewTab, link, cleanStyle, backgroundColor } = props

  return (
    <Item cleanStyle={cleanStyle} backgroundColor={backgroundColor}>
      {backgroundColor ? (
        <Background backgroundColor={backgroundColor}>
          <Link newTab={opensNewTab} to={link}>
            {children}
          </Link>
        </Background>
      ) : (
        <Link newTab={opensNewTab} to={link}>
          {children}
        </Link>
      )}
    </Item>
  )
}

export default Wrapper

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

const Item = styled.div`
  display: block;

  ${({ backgroundColor }) =>
    backgroundColor
      ? `
  display: flex;
  `
      : null}
`
const Background = styled.div`
  padding: 32px 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;

  ${({ backgroundColor, theme }) =>
    backgroundColor === 'blue'
      ? `
      background: ${theme.background.logoBlue};
  `
      : null}
`
