import { graphql } from 'gatsby'

export const ContentfulLayoutHeaderFields = graphql`
  fragment ContentfulLayoutHeaderFields on ContentfulLayoutHeader {
    contentful_id
    node_locale
    internal {
      type
    }
    logo {
      ...ContentfulLogoFields
    }
    logoMobile {
      ...ContentfulLogoFields
    }
    menuItems {
      ... on ContentfulModuleContainer {
        columns
        title
        displayTitle
        modules {
          ... on ContentfulCta {
            ...ContentfulCtaFields
          }
        }
      }
      ...ContentfulCtaFields
    }
    downloadButton {
      ...ContentfulCtaFields
    }
    popupAnnouncement {
      ...ContentfulPopupAnnouncementFields
    }
    isSticky
  }
`

export const ContentfulLayoutFooterFields = graphql`
  fragment ContentfulLayoutFooterFields on ContentfulLayoutFooter {
    contentful_id
    node_locale
    internal {
      type
    }
    logo {
      ...ContentfulLogoFields
    }
    menuItems {
      ... on ContentfulModuleContainer {
        columns
        title
        displayTitle
        modules {
          ... on ContentfulCta {
            ...ContentfulCtaFields
          }
        }
      }
    }
    copyright
  }
`

export const ContentfulLayoutHeroFields = graphql`
  fragment ContentfulLayoutHeroFields on ContentfulLayoutHero {
    node_locale
    contentful_id
    internal {
      type
    }
    headline
    headlinePortfolio
    hideHeadline
    description {
      childMarkdownRemark {
        html
      }
    }
    descriptionPortfolio {
      childMarkdownRemark {
        html
      }
    }
    note
    eyebrow
    eyebrowLogo {
      ...ContentfulLogoFields
    }
    eyebrowMobileLogo {
      ...ContentfulLogoFields
    }
    eyebrowLogoDarkMode {
      ...ContentfulLogoFields
    }
    eyebrowMobileLogoDarkMode {
      ...ContentfulLogoFields
    }
    sideImageFlex
    sideImageFoxAnimation
    sideImage {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    sideImagePortfolio {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    sideImageDarkMode {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    sideImagePortfolioDarkMode {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    ctas {
      ...ContentfulCtaFields
    }
    hubSpotForm {
      ...ContentfulHubSpotFormFields
    }
    backgroundColor
    contentAlignment
    showLearnMore
    headlineBorderBottom
    hideHeadline
    showFavIcon
    sectionPadding
    backgroundImage {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    backgroundImageDarkMode {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    customClass
  }
`

export const ContentfulLayoutFeatureFields = graphql`
  fragment ContentfulLayoutFeatureFields on ContentfulLayoutFeature {
    node_locale
    contentful_id
    internal {
      type
    }
    headline
    description {
      childMarkdownRemark {
        html
      }
    }
    image {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1024, quality: 80)
    }
    embed {
      ...ContentfulEmbedFields
    }
    imageDarkMode {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1024, quality: 80)
    }
    imageMobile {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 768, quality: 80)
    }
    imageMobileDarkMode {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 768, quality: 80)
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
    backgroundImage {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    backgroundImageDarkMode {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    backgroundImageMobile {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    sectionPadding
    noPaddingBottom
    removeSectionPaddingBottomOnDesktop
    customClass
    moduleId
    launchDarklyFlag
    featureItems {
      ... on ContentfulLogo {
        ...ContentfulLogoFields
      }
      ... on ContentfulCard {
        ...ContentfulCardFields
      }
    }
    showFeatureItemsAsSlideImage
    cta {
      ...ContentfulCtaFields
    }
    ctaSecond {
      ...ContentfulCtaFields
    }
  }
`

export const ContentfulLayoutFeatureSliderFields = graphql`
  fragment ContentfulLayoutFeatureSliderFields on ContentfulLayoutFeatureSlider {
    node_locale
    contentful_id
    internal {
      type
    }
    headline
    description {
      childMarkdownRemark {
        html
      }
    }
    featureSliderItems {
      ... on ContentfulFeatureSliderItem {
        ...ContentfulFeatureSliderItemFields
      }
    }
    layoutType
    sectionPadding
    slideShow
    animation
    cta {
      ...ContentfulCtaFields
    }
    ctaSecond {
      ...ContentfulCtaFields
    }
    backgroundColor
    customClass
  }
`

export const ContentfulFeatureSliderItemFields = graphql`
  fragment ContentfulFeatureSliderItemFields on ContentfulFeatureSliderItem {
    node_locale
    contentful_id
    internal {
      type
    }
    title
    description {
      childMarkdownRemark {
        html
      }
    }
    image {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1024, quality: 80)
    }
    imageMobile {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1024, quality: 80)
    }
    hasShadow
    customClass
  }
`

export const ContentfulTimelineFields = graphql`
  fragment ContentfulTimelineFields on ContentfulTimeline {
    node_locale
    contentful_id
    internal {
      type
    }
    eyebrow
    headline {
      childMarkdownRemark {
        html
      }
    }
    description {
      childMarkdownRemark {
        html
      }
    }
    image {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    layout
    customClass
  }
`

export const ContentfulLayoutFullWidthCtaFields = graphql`
  fragment ContentfulLayoutFullWidthCtaFields on ContentfulLayoutFullWidthCta {
    node_locale
    contentful_id
    internal {
      type
    }
    showLogoAnimation
    logoType
    headline
    headlinePortfolio
    description {
      childMarkdownRemark {
        html
      }
    }
    marginBottom
    hubSpotForm {
      ...ContentfulHubSpotFormFields
    }
    embedHtml {
      ...ContentfulRichTextFields
    }
    ctas {
      ... on ContentfulCta {
        ...ContentfulCtaFields
      }
    }
    bordered
    backgroundImage {
      file {
        url
      }
    }
    backgroundImageMobile {
      file {
        url
      }
    }
    backgroundImageDarkMode {
      file {
        url
      }
    }
    backgroundImageMobileDarkMode {
      file {
        url
      }
    }
    backgroundColor
    sectionPadding
    noPaddingTop
    noPaddingBottom
    customClass
    moduleId
    headlineMarginTop0
    fullWidthBackground
  }
`

export const ContentfulLayoutModuleContainerFields = graphql`
  fragment ContentfulLayoutModuleContainerFields on ContentfulLayoutModuleContainer {
    node_locale
    internal {
      type
    }
    contentful_id
    eyebrow
    headline
    description {
      childMarkdownRemark {
        html
      }
    }
    modules {
      ... on ContentfulRichText {
        ...ContentfulRichTextFields
      }
      ... on ContentfulCta {
        ...ContentfulCtaFields
      }
      ... on ContentfulEmbed {
        ...ContentfulEmbedFields
      }
      ... on ContentfulModuleContainer {
        ...ContentfulModuleContainerFields
      }
      ... on ContentfulHubSpotForm {
        ...ContentfulHubSpotFormFields
      }
      ... on ContentfulTimeline {
        ...ContentfulTimelineFields
      }
    }
    cta {
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
    customClass
    moduleId
    sideImage {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    backgroundSize
    backgroundImage {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
  }
`

export const ContentfulConsenSysResourcesFields = graphql`
  fragment ContentfulConsenSysResourcesFields on ContentfulConsenSysResources {
    node_locale
    contentful_id
    internal {
      type
    }
    categoryId
    numberOfItem
    linkText
    link
    showDate
  }
`

export const ContentfulCardFields = graphql`
  fragment ContentfulCardFields on ContentfulCard {
    node_locale
    contentful_id
    internal {
      type
    }
    title
    image {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    imageDarkMode {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    imageMargin
    description {
      childMarkdownRemark {
        html
      }
    }
    link
    linkText
    cta {
      ...ContentfulCtaFields
    }
    newTab
    hubSpotForm {
      ...ContentfulHubSpotFormFields
    }
    video {
      ...ContentfulEmbedFields
    }
    backgroundColor
    backgroundImage {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    backgroundImageDarkMode {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    backgroundImageMobile {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    customClass
    layoutType
    layoutSize
    contentAlignment
  }
`

export const ContentfulCtaBaseFields = graphql`
  fragment ContentfulCtaBaseFields on ContentfulCta {
    node_locale
    contentful_id
    fontSize
    ctaLink
    displayText
    newTab
    buttonDisplay
    buttonGradient
    buttonSecondary
    hideButtonIcon
    eventLabel
    eventCategory
    socialLink
    showCaretRight
    buttonCaretDown
    launchDarklyFlag
    customClassName
    internal {
      type
    }
    hubSpotForm {
      ...ContentfulHubSpotFormFields
    }
    embedHTML {
      ...ContentfulEmbedFields
    }
    downloadBrowsers {
      internal {
        content
      }
    }
    isForDeveloper
  }
`

export const ContentfulCtaFields = graphql`
  fragment ContentfulCtaFields on ContentfulCta {
    ...ContentfulCtaBaseFields
    mobileCta {
      ...ContentfulCtaBaseFields
    }
    alternativeCta {
      ...ContentfulCtaBaseFields
    }
  }
`

export const ContentfulHubSpotFormFields = graphql`
  fragment ContentfulHubSpotFormFields on ContentfulHubSpotForm {
    node_locale
    contentful_id
    internal {
      type
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

export const ContentfulEmbedFields = graphql`
  fragment ContentfulEmbedFields on ContentfulEmbed {
    node_locale
    contentful_id
    internal {
      type
    }
    moduleId
    embed {
      embed
    }
    thumbnail {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    title
    displayTitle
    layoutType
    playOnPopup
    clickToPlayOnWholeCard
  }
`

export const ContentfulFaqFields = graphql`
  fragment ContentfulFaqFields on ContentfulFaq {
    node_locale
    contentful_id
    internal {
      type
    }
    question
    answer {
      childMarkdownRemark {
        html
      }
    }
    backgroundColor
    bordered
  }
`

export const ContentfulLogoFields = graphql`
  fragment ContentfulLogoFields on ContentfulLogo {
    node_locale
    contentful_id
    internal {
      type
    }
    title
    logo {
      title
      description
      svg {
        content # SVG content optimized with SVGO
        originalContent # Original SVG content
        dataURI # Optimized SVG as compact dataURI
        absolutePath #
        relativePath #
      }
      file {
        url
      }
      gatsbyImageData(width: 480, quality: 80)
    }
    logoDarkMode {
      title
      description
      svg {
        content # SVG content optimized with SVGO
        originalContent # Original SVG content
        dataURI # Optimized SVG as compact dataURI
        absolutePath #
        relativePath #
      }
      file {
        url
      }
      gatsbyImageData(width: 480, quality: 80)
    }
    link
    newTab
    displayTitle
    widthLogo
    backgroundColor
    customClass
  }
`

export const ContentfulModuleContainerFields = graphql`
  fragment ContentfulModuleContainerFields on ContentfulModuleContainer {
    node_locale
    contentful_id
    internal {
      type
    }
    title
    description {
      childMarkdownRemark {
        html
      }
    }
    numberOfItem
    columns
    columnType
    columnsOnTablet
    centerOnTablet
    columnsOnMobile
    centerOnMobile
    contentAlignment
    splitModules
    displayTitle
    isLiquiditySection
    isTrustBar
    carouselMode
    gridModulesGap
    hasRegionSelector
    loadMoreMode
    loadMoreCta {
      ...ContentfulCtaFields
    }
    regionSelectorHeadline
    regionSelectorPopupTitle
    regionSelectorPopupText
    regionListKey
    extraData {
      internal {
        content
      }
    }
    modules {
      ... on ContentfulEmbed {
        ...ContentfulEmbedFields
      }
      ... on ContentfulLogo {
        ...ContentfulLogoFields
      }
      ... on ContentfulConsenSysResources {
        ...ContentfulConsenSysResourcesFields
      }
      ... on ContentfulFaq {
        ...ContentfulFaqFields
      }
      ... on ContentfulCard {
        ...ContentfulCardFields
      }
      ... on ContentfulRichText {
        ...ContentfulRichTextFields
      }
      ... on ContentfulCta {
        ...ContentfulCtaFields
      }
      ... on ContentfulNewsCategory {
        ...ContentfulNewsCategoryFields
      }
      ... on ContentfulHubSpotForm {
        ...ContentfulHubSpotFormFields
      }
      ... on ContentfulTimeline {
        ...ContentfulTimelineFields
      }
      ... on ContentfulModuleContainer {
        contentful_id
        internal {
          type
        }
        title
        description {
          childMarkdownRemark {
            html
          }
        }
        columns
        columnType
        columnsOnMobile
        centerOnMobile
        contentAlignment
        splitModules
        displayTitle
        isLiquiditySection
        gridModulesGap
        modules {
          ... on ContentfulCard {
            ...ContentfulCardFields
          }
          ... on ContentfulCta {
            ...ContentfulCtaFields
          }
          ... on ContentfulRichText {
            ...ContentfulRichTextFields
          }
          ... on ContentfulLogo {
            ...ContentfulLogoFields
          }
          ... on ContentfulModuleContainer {
            contentful_id
            internal {
              type
            }
            title
            description {
              childMarkdownRemark {
                html
              }
            }
            columns
            columnType
            columnsOnMobile
            centerOnMobile
            contentAlignment
            splitModules
            displayTitle
            isLiquiditySection
            gridModulesGap
            modules {
              ... on ContentfulCard {
                ...ContentfulCardFields
              }
              ... on ContentfulCta {
                ...ContentfulCtaFields
              }
              ... on ContentfulRichText {
                ...ContentfulRichTextFields
              }
              ... on ContentfulLogo {
                ...ContentfulLogoFields
              }
            }
          }
        }
      }
    }
  }
`

export const ContentfulNewsAuthorFields = graphql`
  fragment ContentfulNewsAuthorFields on ContentfulNewsAuthor {
    node_locale
    contentful_id
    internal {
      type
    }
    name
    position
    image {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 200, quality: 80)
    }
    expertise
    education {
      childMarkdownRemark {
        html
      }
    }
    description {
      childMarkdownRemark {
        html
      }
    }
    twitter
    linkedin
    seo {
      ...ContentfulSeoFields
    }
  }
`

export const ContentfulNewsFields = graphql`
  fragment ContentfulNewsFields on ContentfulNews {
    node_locale
    contentful_id
    internal {
      type
    }
    title
    slug
    subtitle
    image {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 1920, quality: 80)
    }
    publishDate(formatString: "MMMM D, YYYY")
    authors {
      name
      createProfilePage
      profileUrl
    }
    content {
      childMarkdownRemark {
        html
      }
    }
    categories {
      ... on ContentfulNewsCategory {
        ...ContentfulNewsCategoryFields
      }
    }
    metaTitle
    metaDescription
    canonicalUrl
    isPrivate
  }
`

export const ContentfulNewsCategoryFields = graphql`
  fragment ContentfulNewsCategoryFields on ContentfulNewsCategory {
    contentful_id
    node_locale
    internal {
      type
    }
    name
    parent {
      ... on ContentfulNewsCategory {
        contentful_id
        name
      }
    }
  }
`

export const ContentfulPopupAnnouncementFields = graphql`
  fragment ContentfulPopupAnnouncementFields on ContentfulPopupAnnouncement {
    node_locale
    contentful_id
    internal {
      type
    }
    title
    ctaText
    ctaLink
    backgroundColor
    image {
      title
      description
      file {
        url
      }
      gatsbyImageData(width: 768, quality: 100)
    }
  }
`

export const ContentfulRichTextFields = graphql`
  fragment ContentfulRichTextFields on ContentfulRichText {
    node_locale
    contentful_id
    internal {
      type
    }
    moduleId
    title
    htmlBody {
      childMarkdownRemark {
        html
      }
    }
    displayTitle
  }
`

export const ContentfulSeoFields = graphql`
  fragment ContentfulSeoFields on ContentfulSeo {
    node_locale
    contentful_id
    internal {
      type
    }
    pageTitle
    pageDescription
    metaTags {
      internal {
        content
      }
    }
    linkTags {
      internal {
        content
      }
    }
    featuredImage {
      file {
        url
      }
      gatsbyImageData(width: 768, quality: 100)
    }
  }
`

export const ContentfulPortfolioIntro = graphql`
  fragment ContentfulPortfolioIntroFields on ContentfulPortfolioIntro {
    contentful_id
    node_locale
    internal {
      type
    }
    title
    ctaLabel
    description {
      childMarkdownRemark {
        html
      }
    }
  }
`

export const ContentfulPortfolioInstructions = graphql`
  fragment ContentfulPortfolioInstructionsFields on ContentfulPortfolioInstructions {
    contentful_id
    node_locale
    internal {
      type
    }
    steps {
      title
      mobileTitle
      ctaLabel
      description {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export const ContentfulPortfolioListLogo = graphql`
  fragment ContentfulPortfolioListLogoFields on ContentfulPortfolioListLogo {
    contentful_id
    node_locale
    internal {
      type
    }
    title
    logos {
      ...ContentfulLogoFields
    }
  }
`

export const ContentfulPortfolioFeatureDetail = graphql`
  fragment ContentfulPortfolioFeatureDetailFields on ContentfulPortfolioFeatureDetail {
    contentful_id
    node_locale
    description {
      childMarkdownRemark {
        html
      }
    }
    title
    subTitle {
      childMarkdownRemark {
        html
      }
    }
    icon {
      title
      file {
        url
      }
    }
    linkSectionTitle
    links {
      displayText
      ctaLink
      newTab
      badge {
        title
        background
      }
    }
    video {
      ...ContentfulEmbedFields
    }
    logos {
      ...ContentfulPortfolioListLogoFields
    }
  }
`

export const ContentfulPortfolioFeature = graphql`
  fragment ContentfulPortfolioFeatureFields on ContentfulPortfolioFeature {
    contentful_id
    node_locale
    internal {
      type
    }
    mapCoordX
    mapCoordY
    markerLabel
    markerMobileAlignment
    icon {
      title
      file {
        url
      }
    }
    title
    themeColor
    detail {
      ... on ContentfulPortfolioFeatureDetail {
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

export const ContentfulPortfolioMap = graphql`
  fragment ContentfulPortfolioMapFields on ContentfulPortfolioMap {
    contentful_id
    node_locale
    internal {
      type
    }
    title
    features {
      ...ContentfulPortfolioFeatureFields
    }
  }
`
