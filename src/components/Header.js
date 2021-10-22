import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'

import Link from './Link'

const StyledHeader = props => {
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
