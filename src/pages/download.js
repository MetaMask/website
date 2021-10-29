import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Seo from '../components/Contentful/ContentfulSeo'
import Layout from '../templates/PageLayout'

const DownloadPage = ({ data: { seo }, location }) => (
  <Layout>
    {seo && <Seo moduleConfig={{ ...seo, pagePath: location.pathname }} />}
    <Container>
      <DownloadTitle>Download Page</DownloadTitle>
    </Container>
  </Layout>
)

export const NullPageQuery = graphql`
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
