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
import generateUUID from '../lib/utils/helpers'

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
    isStandalone,
    extraData,
    locale,
    localizedPages,
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
    localizedPages,
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
    if (isStandalone) {
      document.body.classList.remove('ascb-show')
    } else {
      document.body.classList.add('ascb-show')
    }
  }, [isStandalone])

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

  useEffect(() => {
    let timer
    const handleClickDl = event => {
      if (event.target.closest('.deeplink')) {
        const uuid = generateUUID()
        window.dataLayer = window.dataLayer || []
        window.dataLayer.push({
          event: 'all_clicks',
          unique_attribution_id: uuid,
        })
        timer = setTimeout(() => {
          window.dataLayer.push({
            unique_attribution_id: undefined,
          })
        }, 500)
      }

      const closest = event.target.closest(
        '[data-componentName][data-componentId]'
      )

      if (closest) {
        window.dataLayer = window.dataLayer || []

        let data = {
          componentName: closest.dataset.componentname,
          componentId: closest.dataset.componentid,
        }

        if (closest.dataset.flagname && closest.dataset.flagvalue) {
          data = {
            ...data,
            flagName: closest.dataset.flagname,
            flagValue: closest.dataset.flagvalue,
          }
        }

        window.dataLayer.push(data)
      }
    }

    document.addEventListener('click', handleClickDl, true)

    return () => {
      document.removeEventListener('click', handleClickDl, true)
      timer && clearTimeout(timer)
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
