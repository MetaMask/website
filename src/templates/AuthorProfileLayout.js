import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import getWebpImage from '../lib/utils/getWebpImage'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import Layout from './PageLayout'
import AuthorProfileContent from '../components/AuthorProfileContent'

function AuthorProfileLayout(props) {
  const {
    data: {
      header,
      footer,
      author: {
        name,
        position,
        image,
        expertise,
        education,
        description,
        twitter,
        linkedin,
        seo,
      },
      news,
      heroBg,
      heroBgDark,
      bgImage,
      bgImageDark,
    },
    pageContext: { pathBuild },
  } = props

  const heroBgUrl = getWebpImage(heroBg?.file?.url)
  const heroBgDarkUrl = getWebpImage(heroBgDark?.file?.url)
  const bgImageUrl = getWebpImage(bgImage?.file?.url)
  const bgImageDarkUrl = getWebpImage(bgImageDark?.file?.url)
  const { childMarkdownRemark: { html: descriptionHtml } = {} } =
    description || {}
  const { childMarkdownRemark: { html: educationHtml } = {} } = education || {}
  const relatedNews = news.nodes

  return (
    <Layout>
      {seo && contentfulModuleToComponent({ ...seo, pagePath: pathBuild })}
      {header && contentfulModuleToComponent(header)}
      <AuthorProfileContent
        name={name}
        position={position}
        description={descriptionHtml}
        education={educationHtml}
        image={image}
        expertise={expertise}
        twitter={twitter}
        linkedin={linkedin}
        relatedNews={relatedNews}
        heroBgUrl={heroBgUrl}
        heroBgDarkUrl={heroBgDarkUrl}
        bgImageUrl={bgImageUrl}
        bgImageDarkUrl={bgImageDarkUrl}
      />
      {footer && contentfulModuleToComponent(footer)}
    </Layout>
  )
}

AuthorProfileLayout.propTypes = {
  data: PropTypes.shape({}).isRequired,
  pageContext: PropTypes.shape({
    pathBuild: PropTypes.string,
  }).isRequired,
}

export const AuthorProfileLayoutQuery = graphql`
  query($author_id: String!) {
    header: contentfulLayoutHeader(
      contentful_id: { eq: "6I0knvqLf0DS5PB72DqUlM" }
    ) {
      ...ContentfulLayoutHeaderFields
    }
    author: contentfulNewsAuthor(contentful_id: { eq: $author_id }) {
      ...ContentfulNewsAuthorFields
    }
    news: allContentfulNews(
      filter: { authors: { elemMatch: { contentful_id: { eq: $author_id } } } }
      sort: { publishDate: DESC }
      limit: 3
    ) {
      nodes {
        ...ContentfulNewsFields
      }
    }
    heroBg: contentfulAsset(contentful_id: { eq: "2DkHpHReuWGy3rlFwsseg9" }) {
      file {
        url
      }
    }
    heroBgDark: contentfulAsset(
      contentful_id: { eq: "6UanQYPkBrOZaZ2wQKrjkn" }
    ) {
      file {
        url
      }
    }
    bgImage: contentfulAsset(contentful_id: { eq: "3hGSTCAVrdhSMmLJHSHOWT" }) {
      file {
        url
      }
    }
    bgImageDark: contentfulAsset(
      contentful_id: { eq: "7jkrYvvMuFweNJ4KL2yhRP" }
    ) {
      file {
        url
      }
    }
    footer: contentfulLayoutFooter(
      contentful_id: { eq: "75bFgEllkMxpVsY8wWlroX" }
    ) {
      ...ContentfulLayoutFooterFields
    }
  }
`

export default AuthorProfileLayout
