import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { ContentfulLayoutHeader as Header } from '../components/Contentful'
import Layout from './PageLayout'
import DownloadBrowser from '../components/DownloadBrowser'
import DownloadContainer from '../components/DownloadContainer'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'

const DownloadPage = props => {
  const {
    data: { seo, header, footer, layoutModuleContainers },
    pageContext: { pathBuild },
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
    <Layout>
      {seo &&
        contentfulModuleToComponent({
          ...seo,
          pagePath: pathBuild,
        })}
      <Header moduleConfig={{ ...header }} hideDownloadBtn />
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
  ) {
    header: contentfulLayoutHeader(contentful_id: { eq: $headerId }) {
      ...ContentfulLayoutHeaderFields
    }
    footer: contentfulLayoutFooter(contentful_id: { eq: $footerId }) {
      ...ContentfulLayoutFooterFields
    }
    seo: contentfulSeo(contentful_id: { eq: $seoId }) {
      ...ContentfulSeoFields
    }
    layoutModuleContainers: allContentfulLayoutModuleContainer(
      filter: { contentful_id: { in: $modules } }
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
