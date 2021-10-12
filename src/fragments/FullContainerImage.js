import { graphql } from 'gatsby';

export const FullContainerImageSharp = graphql`
  fragment FullContainerImageSharp on ImageSharp {
    fluid(maxWidth: 1170) {
      ...GatsbyImageSharpFluid
    }
  }
`;

export const HeroImageSharp = graphql`
  fragment HeroImageSharp on ImageSharp {
    fluid(maxWidth: 3000) {
      ...GatsbyImageSharpFluid
    }
  }
`;

export const FullContainerImageContentful = graphql`
  fragment FullContainerImageContentful on ContentfulAsset {
    fluid(maxWidth: 1170, quality: 100, toFormat: WEBP) {
      ...GatsbyContentfulFluid_withWebp
    }
  }
`;

export const HeroImageContentful = graphql`
  fragment HeroImageContentful on ContentfulAsset {
    fluid(maxWidth: 3000, quality: 100, toFormat: WEBP) {
      ...GatsbyContentfulFluid_withWebp
    }
  }
`;
