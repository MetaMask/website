import React from 'react'
import { graphql } from 'gatsby'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import { flatMapDeep, isArray } from 'lodash'
import Layout from './PageLayout'

/**
 * @name ContentfulLayout
 * @summary -
 * @description -
 */
const ContentfulLayout = props => {
  const {
    data: {
      header,
      footer,
      seo,
      heroes: H,
      features: F,
      richTexts: RT,
      layoutModuleContainers: LMC,
      moduleContainers: MC,
      cards: C,
      ctas: CTA,
      faqs: FAQ,
      embeds: HTML,
      logos: L,
      hubspotForms: HF,
      fullWidthCtas: FWC,
    },
    pageContext: { modules, pathBuild },
    path,
    ...rest
  } = props

  // takes all modules single content type for a page and returns all instances
  const getNodes = mods => {
    if (!mods) return
    else if (isArray(mods.edges)) return getNodes(mods.edges)
    return isArray(mods) ? mods.map(n => n.node) : mods
  }

  // extract all top-level page modules from GraphQL and return in a flat array for rendering
  const pageModules = flatMapDeep(
    [H, F, RT, LMC, MC, C, CTA, FAQ, HTML, L, HF, FWC],
    getNodes
  )

  // Take unordered list of data from pageModules and reorder
  // based on contentful_id sequence in pageContext.modules
  // returned by CMS to maintain page structure
  const orderedPageModules = pageModules.reduce((acc, node) => {
    if (!node || !node.contentful_id) return acc
    const positionInPage = modules.indexOf(node.contentful_id)
    acc.splice(positionInPage, 1, node) // remove empty element and replace with module data
    return acc
  }, Array(modules.length - 1)) // prepopulate array so we can insert last elements if they appear first

  const allModules = [header, ...orderedPageModules, footer]
  console.log(allModules)
  return (
    <Layout {...rest}>
      {seo && contentfulModuleToComponent({ ...seo, pagePath: pathBuild })}
      {allModules.map(contentfulModuleToComponent)}
    </Layout>
  )
}

export default ContentfulLayout

export const ContentfulQuery = graphql`
  query(
    $modules: [String]!
    $headerId: String
    $footerId: String
    $seoId: String
  ) {
    header: contentfulLayoutHeader(contentful_id: { eq: $headerId }) {
      ...ContentfulLayoutHeaderFields
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
    }

    footer: contentfulLayoutFooter(contentful_id: { eq: $footerId }) {
      ...ContentfulLayoutFooterFields
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
    }

    seo: contentfulSeo(contentful_id: { eq: $seoId }) {
      ...ContentfulSeoFields
    }

    heroes: allContentfulLayoutHero(
      filter: { contentful_id: { in: $modules } }
    ) {
      edges {
        node {
          ...ContentfulLayoutHeroFields
        }
      }
    }

    layoutModuleContainers: allContentfulLayoutModuleContainer(
      filter: { contentful_id: { in: $modules } }
    ) {
      edges {
        node {
          ...ContentfulLayoutModuleContainerFields
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
        }
      }
    }

    features: allContentfulLayoutFeature(
      filter: { contentful_id: { in: $modules } }
    ) {
      edges {
        node {
          ...ContentfulLayoutFeatureFields
        }
      }
    }

    fullWidthCtas: allContentfulLayoutFullWidthCta(
      filter: { contentful_id: { in: $modules } }
    ) {
      edges {
        node {
          ...ContentfulLayoutFullWidthCtaFields
        }
      }
    }

    moduleContainers: allContentfulModuleContainer(
      filter: { contentful_id: { in: $modules } }
    ) {
      edges {
        node {
          ...ContentfulModuleContainerFields
          modules {
            ... on ContentfulCard {
              ...ContentfulCardFields
            }
            ... on ContentfulHubSpotForm {
              ...ContentfulHubSpotFormFields
            }
            ... on ContentfulRichText {
              ...ContentfulRichTextFields
            }
            ... on ContentfulCta {
              ...ContentfulCtaFields
            }
            ... on ContentfulFaq {
              ...ContentfulFaqFields
            }
            ... on ContentfulEmbed {
              ...ContentfulEmbedFields
            }
            ... on ContentfulLogo {
              ...ContentfulLogoFields
            }
            ... on ContentfulModuleContainer {
              ...ContentfulModuleContainerFields
            }
          }
        }
      }
    }

    cards: allContentfulCard(filter: { contentful_id: { in: $modules } }) {
      edges {
        node {
          ...ContentfulCardFields
        }
      }
    }

    ctas: allContentfulCta(filter: { contentful_id: { in: $modules } }) {
      edges {
        node {
          ...ContentfulCtaFields
        }
      }
    }

    hubspotForms: allContentfulHubSpotForm(
      filter: { contentful_id: { in: $modules } }
    ) {
      edges {
        node {
          ...ContentfulHubSpotFormFields
        }
      }
    }

    embeds: allContentfulEmbed(filter: { contentful_id: { in: $modules } }) {
      edges {
        node {
          ...ContentfulEmbedFields
        }
      }
    }

    faqs: allContentfulFaq(filter: { contentful_id: { in: $modules } }) {
      edges {
        node {
          ...ContentfulFaqFields
        }
      }
    }

    logos: allContentfulLogo(filter: { contentful_id: { in: $modules } }) {
      edges {
        node {
          ...ContentfulLogoFields
        }
      }
    }

    richTexts: allContentfulRichText(
      filter: { contentful_id: { in: $modules } }
    ) {
      edges {
        node {
          ...ContentfulRichTextFields
        }
      }
    }
  }
`
