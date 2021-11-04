import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import {
  ContentfulSeo as Seo,
  ContentfulLayoutHeader as Header,
  ContentfulLayoutFooter as Footer,
} from '../components/Contentful'
import Layout from '../templates/PageLayout'

const DownloadPage = ({ data: { seo, header, footer }, location }) => (
  <Layout>
    {seo && <Seo moduleConfig={{ ...seo, pagePath: location.pathname }} />}
    <Header moduleConfig={header} />
    <Container>
      <DownloadTitle>Download Page</DownloadTitle>
    </Container>
    <Footer moduleConfig={footer} />
  </Layout>
)

export const DownloadPageQuery = graphql`
  query {
    header: contentfulLayoutHeader(
      contentful_id: { eq: "6I0knvqLf0DS5PB72DqUlM" }
    ) {
      ...ContentfulLayoutHeaderFields
      menuItems {
        ... on ContentfulModuleContainer {
          columns
          title
          displayTitle
          modules {
            ... on ContentfulCta {
              ...ContentfulCtaFields
            }
          }
        }
      }
    }
    
    download_extension: contentfulAsset(
      contentful_id: { eq: "6ngCUoU36ABPjs6cDNnuoK" }
    ) {
      title
      description
      file {
        url
      } 
    }
    download_ios: contentfulAsset(
      contentful_id: { eq: "75bFgEllkMxpVsY8wWlroX" }
    ) {
      title
      description
      file {
        url
      } 
    }
    download_android: contentfulAsset(
      contentful_id: { eq: "7CU9NE4jlL0XjKEerlEL16" }
    ) {
      title
      description
      file {
        url
      } 
    }
    browser_chrome: contentfulAsset(
      contentful_id: { eq: "5CEOSBaSKv43i0mNninl5G" }
    ) {
      title
      description
      file {
        url
      } 
    }
    browser_firefox: contentfulAsset(
      contentful_id: { eq: "4WVycyyYvlfuRrArPRjj1d" }
    ) {
      title
      description
      file {
        url
      } 
    }
    browser_brave: contentfulAsset(
      contentful_id: { eq: "6HcekwtMp9fRFIphaPlqX5" }
    ) {
      title
      description
      file {
        url
      } 
    }
    browser_edge: contentfulAsset(
      contentful_id: { eq: "2O0Uh2Nt1OciYoK96DscLF" }
    ) {
      title
      description
      file {
        url
      } 
    }
    
    footer: contentfulLayoutFooter(
      contentful_id: { eq: "75bFgEllkMxpVsY8wWlroX" }
    ) {
      ...ContentfulLayoutFooterFields
      menuItems {
        ... on ContentfulModuleContainer {
          columns
          title
          displayTitle
          modules {
            ... on ContentfulCta {
              ...ContentfulCtaFields
            }
          }
        }
      }
    }

    seo: contentfulSeo(contentful_id: { eq: "2d9sWm0RbmC5zSEsF8JkiS" }) {
      ...ContentfulSeoFields
    }
  }
`

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const DownloadTitle = styled.h1`
  margin-top: 20px;
  padding: 1rem;
  font-size: 1.5rem;
`

export default DownloadPage
