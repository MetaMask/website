import React, { useMemo } from 'react'

export function useDeviceDetect() {
  return useMemo(
    () => ({
      isWindows: typeof window !== 'undefined' && window?.navigator?.platform?.includes('Win'),
      isSafari: typeof window !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    }),
    []
  )
}
