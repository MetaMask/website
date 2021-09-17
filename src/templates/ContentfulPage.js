import React from 'react';
import { graphql } from 'gatsby';
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent';
import { flatMapDeep, isArray } from 'lodash';
import PrivateLayout from './PrivatePageLayout';
import PublicLayout from './PublicPageLayout';
import { lightTheme, darkTheme } from '../lib/theme';

/**
 * @name ContentfulPage
 * @summary -
 * @description -
 */
const ContentfulPage = (props) => {
  const {
    data: {
      header,
      footer,
      seo,
      heroes: H,
      sections: S,
      moduleContainers: MC,
      cards: C,
      ctas: CTA,
      htmlEmbeds: HTML,
      subheader: SH,
      articleList: AL,
      splitTexts: ST,
      partners: P,
    },
    pageContext: {
      modules,
      accessLevel,
      themeColor,
      pathBuild,
    },
    path,
    ...rest
  } = props;

  // takes all modules single content type for a page and returns all instances
  const getNodes = (mods) => {
    if(!mods) return;
    else if (isArray(mods.edges)) return getNodes(mods.edges)
    return isArray(mods) ? mods.map(n => n.node) : mods;
  };

  // extract all top-level page modules from GraphQL and return in a flat array for rendering
  const pageModules = flatMapDeep([H,S,MC,C,CTA,HTML,SH,AL,ST,P], getNodes);

  // Take unordered list of data from pageModules and reorder
  // based on contentful_id sequence in pageContext.modules
  // returned by CMS to maintain page structure
  const orderedPageModules = pageModules.reduce((acc, node) => {
    if( !node || !node.contentful_id ) return acc;
    const positionInPage = modules.indexOf(node.contentful_id);
    acc.splice(positionInPage, 1, node); // remove empty element and replace with module data
    return acc;
  }, Array(modules.length - 1)); // prepopulate array so we can insert last elements if they appear first

  const allModules = [header, ...orderedPageModules, footer];

  // TODO turn this into an actual test
  // const mockModules = [header.contentful_id, ...modules, footer.contentful_id];
  // const checkValidity = allModules.reduce((acc, mod, i) => {
  //   const isCorrectPosition = i === mockModules.indexOf(mod.contentful_id);
  //   return acc && isCorrectPosition;
  // }, true);

  const Layout = accessLevel === "public" ?  PublicLayout : PrivateLayout;
  const theme = themeColor === "light" ? lightTheme : darkTheme;

  return (
    <Layout
      theme={theme}
      accessLevel={accessLevel}
      {...rest}
    >
      {seo && contentfulModuleToComponent({ ...seo, seoPagePath: pathBuild })}
      {allModules.map(contentfulModuleToComponent)}
    </Layout>
  );
};

export default ContentfulPage;

export const ContentfulQuery = graphql`
query(
  $modules: [String]!,
  $headerId: String!,
  $footerId: String!,
  $seoId: String,
) { 
  header:
    contentfulHeaderNavMenu (
      contentful_id: { eq: $headerId }
    ) {
      ...ContentfulHeaderNavMenuFields
    }
  
  footer:
    contentfulFooterNavMenu (
      contentful_id: { eq: $footerId }
    ) {
      ...ContentfulFooterNavMenuFields
    }
  
  seo:
    contentfulSeo (
      contentful_id: { eq: $seoId }
    ) {
      ...ContentfulSeoFields
    }

  subheader:
    allContentfulPageSubHeader (
      filter: { contentful_id: { in: $modules } }
    ) {
      edges {
        node {
          ...ContentfulPageSubHeaderFields
        }
      }
    }

  heroes:
    allContentfulHero(
      filter: { contentful_id: { in: $modules } }
    ) {
      edges {
        node {
          ...ContentfulHeroFields
        }
      }
    }

  sections:
    allContentfulSectionText(
      filter: { contentful_id: { in: $modules } }
    ) {
      edges {
        node {
          ...ContentfulSectionTextFields
        }
      }
    }

  htmlEmbeds:
    allContentfulHtmlEmbed(
      filter: { contentful_id: { in: $modules } }
    ) {
      edges {
        node {
          ...ContentfulHtmlEmbedFields
        }
      }
    }

  splitTexts:
    allContentfulSplitText(
      filter: { contentful_id: { in: $modules } }
    ) {
      edges {
        node {
          ...ContentfulSplitTextFields
        }
      }
    }
  partners:
    allContentfulPartner(
      filter: { contentful_id: { in: $modules } }
    ) {
      edges {
        node {
          ...ContentfulPartnerFields
        }
      }
    }

  moduleContainers:
    allContentfulModuleContainer(
      filter: { contentful_id: { in: $modules } }
    ) {
      edges {
        node {
          ...ContentfulModuleContainerFields
          modules {
            ...on ContentfulCard {
              ...ContentfulCardFields
            }
            ...on ContentfulProfile {
              ...ContentfulProfileFields
            }
            ...on ContentfulSectionText {
              ...ContentfulSectionTextFields
            }
            ...on ContentfulCta {
              ...ContentfulCtaFields
            }
            ...on ContentfulPageLink {
              ...ContentfulPageLinkFields
            }
            ...on ContentfulHtmlEmbed {
              ...ContentfulHtmlEmbedFields
            }
            ...on ContentfulPartner {
              ...ContentfulPartnerFields
            }
          }
        }
      }
    }

  cards:
    allContentfulCard(
      filter: { contentful_id: { in: $modules } }
    ) {
      edges {
        node {
          ...ContentfulCardFields
        }
      }
    }

  ctas:
    allContentfulCta(
      filter: { contentful_id: { in: $modules } }
    ) {
      edges {
        node {
          ...ContentfulCtaFields
        }
      }
    }

  articleList: 
    allContentfulArticleList (
      sort: {order: DESC, fields: createdAt},
      filter: { contentful_id: { in: $modules } }
    ) {
       edges { 
         node {
           ...ContentfulArticleListFields
         }
       }
    }
}
`
