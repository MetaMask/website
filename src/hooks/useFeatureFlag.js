import { useFlags } from 'launchdarkly-react-client-sdk'
import { useEffect, useRef, useState } from 'react'

export const useFeatureFlag = (flagName, elementRef) => {
  const flags = useFlags()
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

        dataLayerPush({
          event: 'ab-test',
          flagName,
          flagValue,
          pagePath: window.location.pathname,
          inViewport: entry.isIntersecting,
        })
      }
    }
  }

  useEffect(() => {
    if (flags && flagName in flags) {
      setFlagValue(flags[flagName])
    }
  }, [flags])

  useEffect(() => {
    if (elementRef?.current && flagValue !== null) {
      const observer = new IntersectionObserver(onIntersect)

      observer.observe(elementRef.current)

      return () => {
        if (elementRef?.current) {
          observer.unobserve(elementRef.current)
        }
      }
    } else if (!elementRef?.current && flagValue !== null) {
      dataLayerPush({
        event: 'ab-test',
        flagName,
        flagValue,
        pagePath: window.location.pathname,
      })
    }
  }, [flagValue])

  return flagValue
}
