import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import Link from 'components/Link'
import Seo from '../components/Contentful/ContentfulSeo'
import Layout from '../templates/PageLayout'

const NotFoundPage = ({ data: { seo }, location }) => (
  <Layout>
    {seo && <Seo moduleConfig={{ ...seo, pagePath: location.pathname }} />}
    <Container>
      <Logo src={'/images/metamask-logo.png'} alt="logo" />
      <NotFoundTitle>Whoops, something went wrong</NotFoundTitle>
      <NotFoundDescription className="mb-3">
        The page you are looking for doesn't exist or has been moved.
      </NotFoundDescription>
      <ReturnHomeButton to="/">GO TO HOMEPAGE</ReturnHomeButton>
    </Container>
  </Layout>
)

export const NullPageQuery = graphql`
  query {
    seo: contentfulSeo(
      contentful_id: { eq: "5NNWEdsyK6bxwhsYBmzzVc" }
      node_locale: { eq: "en-US" }
    ) {
      ...ContentfulSeoFields
    }
  }
`
const ReturnHomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.darkBlue};
  border-radius: 40px;
  height: 46px;
  padding: 12px 20px;
  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme.darkBlue};
  font-weight: 400;
  font-size: 20px;
  text-transform: uppercase;
  box-shadow: none;
  outline: none;
  cursor: pointer;
`

const NotFoundTitle = styled.h1`
  font-size: 24px;
  line-height: 36px;
  margin-top: 20px;
  margin-bottom: 14px;
`

const NotFoundDescription = styled.div`
  margin-top: 1rem;
`

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`
const Logo = styled.img`
  width: 214px;
  max-width: 100%;
`

export default NotFoundPage
