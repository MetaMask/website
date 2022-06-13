import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import NewsList from '../NewsList'

function ContentfulNewsCategory(props) {
  const {
    moduleConfig: { contentful_id, numberOfItem },
  } = props

  const data = useStaticQuery(graphql`
    query CategoryQuery {
      stories: allContentfulNews(
        sort: { order: DESC, fields: publishDate }
        filter: { isPrivate: { eq: false } }
      ) {
        nodes {
          title
          subtitle
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
            fluid(maxWidth: 1024, quality: 100, toFormat: WEBP) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          isPrivate
        }
      }
    }
  `)

  let stories = data.stories?.nodes || []
  // TODO: Filter based on Category

  if (stories && numberOfItem) {
    stories = stories.slice(0, numberOfItem)
  }

  return <NewsList stories={stories} />
}

export default ContentfulNewsCategory

ContentfulNewsCategory.propTypes = {
  moduleConfig: PropTypes.shape({}).isRequired,
}
