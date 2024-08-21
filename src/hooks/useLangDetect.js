import { useState, useEffect } from 'react'
import { LOCALES } from '../lib/config.mjs'
import { getLocalStorage } from '../lib/utils/localStorage'

const useLangDetect = () => {
  const [language, setLanguage] = useState()

  useEffect(() => {
    const storedLang = getLocalStorage('preferredLanguage')
    const detectedStoredLang = LOCALES.find(l => l.code === storedLang)
    if (detectedStoredLang) {
      setLanguage(detectedStoredLang)
      return
    }

    const browserLanguage = navigator.language || navigator.userLanguage
    const browserLangFirstCode =
      browserLanguage && browserLanguage.split('-')?.[0]
    const detectedBrowserLang = LOCALES.find(
      l => l.htmlLang.startsWith(browserLangFirstCode)
    )
    if (detectedBrowserLang) {
      setLanguage(detectedBrowserLang)
    }
  }, [])

  return language
}

export default useLangDetect
