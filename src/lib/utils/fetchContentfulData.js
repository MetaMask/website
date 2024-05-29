import axios from 'axios'
import {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_PREVIEW_API_KEY,
  CONTENTFUL_PREVIEW_HOST,
  CONTENTFUL_API_KEY,
} from '../config'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { ContentfulRestLink } from 'apollo-link-contentful'
import {
  ContentfulCardQuery,
  ContentfulConsenSysResourcesQuery,
  ContentfulCtaQuery,
  ContentfulEmbedQuery,
  ContentfulFaqQuery,
  ContentfulHubSpotFormQuery,
  ContentfulLayoutFeatureQuery,
  ContentfulLayoutFooterQuery,
  ContentfulLayoutFullWidthCtaQuery,
  ContentfulLayoutHeaderQuery,
  ContentfulLayoutHeroQuery,
  ContentfulLayoutModuleContainerQuery,
  ContentfulLayoutQuery,
  ContentfulLogoQuery,
  ContentfulModuleContainerQuery,
  ContentfulNewsCategoryQuery,
  ContentfulNewsAuthorQuery,
  ContentfulNewsLayoutQuery,
  ContentfulPopupAnnouncementQuery,
  ContentfulRichTextQuery,
  ContentfulTimelineQuery,
  ContentfulFeatureSliderItemQuery,
  ContentfulLayoutFeatureSliderQuery,
  ContentfulSharedCopyQuery,
} from '../../fragments/previewQuery'

export const fetchContentfulTypename = id => {
  if (!id) {
    return null
  }

  const resource_url =
    `/spaces/${CONTENTFUL_SPACE_ID}` +
    `/environments/${CONTENTFUL_ENVIRONMENT}` +
    `/entries/${id}?access_token=${CONTENTFUL_PREVIEW_API_KEY}`

  const url = 'https://' + CONTENTFUL_PREVIEW_HOST + resource_url

  return axios
    .get(url)
    .then(res => {
      if (res.data) {
        const type = res.data.sys.contentType.sys.id
        const typename = convertContentfulPreviewTypename(type)
        return typename
      }
      return null
    })
    .catch(() => null)
}

const mapTypeToQuery = type => {
  let query = ''
  switch (type) {
    case 'ContentfulLayoutHeader':
      query = ContentfulLayoutHeaderQuery
      break
    case 'ContentfulLayoutFooter':
      query = ContentfulLayoutFooterQuery
      break
    case 'ContentfulLayoutHero':
      query = ContentfulLayoutHeroQuery
      break
    case 'ContentfulLayoutFeature':
      query = ContentfulLayoutFeatureQuery
      break
    case 'ContentfulLayoutFullWidthCta':
      query = ContentfulLayoutFullWidthCtaQuery
      break
    case 'ContentfulLayout':
      query = ContentfulLayoutQuery
      break
    case 'ContentfulLayoutModuleContainer':
      query = ContentfulLayoutModuleContainerQuery
      break
    case 'ContentfulCard':
      query = ContentfulCardQuery
      break
    case 'ContentfulConsenSysResources':
      query = ContentfulConsenSysResourcesQuery
      break
    case 'ContentfulCta':
      query = ContentfulCtaQuery
      break
    case 'ContentfulEmbed':
      query = ContentfulEmbedQuery
      break
    case 'ContentfulFaq':
      query = ContentfulFaqQuery
      break
    case 'ContentfulHubSpotForm':
      query = ContentfulHubSpotFormQuery
      break
    case 'ContentfulLogo':
      query = ContentfulLogoQuery
      break
    case 'ContentfulModuleContainer':
      query = ContentfulModuleContainerQuery
      break
    case 'ContentfulNewsAuthor':
      query = ContentfulNewsAuthorQuery
      break
    case 'ContentfulNewsLayout':
      query = ContentfulNewsLayoutQuery
      break
    case 'ContentfulNewsCategory':
      query = ContentfulNewsCategoryQuery
      break
    case 'ContentfulPopupAnnouncement':
      query = ContentfulPopupAnnouncementQuery
      break
    case 'ContentfulTimeline':
      query = ContentfulTimelineQuery
      break
    case 'ContentfulRichText':
      query = ContentfulRichTextQuery
      break
    case 'ContentfulFeatureSliderItem':
      query = ContentfulFeatureSliderItemQuery
      break
    case 'ContentfulLayoutFeatureSlider':
      query = ContentfulLayoutFeatureSliderQuery
      break
    case 'ContentfulSharedCopy':
      query = ContentfulSharedCopyQuery
      break
    default:
      break
  }
  return query
}

export const fetchContentfulData = (type, id, locale) => {
  const query = mapTypeToQuery(type, id)
  return apolloClient.query({
    query,
    variables: { id, preview: true, locale },
  })
}

export const convertContentfulPreviewTypename = type => {
  if (!type) return undefined
  return `Contentful${type.charAt(0).toUpperCase() + type.slice(1)}`
}

export const apolloClient = new ApolloClient({
  link: new ContentfulRestLink(
    {
      space: CONTENTFUL_SPACE_ID,
      accessToken: CONTENTFUL_API_KEY,
      previewAccessToken: CONTENTFUL_PREVIEW_API_KEY,
      environment: CONTENTFUL_ENVIRONMENT,
    },
    {
      include: 10,
    }
  ),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'no-cache' },
    query: { fetchPolicy: 'no-cache' },
  },
})
