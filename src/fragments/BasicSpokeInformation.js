import { graphql } from 'gatsby';
export const BasicSpokeInformation = graphql`
  fragment BasicSpokeInformation on SpokeDatabase {
    data {
      Company_Name
      Description
      Website
    }
  }
`;
