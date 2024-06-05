import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { ContentfulLayoutHeader as Header } from '../components/Contentful'
import Layout from './PageLayout'
import DownloadBrowser from '../components/DownloadBrowser'
import DownloadContainer from '../components/DownloadContainer'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import { DEFAULT_LOCALE_CODE } from '../lib/config.mjs'
import withProcessPreviewData from '../lib/utils/withProcessPreviewData'

const DownloadPage = props => {
  const {
    data: { seo, header, footer, layoutModuleContainers },
    pageContext: {
      pathBuild,
      locale = DEFAULT_LOCALE_CODE,
      translation,
      localizedPages,
      sharedCopy,
    } = {},
    previewMode,
  } = props
  const modules = layoutModuleContainers.nodes

  if (!modules || !modules.length) return null

  const supportBrowserModule = modules.find(
    f => f.moduleId === 'supported-browser'
  )
  const installMetaMaskModule = modules.find(
    f => f.moduleId === 'install-metamask'
  )

  return (
    <Layout
      locale={locale}
      localizedPages={localizedPages}
      sharedCopy={sharedCopy}
    >
      {seo &&
        contentfulModuleToComponent({
          ...seo,
          pagePath: pathBuild,
          translation,
        })}
      <Header
        moduleConfig={{ ...header, translation, previewMode }}
        hideDownloadBtn
      />
      <Container>
        <DownloadTitle>Install MetaMask</DownloadTitle>
        {installMetaMaskModule ? (
          <DownloadContainer
            data={installMetaMaskModule}
            previewMode={previewMode}
          />
        ) : null}
        {supportBrowserModule ? (
          <DownloadBrowser
            data={supportBrowserModule}
            previewMode={previewMode}
          />
        ) : null}
      </Container>
      {contentfulModuleToComponent({ ...footer, previewMode })}
    </Layout>
  )
}

const parsePreviewData = data => {
  const {
    header,
    footer,
    modulesCollection: { items },
  } = data.data

  const dataUpdate = {
    previewMode: true,
    pageContext: {
      locale: data.locale,
      sharedCopy: data.sharedCopy,
    },
    data: {
      header,
      footer,
      layoutModuleContainers: {
        nodes: items,
      },
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(DownloadPage)

export const DownloadPageQuery = graphql`
  query(
    $modules: [String]!
    $headerId: String
    $footerId: String
    $seoId: String
    $node_locale: String
  ) {
    header: contentfulLayoutHeader(
      contentful_id: { eq: $headerId }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulLayoutHeaderFields
    }
    footer: contentfulLayoutFooter(
      contentful_id: { eq: $footerId }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulLayoutFooterFields
    }
    seo: contentfulSeo(
      contentful_id: { eq: $seoId }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulSeoFields
    }
    layoutModuleContainers: allContentfulLayoutModuleContainer(
      filter: {
        contentful_id: { in: $modules }
        node_locale: { eq: $node_locale }
      }
    ) {
      nodes {
        ...ContentfulLayoutModuleContainerFields
      }
    }
  }
`

const Container = styled.div`
  display: block;
`

const DownloadTitle = styled.h1`
  display: none;
`
