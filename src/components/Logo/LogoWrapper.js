import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Link from '../Link'

const Wrapper = props => {
  const {
    children,
    opensNewTab,
    link,
    cleanStyle,
    backgroundColor,
    ...rest
  } = props

  return (
    <Item cleanStyle={cleanStyle} backgroundColor={backgroundColor} {...rest}>
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

  .logoMH45 & img {
    max-height: 45px;
    width: auto;
  }

  ${({ backgroundColor }) =>
    backgroundColor
      ? `
  display: flex;
  `
      : null}
`
const Background = styled.div`
  position: relative;
  padding: 32px 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  width: 100%;

  .usOnlyLabel &:before {
    position: absolute;
    content: 'US ONLY';
    right: 12px;
    top: 12px;
    background-color: #1098fc;
    color: #fff;
    font-size: 8px;
    font-weight: 600;
    padding: 0 6px;
    border-radius: 6px;
  }

  .cashOutMethod & {
    padding: 32px 24px;
    @media (min-width: ${({ theme }) => theme.device.tablet}) {
      justify-content: flex-start;
    }
  }

  .logoShadow & {
    box-shadow: 0px 4px 12px 0px #037dd61a;
  }

  ${({ backgroundColor, theme }) =>
    backgroundColor === 'blue'
      ? `
      background: ${theme.background.logoBlue};
  `
      : null}
`
