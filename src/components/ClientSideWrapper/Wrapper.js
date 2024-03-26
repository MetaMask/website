import React, { useEffect, useState } from 'react'
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react'
import MetaMaskContextProvider from '../../Context/MetaMaskContextProvider'
import ContextClientSide from '../../Context/ContextClientSide'
import '@contentful/live-preview/style.css'
import { DEFAULT_LOCALE, LOCALES_TRANSLATE } from '../../lib/config.mjs'
import { useLocation } from '@reach/router'

const ClientSideWrapper = ({ children }) => {
  const location = useLocation()
  const [theme, setTheme] = useState(window?.__theme || 'light')
  const [locale, setLocale] = useState(() => {
    const pathSegments = location.pathname.split('/')
    const languageSegment = pathSegments[1]
    const detectedLocale = LOCALES_TRANSLATE.find(
      l => l.code === languageSegment
    )
    return detectedLocale || DEFAULT_LOCALE
  })
  const [isDarkMode, setDarkMode] = useState(false)

  const toggleTheme = () => {
    const theme = window?.__theme
    window.__setPreferredTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    window.__onThemeChange = setTheme
  }, [])

  useEffect(() => {
    if (theme === 'dark') {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, [theme])

  const valueContext = {
    darkMode: {
      isDarkMode,
      toggleTheme,
    },
    localization: {
      locale,
      setLocale,
    },
  }
  return (
    <ContentfulLivePreviewProvider
      enableInspectorMode
      enableLiveUpdates
      locale="en-US"
    >
      <MetaMaskContextProvider>
        <ContextClientSide.Provider value={valueContext}>
          {children}
        </ContextClientSide.Provider>
      </MetaMaskContextProvider>
    </ContentfulLivePreviewProvider>
  )
}

export default ClientSideWrapper
