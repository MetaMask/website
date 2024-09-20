import { useContext, useEffect } from 'react'
import { getLocalizedPath, LOCALES } from '../lib/config.mjs'
import { useLocation } from '@reach/router'
import { navigate } from 'gatsby'
import useLangDetect from '../hooks/useLangDetect'
import ContextClientSide from '../Context/ContextClientSide'

const useLocalization = translation => {
  const detectedLang = useLangDetect()

  const { localization } = useContext(ContextClientSide)
  const { locale, setLocale } = localization || {}

  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    const storedLanguage = LOCALES.find(f => f.code === detectedLang?.code)

    if (storedLanguage && storedLanguage.code !== locale.code) {
      setLocale(storedLanguage)

      if (translation) {
        const localizedPath = getLocalizedPath(pathname, storedLanguage.code)

        navigate(localizedPath, { replace: true })
      }
    }
  }, [detectedLang, translation, locale, pathname])
}

export default useLocalization
