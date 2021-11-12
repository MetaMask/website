const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  /* Customized Pages Built Inside Contentful CMS */
  const contentfulLayouts = graphql(`
    {
      pages: allContentfulLayout(filter: { isPrivate: { eq: false } }) {
        edges {
          node {
            slug
            header {
              contentful_id
            }
            footer {
              contentful_id
            }
            seo {
              contentful_id
            }
            modules {
              ... on ContentfulLayoutHero {
                contentful_id
              }
              ... on ContentfulLayoutFeature {
                contentful_id
              }
              ... on ContentfulLayoutModuleContainer {
                contentful_id
              }
              ... on ContentfulLayoutFullWidthCta {
                contentful_id
              }
            }
            themeColor
            isFaqLayout
          }
        }
      }
    }
  `)
    .then(result => {
      if (result.data) {
        const {
          data: { pages },
        } = result
        if (!pages || !pages.edges[0]) return null
        const pageData = pages.edges
        pageData.map(p => {
          const {
            modules,
            slug,
            seo,
            footer,
            header,
            themeColor,
            isFaqLayout,
          } = p.node
          const { contentful_id: footerId = '' } = footer || {};
          const { contentful_id: headerId = '' } = header || {};
          const moduleIds = modules.map(m => m.contentful_id)
          const seoId = seo ? seo.contentful_id : ''

          createPage({
            path: slug, // slug validation in Contentful CMS
            component: path.resolve(`./src/templates/ContentfulLayout.js`),
            context: {
              // pass data to page template for configuration and populating modules
              headerId,
              footerId,
              seoId,
              modules: moduleIds,
              themeColor,
              pathBuild: slug,
              isFaqLayout,
            },
          })
        })
      } else {
        console.log('Error generating Contentful page:', result)
      }
    })
    .catch(err => {
      console.log('Error generating Contentful page:', err)
    })

  const autoGeneratedPages = [contentfulLayouts]

  return Promise.all(autoGeneratedPages)
}
