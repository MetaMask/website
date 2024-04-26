import { useFlags, useLDClient } from 'gatsby-plugin-launchdarkly'
import { useEffect, useRef, useState } from 'react'

export const useCustomEvent = ({ componentName, componentId, elementRef }) => {
  const BASE_DATA = {
    event: 'component_in_view',
    componentName,
    componentId,
  }

  const flags = useFlags()
  const ldClient = useLDClient()
  const hasDataLayerUpdatedRef = useRef(false)
  const [flagValue, setFlagValue] = useState(null)
  const flagName = componentName + componentId

  const dataLayerPush = data => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push(data)
      //   console.log(data)
    }
  }

  const onIntersect = ([entry]) => {
    if (!hasDataLayerUpdatedRef.current) {
      if (entry.isIntersecting) {
        hasDataLayerUpdatedRef.current = true

        let data = {
          ...BASE_DATA,
          pagePath: window.location.pathname,
          inViewport: entry.isIntersecting,
          ld_user_id: ldClient.getContext().key,
        }

        if (typeof flagValue !== 'undefined') {
          data = { ...data, flagName, flagValue }
        }

        dataLayerPush(data)
      }
    }
  }

  useEffect(() => {
    if (!ldClient) return

    setFlagValue(flags[flagName])
  }, [ldClient])

  useEffect(() => {
    if (!ldClient) return

    if (elementRef?.current) {
      const observer = new IntersectionObserver(onIntersect)

      observer.observe(elementRef.current)

      return () => {
        if (elementRef?.current) {
          observer.unobserve(elementRef.current)
        }
      }
    }
  }, [ldClient, flagValue])

  return flags[flagName]
}
