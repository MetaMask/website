import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import NewsList from '../NewsList'

function ContentfulNewsCategory(props) {
  const {
    moduleConfig: { contentful_id, numberOfItem },
  } = props

  console.log(contentful_id)
  const data = useStaticQuery(graphql`
    query CategoryQuery {
      stories: allContentfulNews(
        sort: { order: DESC, fields: publishDate }
        filter: {
          categories: { elemMatch: { contentful_id: { in: "3tE0tpmPMGsXezpOhKyWGO" } } }
          isPrivate: { eq: false }
        }
      ) {
        nodes {
          title
          subtitle
          categories {
            name
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

  let stories = data.stories.nodes || []
  if (stories && numberOfItem) {
    stories = stories.slice(0, numberOfItem)
  }

  return <NewsList stories={stories} />
}

export default ContentfulNewsCategory

ContentfulNewsCategory.propTypes = {
  moduleConfig: PropTypes.shape({}).isRequired,
}
