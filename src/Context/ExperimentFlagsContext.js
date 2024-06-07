import { useLDClient } from 'gatsby-plugin-launchdarkly'
import React, { createContext, useContext, useEffect, useState } from 'react'

const ExperimentFlagsContext = createContext({
  experimentFlags: {},
})

export const useExperimentFlags = () => useContext(ExperimentFlagsContext)

export const ExperimentFlagsProvider = ({ children }) => {
  const [experimentFlags, setExperimentFlags] = useState('')
  const ldClient = useLDClient()

  useEffect(() => {
    if (!ldClient) {
      return
    }

    const init = async () => {
      await ldClient.waitUntilReady()
      const flagsValue = ldClient.allFlags()
      setExperimentFlags(flagsValue)
      ldClient.flush()
    }

    init()
  }, [ldClient])

  return (
    <ExperimentFlagsContext.Provider value={{ experimentFlags }}>
      {children}
    </ExperimentFlagsContext.Provider>
  )
}
