import React from 'react'
import Layout from '../components/layout'
import { ToastContainer as Notifications, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  defaultTheme,
  purpleTheme,
  purpleDarkTheme,
  defaultDarkTheme,
} from '../lib/theme'
import scrollTo from '../lib/utils/scrollToElement'
import Context from '../Context/ContextPage'
import Helmet from 'react-helmet'
import { getLocalStorage } from '../lib/utils/localStorage'

/**
 * @name PageLayout
 * @summary - Wrapper container to hold all public pages
 * @description -
 */
const PageLayout = props => {
  const { location, children, themeColor, ...rest } = props
  const { pathname } = location || {}
  const [idFaqActive, setIdFaqActive] = React.useState('')
  const [isDarkMode, setIsDarkMode] = React.useState(false)
  const systemChangeDarkMode = event => {
    const isDarkSystem = event.matches
    setIsDarkMode(isDarkSystem)
  }
  React.useEffect(() => {
    if (!window) return
    const darkModeSystem =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    const darkModeLocalStorage = getLocalStorage('darkMode') === '1'
    if (darkModeLocalStorage === null) {
      setIsDarkMode(darkModeSystem)
    } else {
      setIsDarkMode(darkModeLocalStorage)
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', systemChangeDarkMode)
    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', systemChangeDarkMode)
  }, [])
  const pageTheme =
    themeColor === 'purple'
      ? isDarkMode
        ? purpleDarkTheme
        : purpleTheme
      : isDarkMode
      ? defaultDarkTheme
      : defaultTheme
  const valueContext = {
    faq: {
      idFaqActive,
      setIdFaqActive,
    },
    darkMode: {
      isDarkMode,
      setIsDarkMode,
    },
  }
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

  React.useEffect(() => {
    if (document) {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href').length === 1) {
          return
        }
        anchor.addEventListener('click', function(e) {
          e.preventDefault()
          const hash = this.getAttribute('href')
          const ele = document.getElementById(hash.replace('#', ''))
          const vpTop = ele.getBoundingClientRect().top
          const windowY =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop ||
            0
          const y = vpTop + windowY - 100
          const speed = Math.min(Math.max(parseInt(vpTop), 500), 2500)
          scrollTo(y, speed)
          window.history.pushState(
            '',
            '',
            `${pathname.replace(/\/?$/, '/')}${hash}`
          )
        })
      })
    }
  }, [pathname])

  return (
    <Context.Provider value={valueContext}>
      <Layout theme={pageTheme} {...rest}>
        <Helmet>
          <body className={isDarkMode ? 'dark-mode' : 'light-mode'} />
        </Helmet>
        <Notifications />
        {children}
      </Layout>
    </Context.Provider>
  )
}

export default PageLayout
