import { graphql } from 'gatsby';

export const ContentfulSeoFields = graphql`
  fragment ContentfulSeoFields on ContentfulSeo {
    contentful_id
    internal {
      type
    }
    seoPageTitle
    seoPageDescription
    seoMetaTags {
      internal {
        content
      }
    }
    seoLinkTags {
      internal {
        content
      }
    }
    seoFeaturedImage {
      fixed(width: 1000, height: 600, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
  }
`;

export const ContentfulCardFields = graphql`
  fragment ContentfulCardFields on ContentfulCard {
    contentful_id
    internal {
      type
    }
    cardTitle
    cardImage {
      fluid(maxWidth: 600) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    cardDescription {
      internal {
        content
      }
    }
    cardLink
    cardLinkText
    cardLinkOpensNewTab
    isFeatured
    featuredBackground {
      fluid(maxWidth: 2000) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`;

export const ContentfulModuleContainerFields = graphql`
  fragment ContentfulModuleContainerFields on ContentfulModuleContainer {
    containerWidth
    contentful_id
    columns
    displayModuleName
    moduleName
    internal {
      type
    }
  }
`;


export const ContentfulProfileFields = graphql`
  fragment ContentfulProfileFields on ContentfulProfile {
    contentful_id
    internal {
      type
    }
    profileTitle
    profileSubtitle
    profileImage {
      fixed(width: 100, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
    profileDescription
    profileTwitterLink
    profileLinkedInLink
    profileContentAlignment
  }
`;

export const ContentfulCtaFields = graphql`
  fragment ContentfulCtaFields on ContentfulCta {
    contentful_id
    internal {
      type
    }
    ctaAlignment
    ctaLink
    ctaNewTab
    ctaText
    isButton
  }
`;

export const ContentfulSectionTextFields = graphql`
  fragment ContentfulSectionTextFields on ContentfulSectionText {
    contentful_id
    internal {
      type
    }
    displayTitle
    sectionTitle
    sectionBody {
      internal {
        content
      }
    }
  }
`;

export const ContentfulHeroFields = graphql`
  fragment ContentfulHeroFields on ContentfulHero {
    contentful_id
    internal {
      type
    }
    heroTitle
    heroSubtitle
    heroEyebrow
    heroCtaLink
    heroCtaText
    heroTheme {
      heroHeight
      heroFontSize
      heroLineHeight
      heroPadding
    }
    modules {
      ...on ContentfulModuleContainer {
        ...ContentfulModuleContainerFields
        moduleName
        modules {
          ...on ContentfulSectionText {
            ...ContentfulSectionTextFields
          }
        }
      }
      ...on ContentfulSectionText {
        ...ContentfulSectionTextFields
      }
    }
    heroBackgroundImage {
      fluid(maxWidth: 3000, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`;

export const ContentfulPageSubHeaderFields = graphql`
  fragment ContentfulPageSubHeaderFields on ContentfulPageSubHeader {
    contentful_id
    internal {
      type
    }
    subheaderLinks {
      ...ContentfulPageLinkFields
    }
    subheaderBackgroundColor
  }
`;

export const ContentfulFooterNavMenuFields = graphql`
  fragment ContentfulFooterNavMenuFields on ContentfulFooterNavMenu {
    contentful_id
    internal {
      type
    }
    config {
      columns
      moduleName
      modules {
        ...on ContentfulModuleContainer {
          moduleName
          modules {
            ...on ContentfulPageLink {
              ...ContentfulPageLinkFields
            }
          }
        }
      }
    }
  }
`;



export const ContentfulHtmlEmbedFields = graphql`
  fragment ContentfulHtmlEmbedFields on ContentfulHtmlEmbed {
    contentful_id
    internal {
      type
    }
    embedTag {
      embedTag
    }
    htmlPublishDate
    htmlEmbedTitle
    htmlBackground {
      file {
        url
      }
    }
  }
`;

export const ContentfulSplitTextFields = graphql`
  fragment ContentfulSplitTextFields on ContentfulSplitText {
    contentful_id
    internal {
      type
    }
    splitTextBody {
      internal {
        content
      }
    }
    splitTextDescription {
      internal {
        content
      }
    }
  }
`;

export const ContentfulPartnerFields = graphql`
  fragment ContentfulPartnerFields on ContentfulPartner {
    contentful_id
    internal {
      type
    }
    partnerLogo {
      fixed(quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
    partnerLink
    partnerLinkOpensNewTab
    partnerTitle
  }
`;


export const ContentfulHeaderNavMenuFields = graphql`
  fragment ContentfulHeaderNavMenuFields on ContentfulHeaderNavMenu {
    contentful_id
    internal {
      type
    }
    links {
      ...ContentfulPageLinkFields
    }
    menuName
    shadow
    ctaButton {
      navigateTo
      action
      active
      text
    }
  }
`;


export const ContentfulPageLinkFields = graphql`
  fragment ContentfulPageLinkFields on ContentfulPageLink {
    contentful_id
    internal {
      type
    }
    to
    text
    newTab
    linkName
    isPrivateRoute
  }
`;

export const ContentfulArticleCategoryFields = graphql`
  fragment ContentfulArticleCategoryFields on ContentfulArticleCategory {
    contentful_id
    internal {
      type
    }
    categoryName
    parentCategory {
      ...on ContentfulArticleCategory {
        contentful_id
        categoryName
      }
    }
  }
`;

export const ContentfulArticlePageFields = graphql`
  fragment ContentfulArticlePageFields on ContentfulArticlePage {
    contentful_id
    internal {
      type
    }
    articleSubtitle
    articleTitle
    articlePublishDate
    articleThemeColor
    articleHeroImage {
      ...HeroImageContentful
    }
    articleThumbnail {
      fluid(maxWidth: 600, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    isPrivate
    articleContent {
      internal {
        content
      }
    }
    articleAuthors {
      ...ContentfulProfileFields
    }
    articleCategories {
      ...ContentfulArticleCategoryFields
    }
    primaryCategory {
      ...ContentfulArticleCategoryFields
    }
    articleHeader {
      ...ContentfulHeaderNavMenuFields
    }
    articleFooter {
      ...ContentfulFooterNavMenuFields
    }
  }
`;

export const ContentfulArticleListFields = graphql`
  fragment ContentfulArticleListFields on ContentfulArticleList {
    contentful_id
    internal {
      type
    }
    allArticles
    articleListTitle
    articles {
      ...ContentfulArticlePageFields
    }
    columns
    containerWidth
  }
`;

// add isPrivateRoute
