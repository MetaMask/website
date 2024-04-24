import { useFlags } from 'gatsby-plugin-launchdarkly'
import { useEffect, useRef, useState } from 'react'

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

  const flags = useFlags()
  const hasDataLayerUpdatedRef = useRef(false)
  const [flagValue, setFlagValue] = useState(null)

  const hasLDinitialized = flags => Object.keys(flags).length > 0

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
    if (!hasLDinitialized(flags)) return

    setFlagValue(flags[flagName])
  }, [flags])

  useEffect(() => {
    if (!hasLDinitialized(flags)) return

    if (elementRef?.current && flagValue !== null) {
      const observer = new IntersectionObserver(onIntersect)

      observer.observe(elementRef.current)

      return () => {
        if (elementRef?.current) {
          observer.unobserve(elementRef.current)
        }
      }
    }
  }, [flagValue])

  return { flagName, flagValue }
}
