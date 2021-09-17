import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ArticleList from '../ArticleList'
import { useStaticQuery, graphql } from "gatsby"

const ContentfulArticleList = props => {
  const {
    moduleConfig: { title, articles: articlesManual, containerWidth, allArticles },
    children
  } = props
  let formattedArticles = []
  const isLoadingLoadmore = React.useRef(false)
  const [isLoadMore, setIsLoadMore] = React.useState(false);
  const [countShowItem, setCountShowItem] = React.useState(6);
  let articles = articlesManual || [];

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      articles: allContentfulArticlePage(
        sort: { order: DESC, fields: articlePublishDate }
        filter: {isPrivate: {eq: false}}
      ) {
        nodes {
          articleTitle
          articlePublishDate
          articleSubtitle
          primaryCategory {
            categoryName
          }
          articleCategories {
            categoryName
          }
          articleThumbnail {
            fluid(maxWidth: 600, quality: 100, toFormat: WEBP) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          isPrivate
        }
      }
    }
  `)
  if(allArticles){
    articles = data.articles.nodes || [];
  }
  articles.map(a => {
    const {
      articleTitle: title,
      articleSubtitle: subtitle,
      articleThumbnail: image,
      articlePublishDate: publishDate,
      primaryCategory,
      articleCategories,
      isPrivate,
    } = a

    if (!isPrivate) {
      formattedArticles.push({
        title,
        subtitle,
        image,
        primaryCategory,
        articleCategories,
        publishDate,
      })
    }
  })
  const handleLoadmore = () => {
    if (!isLoadingLoadmore.current) {
      isLoadingLoadmore.current = true
      setCountShowItem(countShowItem + 6)
    }
  }
  React.useEffect(() => {
    if (countShowItem) {
      isLoadingLoadmore.current = false
      setIsLoadMore(countShowItem < formattedArticles.length)
    }
  }, [countShowItem, formattedArticles])
  return (
    <>
      <ArticleList
        title={title}
        articles={formattedArticles.slice(0, countShowItem)}
        containerWidth={containerWidth}

      >
      {children}
      </ArticleList>
      {isLoadMore ? (
        <ButtonWrapper>
          <ButtonLoadmore onClick={handleLoadmore}>
            VIEW MORE ARTICLES
          </ButtonLoadmore>
        </ButtonWrapper>
      ) : null}
    </>
  )
}

export default ContentfulArticleList

ContentfulArticleList.propTypes = {
  moduleConfig: PropTypes.shape({
    title: PropTypes.string,
    articles: PropTypes.arrayOf(
      PropTypes.shape({
        articleTitle: PropTypes.string.isRequired,
        articleHeroImage: PropTypes.object,
      })
    ),
  }),
}
ContentfulArticleList.defaultProps = {
  articles: [],
};
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const ButtonLoadmore = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.lightBlue};
  border-radius: 3px;
  height: 40px;
  padding: 8px 16px;
  color: #fff;
  background: ${({ theme }) => theme.lightBlue};
  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  box-shadow: none;
  outline: none;
  cursor: pointer;
`
