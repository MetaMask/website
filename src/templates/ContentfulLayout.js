import React from 'react'
import { graphql } from 'gatsby'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import flatMapDeep from 'lodash/flatMapDeep'
import isArray from 'lodash/isArray'
import Layout from './PageLayout'
import linkedInTrackingScript from '../lib/services/lintrk'
import analyticsUninstalledScript from '../lib/services/analytics'
import { useLocation } from '@reach/router'
import Helmet from 'react-helmet'
import capitalize from 'lodash/capitalize'
import { DEFAULT_LOCALE_CODE } from '../lib/config.mjs'
import { generateFaqSchema } from '../lib/utils/schema'

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
      featureSliders: FS,
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
    pageContext: {
      modules,
      pathBuild,
      slug,
      themeColor,
      isFaqLayout,
      h2FontSize,
      widerContainer,
      extraData,
      locale = DEFAULT_LOCALE_CODE,
      translation,
      localizedPages,
    },
    path,
    ...rest
  } = props

  const location = useLocation()
  const pathname = location.pathname
  let partnerId = '451393'
  let conversionId = ''
  if (pathname.includes('/institutions')) {
    partnerId = '4249353'
    conversionId = '7714137'
  }
  const linkedInPartnerId = '_linkedin_partner_id = "' + partnerId + '";'
  const linkedInEventPixel =
    '<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=' +
    partnerId +
    (conversionId ? '&conversionId=' + conversionId : '') +
    '&fmt=gif"/>'

  // takes all modules single content type for a page and returns all instances
  const getNodes = mods => {
    if (!mods) return
    else if (isArray(mods.edges)) return getNodes(mods.edges)
    return isArray(mods) ? mods.map(n => n.node) : mods
  }

  // extract all top-level page modules from GraphQL and return in a flat array for rendering
  const pageModules = flatMapDeep(
    [H, F, FS, RT, LMC, MC, C, CTA, FAQ, HTML, L, HF, FWC],
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

  const seoData = { ...seo }
  if (path.includes('/news/')) {
    let category = path.match(/\/news\/(.*)\//)
    category = category ? capitalize(category[1]) : 'Latest'
    seoData.pageTitle = `${seoData.pageTitle} | ${category} | MetaMask`
    seoData.pageDescription = `${seoData.pageDescription} | ${category}`
  }

  const schema = isFaqLayout ? generateFaqSchema(orderedPageModules) : null

  return (
    <Layout
      {...rest}
      themeColor={themeColor}
      h2FontSize={h2FontSize}
      widerContainer={widerContainer}
      extraData={extraData}
      locale={locale}
      localizedPages={localizedPages}
    >
      {seo &&
        contentfulModuleToComponent({
          ...seoData,
          pagePath: pathBuild,
          originalSlug: slug,
          translation,
        })}
      {schema && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
      )}
      {pathname.includes('/uninstalled') && (
        <Helmet
          script={[
            {
              type: 'text/javascript',
              innerHTML: analyticsUninstalledScript,
            },
          ]}
        />
      )}
      {allModules.map(module =>
        contentfulModuleToComponent(
          { ...module, isFaq: isFaqLayout, translation },
          locale
        )
      )}
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: linkedInPartnerId + linkedInTrackingScript,
        }}
      />
      <noscript dangerouslySetInnerHTML={{ __html: linkedInEventPixel }} />
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
    $node_locale: String
  ) {
    header: contentfulLayoutHeader(
      contentful_id: { eq: $headerId }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulLayoutHeaderFields
    }

    footer: contentfulLayoutFooter(
      contentful_id: { eq: $footerId }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulLayoutFooterFields
    }

    seo: contentfulSeo(
      contentful_id: { eq: $seoId }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulSeoFields
    }

    heroes: allContentfulLayoutHero(
      filter: {
        contentful_id: { in: $modules }
        node_locale: { eq: $node_locale }
      }
    ) {
      edges {
        node {
          ...ContentfulLayoutHeroFields
        }
      }
    }

    layoutModuleContainers: allContentfulLayoutModuleContainer(
      filter: {
        contentful_id: { in: $modules }
        node_locale: { eq: $node_locale }
      }
    ) {
      edges {
        node {
          ...ContentfulLayoutModuleContainerFields
        }
      }
    }

    features: allContentfulLayoutFeature(
      filter: {
        contentful_id: { in: $modules }
        node_locale: { eq: $node_locale }
      }
    ) {
      edges {
        node {
          ...ContentfulLayoutFeatureFields
        }
      }
    }

    featureSliders: allContentfulLayoutFeatureSlider(
      filter: {
        contentful_id: { in: $modules }
        node_locale: { eq: $node_locale }
      }
    ) {
      edges {
        node {
          ...ContentfulLayoutFeatureSliderFields
        }
      }
    }

    fullWidthCtas: allContentfulLayoutFullWidthCta(
      filter: {
        contentful_id: { in: $modules }
        node_locale: { eq: $node_locale }
      }
    ) {
      edges {
        node {
          ...ContentfulLayoutFullWidthCtaFields
        }
      }
    }

    moduleContainers: allContentfulModuleContainer(
      filter: {
        contentful_id: { in: $modules }
        node_locale: { eq: $node_locale }
      }
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

    cards: allContentfulCard(
      filter: {
        contentful_id: { in: $modules }
        node_locale: { eq: $node_locale }
      }
    ) {
      edges {
        node {
          ...ContentfulCardFields
        }
      }
    }

    ctas: allContentfulCta(
      filter: {
        contentful_id: { in: $modules }
        node_locale: { eq: $node_locale }
      }
    ) {
      edges {
        node {
          ...ContentfulCtaFields
        }
      }
    }

    hubspotForms: allContentfulHubSpotForm(
      filter: {
        contentful_id: { in: $modules }
        node_locale: { eq: $node_locale }
      }
    ) {
      edges {
        node {
          ...ContentfulHubSpotFormFields
        }
      }
    }

    embeds: allContentfulEmbed(
      filter: {
        contentful_id: { in: $modules }
        node_locale: { eq: $node_locale }
      }
    ) {
      edges {
        node {
          ...ContentfulEmbedFields
        }
      }
    }

    faqs: allContentfulFaq(
      filter: {
        contentful_id: { in: $modules }
        node_locale: { eq: $node_locale }
      }
    ) {
      edges {
        node {
          ...ContentfulFaqFields
        }
      }
    }

    logos: allContentfulLogo(
      filter: {
        contentful_id: { in: $modules }
        node_locale: { eq: $node_locale }
      }
    ) {
      edges {
        node {
          ...ContentfulLogoFields
        }
      }
    }

    richTexts: allContentfulRichText(
      filter: {
        contentful_id: { in: $modules }
        node_locale: { eq: $node_locale }
      }
    ) {
      edges {
        node {
          ...ContentfulRichTextFields
        }
      }
    }
  }
`
