const path = require('path')
const { getNewsUrl } = require(`./src/lib/utils/news`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  // Generally you create redirects while creating pages.
  createRedirect({ fromPath: '/institutions/overview-amer/', toPath: '/institutions/', isPermanent: true })
  createRedirect({ fromPath: '/institutions/dine-and-defi-2023/', toPath: '/institutions/web3-connect-2023/', isPermanent: true })

  createRedirect({ fromPath: '/news/developers/meta-mask-grants-dao-funds-spritely-foundation/', toPath: '/news/developers/metamask-grants-dao-funds-spritely-foundation/', isPermanent: true })
  createRedirect({ fromPath: '/news/security/meta-mask-security-monthly-january-2023/', toPath: '/news/security/metamask-security-monthly-january-2023/', isPermanent: true })
  createRedirect({ fromPath: '/news/latest/welcome-to-meta-mask-learn/', toPath: '/news/latest/welcome-to-metamask-learn/', isPermanent: true })
  createRedirect({
    fromPath: '/news/latest/meta-mask-introduces-liquid-staking-in-dapp-for-an-easy-and-convenient-way-to-stake-eth/', toPath:
      '/news/latest/metamask-introduces-liquid-staking-in-dapp-for-an-easy-and-convenient-way-to-stake-eth/', isPermanent: true
  })
  createRedirect({ fromPath: '/news/security/meta-mask-security-monthly-december-2022/', toPath: '/news/security/metamask-security-monthly-december-2022/', isPermanent: true })
  createRedirect({
    fromPath: '/news/developers/meta-mask-grants-dao-funds-agoric-and-safeheron-with-first-round-of-grants/', toPath:
      '/news/developers/metamask-grants-dao-funds-agoric-and-safeheron-with-first-round-of-grants/', isPermanent: true
  })
  createRedirect({
    fromPath: '/news/latest/meta-mask-swaps-says-hello-to-portfolio-dapp-and-l-2-networks-arbitrum-and-optimism/', toPath:
      '/news/latest/metamask-swaps-says-hello-to-portfolio-dapp-and-l-2-networks-arbitrum-and-optimism/', isPermanent: true
  })
  createRedirect({ fromPath: '/news/security/meta-mask-security-monthly-november-2022/', toPath: '/news/security/metamask-security-monthly-november-2022/', isPermanent: true })
  createRedirect({
    fromPath: '/news/latest/we-hosted-a-group-of-artists-together-in-miami-during-art-basel-to-discuss-the-state-of-nf-ts-heres-what-we-learned/', toPath:
      '/news/latest/we-hosted-a-group-of-artists-together-in-miami-during-art-basel-to-discuss-the-state-of-nfts-heres-what-we-learned/', isPermanent: true
  })
  createRedirect({ fromPath: '/news/security/meta-mask-and-laconic-launch-moby-mask-light-client/', toPath: '/news/security/metamask-and-laconic-launch-mobymask-light-client/', isPermanent: true })
  createRedirect({
    fromPath: '/news/developers/mpc-snap-integrating-multi-factor-authentication-into-meta-mask/', toPath: '/news/developers/mpc-snap-integrating-multi-factor-authentication-into-metamask/', isPermanent:
      true
  })
  createRedirect({
    fromPath: '/news/latest/meta-mask-launches-bridge-aggregator-in-dapp-to-easily-move-tokens-across-chains/', toPath:
      '/news/latest/metamask-launches-bridge-aggregator-in-dapp-to-easily-move-tokens-across-chains/', isPermanent: true
  })
  createRedirect({ fromPath: '/news/latest/how-we-selected-bridge-providers-for-meta-mask-bridges/', toPath: '/news/latest/how-we-selected-bridge-providers-for-metamask-bridges/', isPermanent: true })
  createRedirect({ fromPath: '/news/latest/building-an-extensible-world-with-meta-mask-grants-dao/', toPath: '/news/latest/building-an-extensible-world-with-metamask-grants-dao/', isPermanent: true })
  createRedirect({ fromPath: '/news/security/using-lava-moat-to-solve-software-supply-chain-security/', toPath: '/news/security/using-lavamoat-to-solve-software-supply-chain-security/', isPermanent: true })
  createRedirect({ fromPath: '/news/developers/meta-masks-community-at-the-core-of-its-growth/', toPath: '/news/developers/metamasks-community-at-the-core-of-its-growth/', isPermanent: true })
  createRedirect({ fromPath: '/news/latest/how-did-meta-mask-come-to-life-the-origin-story-revealed/', toPath: '/news/latest/how-did-metamask-come-to-life-the-origin-story-revealed/', isPermanent: true })
  createRedirect({ fromPath: '/news/latest/how-to-manage-multiple-wallets-with-meta-mask/', toPath: '/news/latest/how-to-manage-multiple-wallets-with-metamask/', isPermanent: true })
  createRedirect({
    fromPath: '/news/developers/meta-mask-integrates-stark-ware-into-first-of-its-kind-zk-rollup-snap/', toPath: '/news/developers/metamask-integrates-starkware-into-first-of-its-kind-zk-rollup-snap/',
    isPermanent: true
  })
  createRedirect({
    fromPath: '/news/developers/consen-sys-and-stark-ware-partner-to-bring-zk-rollups-to-infura-and-meta-mask/', toPath:
      '/news/developers/consensys-and-starkware-partner-to-bring-zk-rollups-to-infura-and-metamask/', isPermanent: true
  })

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
