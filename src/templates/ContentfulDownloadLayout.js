import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { ContentfulLayoutHeader as Header } from '../components/Contentful'
import Layout from './PageLayout'
import DownloadBrowser from '../components/DownloadBrowser'
import DownloadContainer from '../components/DownloadContainer'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import { DEFAULT_LOCALE_CODE } from '../lib/config.mjs'

const DownloadPage = props => {
  const {
    data: { seo, header, footer, layoutModuleContainers },
    pageContext: { pathBuild, locale = DEFAULT_LOCALE_CODE, translation },
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
    <Layout locale={locale}>
      {seo &&
        contentfulModuleToComponent({
          ...seo,
          pagePath: pathBuild,
          translation,
        })}
      <Header moduleConfig={{ ...header, translation }} hideDownloadBtn />
      <Container>
        <DownloadTitle>Install MetaMask</DownloadTitle>
        {installMetaMaskModule ? (
          <DownloadContainer data={installMetaMaskModule} />
        ) : null}
        {supportBrowserModule ? (
          <DownloadBrowser data={supportBrowserModule} />
        ) : null}
      </Container>
      {contentfulModuleToComponent(footer)}
    </Layout>
  )
}

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

export default DownloadPage
