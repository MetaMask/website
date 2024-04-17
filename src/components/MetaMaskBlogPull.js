import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import CardDevTutorial from './Card/CardDevTutorial'
import { getNewsUrl } from '../lib/utils/news'

const MetaMaskBlogPull = () => {
  const data = useStaticQuery(query)
  const newsList = data.stories.nodes

  return (
    <>
      {newsList.map((news, index) => {
        const cta = [
          {
            internal: { type: 'ContentfulCta' },
            displayText: 'Read',
            showCaretRight: true,
            ctaLink: getNewsUrl(news),
          },
        ]
        return (
          <CardDevTutorial
            key={index}
            title={news.title}
            image={news.image}
            description={news.subtitle}
            cta={cta}
          />
        )
      })}
    </>
  )
}

export default MetaMaskBlogPull

const query = graphql`
  query {
    stories: allContentfulNews(
      sort: { publishDate: DESC }
      filter: {
        categories: { elemMatch: { name: { eq: "Developers" } } }
        node_locale: { eq: "en-US" }
        isPrivate: { ne: true }
      }
      limit: 3
    ) {
      nodes {
        title
        slug
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
          gatsbyImageData(
            layout: CONSTRAINED
            width: 1024
            quality: 80
            formats: [AUTO, WEBP]
          )
        }
      }
    }
  }
`
