import { useLDClient } from 'gatsby-plugin-launchdarkly'
import React, { createContext, useCallback, useContext, useState } from 'react'

const LaunchDarklyFlagContext = createContext({
  getLaunchDarklyFlag: flagName => Promise.resolve(''),
})

export const useLaunchDarklyFlag = () => useContext(LaunchDarklyFlagContext)

export const LaunchDarklyFlagProvider = ({ children }) => {
  const [flagsFetched, setFlagsFetched] = useState({})
  const [launchDarklyFlags, setLaunchDarklyFlags] = useState({})
  const ldClient = useLDClient()

  const getLaunchDarklyFlag = useCallback(
    async flagName => {
      if (flagsFetched[flagName] || !ldClient) {
        return launchDarklyFlags[flagName]
      }

      try {
        await ldClient.waitUntilReady()
        const value = ldClient.variation(flagName)
        ldClient.flush()
        setLaunchDarklyFlags({ ...launchDarklyFlags, [flagName]: value })
        setFlagsFetched({ ...flagsFetched, [flagName]: true })
        return value
      } catch (error) {
        console.error('Error fetching LaunchDarkly flag:', error)
        return false
      }
    },
    [flagsFetched, ldClient, launchDarklyFlags]
  )

  return (
    <LaunchDarklyFlagContext.Provider value={{ getLaunchDarklyFlag }}>
      {children}
    </LaunchDarklyFlagContext.Provider>
  )
}
