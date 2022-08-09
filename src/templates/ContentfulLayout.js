import React from 'react'
import { graphql } from 'gatsby'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import flatMapDeep from 'lodash/flatMapDeep'
import isArray from 'lodash/isArray'
import Layout from './PageLayout'
import Context from '../Context/ContextPage'
import linkedInTrackingScript from '../lib/services/lintrk'
import { useLocation } from '@reach/router'
import Helmet from 'react-helmet'

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
    pageContext: { modules, pathBuild, themeColor, isFaqLayout, h2FontSize },
    path,
    ...rest
  } = props

  const location = useLocation()
  const pathname = location.pathname
  let appUninstalledScript = ''
  let partnerId = '451393'
  let conversionId = ''
  if (pathname.includes('/uninstalled')) {
    appUninstalledScript =
      'const DEV_WRITE_KEY = “PZkSwsTBxW1BrbyIYEUjFBEumGvTyjcz”, PROD_WRITE_KEY = “MHae0tTVRqyHDim9qQ9ablSZpvm3Tvzc”;\n' +
      'const params = new Proxy(new URLSearchParams(window.location.search), { get: (searchParams, prop) => searchParams.get(prop), });\n' +
      'const WRITE_KEY = (params.env == ‘prod’) ? PROD_WRITE_KEY : DEV_WRITE_KEY;\n' +
      '\n' +
      '!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey=WRITE_KEY;analytics.SNIPPET_VERSION="4.15.2";\n' +
      '  // only ping Segment if an id exists\n' +
      '  if (params.id) {\n' +
      '    analytics.load(WRITE_KEY);\n' +
      '\n' +
      '    // identify user by anonId\n' +
      '    analytics.identify(params.id);\n' +
      "    analytics.track('App Uninstalled', {\n" +
      '      app_version: params.version\n' +
      '    });\n' +
      '    // clear session cookies. meant to be one-time event to close loop\n' +
      '    analytics.reset();\n' +
      '  }\n' +
      '}}();'
  }
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

  const [idFaqActive, setIdFaqActive] = React.useState('')
  const [paginationPage, setPaginationPage] = React.useState(1)
  const valueContext = {
    faq: {
      idFaqActive,
      setIdFaqActive,
    },
    pagination: {
      paginationPage,
      setPaginationPage,
    },
  }

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

  return (
    <Context.Provider value={valueContext}>
      <Layout {...rest} themeColor={themeColor} h2FontSize={h2FontSize}>
        {seo && contentfulModuleToComponent({ ...seo, pagePath: pathBuild })}
        {appUninstalledScript && (
          <Helmet
            script={[
              {
                type: 'text/javascript',
                innerHTML: appUninstalledScript,
              },
            ]}
          />
        )}
        {allModules.map(module =>
          contentfulModuleToComponent({ ...module, isFaq: isFaqLayout })
        )}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: linkedInPartnerId + linkedInTrackingScript,
          }}
        />
        <noscript dangerouslySetInnerHTML={{ __html: linkedInEventPixel }} />
      </Layout>
    </Context.Provider>
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
    }

    footer: contentfulLayoutFooter(contentful_id: { eq: $footerId }) {
      ...ContentfulLayoutFooterFields
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
