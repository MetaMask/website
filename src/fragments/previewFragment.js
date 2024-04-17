import gql from 'graphql-tag'

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
    customClass
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
    clickToPlayOnWholeCard
  }
`

export const ContentfulPortfolioIntroFields = gql`
  fragment ContentfulPortfolioIntroFields on PortfolioIntro {
    __typename
    sys {
      id
    }
    title
    ctaLabel
    description
  }
`

export const ContentfulPortfolioInstructionsFields = gql`
  fragment ContentfulPortfolioInstructionsFields on PortfolioInstructions {
    __typename
    sys {
      id
    }
    stepsCollection(preview: true) {
      items {
        title
        mobileTitle
        ctaLabel
        description
      }
    }
  }
`

export const ContentfulPortfolioListLogoFields = gql`
  ${ContentfulLogoFields}
  fragment ContentfulPortfolioListLogoFields on PortfolioListLogo {
    __typename
    sys {
      id
    }
    title
    logosCollection(preview: true) {
      items {
        ...ContentfulLogoFields
      }
    }
  }
`

export const ContentfulPortfolioFeatureDetailFields = gql`
  ${ContentfulEmbedFields}
  ${ContentfulPortfolioListLogoFields}
  fragment ContentfulPortfolioFeatureDetailFields on PortfolioFeatureDetail {
    __typename
    sys {
      id
    }
    description
    title
    subTitle
    icon {
      title
      url
    }
    linkSectionTitle
    linksCollection(preview: true) {
      items {
        displayText
        ctaLink
        newTab
        badge {
          title
          background
        }
      }
    }
    video {
      ...ContentfulEmbedFields
    }
    logosCollection(preview: true) {
      items {
        ...ContentfulPortfolioListLogoFields
      }
    }
  }
`

export const ContentfulPortfolioFeatureFields = gql`
  ${ContentfulPortfolioFeatureDetailFields}
  fragment ContentfulPortfolioFeatureFields on PortfolioFeature {
    __typename
    sys {
      id
    }
    mapCoordX
    mapCoordY
    markerLabel
    markerMobileAlignment
    icon {
      title
      url
    }
    title
    themeColor
    detailCollection {
      items {
        ...ContentfulPortfolioFeatureDetailFields
      }
    }
    maskChannel
    pinPos
    canvasX
    canvasY
    canvasWidth
    canvasHeight
  }
`

export const ContentfulPortfolioMapFields = gql`
  ${ContentfulPortfolioFeatureFields}
  fragment ContentfulPortfolioMapFields on PortfolioMap {
    __typename
    sys {
      id
    }
    title
    featuresCollection {
      items {
        ...ContentfulPortfolioFeatureFields
      }
    }
  }
`

export const ContentfulNewsAuthorFields = gql`
  fragment ContentfulNewsAuthorFields on NewsAuthor {
    __typename
    sys {
      id
    }
    name
    position
    image(preview: true) {
      title
      description
      url
    }
    expertise
    education
    description
    twitter
    linkedin
  }
`

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
        createProfilePage
        profileUrl
      }
    }
    publishDate
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
    hideButtonIcon
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
    showCaretRight
    buttonCaretDown
    mobileCta {
      ...ContentfulCtaFields
    }
    alternativeCta {
      ...ContentfulCtaFields
    }
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
    headlinePortfolio
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
    noPaddingTop
    noPaddingBottom
    bordered
    backgroundImage(preview: true) {
      url
    }
    backgroundImageDarkMode(preview: true) {
      url
    }
    backgroundImageMobile(preview: true) {
      url
    }
    backgroundImageMobileDarkMode(preview: true) {
      url
    }
    headlineMarginTop0
    fullWidthBackground
    moduleId
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
    backgroundImageDarkMode(preview: true) {
      url
    }
    backgroundImageMobile(preview: true) {
      url
    }
    customClass
    hubSpotForm(preview: true) {
      ...ContentfulHubSpotFormFields
    }
    video(preview: true) {
      ...ContentfulEmbedFields
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
    bordered
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
    columnsOnTablet
    centerOnTablet
    columnsOnMobile
    centerOnMobile
    columnType
    gridModulesGap
    splitModules
    isLiquiditySection
    isTrustBar
    displayTitle
    carouselMode
    loadMoreMode
    loadMoreCta(preview: true) {
      ...ContentfulCtaFields
    }
    hasRegionSelector
    regionSelectorHeadline
    regionSelectorPopupTitle
    regionSelectorPopupText
    regionListKey
    extraData
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
        ...ContentfulCtaFields
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
    headlinePortfolio
    hideHeadline
    description
    descriptionPortfolio
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
    sideImagePortfolio(preview: true) {
      title
      description
      url
    }
    sideImageDarkMode(preview: true) {
      title
      description
      url
    }
    sideImagePortfolioDarkMode(preview: true) {
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
    learnMoreText
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
    removeSectionPaddingBottomOnDesktop
    moduleId
    customClass
    featureItemsCollection(preview: true) {
      items {
        ...ContentfulCardFields
        ...ContentfulLogoFields
      }
    }
    showFeatureItemsAsSlideImage
    cta(preview: true) {
      ...ContentfulCtaFields
    }
    ctaSecond(preview: true) {
      ...ContentfulCtaFields
    }
  }
`

export const ContentfulFeatureSliderItemFields = gql`
  fragment ContentfulFeatureSliderItemFields on FeatureSliderItem {
    __typename
    sys {
      id
    }
    title
    description
    image(preview: true) {
      title
      description
      url
    }
    imageMobile(preview: true) {
      title
      description
      url
    }
    hasShadow
    customClass
  }
`

export const ContentfulLayoutFeatureSliderFields = gql`
  ${ContentfulFeatureSliderItemFields}
  ${ContentfulCtaFields}
  fragment ContentfulLayoutFeatureSliderFields on LayoutFeatureSlider {
    __typename
    sys {
      id
    }
    headline
    description
    featureSliderItemsCollection(preview: true) {
      items {
        ...ContentfulFeatureSliderItemFields
      }
    }
    layoutType
    sectionPadding
    slideShow
    animation
    cta(preview: true) {
      ...ContentfulCtaFields
    }
    ctaSecond(preview: true) {
      ...ContentfulCtaFields
    }
    backgroundColor
    customClass
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
    cta(preview: true) {
      ...ContentfulCtaFields
    }
    backgroundColor
    displayHeadline
    headlineAlignCenter
    contentAlignCenter
    headlineMarginTop0
    paddingTop
    sectionPadding
    noPaddingTop
    noPaddingBottom
    modulesMargin
    isTab
    moduleId
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
  ${ContentfulLayoutFeatureSliderFields}
  ${ContentfulPortfolioIntroFields}
  ${ContentfulPortfolioInstructionsFields}
  ${ContentfulPortfolioMapFields}
  fragment ContentfulLayoutFields on Layout {
    __typename
    sys {
      id
    }
    themeColor
    h2FontSize
    isFaqLayout
    widerContainer
    slug
    header(preview: true) {
      ...ContentfulLayoutHeaderFields
    }
    translation
    pageType
    modulesCollection(preview: true) {
      items {
        ...ContentfulLayoutFeatureFields
        ...ContentfulLayoutFullWidthCtaFields
        ...ContentfulLayoutHeroFields
        ...ContentfulLayoutModuleContainerFields
        ...ContentfulLayoutFeatureSliderFields
        ...ContentfulPortfolioIntroFields
        ...ContentfulPortfolioInstructionsFields
        ...ContentfulPortfolioMapFields
      }
    }
    footer(preview: true) {
      ...ContentfulLayoutFooterFields
    }
  }
`
