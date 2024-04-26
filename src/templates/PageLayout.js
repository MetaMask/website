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
import generateUUID from '../lib/utils/helpers'
import { useLDClient } from 'gatsby-plugin-launchdarkly'

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

      setTimeout(() => {
        const elems = document.querySelectorAll(
          '[data-flagname][data-flagvalue]'
        )

        window.dataLayer.push({
          event: 'custom_page_view',
          ld_user_id: ldClient.getContext().key,
          all_flags: ldClient.allFlags(),
          flags_active_on_current_page: Array.from(elems).map(el => ({
            componentName: el.dataset.componentname,
            componentId: el.dataset.componentid,
            flagName: el.dataset.flagname,
            flagValue: el.dataset.flagvalue,
          })),
          page_path: window.location.pathname,
        })
      }, 10)
    }
  }, [ldClient])

  useEffect(() => {
    let timer
    const handleClickDl = event => {
      window.dataLayer = window.dataLayer || []

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
      const closestLink = event.target.closest('a')

      const el = closest || closestLink

      const data = {
        event: 'before_all_clicks',
        ld_user_id: window.localStorage.getItem('ld:$anonUserId'),
        componentName: el?.dataset.componentname,
        componentId: el?.dataset.componentid,
        flagName: el?.dataset.flagname,
        flagValue: el?.dataset.flagvalue,
        page_path_before: window.location.pathname,
        click_url_before: closestLink?.href,
        click_text_before: closestLink?.innerText,
      }

      window.dataLayer.push(data)
      // console.log(data)
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
