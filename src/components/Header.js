import PropTypes from 'prop-types'
import React from 'react'
import styled, { css, withTheme } from 'styled-components'

import Link from './Link'

const StyledHeader = props => {
  const {  } = props

  return (
    <HeaderElement>
      <HeaderContainer>
        <LogoContainer>
          <Link to="/">

          </Link>
        </LogoContainer>
        <NavMain>
        </NavMain>
      </HeaderContainer>
    </HeaderElement>
  )
}

export default withTheme(StyledHeader)

StyledHeader.propTypes = {
  logo: PropTypes.object,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          to: PropTypes.string,
        })
      ).isRequired,
    })
  ).isRequired,
  downloadButton: PropTypes.object
}

const HeaderElement = styled.header`
  z-index: 999;
  top: 0;
  width: 100%;   
  ${({ shadow }) =>
    shadow
      ? `box-shadow: 0px 4px 20px rgba(114, 114, 114, 0.1);`
      : `box-shadow: none;`}
  @media(min-width: ${({ theme }) => theme.device.desktop}) {
    position: absolute;
    background-color: transparent;
  }
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: ${({ theme }) => theme.device.desktop}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 1160px;
    margin: 0 auto;
    padding: 37.5px 0;
  }
`

const LogoContainer = styled.div`
  flex: 1;
  margin: 8% auto;
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    margin: 5% auto;
  }
  @media (min-width: ${({ theme }) => theme.device.desktop}) {
    margin: 0;
  }
`

const NavMain = styled.nav`
  display: flex;
  flex: 5;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
  margin: 0 auto;
  padding-bottom: 3%;

  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    width: 100%;
    padding: 0 16px 8px 16px;
    margin: 0;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: ${({ theme }) => theme.device.desktop}) {
    padding-bottom: 0;
  }
  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    white-space: nowrap;
    display: flex;
    overflow-x: auto;
    flex-flow: nowrap;
    justify-content: flex-start;
  }
`

const linkStyle = css`
  display: inline-block;
  margin-right: 20px;
  color: ${({ theme }) =>
    theme.theme === 'light' ? theme.black : theme.white};
  font-size: 15px;
  font-weight: ${({ theme }) => theme.font.weight.regular};
  line-height: 2;
  text-decoration: none;
  @media (min-width: ${({ theme }) => theme.device.desktop}) {
    display: inline-block;
    margin: 0px 26px 0 0;
    padding: 12px;
    transition: all 0.15s ease;
    line-height: 1em;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      background-size: 1px 1em;
      box-shadow: inset 0 -0.1em 0 ${({ theme }) => (theme.theme === 'light' ? theme.black : theme.white)};
    }
  }
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    margin: 0 1rem 0 0;
    padding: 4px 8px;
    font-size: 13px;
  }
`

const SocialWrapper = styled.div`
  display: inline-flex;
  @media(max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    margin-left: 8px;
  }

  a {
    margin-top: 0;
    margin-right: 1rem;
    padding: 0 4px;

    @media(max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      margin-right: 1rem;
    }
    
    &:last-child {
      margin-right: 0;
    }
  }

  svg {
    path {
      fill: ${({ theme }) => (theme.theme === 'light' ? theme.black : theme.white)};
    }
  }
`

const StyledLink = styled(Link)`
  ${linkStyle}
`
