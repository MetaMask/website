import { useLDClient } from 'gatsby-plugin-launchdarkly'
import { useEffect, useRef, useState } from 'react'
import { useExperimentFlags } from '../Context/ExperimentFlagsContext'

export const useFeatureFlag = ({
  componentName,
  componentId,
  flagName,
  elementRef,
}) => {
  const BASE_DATA = {
    event: 'component_in_view',
    componentName,
    componentId,
  }

  const { experimentFlags } = useExperimentFlags()
  const ldClient = useLDClient()
  const hasDataLayerUpdatedRef = useRef(false)
  const [flagValue, setFlagValue] = useState(null)

  const dataLayerPush = data => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push(data)
    }
  }

  const onIntersect = ([entry]) => {
    if (!hasDataLayerUpdatedRef.current) {
      if (entry.isIntersecting) {
        hasDataLayerUpdatedRef.current = true

        if (typeof flagValue !== 'undefined') {
          dataLayerPush({
            ...BASE_DATA,
            flagName,
            flagValue,
            pagePath: window.location.pathname,
            inViewport: entry.isIntersecting,
          })
        }
      }
    }
  }

  useEffect(() => {
    if (experimentFlags?.[flagName]) {
      setFlagValue(experimentFlags[flagName])
    }
  }, [experimentFlags, flagName])

  useEffect(() => {
    if (!ldClient) return

    if (elementRef?.current && flagValue !== null) {
      const observer = new IntersectionObserver(onIntersect)

      observer.observe(elementRef.current)

      elementRef.current.dataset.componentname = componentName
      elementRef.current.dataset.componentid = componentId

      if (flagName !== null) {
        elementRef.current.dataset.flagname = flagName
      }

      if (typeof flagValue !== 'undefined') {
        elementRef.current.dataset.flagvalue = flagValue
      }

      return () => {
        if (elementRef?.current) {
          observer.unobserve(elementRef.current)
        }
      }
    }
  }, [ldClient, flagValue])

  return experimentFlags?.[flagName]
}
