import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import Seo from '../components/Contentful/ContentfulSeo'
import Layout from '../templates/PageLayout'

const NotFoundPage = ({ data: { seo }, location }) => (
  <Layout>
    {seo && <Seo moduleConfig={{ ...seo, pagePath: location.pathname }} />}
    <Container>
      <NotFoundTitle>Whoops, something went wrong</NotFoundTitle>
      <NotFoundDescription>
        The page you are looking for doesn't exist or has been moved.
      </NotFoundDescription>
      <ReturnHomeButton href="/">GO TO HOMEPAGE</ReturnHomeButton>
    </Container>
  </Layout>
)

export const NullPageQuery = graphql`
  query {
    seo: contentfulSeo(contentful_id: { eq: "5NNWEdsyK6bxwhsYBmzzVc" }) {
      ...ContentfulSeoFields
    }
  }
`
const ReturnHomeButton = styled.button`
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
  margin-top: 20px;
  padding: 1rem;
  font-size: 1.5rem;
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
`

export default NotFoundPage
