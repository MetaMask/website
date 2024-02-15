import React, { useEffect } from 'react'
import Layout from '../components/layout'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { ToastContainer as Notifications, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  defaultTheme,
  purpleTheme,
  purpleDarkTheme,
  darkTheme,
  darkDarkTheme,
  defaultDarkTheme,
} from '../lib/theme'
import Context from '../Context/ContextPage'
import ContextClientSide from '../Context/ContextClientSide'
import queryString from 'query-string'

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
    ...rest
  } = props

  const { pathname, search } = location || {}
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

  const params = queryString.parse(search)
  const { page } = params
  const [paginationPage, setPaginationPage] = React.useState(
    parseInt(page || 1, 10)
  )

  const headerRef = React.useRef()
  const heroContainerRef = React.useRef(null)

  const valueContext = {
    faq: {
      idFaqActive,
      setIdFaqActive,
    },
    pagination: {
      paginationPage,
      setPaginationPage,
    },
    header: {
      headerRef,
    },
    heroContainer: {
      heroContainerRef,
    },
    extraData,
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
