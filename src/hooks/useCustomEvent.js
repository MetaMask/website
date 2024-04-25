import { useFlags } from 'gatsby-plugin-launchdarkly'
import { useEffect, useRef, useState } from 'react'

export const useCustomEvent = ({ componentName, componentId, elementRef }) => {
  const BASE_DATA = {
    event: 'component_in_view',
    componentName,
    componentId,
    ld_user_id: window.localStorage.getItem('ld:$anonUserId'),
  }

  const flags = useFlags()
  const hasDataLayerUpdatedRef = useRef(false)
  const [flagValue, setFlagValue] = useState(null)
  const flagName = componentName + componentId

  const hasLDinitialized = flags => Object.keys(flags).length > 0

  const getCaseInsensitive = (obj, key) => {
    for (const objKey in obj) {
      if (objKey.toLowerCase() === key.toLowerCase()) {
        return obj[objKey]
      }
    }

    return undefined
  }

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
        }

        if (typeof flagValue !== 'undefined') {
          data = { ...data, flagName, flagValue }
        }

        dataLayerPush(data)
      }
    }
  }

  useEffect(() => {
    if (!hasLDinitialized(flags)) return

    setFlagValue(getCaseInsensitive(flags, flagName))
  }, [flags])

  useEffect(() => {
    if (!hasLDinitialized(flags)) return

    if (elementRef?.current) {
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
