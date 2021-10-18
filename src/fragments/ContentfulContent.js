import { graphql } from 'gatsby';

export const ContentfulLayoutHeaderFields = graphql`
  fragment ContentfulLayoutHeaderFields on ContentfulLayoutHeader {
    contentful_id
    internal {
      type
    }
    logo {
      fixed(quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
    downloadButton {
      ...ContentfulCtaFields
    }
  }
`;

export const ContentfulLayoutFooterFields = graphql`
  fragment ContentfulLayoutFooterFields on ContentfulLayoutFooter {
    contentful_id
    internal {
      type
    }
    logo {
      fixed(quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
    copyright
  }
`;

export const ContentfulLayoutHeroFields = graphql`
  fragment ContentfulLayoutHeroFields on ContentfulLayoutHero {
    contentful_id
    internal {
      type
    }
    headline
    description {
      internal {
        content
      }
    }
    eyebrowLogo {
      fixed(quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
    sideImage {
      fixed(quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
    ctaText
    ctaLink
    getInTouchPopup
    backgroundColor
    backgroundImage {
      fluid(quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`;

export const ContentfulLayoutFeatureFields = graphql`
  fragment ContentfulLayoutFeatureFields on ContentfulLayoutFeature {
    contentful_id
    internal {
      type
    }
    headline
    description {
      internal {
        content
      }
    }
    image {
      fixed(quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
    contentAlignment
    ratioContentImage
    eyebrow
    ctaText
    ctaLink
    newTab
    backgroundColor
  }
`;

export const ContentfulLayoutFullWidthCtaFields = graphql`
  fragment ContentfulLayoutFullWidthCtaFields on ContentfulLayoutFullWidthCta {
    contentful_id
    internal {
      type
    }
    showLogoAnimation
    headline
    description {
      internal {
        content
      }
    }
    ctaText
    ctaLink
    backgroundColor
    newsletterSignUp
  }
`;

export const ContentfulLayoutModuleContainerFields = graphql`
  fragment ContentfulLayoutModuleContainerFields on ContentfulLayoutModuleContainer {
    internal {
        type
    }
    contentful_id
    headline
    description {
      internal {
        content
      }
    }
    backgroundColor
    displayHeadline
  }
`;

export const ContentfulCardFields = graphql`
  fragment ContentfulCardFields on ContentfulCard {
    contentful_id
    internal {
      type
    }
    title
    image {
      fluid(maxWidth: 600) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
    description {
      internal {
        content
      }
    }
    link
    newTab
    shadow
    showArrowIcon
  }
`;

export const ContentfulCtaFields = graphql`
  fragment ContentfulCtaFields on ContentfulCta {
    contentful_id
    internal {
      type
    }
    ctaLink
    displayText
    newTab
    buttonDisplay
  }
`;

export const ContentfulDownloadTabFields = graphql`
  fragment ContentfulDownloadTabFields on ContentfulDownloadTab {
    contentful_id
    internal {
      type
    }
    name
    headline
    image {
      fixed(quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
    downloadText
    downloadLink
  }
`;

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
    title
    displayTitle
  }
`;

export const ContentfulFaqFields = graphql`
  fragment ContentfulFaqFields on ContentfulFaq {
    contentful_id
    internal {
      type
    }
    question
    answer {
      internal {
          content
        }
    }
  }
`;

export const ContentfulLogoFields = graphql`
  fragment ContentfulPartnerFields on ContentfulPartner {
    contentful_id
    internal {
      type
    }
    logo {
      fixed(quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
    link
    newTab
    Title
    displayTitle
  }
`;

export const ContentfulRichTextFields = graphql`
  fragment ContentfulRichTextFields on ContentfulRichText {
    contentful_id
    internal {
      type
    }
    moduleId
    title
    body {
      internal {
        content
      }
    }
    displayTitle
  }
`;

export const ContentfulModuleContainerFields = graphql`
  fragment ContentfulModuleContainerFields on ContentfulModuleContainer {
    contentful_id
    internal {
        type
      }
    title
    description {
      internal {
        content
      }
    }
    columns
    contentAlignment
    splitModules
    displayTitle
  }
`;

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
      fixed(width: 1000, height: 600, quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
  }
`;
