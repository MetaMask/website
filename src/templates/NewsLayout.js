import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import Layout from './PageLayout'
import { parseContentfulAssetUrl } from '../lib/utils/urlParser'
import { Section } from '../components/StyledGeneral'
import Image from '../components/Image'

function NewsLayout(props) {
  const {
    data: {
      header,
      hero,
      cta,
      news: { title, subtitle, image, author, publishDate, content },
      hubspot,
      latest,
      footer,
    },
    pageContext: { pathBuild },
  } = props

  const contentConfig = {
    internal: { type: 'ContentfulRichText' },
    htmlBody: content,
    displayTitle: false,
  }

  const seoModuleConfig = {
    internal: { type: 'ContentfulSeo' },
    pageTitle: title,
    pageDescription: subtitle,
    featuredImage: parseContentfulAssetUrl(image),
    pagePath: pathBuild,
    pageType: 'news',
  }

  return (
    <Layout {...props}>
      {contentfulModuleToComponent(seoModuleConfig)}
      {contentfulModuleToComponent(header)}
      <div className="news-page-content">
        {contentfulModuleToComponent(hero)}
        <NewsContainer>
          {contentfulModuleToComponent(cta)}
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
          <Image image={image} />
          {contentfulModuleToComponent({
            ...author,
            publishDate,
          })}
          <NewsContentWrapper>
            {contentfulModuleToComponent(contentConfig)}
            {contentfulModuleToComponent(hubspot)}
          </NewsContentWrapper>
          {contentfulModuleToComponent(latest)}
          {contentfulModuleToComponent(footer)}
        </NewsContainer>
      </div>
    </Layout>
  )
}

const NewsContainer = styled(Section)`
  position: relative;
`

const NewsContentWrapper = styled.div`
  max-width: 784px;
  margin: 0 auto;
  padding: 0 20px;
`

const Title = styled.h2``

const Subtitle = styled.p``

const categoryProps = PropTypes.shape({
  name: PropTypes.string.isRequired,
  parent: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
})

NewsLayout.propTypes = {
  data: PropTypes.shape({
    news: PropTypes.shape({
      isPrivate: PropTypes.bool,
      content: PropTypes.object,
      image: PropTypes.object,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      publishDate: PropTypes.string,
      categories: PropTypes.arrayOf(categoryProps),
      author: PropTypes.object,
    }),
  }).isRequired,
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
    news_content_id: PropTypes.string.isRequired,
    pathBuild: PropTypes.string,
  }).isRequired,
}

// get related news based on category passed in
export const NewsLayoutQuery = graphql`
  query($news_content_id: String!) {
    header: contentfulLayoutHeader(
      contentful_id: { eq: "6I0knvqLf0DS5PB72DqUlM" }
    ) {
      ...ContentfulLayoutHeaderFields
    }

    hero: contentfulLayoutHero(
      contentful_id: { eq: "4ZjPczvQn6fYgigGRFSQPf" }
    ) {
      ...ContentfulLayoutHeroFields
    }

    cta: contentfulCta(contentful_id: { eq: "6iOGB8Fiab9ilS0jfZ8N5I" }) {
      ...ContentfulCtaFields
    }

    news: contentfulNews(contentful_id: { eq: $news_content_id }) {
      ...ContentfulNewsFields
    }

    hubspot: contentfulHubSpotForm(
      contentful_id: { eq: "5VZVKtbcRMzaaP77nsz3Fs" }
    ) {
      ...ContentfulHubSpotFormFields
    }

    latest: contentfulLayoutModuleContainer(
      contentful_id: { eq: "nO1tqQRjoUDUJfdg2B651" }
    ) {
      ...ContentfulLayoutModuleContainerFields
    }

    footer: contentfulLayoutFooter(
      contentful_id: { eq: "75bFgEllkMxpVsY8wWlroX" }
    ) {
      ...ContentfulLayoutFooterFields
    }
  }
`

export default NewsLayout
