import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import getWebpImage from '../lib/utils/getWebpImage'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import Layout from './PageLayout'
import orderBy from 'lodash/orderBy'
import takeRight from 'lodash/takeRight'
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
        news,
      },
      heroBg,
      heroBgDark,
      bgImage,
      bgImageDark,
    },
    pageContext: { pathBuild, localizedPages },
  } = props

  const heroBgUrl = getWebpImage(heroBg?.file?.url)
  const heroBgDarkUrl = getWebpImage(heroBgDark?.file?.url)
  const bgImageUrl = getWebpImage(bgImage?.file?.url)
  const bgImageDarkUrl = getWebpImage(bgImageDark?.file?.url)
  const { childMarkdownRemark: { html: descriptionHtml } = {} } =
    description || {}
  const { childMarkdownRemark: { html: educationHtml } = {} } = education || {}
  let relatedNews = orderBy(news, el => new Date(el.publishDate), 'asc')
  relatedNews = takeRight(relatedNews, 3)

  return (
    <Layout localizedPages={localizedPages}>
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
  query($author_id: String!, $node_locale: String) {
    header: contentfulLayoutHeader(
      contentful_id: { eq: "6I0knvqLf0DS5PB72DqUlM" }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulLayoutHeaderFields
    }
    author: contentfulNewsAuthor(
      contentful_id: { eq: $author_id }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulNewsAuthorFields
      news {
        ...ContentfulNewsFields
      }
    }
    heroBg: contentfulAsset(
      contentful_id: { eq: "2DkHpHReuWGy3rlFwsseg9" }
      node_locale: { eq: $node_locale }
    ) {
      file {
        url
      }
    }
    heroBgDark: contentfulAsset(
      contentful_id: { eq: "RjpEbmeL6vLPeiSjePDpy" }
      node_locale: { eq: $node_locale }
    ) {
      file {
        url
      }
    }
    bgImage: contentfulAsset(
      contentful_id: { eq: "3hGSTCAVrdhSMmLJHSHOWT" }
      node_locale: { eq: $node_locale }
    ) {
      file {
        url
      }
    }
    bgImageDark: contentfulAsset(
      contentful_id: { eq: "2StKLJf0XE38EyT9GlzQuO" }
      node_locale: { eq: $node_locale }
    ) {
      file {
        url
      }
    }
    footer: contentfulLayoutFooter(
      contentful_id: { eq: "75bFgEllkMxpVsY8wWlroX" }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulLayoutFooterFields
    }
  }
`

export default AuthorProfileLayout
