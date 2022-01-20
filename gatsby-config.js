const activeEnv =
  process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development'
const envConfig = {
  path: `${__dirname}/gatsby.${activeEnv}.env`,
}

const env = require('dotenv').config(envConfig)
console.log('------- CURRENT ENVIRONMENT:', activeEnv.toUpperCase(), '-------')

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
      siteUrl: activeEnv === 'development' ? 'https://metamask.consensys.net' : 'https://metamask.io',
    },
    plugins: [
      {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
          // The property ID; the tracking code won't be generated without it
          trackingId: "UA-37075177-6",
          // Defines where to place the tracking script - `true` in the head and `false` in the body
          head: false,
          // Setting this parameter is optional
          anonymize: true,
        },
      },
      `gatsby-plugin-sass`,
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-sharp',
      `gatsby-plugin-styled-components`,
      'gatsby-transformer-sharp',
      'gatsby-transformer-remark',
      'gatsby-plugin-root-import',
      {
        resolve: `gatsby-source-contentful`,
        options: {
          spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
          accessToken: process.env.GATSBY_CONTENTFUL_API_KEY,
          environment: process.env.GATSBY_CONTENTFUL_ENVIRONMENT,
          downloadLocal: process.env.GATSBY_CONTENTFUL_DOWNLOAD_LOCAL,
          host: process.env.GATSBY_CONTENTFUL_HOST,
        },
      },
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: 'gatsby-starter-default',
          short_name: 'starter',
          start_url: '/',
          background_color: '#FFFFFF',
          theme_color: '#333333',
          display: 'minimal-ui',
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
          exclude: [],
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
          }`,
          serialize: ({ site, allSitePage, allContentfulLayout }) => {
            let privatePages = []
            allContentfulLayout.edges.map(edge => {
              privatePages.push(edge.node.slug)
            })

            let pages = []
            const siteUrl = activeEnv === 'development' ? 'https://metamask.consensys.net' : site.siteMetadata.siteUrl
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
                host: 'https://metamask.consensys.net',
                sitemap: 'https://metamask.consensys.net/sitemap.xml',
                policy: [
                  { userAgent: '*', disallow: '/' },
                ],
              },
      },
      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.app/offline
      // 'gatsby-plugin-offline',
    ],
  }
}
