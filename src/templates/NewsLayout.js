import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import getWebpImage from '../lib/utils/getWebpImage'
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
      news: {
        title,
        subtitle,
        image,
        content,
        canonicalUrl,
        authors,
        publishDate,
      },
      news_bg,
      news_dark_bg,
      hubspot,
      latest,
      footer,
    },
    pageContext: { pathBuild },
  } = props

  const bgUrl = getWebpImage(news_bg?.file?.url)
  const darkBgUrl = getWebpImage(news_dark_bg?.file?.url)

  const seoModuleConfig = {
    internal: { type: 'ContentfulSeo' },
    pageTitle: title,
    pageDescription: subtitle,
    featuredImage: image,
    pagePath: pathBuild,
    canonicalUrl: canonicalUrl,
    pageType: 'news',
  }

  const contentConfig = {
    internal: { type: 'ContentfulRichText' },
    htmlBody: content,
    displayTitle: false,
  }

  const hasAuthors = authors && authors.length > 0
  const authorsName =
    hasAuthors &&
    authors.reduce((acc, cur) => {
      acc.push(cur.name)
      return acc
    }, [])

  return (
    <Layout {...props}>
      {contentfulModuleToComponent(seoModuleConfig)}
      {contentfulModuleToComponent(header)}
      <div className="news-page-content">
        {contentfulModuleToComponent(hero)}
        <NewsContainer>
          <ContentWrapper className="news-content">
            {contentfulModuleToComponent({
              ...cta,
              iconConfig: { news: true, width: '24px', height: '24px' },
              showLeftArrow: true,
            })}
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
            <NewsInfo>
              <span>by&nbsp;</span>
              <span className="author">
                {hasAuthors ? authorsName.join(', ') : 'MetaMask'}
              </span>
              <span className="separator" />
              <span className="publishDate">{publishDate}</span>
            </NewsInfo>
            <Image image={image} />
            <SocialShare>
              <SocialButtonList />
            </SocialShare>
          </ContentWrapper>
          <NewsContentWrapper bgUrl={bgUrl} darkBgUrl={darkBgUrl}>
            {contentfulModuleToComponent(contentConfig)}
            {contentfulModuleToComponent(hubspot)}
          </NewsContentWrapper>
          {contentfulModuleToComponent({
            ...latest,
            iconConfig: { news: true, width: '24px', height: '24px' },
            showLeftArrow: true,
          })}
          {contentfulModuleToComponent(footer)}
        </NewsContainer>
      </div>
    </Layout>
  )
}

const NewsContainer = styled(Section)`
  position: relative;
`
const SocialShare = styled.div`
  margin: 32px 0;
  display: flex;
  align-items: center;
  justify-content: right;

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    flex-direction: column;
  }
`

const NewsContentWrapper = styled.div`
  ${({ bgUrl, darkBgUrl }) =>
    bgUrl || darkBgUrl
      ? ` background-size: contain;
      background-repeat: no-repeat;
      background-position: bottom;
   `
      : ''}

  ${({ bgUrl }) =>
    bgUrl
      ? ` background-image: url(${bgUrl});
  `
      : ''}
  
  ${({ darkBgUrl }) =>
    darkBgUrl
      ? ` 
      body.dark-mode && {
        background-image: url(${darkBgUrl});
      }
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
  padding-top: 8px;
`

const categoryProps = PropTypes.shape({
  name: PropTypes.string.isRequired,
  parent: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
})

const NewsInfo = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 1rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
  padding-top: 0.75rem;

  .separator {
    background-color: #333;
    display: inline-flex;
    height: 1px;
    margin: 0 0.5rem;
    width: 0.5rem;
    body.dark-mode & {
      background-color: #fff;
    }
  }
  .author,
  .publishDate {
    font-weight: 700;
  }

  &::before {
    background-color: #333;
    content: '';
    height: 3px;
    left: 0;
    position: absolute;
    top: 0;
    width: 3.5rem;

    body.dark-mode & {
      background-color: #fff;
    }
  }
`

NewsLayout.propTypes = {
  data: PropTypes.shape({
    news: PropTypes.shape({
      isPrivate: PropTypes.bool,
      content: PropTypes.object,
      image: PropTypes.object,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      publishDate: PropTypes.string,
      categories: PropTypes.arrayOf(categoryProps),
      author: PropTypes.arrayOf(PropTypes.shape(PropTypes.string.isRequired)),
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

    news_dark_bg: contentfulAsset(
      contentful_id: { eq: "7jkrYvvMuFweNJ4KL2yhRP" }
    ) {
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
