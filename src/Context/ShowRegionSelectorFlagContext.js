import { useLDClient } from 'gatsby-plugin-launchdarkly'
import React, { createContext, useCallback, useContext, useState } from 'react'

const ShowRegionSelectorFlagContext = createContext({
  getShowRegionSelectorFlag: () => Promise.resolve(''),
})

export const useShowRegionSelectorFlag = () =>
  useContext(ShowRegionSelectorFlagContext)

export const ShowRegionSelectorFlagProvider = ({ children }) => {
  const [flagFetched, setFlagFetched] = useState(false)
  const [showRegionSelectorFlag, setShowRegionSelectorFlag] = useState(false)
  const ldClient = useLDClient()

  const getShowRegionSelectorFlag = useCallback(async () => {
    if (flagFetched || !ldClient) {
      return showRegionSelectorFlag
    }

    try {
      await ldClient.waitUntilReady()
      const value = ldClient.variation(
        'show-locale-providers-on-buy-crypto-page'
      )
      ldClient.flush()
      setShowRegionSelectorFlag(value)
      setFlagFetched(true)
      return value
    } catch (error) {
      console.error('Error fetching LaunchDarkly flag:', error)
      return false
    }
  }, [flagFetched, ldClient, showRegionSelectorFlag])

  return (
    <ShowRegionSelectorFlagContext.Provider
      value={{ getShowRegionSelectorFlag }}
    >
      {children}
    </ShowRegionSelectorFlagContext.Provider>
  )
}
