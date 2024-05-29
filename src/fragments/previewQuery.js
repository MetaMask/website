import gql from 'graphql-tag'
import {
  ContentfulCardFields,
  ContentfulConsenSysResourcesFields,
  ContentfulCtaFields,
  ContentfulEmbedFields,
  ContentfulFaqFields,
  ContentfulHubSpotFormFields,
  ContentfulLayoutFeatureFields,
  ContentfulLayoutFields,
  ContentfulLayoutFooterFields,
  ContentfulLayoutFullWidthCtaFields,
  ContentfulLayoutHeaderFields,
  ContentfulLayoutHeroFields,
  ContentfulLayoutModuleContainerFields,
  ContentfulLogoFields,
  ContentfulModuleContainerFields,
  ContentfulNewsCategoryFields,
  ContentfulNewsAuthorFields,
  ContentfulNewsLayoutFields,
  ContentfulPopupAnnouncementFields,
  ContentfulRichTextFields,
  ContentfulTimelineFields,
  ContentfulFeatureSliderItemFields,
  ContentfulLayoutFeatureSliderFields,
  ContentfulSharedCopyFields,
} from './previewFragment'

export const ContentfulLayoutHeaderQuery = gql`
  ${ContentfulLayoutHeaderFields}
  query($id: String!) {
    previewContent: layoutHeader(id: $id) {
      ...ContentfulLayoutHeaderFields
    }
  }
`

export const ContentfulLayoutFooterQuery = gql`
  ${ContentfulLayoutFooterFields}
  query($id: String!) {
    previewContent: layoutFooter(id: $id) {
      ...ContentfulLayoutFooterFields
    }
  }
`

export const ContentfulLayoutHeroQuery = gql`
  ${ContentfulLayoutHeroFields}
  query($id: String!) {
    previewContent: layoutHero(id: $id) {
      ...ContentfulLayoutHeroFields
    }
  }
`

export const ContentfulLayoutFeatureQuery = gql`
  ${ContentfulLayoutFeatureFields}
  query($id: String!) {
    previewContent: layoutFeature(id: $id) {
      ...ContentfulLayoutFeatureFields
    }
  }
`

export const ContentfulLayoutFullWidthCtaQuery = gql`
  ${ContentfulLayoutFullWidthCtaFields}
  query($id: String!) {
    previewContent: layoutFullWidthCta(id: $id) {
      ...ContentfulLayoutFullWidthCtaFields
    }
  }
`

export const ContentfulLayoutQuery = gql`
  ${ContentfulLayoutFields}
  query($id: String!) {
    previewContent: layout(id: $id) {
      ...ContentfulLayoutFields
    }
  }
`

export const ContentfulLayoutModuleContainerQuery = gql`
  ${ContentfulLayoutModuleContainerFields}
  query($id: String!) {
    previewContent: layoutModuleContainer(id: $id) {
      ...ContentfulLayoutModuleContainerFields
    }
  }
`

export const ContentfulCardQuery = gql`
  ${ContentfulCardFields}
  query($id: String!) {
    previewContent: card(id: $id) {
      ...ContentfulCardFields
    }
  }
`

export const ContentfulConsenSysResourcesQuery = gql`
  ${ContentfulConsenSysResourcesFields}
  query($id: String!) {
    previewContent: consenSysResources(id: $id) {
      ...ContentfulConsenSysResourcesFields
    }
  }
`

export const ContentfulCtaQuery = gql`
  ${ContentfulCtaFields}
  query($id: String!) {
    previewContent: cta(id: $id) {
      ...ContentfulCtaFields
    }
  }
`

export const ContentfulEmbedQuery = gql`
  ${ContentfulEmbedFields}
  query($id: String!) {
    previewContent: embed(id: $id) {
      ...ContentfulEmbedFields
    }
  }
`

export const ContentfulFaqQuery = gql`
  ${ContentfulFaqFields}
  query($id: String!) {
    previewContent: faq(id: $id) {
      ...ContentfulFaqFields
    }
  }
`

export const ContentfulHubSpotFormQuery = gql`
  ${ContentfulHubSpotFormFields}
  query($id: String!) {
    previewContent: hubSpotForm(id: $id) {
      ...ContentfulHubSpotFormFields
    }
  }
`

export const ContentfulLogoQuery = gql`
  ${ContentfulLogoFields}
  query($id: String!) {
    previewContent: hubSpotForm(id: $id) {
      ...ContentfulLogoFields
    }
  }
`

export const ContentfulModuleContainerQuery = gql`
  ${ContentfulModuleContainerFields}
  query($id: String!) {
    previewContent: moduleContainer(id: $id) {
      ...ContentfulModuleContainerFields
    }
  }
`

export const ContentfulNewsLayoutQuery = gql`
  ${ContentfulNewsLayoutFields}
  query($id: String!) {
    previewContent: newsLayout(id: $id) {
      ...ContentfulNewsLayoutFields
    }
  }
`

export const ContentfulNewsAuthorQuery = gql`
  ${ContentfulNewsAuthorFields}
  query($id: String!) {
    previewContent: newsAuthor(id: $id) {
      ...ContentfulNewsAuthorFields
    }
  }
`

export const ContentfulNewsCategoryQuery = gql`
  ${ContentfulNewsCategoryFields}
  query($id: String!) {
    previewContent: newsCategory(id: $id) {
      ...ContentfulNewsCategoryFields
    }
  }
`

export const ContentfulPopupAnnouncementQuery = gql`
  ${ContentfulPopupAnnouncementFields}
  query($id: String!) {
    previewContent: popupAnnouncement(id: $id) {
      ...ContentfulPopupAnnouncementFields
    }
  }
`

export const ContentfulTimelineQuery = gql`
  ${ContentfulTimelineFields}
  query($id: String!) {
    previewContent: timeline(id: $id) {
      ...ContentfulTimelineFields
    }
  }
`

export const ContentfulRichTextQuery = gql`
  ${ContentfulRichTextFields}
  query($id: String!) {
    previewContent: richText(id: $id) {
      ...ContentfulRichTextFields
    }
  }
`

export const ContentfulFeatureSliderItemQuery = gql`
  ${ContentfulFeatureSliderItemFields}
  query($id: String!) {
    previewContent: featureSliderItem(id: $id) {
      ...ContentfulFeatureSliderItemFields
    }
  }
`

export const ContentfulLayoutFeatureSliderQuery = gql`
  ${ContentfulLayoutFeatureSliderFields}
  query($id: String!) {
    previewContent: featureSlider(id: $id) {
      ...ContentfulLayoutFeatureSliderFields
    }
  }
`

export const ContentfulSharedCopyQuery = gql`
  ${ContentfulSharedCopyFields}
  query($id: String!) {
    previewContent: sharedCopy(id: $id) {
      ...ContentfulSharedCopyFields
    }
  }
`
