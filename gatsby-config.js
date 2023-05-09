const activeEnv =
  process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development'
const envConfig = {
  path: `${__dirname}/gatsby.${activeEnv}.env`,
}

const env = require('dotenv').config(envConfig)
console.log('------- CURRENT ENVIRONMENT:', activeEnv.toUpperCase(), '-------')

const { getNewsUrl } = require(`./src/lib/utils/news`);
const low = require('lowlight')
const { definer: solidityLangDef } = require('highlightjs-solidity')

low.registerLanguage('solidity', solidityLangDef)

if (env.errors) {
  // handle errors
} else {
  module.exports = {
    siteMetadata: {
      title: 'MetaMask',
      description: `MetaMask is a ConsenSys Formation.`,
      siteUrl:
        activeEnv === 'development'
          ? 'https://metamask.younetco.com'
          : 'https://metamask.io',
    },
    plugins: [
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          // The property ID; the tracking code won't be generated without it
          trackingId: process.env.GATSBY_GA_ID,
          // Defines where to place the tracking script - `true` in the head and `false` in the body
          head: true,
          // Setting this parameter is optional
          anonymize: true,
          // Avoids sending pageview hits from custom paths
          exclude: ['/preview/**'],
        },
      },
      `gatsby-plugin-sass`,
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-sharp',
      `gatsby-plugin-styled-components`,
      'gatsby-transformer-sharp',
      'gatsby-transformer-remark',
      'gatsby-plugin-root-import',
      'gatsby-transformer-inline-svg',
      'gatsby-plugin-meta-redirect',
      {
        resolve: `gatsby-source-contentful`,
        options: {
          spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
          accessToken: process.env.GATSBY_CONTENTFUL_API_KEY,
          environment: process.env.GATSBY_CONTENTFUL_ENVIRONMENT,
          downloadLocal: process.env.GATSBY_CONTENTFUL_DOWNLOAD_LOCAL,
          host: process.env.GATSBY_CONTENTFUL_HOST,
          localeFilter: locale => locale.code === 'en-US'
        },
      },
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          icon: `${__dirname}/src/images/metamask-logo.png`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: `${__dirname}/src/images`,
        },
      },
      {
        resolve: 'gatsby-plugin-react-svg',
        options: {
          rule: {
            include: `${__dirname}/src/images`,
          },
        },
      },
      {
        resolve: `gatsby-plugin-sitemap`,
        options: {
          query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              edges {
                node {
                  path
                }
              }
            }
            allContentfulLayout(filter: {isPrivate: {eq: true}}) {
              edges {
                node {
                  slug
                }
              }
            }
            allContentfulNews(filter: {isPrivate: {eq: true}}) {
              edges {
                node {
                  title
                  categories {
                    name
                  }
                }
              }
            }
          }`,
          serialize: ({ site, allSitePage, allContentfulLayout, allContentfulNews }) => {
            let privatePages = ['/preview/']
            allContentfulLayout.edges.map(edge => {
              privatePages.push(edge.node.slug)
            })

            allContentfulNews.edges.map((edge) => {
              const newsUrl = getNewsUrl(edge.node);
              privatePages.push(newsUrl);
            });

            let pages = []
            const siteUrl =
              activeEnv === 'development'
                ? 'https://metamask.younetco.com'
                : site.siteMetadata.siteUrl
            allSitePage.edges.map(edge => {
              if (privatePages.indexOf(edge.node.path) === -1) {
                pages.push({
                  url: siteUrl + edge.node.path,
                  changefreq: `daily`,
                  priority: edge.node.path === '' ? 1 : 0.8,
                })
              }
            })
            return pages
          },
        },
      },
      'gatsby-plugin-well-known',
      'gatsby-plugin-preact',
      {
        resolve: 'gatsby-plugin-robots-txt',
        options:
          activeEnv === 'production'
            ? {
                host: 'https://metamask.io',
                sitemap: 'https://metamask.io/sitemap.xml',
                policy: [{ userAgent: '*', allow: '/' }],
              }
            : {
                host: 'https://metamask.younetco.com',
                sitemap: 'https://metamask.younetco.com/sitemap.xml',
                policy: [{ userAgent: '*', disallow: '/' }],
              },
      },
    ],
  }
}
