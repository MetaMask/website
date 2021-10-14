import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import moment from 'moment';
import { uniqBy } from 'lodash';
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent';
import { getArticleCategory } from '../lib/utils/blog';

import Layout from './PageLayout';
import ArticleHero from '../components/ArticleHero';
import ArticleList from '../components/Contentful/ContentfulArticleList';
import ContentWrapper from '../components/ContentWrapper';
import CTA from '../components/CTA';

import { lightTheme } from '../lib/theme';

const CategoryPage = (props) => {
  const {
    pageContext: {
      categoryName
    },
    data: {
      header,
      footer,
      defaultImage,
      articles: {
        nodes: list
      }
    },
  } = props;

  const renderArticles = (articles) => {
    if(!articles || !articles.length) return null;
    // dedup articles that might list a category multiple times
    const [categoryHero, ...list] = uniqBy(articles, 'contentful_id');
    const {
      articleTitle: heroTitle,
      articleSubtitle: heroSubtitle,
      articleHeroImage: heroImage,
      articlePublishDate: heroDate,
      primaryCategory: heroPrimeCateogry,
      articleCategories: heroCategories,
    } = categoryHero;

    const articleListConfig = {
      articles: list,
      columns: 3,
      containerWidth: "wide"
    };

    return (
      <>
        <ArticleHero
          title={heroTitle}
          subtitle={heroSubtitle}
          image={(heroImage || defaultImage).fluid}
          category={getArticleCategory(heroPrimeCateogry, heroCategories)}
          date={moment(heroDate).format("LL")}
          textColor="black"
          layout="aside"
        />
        <ArticleList moduleConfig={articleListConfig} />
      </>
    );
  };

  const emptyCategory =  (
    <ContentWrapper size="wide">
      <h3>No articles in this category</h3>
      <CTA
        link="/blog/"
        text="Return to blog"
        align="center"
        color="black"
      />
    </ContentWrapper>
  );

  return (
    <Layout theme={lightTheme} {...props}>
      {contentfulModuleToComponent(header)}
      <ContentWrapper size="wide">
        <CategoryPageTitle>{categoryName}</CategoryPageTitle>
      </ContentWrapper>
      {(list && list.length > 0) ? renderArticles(list) : emptyCategory}
      {contentfulModuleToComponent(footer)}
    </Layout>
  );
};

CategoryPage.propTypes = {
  pageContext: PropTypes.shape({
    categoryName: PropTypes.string.isRequired,
    category_content_id: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    articles: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    }),
  }).isRequired
};

export const categoryPageQuery = graphql`
  query(
    $category_content_id: String!,
  ) {
    articles:
      allContentfulArticlePage(
        filter: {
          primaryCategory: {
            contentful_id: { eq: $category_content_id }
          }
          isPrivate: {eq: false}
        }
      ) {
        nodes {
          ...ContentfulArticlePageFields
        }
      }

    defaultImage:
      contentfulAsset(
        contentful_id: { eq: "1LiFWtDFlQu3CxtlgbAife" }
      ) {
        ...FullContainerImageContentful
      }

    header:
    contentfulHeaderNavMenu (
        contentful_id: { eq: "7DqWYbDbKAyRbLhr8hJ9Vn" }
      ) {
        ...ContentfulHeaderNavMenuFields
      }

    footer:
      contentfulFooterNavMenu (
        contentful_id: { eq: "5ztkePoxYFYVFuQ42mxMyo" }
      ) {
        ...ContentfulFooterNavMenuFields
      }
  }
`;

export default CategoryPage;

const CategoryPageTitle = styled.h1`
  padding-top: 8rem;
  font-size: ${({theme}) => theme.font.size.x5}rem;
`;
