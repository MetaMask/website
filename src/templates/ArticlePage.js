import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'

import PrivateLayout from './PrivatePageLayout'
import PublicLayout from './PublicPageLayout'
import ArticleHero from '../components/ArticleHero'
import styled from 'styled-components'
import ArrowLeftIcon from '../images/icons/icon-arrow-left.svg'
import ArrowRightIcon from '../images/icons/icon-arrow-right.svg'
import { Link } from 'gatsby'
import { lightTheme, darkTheme } from '../lib/theme'
import Wrapper from '../components/ContentWrapper';

const ArticlePage = props => {
  const {
    data: {
      article: {
        // page config
        isPrivate,
        articleHeader,
        articleFooter,
        articleThemeColor,
        // article data
        articleContent,
        articleTitle: title,
        articleSubtitle: subtitle,
        articleHeroImage: image,
        articleAuthors,
      },
      defaultImage,
      seo,
    },
    pageContext: { category, pathBuild, next, prev },
  } = props
  const contentConfig = {
    internal: { type: 'ContentfulSectionText' },
    sectionBody: articleContent,
  }

  const authorContainerConfig = {
    internal: { type: 'ContentfulModuleContainer' },
    columns: 1,
    containerWidth: 'wide',
    modules: [
      {
        internal: { type: 'ContentfulSectionText' },
        sectionTitle: 'About The Authors',
      },
      ...articleAuthors,
    ],
  }

  const seoModuleConfig = {
    ...seo,
    seoPagePath: pathBuild,
    pageType: 'article',
  }
  const heroImage = image ? image.fluid : defaultImage.fluid
  const Layout = isPrivate ? PrivateLayout : PublicLayout
  const theme = articleThemeColor === 'light' ? lightTheme : darkTheme
  const heroTextColor = articleThemeColor === 'light' ? 'black' : 'white'
  return (
    <Layout {...props} theme={theme}>
      {seo && contentfulModuleToComponent(seoModuleConfig)}
      {contentfulModuleToComponent(articleHeader)}
      <ArticleHero
        title={title}
        textColor={heroTextColor}
        subtitle={subtitle}
        category={category}
        image={heroImage}
        layout="overlay"
      />
      {contentfulModuleToComponent(contentConfig)}
      {contentfulModuleToComponent(authorContainerConfig)}
      <Wrapper size="wide">

        <PaginationBlock>
          {prev ? (
            <PaginationButton prev to={prev}>
              <ArrowLeftIcon />
              <PaginationButtonText>Previous Post</PaginationButtonText>
            </PaginationButton>
          ) : null}
          {next ? (
            <PaginationButton next to={next}>
              <PaginationButtonText>Next Post</PaginationButtonText>
              <ArrowRightIcon />
            </PaginationButton>
          ) : null}
        </PaginationBlock>
      </Wrapper>
      {contentfulModuleToComponent(articleFooter)}
    </Layout>
  )
}

const categoryProps = PropTypes.shape({
  categoryName: PropTypes.string.isRequired,
  parentCategory: PropTypes.shape({
    categoryName: PropTypes.string.isRequired,
  }),
})

const PaginationBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const PaginationButton = styled(props => <Link {...props} />)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  color: ${({ theme }) => theme.lightBlue};
  margin-left: ${props => (props.next ? 'auto' : '0')};
  margin-right: ${props => (props.prev ? 'auto' : '0')};
  text-decoration: none;
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.2px;
  svg {
    margin-top: -4px;
  }
`
const PaginationButtonText = styled.div`
  margin: 0 16px;
`

ArticlePage.propTypes = {
  data: PropTypes.shape({
    article: PropTypes.shape({
      articleTitle: PropTypes.string.isRequired,
      articleSubtitle: PropTypes.string.isRequired,
      articleCategories: PropTypes.arrayOf(categoryProps),
      primaryCategory: categoryProps,
      articleAuthors: PropTypes.arrayOf(
        PropTypes.shape({
          profileTitle: PropTypes.string.isRequired,
        })
      ),
    }),
  }),
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
    article_content_id: PropTypes.string.isRequired,
  }),
}

// get related articles based on category passed in
export const ArticlePageQuery = graphql`
  query($article_content_id: String!, $seoId: String) {
    article: contentfulArticlePage(contentful_id: { eq: $article_content_id }) {
      ...ContentfulArticlePageFields
    }

    seo: contentfulSeo(contentful_id: { eq: $seoId }) {
      ...ContentfulSeoFields
    }

    defaultImage: contentfulAsset(
      contentful_id: { eq: "1LiFWtDFlQu3CxtlgbAife" }
    ) {
      ...FullContainerImageContentful
    }
  }
`

export default ArticlePage
