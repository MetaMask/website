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
import NewsAuthor from '../components/NewsAuthor'
import { DEFAULT_LOCALE_CODE } from '../lib/config.mjs'
import { formatDateByLocale } from '../lib/utils/helpers'

function NewsLayout(props) {
  const {
    data: {
      header,
      cta,
      news: {
        title,
        subtitle,
        image,
        content,
        canonicalUrl,
        metaTitle,
        metaDescription,
        authors,
        publishDate,
      },
      news_bg,
      news_dark_bg,
      hubspot,
      latest,
      footer,
      latestStories,
    },
    pageContext: {
      pathBuild,
      localizedPages,
      slug,
      translation,
      node_locale,
      sharedCopy = {},
    },
  } = props

  const bgUrl = getWebpImage(news_bg?.file?.url)
  const darkBgUrl = getWebpImage(news_dark_bg?.file?.url)

  const seoModuleConfig = {
    internal: { type: 'ContentfulSeo' },
    pageTitle: (metaTitle || title) + ' | MetaMask News',
    pageDescription: metaDescription || subtitle,
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

  return (
    <Layout
      {...props}
      localizedPages={localizedPages}
      sharedCopy={sharedCopy}
      translation={translation}
    >
      {seoModuleConfig &&
        contentfulModuleToComponent({
          ...seoModuleConfig,
          pagePath: pathBuild,
          originalSlug: slug,
          translation,
        })}
      {header && contentfulModuleToComponent({ ...header, translation })}
      <div className="news-page-content">
        <NewsContainer className="noPaddingBottom">
          <ContentWrapper className="news-content">
            {contentfulModuleToComponent({
              ...cta,
              iconConfig: { news: true, width: '24px', height: '24px' },
              showLeftArrow: true,
            })}
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
            <NewsInfo>
              <span>{sharedCopy.by}&nbsp;</span>
              <NewsAuthor listAuthors={authors} />
              <span className="separator" />
              <span className="publishDate">
                {publishDate &&
                  formatDateByLocale(
                    publishDate,
                    node_locale || DEFAULT_LOCALE_CODE
                  )}
              </span>
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
            storiesData: {
              stories: latestStories.nodes,
            },
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

  .gatsby-image-wrapper img {
    width: 100%;
    height: 100%;
  }
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

const Title = styled.h1`
  font-size: 40px;
  line-height: 40px;
  padding-top: 32px;

  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    padding-top: 64px;
  }
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
    background-color: #24292e;
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
    background-color: #24292e;
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
      metaTitle: PropTypes.string,
      metaDescription: PropTypes.string,
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
  query($news_content_id: String!, $node_locale: String) {
    header: contentfulLayoutHeader(
      contentful_id: { eq: "6I0knvqLf0DS5PB72DqUlM" }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulLayoutHeaderFields
    }

    cta: contentfulCta(
      contentful_id: { eq: "6iOGB8Fiab9ilS0jfZ8N5I" }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulCtaFields
    }

    news: contentfulNews(
      contentful_id: { eq: $news_content_id }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulNewsFields
    }

    news_bg: contentfulAsset(
      contentful_id: { eq: "3hGSTCAVrdhSMmLJHSHOWT" }
      node_locale: { eq: $node_locale }
    ) {
      file {
        url
      }
    }

    news_dark_bg: contentfulAsset(
      contentful_id: { eq: "2StKLJf0XE38EyT9GlzQuO" }
      node_locale: { eq: $node_locale }
    ) {
      file {
        url
      }
    }

    hubspot: contentfulHubSpotForm(
      contentful_id: { eq: "5VZVKtbcRMzaaP77nsz3Fs" }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulHubSpotFormFields
    }

    latest: contentfulLayoutModuleContainer(
      contentful_id: { eq: "nO1tqQRjoUDUJfdg2B651" }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulLayoutModuleContainerFields
    }

    latestStories: allContentfulNews(
      sort: { publishDate: DESC }
      filter: {
        isPrivate: { eq: false }
        node_locale: { eq: $node_locale }
        categories: {
          elemMatch: { contentful_id: { eq: "3tE0tpmPMGsXezpOhKyWGO" } }
        }
      }
      limit: 3
    ) {
      nodes {
        ...ContentfulNewsFields
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

export default NewsLayout
