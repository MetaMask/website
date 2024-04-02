import PropTypes from 'prop-types'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled, { withTheme } from 'styled-components'
import Link from './Link'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import { useMediaQuery } from 'react-responsive'
import ToggleDarkMode from './ToggleDarkMode'
import ContextClientSide from '../Context/ContextClientSide'
import Context from '../Context/ContextPage'
import classnames from 'classnames'
import { DEFAULT_LOCALE_CODE, LOCALES } from '../lib/config.mjs'
import { navigate } from 'gatsby-link'
import { useLocation } from '@reach/router'
import { useFlags } from 'gatsby-plugin-launchdarkly'

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
    isSticky,
    previewMode = false,
    translation,
  } = props
  const isDesktop = useMediaQuery({
    query: '(min-width: 1025px)',
  })
  const [menuActive, setMenuActive] = useState('')
  const [hamburgerActive, setHamburgerActive] = useState(false)
  const { darkMode: darkModeContextValue, localization } = useContext(
    ContextClientSide
  )
  const location = useLocation()
  const { pathname } = location
  const menuRef = useRef()
  const buttonRef = useRef()
  const { header: headerREF } = useContext(Context)
  const { headerRef } = headerREF || {}
  const { isDarkMode, toggleTheme } = darkModeContextValue || {}
  const { locale, setLocale } = localization || {}
  const [topMenuMobile, setTopMenuMobile] = useState('88px')
  const [isBrowser, setIsBrowser] = useState(false)
  const { showLanguageSelector } = useFlags()
  const shouldShowLanguageSelector =
    previewMode || (showLanguageSelector && translation)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  useEffect(() => {
    if (!menus && isDarkMode) {
      toggleTheme()
    }
    const handleOuterClick = e => {
      const ref = menuRef?.current
      const btnRef = buttonRef?.current
      if (hamburgerActive && ref && btnRef) {
        if (!ref.contains(e.target) && !btnRef.contains(e.target)) {
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
  const onChangeLocale = locale => {
    setMenuActive('')
    setLocale(locale)
    if (!previewMode) {
      let localizedPath
      if (locale.code === DEFAULT_LOCALE_CODE) {
        localizedPath = pathname.replace(/^\/(ar|zh-CN|de|es)/, '')
      } else {
        const newLocale = locale.code === DEFAULT_LOCALE_CODE ? '' : locale.code
        localizedPath = `/${newLocale}${pathname.replace(
          /^\/(ar|zh-CN|de|es)\//,
          '/'
        )}`
      }
      navigate(localizedPath)
    }
  }

  return (
    <HeaderElement ref={headerRef} className={classnames({ sticky: isSticky })}>
      <Announcement>
        {contentfulModuleToComponent({
          ...popupAnnouncement,
          previewMode,
        })}
      </Announcement>
      <HeaderContainer>
        <LogoContainer>
          <Link to="/" aria-label="Go to home page">
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
                  <Logo
                    src={srcLogo}
                    alt={titleLogo}
                    $widthCustom={widthLogo}
                  />
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
                    src={logoMobile.logo.file.url}
                    alt={logoMobile.title}
                    $widthCustom={logoMobile.widthLogo}
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
              ref={buttonRef}
              className="w-icon w-icon-nav-menu"
            ></HamburgerButton>
            <NavMain
              hamburgerActive={hamburgerActive}
              ref={menuRef}
              topMenuMobile={topMenuMobile}
            >
              <NavMainInner>
                {menus.map((menu, index) => {
                  const { title, modules, ctaLink } = menu
                  const active = menuActive === index
                  return (
                    <NavMenu
                      key={index}
                      active={active}
                      onMouseEnter={() => handleMenuMouseEnter(index)}
                      onMouseLeave={() => handleMenuMouseLeave(index)}
                    >
                      <NavMenuMain
                        hasChild={ctaLink ? false : true}
                        onClick={() => handleMenuClick(index)}
                      >
                        {ctaLink ? (
                          contentfulModuleToComponent({
                            ...menu,
                            typeLayout: 'headerSingle',
                            previewMode,
                          })
                        ) : (
                          <>
                            {title}
                            <Icon className="w-icon w-icon-dropdown-toggle" />
                          </>
                        )}
                      </NavMenuMain>
                      <NavMenuChild active={active}>
                        {modules && modules.length
                          ? modules.map(m =>
                              contentfulModuleToComponent({
                                ...m,
                                hasModuleContainer: true,
                                typeLayout: 'header',
                                previewMode,
                              })
                            )
                          : null}
                      </NavMenuChild>
                    </NavMenu>
                  )
                })}
                {downloadButton ? (
                  <ButtonsWrapper
                    className="download-btn-desktop"
                    hideDownloadBtn={hideDownloadBtn}
                  >
                    {contentfulModuleToComponent({
                      ...downloadButton,
                      hasModuleContainer: true,
                      isHeaderMenu: true,
                      previewMode,
                    })}
                  </ButtonsWrapper>
                ) : null}
                <ToggleWrapper>
                  <DarkModeWrapper>
                    <ToggleDarkMode
                      onChange={toggleTheme}
                      checked={isDarkMode}
                      name="darkMode"
                      value="dark"
                    />
                  </DarkModeWrapper>
                  {shouldShowLanguageSelector && (
                    <NavMenu
                      key="language-selector"
                      className="language-selector"
                      active={menuActive === 'language-selector'}
                      onMouseEnter={() =>
                        handleMenuMouseEnter('language-selector')
                      }
                      onMouseLeave={() =>
                        handleMenuMouseLeave('language-selector')
                      }
                    >
                      <NavMenuMain
                        hasChild
                        onClick={() => handleMenuClick('language-selector')}
                      >
                        {isBrowser && locale?.shortName}
                        <Icon className="w-icon w-icon-dropdown-toggle" />
                      </NavMenuMain>
                      <NavMenuChild active={menuActive === 'language-selector'}>
                        {LOCALES.map(locale => (
                          <span
                            key={locale.code}
                            onClick={() => onChangeLocale(locale)}
                            className="locale-item"
                          >
                            {locale.localizedName}
                          </span>
                        ))}
                      </NavMenuChild>
                    </NavMenu>
                  )}
                </ToggleWrapper>
                {downloadButton ? (
                  <ButtonsWrapper
                    className="download-btn-mobile"
                    hideDownloadBtn={hideDownloadBtn}
                  >
                    {contentfulModuleToComponent({
                      ...downloadButton,
                      hasModuleContainer: true,
                      isHeaderMenu: true,
                      previewMode,
                    })}
                  </ButtonsWrapper>
                ) : null}
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
  previewMode: PropTypes.bool,
}

const HeaderElement = styled.header`
  background-color: #fff;
  body.dark-mode & {
    background-color: #121212;
  }
  bottom: 20px;
  display: block;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  overflow: visible;
  padding: 24px 20px;
  right: 0;
  top: 0;
  z-index: 999;
  transition: background 300ms ease;

  &.sticky {
    position: sticky;
  }

  html:lang(ar) & {
    direction: ltr;

    * {
      direction: ltr;
    }
  }
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
  max-width: 1200px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    max-width: var(--container-width-miniDesktop);
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
    max-width: var(--container-width-miniDesktop);
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

  ${({ $widthCustom }) =>
    $widthCustom
      ? `
      width: ${$widthCustom};
      height: auto !important;
    `
      : ''}
`
const NavMenu = styled.div`
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  &.language-selector {
    min-width: 85px;
  }
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

  .locale-item {
    font-size: 16px;
    line-height: 22px;
    cursor: pointer;
    margin: 4px;
    padding: 8px;
    border-radius: 4px;
    transition: color 0.15s ease, background-color 0.15s ease;

    &:hover {
      background-color: #e6eaee;
      color: #037dd6;

      .dark-mode & {
        background-color: #24292e;
        color: #fff;
      }
    }
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
  body.dark-mode & {
    color: #FFF;
  }
  &:hover {
    color: ${({ theme }) => theme.text.menuHover};
  }
  ${({ hasChild }) =>
    hasChild
      ? `
      cursor: pointer;
    `
      : ``}

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

  &.download-btn-desktop {
    display: none;

    @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
      display: block;
    }
  }

  &.download-btn-mobile {
    display: block;
    @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
      display: none;
    }
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

  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    margin-top: 16px;
    margin-left: 0;
    justify-content: center;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
    flex-direction: row;
  }
`
