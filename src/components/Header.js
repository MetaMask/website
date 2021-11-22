import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import Link from './Link'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import { useMediaQuery } from 'react-responsive'

const StyledHeader = props => {
  const {
    logo: {
      title,
      logo: {
        file: { url: srcLogo },
      },
    },
    menus,
    downloadButton,
  } = props
  const isDesktop = useMediaQuery({
    query: '(min-width: 1025px)',
  })
  const [menuActive, setMenuActive] = React.useState('')
  const [hamburgerActive, setHamburgerActive] = React.useState(false)
  const menuRef = React.useRef()

  React.useEffect(() => {
    const handleOuterClick = e => {
      if (hamburgerActive && menuRef && menuRef.current) {
        const ref = menuRef.current
        if (!ref.contains(e.target) && hamburgerActive) {
          setHamburgerActive(false)
        }
      }
    }
    document.addEventListener('click', handleOuterClick)
    return () => document.removeEventListener('click', handleOuterClick)
  }, [hamburgerActive])

  const handleMenuClick = id => {
    if (menuActive === id) {
      setMenuActive('')
    } else {
      setMenuActive(id)
    }
  }
  const handleMenuMouseEnter = id => {
    if (isDesktop) {
      setMenuActive(id)
    }
  }
  const handleMenuMouseLeave = () => {
    if (isDesktop) {
      setMenuActive('')
    }
  }
  const handleHamburgerButton = () => {
    setHamburgerActive(!hamburgerActive)
  }
  return (
    <HeaderElement>
      <HeaderContainer>
        <LogoContainer>
          <Link to="/">
            <LogoWrapper>
              <Logo src={srcLogo} alt={title} />
            </LogoWrapper>
          </Link>
        </LogoContainer>
        <HamburgerButton
          onClick={handleHamburgerButton}
          active={hamburgerActive}
          className="w-icon w-icon-nav-menu"
        ></HamburgerButton>
        <NavMain hamburgerActive={hamburgerActive} ref={menuRef}>
          <NavMainInner>
            {menus.map((menu, index) => {
              const { title, modules } = menu
              const active = menuActive === index
              return (
                <NavMenu
                  active={active}
                  onMouseEnter={() => handleMenuMouseEnter(index)}
                  onMouseLeave={() => handleMenuMouseLeave(index)}
                >
                  <NavMenuMain onClick={() => handleMenuClick(index)}>
                    {title}
                    <Icon className="w-icon w-icon-dropdown-toggle"></Icon>
                  </NavMenuMain>
                  <NavMenuChild active={active}>
                    {modules && modules.length
                      ? modules.map(m =>
                          contentfulModuleToComponent({
                            ...m,
                            hasModuleContainer: true,
                            typeLayout: 'header',
                          })
                        )
                      : null}
                  </NavMenuChild>
                </NavMenu>
              )
            })}
            <ButtonsWrapper>
              {contentfulModuleToComponent({
                ...downloadButton,
                hasModuleContainer: true,
                isHeaderMenu: true,
              })}
            </ButtonsWrapper>
          </NavMainInner>
        </NavMain>
      </HeaderContainer>
    </HeaderElement>
  )
}

export default withTheme(StyledHeader)

StyledHeader.propTypes = {
  logo: PropTypes.object,
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ).isRequired,
  downloadButton: PropTypes.object,
}

const HeaderElement = styled.header`
  background-color: #fff;
  bottom: 20px;
  display: block;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  overflow: visible;
  padding: 24px 20px;
  position: sticky;
  right: 0;
  top: 0;
  z-index: 999;
`

const HeaderContainer = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 940px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    max-width: 728px;
  }
`

const LogoContainer = styled.div`
  display: block;
`

const NavMain = styled.nav`
  display: block;
  font-size: 16px;
  line-height: 22px;
  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    opacity: 0;
    visibility: hidden;
    left: 0;
    right: 0;
    background: #fff;
    padding: 12px;
    position: fixed;
    top: 0;
    bottom: auto;
    margin-top: 88px;
    max-height: calc(100% - 88px);
    overflow-x: hidden;
    overflow-y: auto;
    ${({ hamburgerActive }) =>
      hamburgerActive
        ? `
      opacity: 1;
      visibility: visible;
    `
        : ''}
  }
`
const NavMainInner = styled.div`
  display: flex;
  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    flex-direction: column;
    max-width: 728px;
    margin: 0 auto;
  }
`
const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 210px;
  height: auto;
`

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`
const NavMenu = styled.div`
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    flex-direction: column;
  }
`

const NavMenuChild = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 13px 0 rgb(0 0 0 / 28%);
  display: flex;
  flex-direction: column;
  left: 0;
  min-width: 100%;
  position: absolute;
  top: 100%;
  a {
    white-space: nowrap;
    width: 100%;
    justify-content: flex-start;
  }

  @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
    opacity: 0;
    visibility: hidden;
    ${({ active }) =>
      active
        ? `
    opacity: 1;
    visibility: visible;
    `
        : ''}
  }
  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    width: 100%;
    position: static;
    box-shadow: none;
    max-height: 0;
    overflow: hidden;
    margin-left: 40px;
    ${({ active }) =>
      active
        ? `
        max-height: none;
    `
        : ''}
  }
`
const NavMenuMain = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 20px;
  color: #222;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.darkBlue};
  }

  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    width: 100%;
    justify-content: space-between;
  }
`
const Icon = styled.span`
  display: inline-block;
  margin-left: 4px;
`

const HamburgerButton = styled.div`
  display: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  border-radius: 10px;
  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    display: inline-flex;
  }

  ${({ active }) =>
    active
      ? `
    background: #dbdbdb;
  `
      : ''}
`

const ButtonsWrapper = styled.div`
  display: block;

  .button {
    min-height: 40px !important;
    height: 40px !important;
    ${({ theme }) => `
    background: ${theme.darkBlue} !important;
    @media (min-width: ${theme.device.miniDesktop}){
      &:hover {
        background: ${theme.darkerBlue} !important;
      }
    }
    `}
  }
  a {
    padding: 8px 32px !important;
  }
  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    a {
      width: 100%;
    }
  }
`
