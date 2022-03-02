import React from 'react'
import ContextClientSide from '../../Context/ContextClientSide'
import { getLocalStorage } from '../../lib/utils/localStorage'
import Helmet from 'react-helmet'
import classnames from 'classnames'

const MailWidgetWrapper = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(null)
  const [ready, setReady] = React.useState(false)
  const systemChangeDarkMode = event => {
    const isDarkSystem = event.matches
    setIsDarkMode(isDarkSystem)
  }
  React.useEffect(() => {
    if (!window) return
    const darkModeSystem =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    const darkModeLocalStorage = getLocalStorage('darkMode')
    if (darkModeLocalStorage === null) {
      setIsDarkMode(darkModeSystem)
    } else {
      setIsDarkMode(darkModeLocalStorage === '1')
    }
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', systemChangeDarkMode)
    setTimeout(() => {
      setReady(true)
    }, 400)
    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', systemChangeDarkMode)
  }, [])
  const valueContext = {
    darkMode: {
      isDarkMode,
      setIsDarkMode,
    },
  }
  return (
    <ContextClientSide.Provider value={valueContext}>
      <Helmet>
        <body
          className={classnames(isDarkMode ? 'dark-mode' : 'light-mode', {
            ['client-ready']: ready,
          })}
        />
      </Helmet>
      {children}
    </ContextClientSide.Provider>
  )
}

export default MailWidgetWrapper
