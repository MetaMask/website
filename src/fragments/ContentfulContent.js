import { graphql } from 'gatsby';

export const ContentfulLayoutHeaderFields = graphql`
  fragment ContentfulLayoutHeaderFields on ContentfulLayoutHeader {
    contentful_id
    internal {
      type
    }
    logo {
      ...ContentfulLogoFields
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
      ...ContentfulLogoFields
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
      childMarkdownRemark {
        html
      }
    }
    eyebrowLogo {
      ...ContentfulLogoFields
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
    contentAlignment
    showLearnMore
    headlineBorderBottom
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
      childMarkdownRemark {
        html
      }
    }
    image {
      fixed(quality: 100, toFormat: WEBP) {
        ...GatsbyContentfulFixed_withWebp
      }
    }
    imageMobile {
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
      childMarkdownRemark {
        html
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
      childMarkdownRemark {
        html
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
      childMarkdownRemark {
        html
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

export const ContentfulHubSpotFormFields = graphql`
  fragment ContentfulHubSpotFormFields on ContentfulHubSpotForm {
    contentful_id
    internal {
      type
    }
    title
    portalId
    formId
    displayTitle
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
      childMarkdownRemark {
        html
      }
    }
  }
`;

export const ContentfulLogoFields = graphql`
  fragment ContentfulLogoFields on ContentfulLogo {
    contentful_id
    internal {
      type
    }
    title
    logo {
      file {
        url
        fileName
      }
    }
    link
    newTab
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
      childMarkdownRemark {
        html
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
