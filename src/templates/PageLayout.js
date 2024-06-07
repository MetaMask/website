import { ToastContainer as Notifications, toast } from 'react-toastify'
import ContextClientSide from '../Context/ContextClientSide'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { useAllClicks } from '../hooks/useAllClicks'
import 'react-toastify/dist/ReactToastify.css'
import Context from '../Context/ContextPage'
import Layout from '../components/layout'
import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import {
  defaultTheme,
  purpleTheme,
  purpleDarkTheme,
  darkTheme,
  darkDarkTheme,
  defaultDarkTheme,
} from '../lib/theme'

/**
 * @name PageLayout
 * @summary - Wrapper container to hold all public pages
 * @description -
 */
const PageLayout = props => {
  const {
    location,
    children,
    themeColor,
    h2FontSize,
    extraData,
    locale,
    localizedPages,
    sharedCopy = {},
    ...rest
  } = props

  const { pathname } = location || {}
  const [idFaqActive, setIdFaqActive] = React.useState('')
  const { darkMode: darkModeContextValue } = React.useContext(ContextClientSide)
  const { isDarkMode } = darkModeContextValue || {}

  const pageTheme =
    themeColor === 'purple'
      ? isDarkMode
        ? purpleDarkTheme
        : purpleTheme
      : themeColor === 'dark'
      ? isDarkMode
        ? darkDarkTheme
        : darkTheme
      : isDarkMode
      ? defaultDarkTheme
      : defaultTheme

  const headerRef = React.useRef()
  const heroContainerRef = React.useRef(null)

  const valueContext = {
    faq: {
      idFaqActive,
      setIdFaqActive,
    },
    header: {
      headerRef,
    },
    heroContainer: {
      heroContainerRef,
    },
    extraData,
    localizedPages,
    sharedCopy: sharedCopy || {},
  }

  const [dimensionScript, setDimensionScript] = React.useState('')

  const renderNotification = (state = {}) => {
    if (state.error) {
      const { type, description } = state.error
      const errorMessage = `
        ${type
          .split('_')
          .join(' ')
          .toUpperCase()} -
        ${decodeURIComponent(description)}`
      toast.error(errorMessage)
    }
  }

  const navigationState = (location && location.state) || {}

  if (navigationState.notification) {
    renderNotification(navigationState.notification)
  }

  useAllClicks()

  useEffect(() => {
    if (document) {
      // Detect Web3 Wallet
      if (typeof window.ethereum !== 'undefined') {
        setDimensionScript(
          "if (typeof ga === 'function') {" +
            "ga('set', 'dimension1', 'Web3 Wallet Detected');" +
            '}'
        )
      }
    }
  }, [pathname])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash

      if (hash) {
        const targetElement = document.getElementById(hash.replace('#', ''))

        if (targetElement) {
          const targetPosition = targetElement.getBoundingClientRect().top
          window.scrollTo({ top: targetPosition + window.scrollY - 100 })
        }
      }

      gsap.registerPlugin(ScrollToPlugin)
    }
  }, [])

  return (
    <Context.Provider value={valueContext}>
      <Layout
        theme={pageTheme}
        themeColor={themeColor}
        h2FontSize={h2FontSize}
        locale={locale}
        {...rest}
      >
        <Notifications />
        {children}
        {dimensionScript && (
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: dimensionScript,
            }}
          />
        )}
      </Layout>
    </Context.Provider>
  )
}

export default PageLayout
