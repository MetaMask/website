const path = require('path')
const axios = require('axios')
const { getNewsUrl } = require(`./src/lib/utils/news`)
const redirects = require("./redirects.json")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  // Generally you create redirects while creating pages.
  redirects.forEach(redirect =>
    createRedirect({
      fromPath: redirect.fromPath,
      toPath: redirect.toPath,
    })
  )

  /* Customized Pages Built Inside Contentful CMS */
  const newsCategories = [];
  const result = await graphql(`
    {
      allCategories: allContentfulNewsCategory {
        edges {
          node {
            contentful_id
            name
          }
        }
      }
    }
  `)
  if (result.data && result.data.allCategories) {
    result.data.allCategories.edges.forEach(cat => {
      if (cat.node.name && !cat.node.name.includes("example")) {
        newsCategories.push(cat.node.name.toLowerCase())
      }
    })
  }

  let touData = undefined;
  try {
    const touResult = await axios.get('https://content.consensys.net/wp-json/wp/v2/pages/?path=/terms-of-use/&_fields=id%2Ctitle%2Cmodules.rich-text%2Cheader_component')
    if ( touResult.data && touResult.data[0]) {
      const { content } = touResult.data[0].modules[0].children[0].config
      const { title, description } = touResult.data[0].header_component[0]?.config
      if (title, description, content) {
        touData = { title, description, content }
      }
    }
  } catch (error) {
    console.log('Fetch ToU data failed: ', error);
  }

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
              ... on ContentfulLayoutFeatureSlider {
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
            h2FontSize
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
            h2FontSize,
          } = p.node
          const { contentful_id: footerId = '' } = footer || {}
          const { contentful_id: headerId = '' } = header || {}
          const moduleIds = modules.map(m => m.contentful_id)
          const seoId = seo ? seo.contentful_id : ''

          if (slug === "/news/") {
            const categoriesPath = newsCategories.map(cat => `/news/${cat}/`)
            categoriesPath.forEach(categoryPath => {
              createPage({
                path: categoryPath, // slug validation in Contentful CMS
                component: path.resolve(`./src/templates/ContentfulLayout.js`),
                context: {
                  headerId,
                  footerId,
                  seoId,
                  modules: moduleIds,
                  themeColor,
                  pathBuild: categoryPath,
                  isFaqLayout,
                  h2FontSize,
                },
              })
            })
          }

          if (slug === "/terms-of-use/") {
            if (!touData) return Promise.reject('Generate terms of use page error!');
            const touUrls = ["/terms-of-use/", "/terms-of-use/standalone/"]
            touUrls.forEach((touUrl, index) => {
              createPage({
                path: touUrl,
                component: path.resolve(`./src/templates/ContentfulToULayout.js`),
                context: {
                  headerId: index === 0 ? headerId : undefined,
                  footerId: index === 0 ? footerId : undefined,
                  seoId: index === 0 ? seoId : undefined,
                  touData,
                  themeColor,
                  pathBuild: touUrl,
                  isFaqLayout,
                  h2FontSize,
                  isStandalone: index === 1,
                },
              })
            })
            return
          }
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
              h2FontSize,
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

  /* News Pages */
  const contentfulNews = graphql(`
    {
      stories: allContentfulNews(
        sort: { order: DESC, fields: publishDate }
      ) {
        edges {
          node {
            contentful_id
            title
            categories {
              name
            }
            isPrivate
          }
        }
      }
    }
  `)
    .then((result) => {
      if (result.data && result.data.stories) {
        const stories = result.data.stories.edges.filter(
          (item) => !item.node.isPrivate,
        );
        return stories.map(({ node: news }, index) => {
          const {
            contentful_id,
          } = news;
          const newsUrl = getNewsUrl(news);

          createPage({
            path: newsUrl,
            component: path.resolve('./src/templates/NewsLayout.js'),
            context: {
              news_content_id: contentful_id,
              pathBuild: newsUrl,
            },
          });
        });
      }
    })
    .catch((error) => {
      console.log(' Error generating News Page: ', error);
    });

  const autoGeneratedPages = [contentfulLayouts, contentfulNews]

  return Promise.all(autoGeneratedPages)
}
