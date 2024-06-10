import qs from 'query-string'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PreviewLoading from '../components/PreviewLoading'
import ContextClientSide from '../Context/ContextClientSide'
import {
  convertContentfulPreviewTypename,
  fetchContentfulData,
  fetchContentfulTypename,
} from '../lib/utils/fetchContentfulData'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import Layout from '../templates/PageLayout'
import ContentfulPortfolioLayout from '../templates/ContentfulPortfolioLayout'
import ContentfulDownloadLayout from '../templates/ContentfulDownloadLayout'
import { DEFAULT_LOCALE } from '../lib/config.mjs'

const PreviewPage = () => {
  const [loading, setLoading] = useState(true)
  const [moduleConfig, setModuleConfig] = useState(null)
  const [sharedCopy, setSharedCopy] = useState({})
  const [error, setError] = useState(null)
  const [locale, setLocale] = useState(DEFAULT_LOCALE)
  const [isDarkMode, setDarkMode] = useState(false)

  const getModule = async () => {
    const { location } = window
    const queryParams = qs.parse(location.search ?? '')
    const id = queryParams.module_id

    if (queryParams.environment && queryParams.environment === 'master') {
      delete queryParams.environment
      return (window.location.href = `https://metamask.io${
        location.pathname
      }?${qs.stringify(queryParams)}`)
    }

    try {
      if (!id) {
        setLoading(false)
        setError({
          message: 'No module id provided to preview',
        })
        return
      }

      const type = await fetchContentfulTypename(id)
      if (!type) {
        setLoading(false)
        setError({
          message: 'Failed to fetch contentful type name',
        })
        return
      }

      const sharedCopyResult = await fetchContentfulData(
        'ContentfulSharedCopy',
        '2vmqTH7Y8rwZVerEOinAC5',
        locale.code
      )

      const sharedCopyData = sharedCopyResult?.data?.previewContent || {}
      const sharedCopyDict = {}
      for (const item of sharedCopyData.copyItem || []) {
        sharedCopyDict[item.key] = item.value
      }
      setSharedCopy(sharedCopyDict)

      if (type === 'ContentfulNewsLayout') {
        const newsQuery = [
          fetchContentfulData(
            'ContentfulLayoutHeader',
            '6I0knvqLf0DS5PB72DqUlM',
            locale.code
          ),
          fetchContentfulData(
            'ContentfulCta',
            '6iOGB8Fiab9ilS0jfZ8N5I',
            locale.code
          ),
          fetchContentfulData(type, id, locale.code),
          fetchContentfulData(
            'ContentfulHubSpotForm',
            '5VZVKtbcRMzaaP77nsz3Fs',
            locale.code
          ),
          fetchContentfulData(
            'ContentfulLayoutModuleContainer',
            'nO1tqQRjoUDUJfdg2B651',
            locale.code
          ),
          fetchContentfulData(
            'ContentfulLayoutFooter',
            '75bFgEllkMxpVsY8wWlroX',
            locale.code
          ),
        ]
        const [
          headerResult,
          ctaResult,
          newsLayoutResult,
          hubspotResult,
          latestResult,
          footerResult,
        ] = await Promise.allSettled(newsQuery)
        const header = headerResult?.value?.data
        const cta = ctaResult?.value?.data
        const newsLayout = newsLayoutResult?.value?.data
        const hubspot = hubspotResult?.value?.data
        const latest = latestResult?.value?.data
        const footer = footerResult?.value?.data
        const dataUpdate = {
          internal: {
            type: 'ContentfulNewsLayout',
          },
          header: header.previewContent,
          cta: cta.previewContent,
          footer: footer.previewContent,
          newsLayout: newsLayout.previewContent,
          hubspot: hubspot.previewContent,
          sharedCopy: sharedCopyDict,
          latest: latest.previewContent,
        }
        setLoading(false)
        setModuleConfig(dataUpdate)
        return
      }

      const { data } = await fetchContentfulData(type, id, locale.code)
      if (data) {
        const contentType = data.previewContent?.__typename
        const contentId = data.previewContent?.sys.id || undefined
        const dataUpdate = {
          ...data.previewContent,
          internal: {
            type: convertContentfulPreviewTypename(contentType),
          },
          contentful_id: contentId,
        }
        setLoading(false)
        setModuleConfig(dataUpdate)
        return
      }
    } catch (error) {
      console.log('Fetch preview data error: ', error)
    }
    setLoading(false)
    setError({
      message: 'Failed to fetch preview data',
    })
  }

  useEffect(() => {
    setLoading(true)
    getModule()
  }, [locale])

  useEffect(() => {
    document.body.classList.remove('light-mode')
    document.body.classList.remove('dark-mode')
    document.body.classList.add((isDarkMode ? 'dark' : 'light') + '-mode')
  }, [isDarkMode])

  const valueContext = {
    darkMode: {
      isDarkMode,
      toggleTheme: () => setDarkMode(!isDarkMode),
    },
    localization: {
      locale,
      setLocale,
    },
  }

  if (loading) return <PreviewLoading />
  if (!moduleConfig) {
    return <h4>Failed to load preview component: {error?.message}</h4>
  }
  const renderPreview = () => {
    const { pageType } = moduleConfig
    switch (pageType) {
      case 'Portfolio':
        return <ContentfulPortfolioLayout data={moduleConfig} />
      case 'Download':
        return (
          <ContentfulDownloadLayout
            data={moduleConfig}
            locale={locale.code}
            sharedCopy={sharedCopy}
          />
        )
      default:
        return (
          <Layout
            themeColor={moduleConfig?.themeColor}
            h2FontSize={moduleConfig?.h2FontSize}
            widerContainer={moduleConfig?.widerContainer}
            locale={locale.code}
            sharedCopy={sharedCopy}
            previewMode
          >
            <PreviewInfo>Preview mode</PreviewInfo>
            {contentfulModuleToComponent(moduleConfig)}
          </Layout>
        )
    }
  }
  return (
    <ContextClientSide.Provider value={valueContext}>
      {renderPreview()}
    </ContextClientSide.Provider>
  )
}

const PreviewInfo = styled.div`
  width: 140px;
  height: 35px;
  background-color: lightyellow;
  color: red;
  text-align: center;
  line-height: 31px;
  font-weight: bold;
  border: 2px solid lightgoldenrodyellow;
  border-radius: 10px 10px 0 0;
  position: fixed;
  top: 200px;
  left: -53px;
  z-index: 2000;
  transform: rotate(90deg);
`

export default PreviewPage
