import { ToastContainer as Notifications, toast } from 'react-toastify'
import ContextClientSide from '../Context/ContextClientSide'
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin'
import { useLDClient } from 'gatsby-plugin-launchdarkly'
import generateUUID from '../lib/utils/helpers'
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
    isStandalone,
    extraData,
    locale,
    localizedPages,
    ...rest
  } = props

  const ldClient = useLDClient()
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

  const formatFlagsForGTM = (flags, data) => {
    Object.entries(flags).forEach(([key, value], i) => {
      data[`flags_${i + 1}`] = JSON.stringify({
        [key]:
          typeof value === 'boolean' ? (value ? 'enabled' : 'disabled') : value,
      })
    })
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
    if (ldClient) {
      window.dataLayer = window.dataLayer || []

      ldClient.waitUntilReady().then(() => {
        setTimeout(() => {
          const elems = document.querySelectorAll(
            '[data-flagname][data-flagvalue]'
          )

          const flags = ldClient.allFlags()

          const data = {
            event: 'custom_page_view',
            custom_page_view_page_path: window.location.pathname,
            custom_page_title: document.title,
          }

          Array.from(elems).forEach((el, i) => {
            data[`flags_active_on_current_page_componentName_${i + 1}`] =
              el.dataset.componentname

            data[`flags_active_on_current_page_componentId_${i + 1}`] =
              el.dataset.componentid

            data[`flags_active_on_current_page_flagName_${i + 1}`] =
              el.dataset.flagname

            data[
              `flags_active_on_current_page_flagValue_${i + 1}`
            ] = /^(true|false)$/.test(el.dataset.flagvalue)
              ? el.dataset.flagvalue === 'true'
                ? 'enabled'
                : 'disabled'
              : el.dataset.flagvalue
          })

          formatFlagsForGTM(flags, data)

          window.dataLayer.push(data)
        }, 50)
      })
    }
  }, [ldClient])

  useEffect(() => {
    let timer
    const handleClickDl = event => {
      window.dataLayer = window.dataLayer || []

      const flags = ldClient.allFlags()

      if (event.target.closest('.deeplink')) {
        const uuid = generateUUID()

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
        '[data-componentname][data-flagname]'
      )
      const closestLink = event.target.closest('a, button')

      const el = closest || closestLink

      const data = {
        event: 'before_all_clicks',
        componentName: el?.dataset.componentname,
        componentId: el?.dataset.componentid,
        flagName: el?.dataset.flagname,
        flagValue: el?.dataset.flagvalue,
        page_path_before: window.location.pathname,
        click_url_before: closestLink?.href,
        click_text_before:
          closestLink?.nodeName === 'BUTTON' &&
          closestLink?.getAttribute('aria-label')
            ? closestLink?.getAttribute('aria-label')
            : closestLink?.innerText
            ? closestLink?.innerText
            : event.target?.nodeName === 'IMG'
            ? event.target.alt
            : event.target.innerText,
      }

      formatFlagsForGTM(flags, data)

      window.dataLayer.push(data)
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
