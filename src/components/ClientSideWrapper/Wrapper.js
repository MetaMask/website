import React, { useEffect, useState } from 'react'
import { ContentfulLivePreviewProvider } from '@contentful/live-preview/react'
import ContextClientSide from '../../Context/ContextClientSide'
import '@contentful/live-preview/style.css'

const ClientSideWrapper = ({ children }) => {
  const [theme, setTheme] = useState(window?.__theme || 'light')
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
  }
  return (
    <ContentfulLivePreviewProvider locale="en-US">
      <ContextClientSide.Provider value={valueContext}>
        {children}
      </ContextClientSide.Provider>
    </ContentfulLivePreviewProvider>
  )
}

export default ClientSideWrapper
