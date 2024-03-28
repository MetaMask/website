import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import NewsList from '../NewsList'
import PaginationWrapper from '../Pagination'

function ContentfulNewsCategory(props) {
  const {
    moduleConfig: { contentful_id, numberOfItem },
  } = props

  const data = useStaticQuery(graphql`
    query CategoryQuery {
      stories: allContentfulNews(
        sort: { publishDate: DESC }
        filter: { isPrivate: { eq: false }, node_locale: { eq: "en-US" } }
      ) {
        nodes {
          title
          slug
          subtitle
          publishDate(formatString: "MMMM D, YYYY")
          authors {
            name
            createProfilePage
            profileUrl
          }
          categories {
            name
            contentful_id
          }
          image {
            title
            description
            file {
              url
            }
            gatsbyImageData(
              layout: CONSTRAINED
              width: 1024
              quality: 80
              formats: [AUTO, WEBP]
            )
          }
          isPrivate
        }
      }
    }
  `)

  let stories = data.stories?.nodes || []
  stories = stories.filter(({ categories }) =>
    categories?.some(
      ({ contentful_id: categoryId }) => categoryId === contentful_id
    )
  )

  if (stories && numberOfItem) {
    stories = stories.slice(0, numberOfItem)
  }

  return (
    <PaginationWrapper
      data={stories}
      itemPerPage={4}
      listingComponent={NewsList}
    />
  )
}

export default ContentfulNewsCategory

ContentfulNewsCategory.propTypes = {
  moduleConfig: PropTypes.shape({}).isRequired,
}
