import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import Layout from './PageLayout'
import { Section } from '../components/StyledGeneral'
import ContentWrapper from '../components/ContentWrapper'
import Image from '../components/Image'
import SocialButtonList from '../components/SocialButtonList'

function NewsLayout(props) {
  const {
    data: {
      header,
      hero,
      cta,
      news: { title, subtitle, image, author, publishDate, content },
      news_bg: {
        file: { url: bgUrl },
      },
      hubspot,
      latest,
      footer,
    },
    pageContext: { pathBuild },
  } = props

  const seoModuleConfig = {
    internal: { type: 'ContentfulSeo' },
    pageTitle: title,
    pageDescription: subtitle,
    featuredImage: image,
    pagePath: pathBuild,
    pageType: 'news',
  }

  const contentConfig = {
    internal: { type: 'ContentfulRichText' },
    htmlBody: content,
    displayTitle: false,
  }

  return (
    <Layout {...props}>
      {contentfulModuleToComponent(seoModuleConfig)}
      {contentfulModuleToComponent(header)}
      <div className="news-page-content">
        {contentfulModuleToComponent(hero)}
        <NewsContainer>
          <ContentWrapper className="news-content">
            {contentfulModuleToComponent(cta)}
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
            <Image image={image} />
            <Author>
              {contentfulModuleToComponent({
                ...author,
                publishDate,
              })}
              <SocialButtonList />
            </Author>
          </ContentWrapper>
          <NewsContentWrapper bgUrl={bgUrl}>
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
const Author = styled.div`
  padding-top: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    flex-direction: column;
  }
`

const NewsContentWrapper = styled.div`
  ${({ bgUrl }) =>
    bgUrl
      ? ` background-image: url(${bgUrl});
      background-size: contain;
      background-repeat: no-repeat;
      background-position: bottom;
   `
      : ''}

  & > * {
    max-width: 784px;
    margin: 0 auto;
    padding: 0 20px;
  }
`

const Title = styled.h2`
  font-size: 40px;
  line-height: 40px;
  padding-top: 64px;
`

const Subtitle = styled.p`
  font-size: 16px;
  line-height: 24px;
  padding-top: 24px;
`

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
    news_content_id: PropTypes.string.isRequired,
    pathBuild: PropTypes.string,
  }).isRequired,
}

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

    news_bg: contentfulAsset(contentful_id: { eq: "3hGSTCAVrdhSMmLJHSHOWT" }) {
      file {
        url
      }
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
