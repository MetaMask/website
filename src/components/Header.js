import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import Link from './Link'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import { useMediaQuery } from 'react-responsive'
import ToggleDarkMode from './ToggleDarkMode'
import ContextClientSide from '../Context/ContextClientSide'
import { setLocalStorage } from '../lib/utils/localStorage'
import Context from '../Context/ContextPage'
import classnames from 'classnames'

const StyledHeader = props => {
  const {
    logo: {
      title: titleLogo,
      logo: {
        file: { url: srcLogo },
        svg: svgLogo,
      },
      widthLogo,
    },
    logoMobile,
    menus,
    downloadButton,
    popupAnnouncement,
    hideDownloadBtn,
  } = props
  const isDesktop = useMediaQuery({
    query: '(min-width: 1025px)',
  })
  const [menuActive, setMenuActive] = React.useState('')
  const [hamburgerActive, setHamburgerActive] = React.useState(false)
  const { darkMode: darkModeContextValue } = React.useContext(ContextClientSide)
  const menuRef = React.useRef()
  const { header: headerREF } = React.useContext(Context)
  const { headerRef } = headerREF || {}
  const { isDarkMode, setIsDarkMode } = darkModeContextValue || {}
  const [topMenuMobile, setTopMenuMobile] = React.useState('88px')

  React.useEffect(() => {
    if (!menus) {
      setLocalStorage('darkMode', '0')
      setIsDarkMode(false)
    }
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
    if (headerRef && popupAnnouncement) {
      const h = headerRef?.current.getBoundingClientRect().height
      setTopMenuMobile(`${h}px`)
    }
    setHamburgerActive(!hamburgerActive)
  }
  const onChangeDarkMode = e => {
    setLocalStorage('darkMode', e.target.checked ? '1' : '0')
    setIsDarkMode(e.target.checked)
  }
  return (
    <HeaderElement ref={headerRef}>
      <Announcement>
        {contentfulModuleToComponent({
          ...popupAnnouncement,
        })}
      </Announcement>
      <HeaderContainer>
        <LogoContainer>
          <Link to="/">
            {srcLogo ? (
              <LogoWrapper
                className={classnames({
                  'hidden-mobile': logoMobile,
                })}
              >
                {svgLogo?.content ? (
                  <div
                    className="logoMetamaskSvg"
                    dangerouslySetInnerHTML={{
                      __html: svgLogo?.content,
                    }}
                  />
                ) : (
                  <Logo src={srcLogo} alt={titleLogo} widthCustom={widthLogo} />
                )}
              </LogoWrapper>
            ) : null}
            {logoMobile ? (
              <LogoWrapper className={classnames('hidden-desktop')}>
                {logoMobile.logo.svg?.content ? (
                  <div
                    className="logoMetamaskSvg"
                    dangerouslySetInnerHTML={{
                      __html: logoMobile.logo.svg?.content,
                    }}
                  />
                ) : (
                  <Logo
                    src={logoMobile.logo.file.src}
                    alt={logoMobile.title}
                    widthCustom={logoMobile.widthLogo}
                  />
                )}
              </LogoWrapper>
            ) : null}
          </Link>
        </LogoContainer>
        {menus ? (
          <>
            <HamburgerButton
              onClick={handleHamburgerButton}
              active={hamburgerActive}
              className="w-icon w-icon-nav-menu"
            ></HamburgerButton>
            <NavMain
              hamburgerActive={hamburgerActive}
              ref={menuRef}
              topMenuMobile={topMenuMobile}
            >
              <NavMainInner>
                {menus.map((menu, index) => {
                  const { title, modules } = menu
                  const active = menuActive === index
                  return (
                    <NavMenu
                      key={index}
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
                {downloadButton ? (
                  <ButtonsWrapper hideDownloadBtn={hideDownloadBtn}>
                    {contentfulModuleToComponent({
                      ...downloadButton,
                      hasModuleContainer: true,
                      isHeaderMenu: true,
                    })}
                  </ButtonsWrapper>
                ) : null}
                <DarkModeWrapper loading={isDarkMode === null}>
                  <ToggleDarkMode
                    onChange={onChangeDarkMode}
                    checked={isDarkMode}
                    name="darkMode"
                    value="dark"
                  />
                </DarkModeWrapper>
              </NavMainInner>
            </NavMain>
          </>
        ) : null}
      </HeaderContainer>
    </HeaderElement>
  )
}

export default withTheme(StyledHeader)

StyledHeader.propTypes = {
  logo: PropTypes.object,
  logoMobile: PropTypes.object,
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ),
  downloadButton: PropTypes.object,
}

const HeaderElement = styled.header`
  background-color: ${({ theme }) => theme.background.white};
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
  transition: background 300ms ease;
`
const Announcement = styled.div`
  margin: -24px -20px 16px -20px;

  &:empty {
    display: none;
  }
`

const HeaderContainer = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 992px;
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
    background: ${({ theme }) => theme.background.white};
    padding: 12px;
    position: fixed;
    top: 0;
    bottom: auto;
    margin-top: ${({ topMenuMobile }) => topMenuMobile};
    max-height: ${({ topMenuMobile }) => `calc(100% - ${topMenuMobile})`};
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

  ${({ widthCustom }) =>
    widthCustom
      ? `
      width: ${widthCustom};
      height: auto !important;
    `
      : ''}
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
  background-color: ${({ theme }) => theme.background.white};
  border-radius: 8px;
  box-shadow: 0 0 13px 0 ${({ theme }) => theme.shadowSubMenu};
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
  color: ${({ theme }) => theme.text.menu};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.text.menuHover};
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
  color: ${({ theme }) => theme.text.default};
  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    display: inline-flex;
  }

  ${({ active, theme }) =>
    active
      ? `
    background: ${theme.background.navBtnHover};
  `
      : ''}
`

const ButtonsWrapper = styled.div`
  display: block;

  .button {
    min-height: 40px !important;
    height: 40px !important;
  }
  a {
    padding: 8px 32px !important;
  }
  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    margin-top: 12px;
    a {
      width: 100%;
    }
  }

  ${({ hideDownloadBtn }) =>
    hideDownloadBtn
      ? `
    opacity: 0;
    visibility: hidden;
  `
      : ``}
`

const DarkModeWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: 32px;
  opacity: 0;

  .client-ready & {
    opacity: 1;
  }

  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    margin-top: 16px;
    margin-left: 0;
    justify-content: center;
  }
`
