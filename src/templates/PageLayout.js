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
import ContextClientSide from '../Context/ContextClientSide'

/**
 * @name PageLayout
 * @summary - Wrapper container to hold all public pages
 * @description -
 */
const PageLayout = props => {
  const { location, children, themeColor, h2FontSize, ...rest } = props
  const { pathname } = location || {}
  const [idFaqActive, setIdFaqActive] = React.useState('')
  const { darkMode: darkModeContextValue } = React.useContext(ContextClientSide)
  const { isDarkMode } = darkModeContextValue || {}
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

      // Detect Web3 Wallet
      if (typeof window.ethereum !== 'undefined') {
        setDimensionScript("if (typeof ga === 'function') {" +
          "ga('set', 'dimension1', 'Web3 Wallet Detected');" +
          "}")
      }
    }
  }, [pathname])

  return (
    <Context.Provider value={valueContext}>
      <Layout theme={pageTheme} h2FontSize={h2FontSize} {...rest}>
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
