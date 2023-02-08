import gql from 'graphql-tag'

export const ContentfulNewsLayoutFields = gql`
  fragment ContentfulNewsLayoutFields on NewsLayout {
    __typename
    sys {
      id
    }
    title
    subtitle
    image(preview: true) {
      url
    }
    publishDate
    content
    authorsCollection(preview: true) {
      items {
        name
      }
    }
    publishDate
  }
`

export const ContentfulLogoFields = gql`
  fragment ContentfulLogoFields on Logo {
    __typename
    sys {
      id
    }
    title
    logo(preview: true) {
      url
    }
    logoDarkMode(preview: true) {
      url
    }
    widthLogo
    link
    newTab
    displayTitle
    backgroundColor
  }
`

export const ContentfulEmbedFields = gql`
  fragment ContentfulEmbedFields on Embed {
    __typename
    sys {
      id
    }
    moduleId
    title
    embed
    thumbnail(preview: true) {
      url
    }
    layoutType
    playOnPopup
    displayTitle
  }
`

export const ContentfulHubSpotFormFields = gql`
  fragment ContentfulHubSpotFormFields on HubSpotForm {
    __typename
    sys {
      id
    }
    title
    portalId
    formId
    campaignId
    displayTitle
    width
    customClass
    customId
  }
`

export const ContentfulCtaFields = gql`
  ${ContentfulHubSpotFormFields}
  ${ContentfulEmbedFields}
  fragment ContentfulCtaFields on Cta {
    __typename
    sys {
      id
    }
    name
    displayText
    ctaLink
    socialLink
    newTab
    buttonDisplay
    buttonGradient
    buttonSecondary
    fontSize
    eventCategory
    eventLabel
    hubSpotForm(preview: true) {
      ...ContentfulHubSpotFormFields
    }
    embedHtml(preview: true) {
      ...ContentfulEmbedFields
    }
    downloadBrowsers
  }
`

export const ContentfulRichTextFields = gql`
  fragment ContentfulRichTextFields on RichText {
    __typename
    sys {
      id
    }
    moduleId
    title
    htmlBody
    displayTitle
  }
`

export const ContentfulLayoutFullWidthCtaFields = gql`
  ${ContentfulHubSpotFormFields}
  ${ContentfulRichTextFields}
  ${ContentfulCtaFields}
  fragment ContentfulLayoutFullWidthCtaFields on LayoutFullWidthCta {
    __typename
    sys {
      id
    }
    showLogoAnimation
    logoType
    headline
    description
    marginBottom
    hubSpotForm(preview: true) {
      ...ContentfulHubSpotFormFields
    }
    embedHtml(preview: true) {
      ...ContentfulRichTextFields
    }
    ctasCollection(preview: true) {
      items {
        ...ContentfulCtaFields
      }
    }
    backgroundColor
    sectionPadding
    customClass
  }
`

export const ContentfulConsenSysResourcesFields = gql`
  fragment ContentfulConsenSysResourcesFields on ConsenSysResources {
    __typename
    sys {
      id
    }
    title
    categoryId
    numberOfItem
    showDate
    linkText
    link
  }
`

export const ContentfulPopupAnnouncementFields = gql`
  fragment ContentfulPopupAnnouncementFields on PopupAnnouncement {
    __typename
    sys {
      id
    }
    title
    ctaText
    ctaLink
    backgroundColor
    image(preview: true) {
      title
      description
      url
    }
  }
`

export const ContentfulCardFields = gql`
  ${ContentfulHubSpotFormFields}
  ${ContentfulCtaFields}
  fragment ContentfulCardFields on Card {
    __typename
    sys {
      id
    }
    title
    image(preview: true) {
      url
    }
    imageDarkMode(preview: true) {
      url
    }
    imageMargin
    description
    linkText
    link
    newTab
    layoutType
    layoutSize
    contentAlignment
    backgroundColor
    backgroundImage(preview: true) {
      url
    }
    backgroundImageMobile(preview: true) {
      url
    }
    customClass
    hubSpotForm(preview: true) {
      ...ContentfulHubSpotFormFields
    }
    ctaCollection(preview: true) {
      items {
        ...ContentfulCtaFields
      }
    }
  }
`

export const ContentfulFaqFields = gql`
  fragment ContentfulFaqFields on Faq {
    __typename
    sys {
      id
    }
    question
    answer
    backgroundColor
  }
`

export const ContentfulNewsCategoryFields = gql`
  fragment ContentfulNewsCategoryFields on NewsCategory {
    __typename
    sys {
      id
    }
    name
    parent(preview: true) {
      ... on NewsCategory {
        __typename
        sys {
          id
        }
        name
      }
    }
  }
`

export const ContentfulTimelineFields = gql`
  fragment ContentfulTimelineFields on Timeline {
    __typename
    sys {
      id
    }
    eyebrow
    headline
    description
    image {
      title
      description
      url
    }
    customClass
  }
`

export const ContentfulModuleContainerFields = gql`
  ${ContentfulConsenSysResourcesFields}
  ${ContentfulCardFields}
  ${ContentfulCtaFields}
  ${ContentfulEmbedFields}
  ${ContentfulFaqFields}
  ${ContentfulHubSpotFormFields}
  ${ContentfulLogoFields}
  ${ContentfulNewsCategoryFields}
  ${ContentfulRichTextFields}
  fragment ContentfulModuleContainerFields on ModuleContainer {
    __typename
    sys {
      id
    }
    title
    description
    contentAlignment
    numberOfItem
    columns
    columnsOnMobile
    centerOnMobile
    columnType
    gridModulesGap
    splitModules
    isLiquiditySection
    isTrustBar
    displayTitle
    modulesCollection(preview: true) {
      items {
        ...ContentfulCardFields
        ...ContentfulConsenSysResourcesFields
        ...ContentfulCtaFields
        ...ContentfulEmbedFields
        ...ContentfulFaqFields
        ...ContentfulHubSpotFormFields
        ...ContentfulLogoFields
        ...ContentfulNewsCategoryFields
        ...ContentfulRichTextFields
        ... on ModuleContainer {
          __typename
          sys {
            id
          }
          title
          description
          contentAlignment
          numberOfItem
          columns
          columnsOnMobile
          centerOnMobile
          columnType
          gridModulesGap
          splitModules
          isLiquiditySection
          displayTitle
          modulesCollection(preview: true) {
            items {
              ...ContentfulCardFields
              ...ContentfulCtaFields
              ...ContentfulLogoFields
              ...ContentfulRichTextFields
              ... on ModuleContainer {
                __typename
                sys {
                  id
                }
                title
                description
                contentAlignment
                numberOfItem
                columns
                columnsOnMobile
                centerOnMobile
                columnType
                gridModulesGap
                splitModules
                isLiquiditySection
                displayTitle
                modulesCollection(preview: true) {
                  items {
                    ...ContentfulCardFields
                    ...ContentfulCtaFields
                    ...ContentfulLogoFields
                    ...ContentfulRichTextFields
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const ContentfulLayoutHeaderFields = gql`
  ${ContentfulLogoFields}
  ${ContentfulCtaFields}
  ${ContentfulModuleContainerFields}
  ${ContentfulPopupAnnouncementFields}
  fragment ContentfulLayoutHeaderFields on LayoutHeader {
    __typename
    sys {
      id
    }
    title
    popupAnnouncement(preview: true) {
      ...ContentfulPopupAnnouncementFields
    }
    logo(preview: true) {
      ...ContentfulLogoFields
    }
    logoMobile(preview: true) {
      ...ContentfulLogoFields
    }
    menuItemsCollection(preview: true) {
      items {
        ...ContentfulModuleContainerFields
      }
    }
    downloadButton(preview: true) {
      ...ContentfulCtaFields
    }
    isSticky
  }
`

export const ContentfulLayoutFooterFields = gql`
  ${ContentfulModuleContainerFields}
  fragment ContentfulLayoutFooterFields on LayoutFooter {
    __typename
    sys {
      id
    }
    title
    logo(preview: true) {
      ...ContentfulLogoFields
    }
    copyright
    menuItemsCollection(preview: true) {
      items {
        ...ContentfulModuleContainerFields
      }
    }
  }
`

export const ContentfulLayoutHeroFields = gql`
  ${ContentfulLogoFields}
  ${ContentfulHubSpotFormFields}
  ${ContentfulCtaFields}
  ${ContentfulEmbedFields}
  fragment ContentfulLayoutHeroFields on LayoutHero {
    __typename
    sys {
      id
    }
    title
    headline
    hideHeadline
    description
    note
    eyebrow
    eyebrowLogo(preview: true) {
      ...ContentfulLogoFields
    }
    eyebrowMobileLogo(preview: true) {
      ...ContentfulLogoFields
    }
    eyebrowLogoDarkMode(preview: true) {
      ...ContentfulLogoFields
    }
    eyebrowMobileLogoDarkMode(preview: true) {
      ...ContentfulLogoFields
    }
    sideImageFlex
    sideImageFoxAnimation
    sideImage(preview: true) {
      title
      description
      url
    }
    sideImageDarkMode(preview: true) {
      title
      description
      url
    }
    hubSpotForm(preview: true) {
      ...ContentfulHubSpotFormFields
    }
    ctasCollection(preview: true) {
      items {
        ...ContentfulCtaFields
      }
    }
    embed(preview: true) {
      ...ContentfulEmbedFields
    }
    backgroundColor
    backgroundImage {
      title
      description
      url
    }
    backgroundImageDarkMode {
      title
      description
      url
    }
    contentAlignment
    showLearnMore
    headlineBorderBottom
    hideHeadline
    showFavIcon
    sectionPadding
    customClass
  }
`

export const ContentfulLayoutFeatureFields = gql`
  ${ContentfulCardFields}
  ${ContentfulLogoFields}
  ${ContentfulCtaFields}
  fragment ContentfulLayoutFeatureFields on LayoutFeature {
    __typename
    sys {
      id
    }
    headline
    description
    image(preview: true) {
      title
      description
      url
    }
    embed(preview: true) {
      ...ContentfulEmbedFields
    }
    imageDarkMode(preview: true) {
      title
      description
      url
    }
    imageMobile(preview: true) {
      title
      description
      url
    }
    imageMobileDarkMode(preview: true) {
      title
      description
      url
    }
    imageShadow
    hideImageOnMobile
    imageWidth
    imageAlignment
    imageLink
    alignItemsCenter
    contentAlignment
    contentPaddingTop
    headlineMarginTop0
    withContent
    eyebrow
    animation
    backgroundColor
    backgroundImage(preview: true) {
      title
      description
      url
    }
    backgroundImageDarkMode(preview: true) {
      title
      description
      url
    }
    backgroundImageMobile(preview: true) {
      title
      description
      url
    }
    sectionPadding
    noPaddingBottom
    customClass
    featureItemsCollection(preview: true) {
      items {
        ...ContentfulCardFields
        ...ContentfulLogoFields
      }
    }
    cta(preview: true) {
      ...ContentfulCtaFields
    }
    ctaSecond(preview: true) {
      ...ContentfulCtaFields
    }
  }
`

export const ContentfulLayoutModuleContainerFields = gql`
  ${ContentfulCtaFields}
  ${ContentfulEmbedFields}
  ${ContentfulHubSpotFormFields}
  ${ContentfulTimelineFields}
  ${ContentfulRichTextFields}
  ${ContentfulModuleContainerFields}
  fragment ContentfulLayoutModuleContainerFields on LayoutModuleContainer {
    __typename
    sys {
      id
    }
    eyebrow
    headline
    description
    modulesCollection(preview: true) {
      items {
        ...ContentfulCtaFields
        ...ContentfulEmbedFields
        ...ContentfulHubSpotFormFields
        ...ContentfulRichTextFields
        ...ContentfulTimelineFields
        ...ContentfulModuleContainerFields
      }
    }
    backgroundColor
    displayHeadline
    headlineAlignCenter
    contentAlignCenter
    headlineMarginTop0
    paddingTop
    sectionPadding
    noPaddingBottom
    modulesMargin
    isTab
    customClass
    sideImage {
      title
      description
      url
    }
    backgroundSize
    backgroundImage {
      title
      description
      url
    }
  }
`

export const ContentfulLayoutFields = gql`
  ${ContentfulLayoutHeaderFields}
  ${ContentfulLayoutFullWidthCtaFields}
  ${ContentfulLayoutHeroFields}
  ${ContentfulLayoutModuleContainerFields}
  ${ContentfulLayoutFooterFields}
  ${ContentfulLayoutFeatureFields}
  fragment ContentfulLayoutFields on Layout {
    __typename
    sys {
      id
    }
    themeColor
    h2FontSize
    isFaqLayout
    header(preview: true) {
      ...ContentfulLayoutHeaderFields
    }
    modulesCollection(preview: true) {
      items {
        ...ContentfulLayoutFeatureFields
        ...ContentfulLayoutFullWidthCtaFields
        ...ContentfulLayoutHeroFields
        ...ContentfulLayoutModuleContainerFields
      }
    }
    footer(preview: true) {
      ...ContentfulLayoutFooterFields
    }
  }
`
