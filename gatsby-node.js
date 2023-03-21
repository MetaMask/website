const path = require('path')
const { getNewsUrl } = require(`./src/lib/utils/news`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  // Generally you create redirects while creating pages.
  createRedirect({ fromPath: '/institutions/overview-amer/', toPath: '/institutions/', isPermanent: true })
  createRedirect({ fromPath: '/institutions/dine-and-defi-2023/', toPath: '/institutions/web3-connect-2023/', isPermanent: true })

  createRedirect({ fromPath: '/news/security/meta-mask-security-monthly-october-2022/', toPath: '/news/security/metamask-security-monthly-october-2022/', isPermanent: true })
  createRedirect({ fromPath: '/news/latest/building-an-extensible-world-with-meta-mask-grants-dao/', toPath: '/news/latest/building-an-extensible-world-with-metamask-grants-dao/', isPermanent: true })
  createRedirect({
    fromPath: '/news/developers/using-lava-moat-to-solve-software-supply-chain-security/', toPath: '/news/developers/using-lavamoat-to-solve-software-supply-chain-security/', isPermanent:
      true
  })
  createRedirect({
    fromPath: '/news/latest/meta-mask-integrates-with-sardine-to-bring-instant-ach-to-crypto-option-for-users/', toPath:
      '/news/latest/metamask-integrates-with-sardine-to-bring-instant-ach-to-crypto-option-for-users/', isPermanent: true
  })
  createRedirect({
    fromPath: '/news/security/meta-mask-security-monthly-september-2022/', toPath: '/news/security/metamask-security-monthly-september-2022/', isPermanent: true
  })
  createRedirect({ fromPath: '/news/security/meta-mask-security-monthly-august-2022/', toPath: '/news/security/metamask-security-monthly-august-2022/', isPermanent: true })
  createRedirect({ fromPath: '/news/security/meta-mask-security-monthly-july-2022/', toPath: '/news/security/metamask-security-monthly-july-2022/', isPermanent: true })
  createRedirect({ fromPath: '/news/security/meta-mask-security-monthly-june-2022/', toPath: '/news/security/metamask-security-monthly-june-2022/', isPermanent: true })
  createRedirect({ fromPath: '/news/developers/meta-mask-api-method-deprecation/', toPath: '/news/developers/metamask-api-method-deprecation/', isPermanent: true })
  createRedirect({
    fromPath: '/news/developers/breaking-changes-to-the-meta-mask-provider-are-here-developers-1/', toPath:
      '/news/developers/breaking-changes-to-the-metamask-provider-are-here-developers-1/', isPermanent: true
  })
  createRedirect({
    fromPath: '/news/releases/breaking-changes-to-the-meta-mask-provider-are-here-releases-developers-3/', toPath:
      '/news/releases/breaking-changes-to-the-metamask-provider-are-here-releases-developers-3/', isPermanent: true
  })
  createRedirect({
    fromPath: '/news/releases/breaking-changes-to-the-meta-mask-provider-are-here-releases-developers-5/', toPath:
      '/news/releases/breaking-changes-to-the-metamask-provider-are-here-releases-developers-5/', isPermanent: true
  })
  createRedirect({
    fromPath: '/news/releases/breaking-changes-to-the-meta-mask-provider-are-here-releases-developers-4/', toPath:
      '/news/releases/breaking-changes-to-the-metamask-provider-are-here-releases-developers-4/', isPermanent: true
  })
  createRedirect({
    fromPath: '/news/releases/breaking-changes-to-the-meta-mask-provider-are-here-releases-developers-2/', toPath:
      '/news/releases/breaking-changes-to-the-metamask-provider-are-here-releases-developers-2/', isPermanent: true
  })
  createRedirect({
    fromPath: '/news/releases/breaking-changes-to-the-meta-mask-provider-are-here-releases-developers-1/', toPath:
      '/news/releases/breaking-changes-to-the-metamask-provider-are-here-releases-developers-1/', isPermanent: true
  })
  createRedirect({
    fromPath: '/news/developers/breaking-changes-to-the-meta-mask-provider-are-here-developers-2/', toPath:
      '/news/developers/breaking-changes-to-the-metamask-provider-are-here-developers-2/', isPermanent: true
  })
  createRedirect({
    fromPath: '/news/releases/breaking-changes-to-the-meta-mask-provider-are-here-releases-1/', toPath: '/news/releases/breaking-changes-to-the-metamask-provider-are-here-releases-1/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/releases/breaking-changes-to-the-meta-mask-provider-are-here-releases-2/', toPath: '/news/releases/breaking-changes-to-the-metamask-provider-are-here-releases-2/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/security/breaking-changes-to-the-meta-mask-provider-are-here-security-15/', toPath: '/news/security/breaking-changes-to-the-metamask-provider-are-here-security-15/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/security/breaking-changes-to-the-meta-mask-provider-are-here-security-14/', toPath: '/news/security/breaking-changes-to-the-metamask-provider-are-here-security-14/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/security/breaking-changes-to-the-meta-mask-provider-are-here-security-13/', toPath: '/news/security/breaking-changes-to-the-metamask-provider-are-here-security-13/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/security/breaking-changes-to-the-meta-mask-provider-are-here-security-11/', toPath: '/news/security/breaking-changes-to-the-metamask-provider-are-here-security-11/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/security/breaking-changes-to-the-meta-mask-provider-are-here-security-10/', toPath: '/news/security/breaking-changes-to-the-metamask-provider-are-here-security-10/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/security/breaking-changes-to-the-meta-mask-provider-are-here-security-9/', toPath: '/news/security/breaking-changes-to-the-metamask-provider-are-here-security-9/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/security/breaking-changes-to-the-meta-mask-provider-are-here-security-8/', toPath: '/news/security/breaking-changes-to-the-metamask-provider-are-here-security-8/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/security/breaking-changes-to-the-meta-mask-provider-are-here-security-6/', toPath: '/news/security/breaking-changes-to-the-metamask-provider-are-here-security-6/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/security/breaking-changes-to-the-meta-mask-provider-are-here-security-5/', toPath: '/news/security/breaking-changes-to-the-metamask-provider-are-here-security-5/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/security/breaking-changes-to-the-meta-mask-provider-are-here-security-3/', toPath: '/news/security/breaking-changes-to-the-metamask-provider-are-here-security-3/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/security/breaking-changes-to-the-meta-mask-provider-are-here-security-4/', toPath: '/news/security/breaking-changes-to-the-metamask-provider-are-here-security-4/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/security/breaking-changes-to-the-meta-mask-provider-are-here-security-2/', toPath: '/news/security/breaking-changes-to-the-metamask-provider-are-here-security-2/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/releases/breaking-changes-to-the-meta-mask-provider-are-here-releases-developers-6/', toPath:
      '/news/releases/breaking-changes-to-the-metamask-provider-are-here-releases-developers-6/', isPermanent: true
  })
  createRedirect({
    fromPath: '/news/security/breaking-changes-to-the-meta-mask-provider-are-here-security-1/', toPath: '/news/security/breaking-changes-to-the-metamask-provider-are-here-security-1/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/developers/breaking-changes-to-the-meta-mask-provider-are-here-developers-3/', toPath:
      '/news/developers/breaking-changes-to-the-metamask-provider-are-here-developers-3/', isPermanent: true
  })
  createRedirect({
    fromPath: '/news/security/breaking-changes-to-the-meta-mask-provider-are-here-security-16/', toPath: '/news/security/breaking-changes-to-the-metamask-provider-are-here-security-16/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/releases/breaking-changes-to-the-meta-mask-provider-are-here-releases-3/', toPath: '/news/releases/breaking-changes-to-the-metamask-provider-are-here-releases-3/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/releases/breaking-changes-to-the-meta-mask-provider-are-here-releases-5/', toPath: '/news/releases/breaking-changes-to-the-metamask-provider-are-here-releases-5/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/security/breaking-changes-to-the-meta-mask-provider-are-here-security-7/', toPath: '/news/security/breaking-changes-to-the-metamask-provider-are-here-security-7/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/security/breaking-changes-to-the-meta-mask-provider-are-here-security-12/', toPath: '/news/security/breaking-changes-to-the-metamask-provider-are-here-security-12/',
    isPermanent: true
  })
  createRedirect({ fromPath: '/news/security/meta-mask-security-monthly-may-2022/', toPath: '/news/security/metamask-security-monthly-may-2022/', isPermanent: true })
  createRedirect({ fromPath: '/news/security/meta-mask-security-april-team-report/', toPath: '/news/security/metamask-security-april-team-report/', isPermanent: true })

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
