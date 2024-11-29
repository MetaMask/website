import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  DEFAULT_LOCALE_CODE,
  GB_BLOCKED_PATHS,
  GB_DISCLAIMER_PATHS,
  LOCALES,
  getLocalizedPath,
} from '../lib/config.mjs'
import ContextClientSide from '../Context/ContextClientSide'
import { useLDClient } from 'gatsby-plugin-launchdarkly'
import styled, { withTheme } from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import ToggleDarkMode from './ToggleDarkMode'
import Context from '../Context/ContextPage'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby-link'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Link from './Link'
import { filterMenuPaths } from '../lib/utils/filterMenuPaths'
import { setLocalStorage } from '../lib/utils/localStorage'
import HeaderDisclaimer from './HeaderDisclaimer'
import { removeLanguageCode } from '../lib/utils/removeLanguageCode'
import { useIsUKBlocked } from '../hooks/useIsUKBlocked'
import { useCountry } from '../hooks/useCountry'
import { useLaunchDarklyFlag } from '../Context/LaunchDarklyFlagContext'

const StyledHeader = props => {
  const {
    logo,
    logoMobile,
    menus,
    downloadButton,
    popupAnnouncement,
    popupAnnouncementTreatment,
    hideDownloadBtn,
    isSticky,
    launchDarklyFlag,
    previewMode = false,
    translation,
  } = props

  const isDesktop = useMediaQuery({
    query: '(min-width: 1200px)',
  })
  const [menuActive, setMenuActive] = useState('')
  const [filteredMenus, setFilteredMenus] = useState(menus)
  const [hamburgerActive, setHamburgerActive] = useState(false)
  const { darkMode: darkModeContextValue, localization } = useContext(
    ContextClientSide
  )
  const location = useLocation()
  const { pathname } = location
  const menuRef = useRef()
  const buttonRef = useRef()
  const languageSelectorRef = useRef()
  const { header: headerREF } = useContext(Context)
  const { headerRef } = headerREF || {}
  const { isDarkMode, toggleTheme } = darkModeContextValue || {}
  const { locale, setLocale } = localization || {}
  const [topMenuMobile, setTopMenuMobile] = useState('88px')
  const [isBrowser, setIsBrowser] = useState(false)
  const [showDisclaimer, setShowDisclaimer] = useState(false)
  const [
    usePopupAnnouncementTreatment,
    setUsePopupAnnouncementTreatment,
  ] = useState(false)

  const ldClient = useLDClient()
  const country = useCountry()
  const isUKBlocked = useIsUKBlocked()
  const { getLaunchDarklyFlag } = useLaunchDarklyFlag()

  const shouldShowLanguageSelector = previewMode || translation

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  useEffect(() => {
    const init = async () => {
      if (launchDarklyFlag !== 'use-treatment-for-non-uk-and-us-announcement') {
        return
      }

      const value = await getLaunchDarklyFlag(launchDarklyFlag)
      if (value === true && !['GB', 'US'].includes(country)) {
        setUsePopupAnnouncementTreatment(true)
      }
    }

    init()
  }, [getLaunchDarklyFlag, launchDarklyFlag, country])

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
      const localizedPath = getLocalizedPath(pathname, locale.code)

      setLocalStorage('preferredLanguage', locale.code)

      window.location.replace(localizedPath)
    }

    ldClient?.track('on-locale-change', { locale })
    ldClient?.flush()
  }

  // Apply UK(GB) specific temporary geo-blocking rules
  useEffect(() => {
    const currentPath = removeLanguageCode(pathname)

    // Show UK Disclaimer
    if (country === 'GB' && GB_DISCLAIMER_PATHS.includes(currentPath)) {
      setShowDisclaimer(true)
    }

    if (isUKBlocked) {
      // Hide menu items pointing to paths blocked in the UK
      const filteredMenus = filterMenuPaths(menus, GB_BLOCKED_PATHS)
      setFilteredMenus(filteredMenus)

      // Redirect to homepage if current path is blocked
      if (GB_BLOCKED_PATHS.includes(currentPath)) {
        const homePath =
          locale.code === DEFAULT_LOCALE_CODE ? '/' : `/${locale.code}/`
        navigate(homePath)
      }
    }
  }, [isUKBlocked, country, pathname, locale, menus])

  const desktopLogo =
    isDarkMode && logo?.logoDarkMode ? logo.logoDarkMode : logo?.logo
  const mobileLogo =
    isDarkMode && logoMobile?.logoDarkMode
      ? logoMobile.logoDarkMode
      : logoMobile?.logo

  return (
    <HeaderElement ref={headerRef} className={classnames({ sticky: isSticky })}>
      <Announcement>
        {contentfulModuleToComponent({
          ...(usePopupAnnouncementTreatment
            ? popupAnnouncementTreatment
            : popupAnnouncement),
          previewMode,
        })}
      </Announcement>
      <HeaderContainer>
        <LogoContainer>
          <Link to="/" aria-label="Go to home page">
            {desktopLogo?.file ? (
              <LogoWrapper
                className={classnames({
                  'hidden-mobile': logoMobile,
                })}
              >
                <Logo
                  src={desktopLogo.file.url}
                  alt={desktopLogo.title}
                  $widthCustom={desktopLogo.widthLogo}
                />
              </LogoWrapper>
            ) : null}
            {mobileLogo?.file ? (
              <LogoWrapper className={classnames('hidden-desktop')}>
                <Logo
                  src={mobileLogo.file.url}
                  alt={mobileLogo.title}
                  $widthCustom={mobileLogo.widthLogo}
                  width={mobileLogo.gatsbyImageData?.width}
                  height={mobileLogo.gatsbyImageData?.height}
                />
              </LogoWrapper>
            ) : null}
          </Link>
        </LogoContainer>
        {filteredMenus ? (
          <>
            <HamburgerButton
              onClick={handleHamburgerButton}
              active={hamburgerActive}
              ref={buttonRef}
              className="w-icon w-icon-nav-menu"
            />
            <NavMain
              hamburgerActive={hamburgerActive}
              ref={menuRef}
              topMenuMobile={topMenuMobile}
            >
              <NavMainInner>
                {filteredMenus.map((menu, index) => {
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
                  <ButtonWrapper
                    className="download-btn-desktop"
                    hideDownloadBtn={hideDownloadBtn}
                  >
                    {contentfulModuleToComponent({
                      ...downloadButton,
                      hasModuleContainer: true,
                      isHeaderMenu: true,
                      previewMode,
                    })}
                  </ButtonWrapper>
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
                      ref={languageSelectorRef}
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
                  <ButtonWrapper
                    className="download-btn-mobile"
                    hideDownloadBtn={hideDownloadBtn}
                  >
                    {contentfulModuleToComponent({
                      ...downloadButton,
                      hasModuleContainer: true,
                      isHeaderMenu: true,
                      previewMode,
                    })}
                  </ButtonWrapper>
                ) : null}
              </NavMainInner>
            </NavMain>
          </>
        ) : null}
      </HeaderContainer>
      {showDisclaimer && (
        <DisclaimerWrapper>
          <HeaderDisclaimer />
        </DisclaimerWrapper>
      )}
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

  body.dark-mode & {
    background-color: #121212;
  }

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

  @media (max-width: ${({ theme }) => theme.device.desktopMediaMax}) {
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
    box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.1);

    .dark-mode & {
      box-shadow: 0px 6px 6px 0px rgba(255, 255, 255, 0.1);
    }

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
  @media (max-width: ${({ theme }) => theme.device.desktopMediaMax}) {
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
  @media (max-width: ${({ theme }) => theme.device.desktopMediaMax}) {
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
  user-select: none;

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
    z-index: 999;
    `
        : ''}
  }

  @media (max-width: ${({ theme }) => theme.device.desktopMediaMax}) {
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
  padding: 0 16px;
  color: #222;
  line-height: 1.1;

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

  @media (max-width: ${({ theme }) => theme.device.desktopMediaMax}) {
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
  @media (max-width: ${({ theme }) => theme.device.desktopMediaMax}) {
    display: inline-flex;
  }

  ${({ active, theme }) =>
    active
      ? `
    background: ${theme.background.navBtnHover};
  `
      : ''}
`

const ButtonWrapper = styled.div`
  display: block;

  .button {
    min-height: 40px !important;
    height: 40px !important;
  }

  a {
    line-height: 1.1;
    padding: 8px 16px;
    font-size: 14px;
  }

  &.download-btn-desktop {
    display: none;

    @media (min-width: ${({ theme }) => theme.device.desktop}) {
      display: block;
    }
  }

  &.download-btn-mobile {
    display: block;
    @media (min-width: ${({ theme }) => theme.device.desktop}) {
      display: none;
    }
  }

  @media (max-width: ${({ theme }) => theme.device.desktopMediaMax}) {
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
  margin-left: 16px;

  @media (max-width: ${({ theme }) => theme.device.desktopMediaMax}) {
    margin-top: 16px;
    margin-left: 0;
    justify-content: center;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: ${({ theme }) => theme.device.desktop}) {
    flex-direction: row;
  }
`

const DisclaimerWrapper = styled.div`
  margin: 20px -20px -24px -20px;
`
