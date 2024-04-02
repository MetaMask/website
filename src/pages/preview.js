import qs from 'query-string'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useContentfulLiveUpdates } from '@contentful/live-preview/react'
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
import { DEFAULT_LOCALE } from '../lib/config.mjs'

const PreviewPage = () => {
  const [loading, setLoading] = useState(true)
  const [moduleConfig, setModuleConfig] = useState(null)
  const [error, setError] = useState(null)
  const [locale, setLocale] = useState(DEFAULT_LOCALE)

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

  const updatedEntries = useContentfulLiveUpdates(moduleConfig)
  const resolvedModuleConfig = updatedEntries || moduleConfig

  if (loading) return <PreviewLoading />
  if (resolvedModuleConfig?.slug === '/portfolio/') {
    return <ContentfulPortfolioLayout data={resolvedModuleConfig} />
  }
  if (resolvedModuleConfig) {
    return (
      <ContextClientSide.Provider
        value={{
          localization: {
            locale,
            setLocale,
          },
        }}
      >
        <Layout
          themeColor={resolvedModuleConfig?.themeColor}
          h2FontSize={resolvedModuleConfig?.h2FontSize}
          widerContainer={resolvedModuleConfig?.widerContainer}
          locale={locale.code}
        >
          <PreviewInfo>Preview mode</PreviewInfo>
          {contentfulModuleToComponent(resolvedModuleConfig)}
        </Layout>
      </ContextClientSide.Provider>
    )
  }
  return <h4>Failed to load preview component: {error?.message}</h4>
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
