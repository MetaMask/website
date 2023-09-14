import qs from 'query-string'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useContentfulLiveUpdates } from '@contentful/live-preview/react'
import PreviewLoading from '../components/PreviewLoading'
import {
  convertContentfulPreviewTypename,
  fetchContentfulData,
  fetchContentfulTypename,
} from '../lib/utils/fetchContentfulData'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import Layout from '../templates/PageLayout'
import ContentfulPortfolioLayout from '../templates/ContentfulPortfolioLayout'

const PreviewPage = () => {
  const [loading, setLoading] = useState(true)
  const [moduleConfig, setModuleConfig] = useState(null)
  const [error, setError] = useState(null)

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

      const { data } = await fetchContentfulData(type, id)
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
    getModule()
  }, [])

  const updatedEntries = useContentfulLiveUpdates(moduleConfig)
  const resolvedModuleConfig = updatedEntries || moduleConfig

  if (loading) return <PreviewLoading />
  if (resolvedModuleConfig?.slug === '/portfolio/') {
    return <ContentfulPortfolioLayout data={resolvedModuleConfig} />
  }
  if (resolvedModuleConfig) {
    return (
      <Layout
        themeColor={resolvedModuleConfig?.themeColor}
        h2FontSize={resolvedModuleConfig?.h2FontSize}
      >
        <PreviewInfo>Preview mode</PreviewInfo>
        {contentfulModuleToComponent(resolvedModuleConfig)}
      </Layout>
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
