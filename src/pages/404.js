import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

import Header from '../components/Contentful/ContentfulHeader';
import Arrow from '../components/ArrowIcon';
import Layout from '../templates/PageLayout';

const NotFoundPage = ({ data: { header }}) => (
  <Layout>
    <Header moduleConfig={header} />
    <Container>
      <NotFoundTitle>  404 PAGE NOT FOUND  </NotFoundTitle>
      <ReturnHomeButton href="/">
        RETURN HOME  <Arrow fill="white" width="50px" height="auto"/>
      </ReturnHomeButton>
    </Container>
  </Layout>
);

export const NullPageQuery = graphql`
query {
  header:
    contentfulHeaderNavMenu (
      contentful_id: { eq: "7DqWYbDbKAyRbLhr8hJ9Vn" }
    ) {
      ...ContentfulHeaderNavMenuFields
    }
}
`;
const ReturnHomeButton = styled.a`
  align-self: flex-start;
  margin-left: 3%;
  padding: 0.5rem;
  color:  ${({theme}) => theme.white};
  text-decoration: none;
  
  @media(min-width: ${({theme}) => theme.device.mobile}) {
    align-self: center;
  }
`;

const NotFoundTitle = styled.h1`
  padding: 1rem;
  color:  ${({theme}) => theme.white};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh; 
  background-color: ${({theme}) => theme.primaryColor};
`;

export default NotFoundPage
