const path = require('path')
const redirects = require('./redirects.json')
const { getNewsUrl } = require(`./src/lib/utils/news`)

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
        sort: { publishDate: DESC }
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
