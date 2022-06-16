import { graphql } from 'gatsby'

export const ContentfulLayoutHeaderFields = graphql`
  fragment ContentfulLayoutHeaderFields on ContentfulLayoutHeader {
    contentful_id
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
    downloadButton {
      ...ContentfulCtaFields
    }
    popupAnnouncement {
      ...ContentfulPopupAnnouncementFields
    }
  }
`

export const ContentfulLayoutFooterFields = graphql`
  fragment ContentfulLayoutFooterFields on ContentfulLayoutFooter {
    contentful_id
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
    contentful_id
    internal {
      type
    }
    headline
    hideHeadline
    description {
      childMarkdownRemark {
        html
      }
    }
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
    sideImage {
      title
      description
      file {
        url
      }
      fluid(maxWidth: 1024, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    sideImageDarkMode {
      title
      description
      file {
        url
      }
      fluid(maxWidth: 1200, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
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
      fluid(maxWidth: 1920, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    customClass
  }
`

export const ContentfulLayoutFeatureFields = graphql`
  fragment ContentfulLayoutFeatureFields on ContentfulLayoutFeature {
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
      fluid(maxWidth: 1024, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    imageDarkMode {
      title
      description
      file {
        url
      }
      fluid(maxWidth: 1024, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    imageMobile {
      title
      description
      file {
        url
      }
      fluid(maxWidth: 768, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    imageMobileDarkMode {
      title
      description
      file {
        url
      }
      fluid(maxWidth: 768, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
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
    sectionPadding
    noPaddingBottom
    customClass
    featureItems {
      ... on ContentfulLogo {
        ...ContentfulLogoFields
      }
      ... on ContentfulCard {
        ...ContentfulCardFields
      }
    }
    cta {
      ...ContentfulCtaFields
    }
  }
`

export const ContentfulLayoutFullWidthCtaFields = graphql`
  fragment ContentfulLayoutFullWidthCtaFields on ContentfulLayoutFullWidthCta {
    contentful_id
    internal {
      type
    }
    showLogoAnimation
    logoType
    headline
    description {
      childMarkdownRemark {
        html
      }
    }
    marginBottom
    hubSpotForm {
      ...ContentfulHubSpotFormFields
    }
    ctas {
      ... on ContentfulCta {
        ...ContentfulCtaFields
      }
    }
    backgroundColor
    sectionPadding
  }
`

export const ContentfulLayoutModuleContainerFields = graphql`
  fragment ContentfulLayoutModuleContainerFields on ContentfulLayoutModuleContainer {
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
    }
    backgroundColor
    displayHeadline
    headlineAlignCenter
    contentAlignCenter
    paddingTop
    sectionPadding
    noPaddingBottom
    modulesMargin
    isTab
    customClass
    sideImage {
      title
      description
      file {
        url
      }
      fluid(quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    backgroundSize
    backgroundImage {
      title
      description
      file {
        url
      }
      fluid(maxWidth: 1920, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`

export const ContentfulConsenSysResourcesFields = graphql`
  fragment ContentfulConsenSysResourcesFields on ContentfulConsenSysResources {
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
      fluid(maxWidth: 1024, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    imageDarkMode {
      title
      description
      file {
        url
      }
      fluid(maxWidth: 1024, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    imageMargin
    description {
      childMarkdownRemark {
        html
      }
    }
    link
    linkText
    newTab
    backgroundColor
    layoutType
    layoutSize
    contentAlignment
  }
`

export const ContentfulCtaFields = graphql`
  fragment ContentfulCtaFields on ContentfulCta {
    contentful_id
    internal {
      type
    }
    fontSize
    ctaLink
    displayText
    newTab
    buttonDisplay
    buttonGradient
    buttonSecondary
    eventLabel
    eventCategory
    hubSpotForm {
      ...ContentfulHubSpotFormFields
    }
    socialLink
    downloadBrowsers {
      internal {
        content
      }
    }
  }
`

export const ContentfulHubSpotFormFields = graphql`
  fragment ContentfulHubSpotFormFields on ContentfulHubSpotForm {
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
  }
`

export const ContentfulEmbedFields = graphql`
  fragment ContentfulEmbedFields on ContentfulEmbed {
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
      fluid(maxWidth: 1024, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    title
    displayTitle
    layoutType
    playOnPopup
  }
`

export const ContentfulFaqFields = graphql`
  fragment ContentfulFaqFields on ContentfulFaq {
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
  }
`

export const ContentfulLogoFields = graphql`
  fragment ContentfulLogoFields on ContentfulLogo {
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
      fluid(maxWidth: 480, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
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
      fluid(maxWidth: 480, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    link
    newTab
    displayTitle
    widthLogo
    backgroundColor
  }
`

export const ContentfulModuleContainerFields = graphql`
  fragment ContentfulModuleContainerFields on ContentfulModuleContainer {
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
    columnsOnMobile
    contentAlignment
    splitModules
    displayTitle
    isLiquiditySection
    gridModulesGap
    modules {
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

export const ContentfulNewsFields = graphql`
  fragment ContentfulNewsFields on ContentfulNews {
    contentful_id
    internal {
      type
    }
    title
    subtitle
    image {
      title
      description
      file {
        url
      }
      fluid(maxWidth: 1920, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    author {
      ...ContentfulNewsAuthorFields
    }
    publishDate
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
    isPrivate
  }
`

export const ContentfulNewsAuthorFields = graphql`
  fragment ContentfulNewsAuthorFields on ContentfulNewsAuthor {
    contentful_id
    internal {
      type
    }
    name
    image {
      title
      description
      file {
        url
      }
      fluid(maxWidth: 80, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    imageDarkMode {
      title
      description
      file {
        url
      }
      fluid(maxWidth: 80, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    link
  }
`

export const ContentfulNewsCategoryFields = graphql`
  fragment ContentfulNewsCategoryFields on ContentfulNewsCategory {
    contentful_id
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
    contentful_id
    internal {
      type
    }
    title
    ctaText
    ctaLink
    backgroundColor
  }
`

export const ContentfulRichTextFields = graphql`
  fragment ContentfulRichTextFields on ContentfulRichText {
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
    }
  }
`
