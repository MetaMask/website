import { useLDClient } from 'gatsby-plugin-launchdarkly'
import generateUUID from '../lib/utils/helpers'
import { useEffect } from 'react'

export const useAllClicks = () => {
  const ldClient = useLDClient()

  const formatFlagsForGTM = (flags, data) => {
    Object.entries(flags).forEach(([key, value], i) => {
      data[`flags_${i + 1}`] = JSON.stringify({
        [key]:
          typeof value === 'boolean' ? (value ? 'enabled' : 'disabled') : value,
      })
    })
  }

  useEffect(() => {
    if (!ldClient) {
      return
    }

    let timerOne, timerTwo
    const flags = ldClient.allFlags()

    const handleClickDl = event => {
      window.dataLayer = window.dataLayer || []

      let uuid = undefined
      const deeplink = event.target.closest('.deeplink')

      if (deeplink) {
        uuid = generateUUID()

        const searchParams = new URLSearchParams(window.location.search)

        const utm = JSON.stringify({
          source: searchParams.get('utm_source'),
          medium: searchParams.get('utm_medium'),
          campaign: searchParams.get('utm_campaign'),
          term: searchParams.get('utm_term'),
          content: searchParams.get('utm_content'),
        })

        const href = new URL(deeplink.href)
        href.searchParams.set('attributionId', uuid)
        href.searchParams.set('utm', utm)

        window.open(href.toString())
      }

      const closest = event.target.closest(
        '[data-componentname][data-flagname]'
      )
      const closestLink = event.target.closest('a, button')

      const el = closest || closestLink

      const data = {
        event: 'before_all_clicks',
        componentName: el?.dataset.componentname,
        componentId: el?.dataset.componentid,
        flagName: el?.dataset.flagname,
        flagValue: el?.dataset.flagvalue,
        page_path_before: window.location.pathname,
        click_url_before: closestLink?.href,
        click_text_before:
          closestLink?.nodeName === 'BUTTON' &&
          closestLink?.getAttribute('aria-label')
            ? closestLink?.getAttribute('aria-label')
            : closestLink?.innerText
            ? closestLink?.innerText
            : event.target?.nodeName === 'IMG'
            ? event.target.alt
            : event.target.innerText,
        unique_attribution_id: uuid,
      }

      formatFlagsForGTM(flags, data)

      window.dataLayer.push(data)

      ldClient?.track('on-all-clicks', data)
      ldClient?.flush()
    }

    if (flags) {
      window.dataLayer = window.dataLayer || []

      timerOne = setTimeout(() => {
        const elems = document.querySelectorAll(
          '[data-flagname][data-flagvalue]'
        )

        const data = {
          event: 'custom_page_view',
          custom_page_view_page_path: window.location.pathname,
          custom_page_title: document.title,
        }

        Array.from(elems).forEach((el, i) => {
          data[`flags_active_on_current_page_componentName_${i + 1}`] =
            el.dataset.componentname

          data[`flags_active_on_current_page_componentId_${i + 1}`] =
            el.dataset.componentid

          data[`flags_active_on_current_page_flagName_${i + 1}`] =
            el.dataset.flagname

          data[
            `flags_active_on_current_page_flagValue_${i + 1}`
          ] = /^(true|false)$/.test(el.dataset.flagvalue)
            ? el.dataset.flagvalue === 'true'
              ? 'enabled'
              : 'disabled'
            : el.dataset.flagvalue
        })

        formatFlagsForGTM(flags, data)

        window.dataLayer.push(data)
      }, 50)
    }

    document.addEventListener('click', handleClickDl, true)

    return () => {
      document.removeEventListener('click', handleClickDl, true)
      timerOne && clearTimeout(timerOne)
      timerTwo && clearTimeout(timerTwo)
    }
  }, [ldClient])
}
