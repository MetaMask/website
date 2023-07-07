const activeEnv =
  process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development'
const envConfig = {
  path: `${__dirname}/gatsby.${activeEnv}.env`,
}

const env = require('dotenv').config(envConfig)
console.log('------- CURRENT ENVIRONMENT:', activeEnv.toUpperCase(), '-------')

const { getNewsUrl } = require(`./src/lib/utils/news`)
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
        resolve: 'gatsby-plugin-google-tagmanager',
        options: {
          id: process.env.GATSBY_GTM_ID,

          // Defaults to false meaning GTM will only be loaded in production.
          includeInDevelopment: false,

          // Defaults to false
          enableWebVitalsTracking: true,
        },
      },
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
      'gatsby-plugin-styled-components',
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
              nodes {
                path
              }
            }
            allContentfulLayout(filter: {isPrivate: {eq: true}}) {
              nodes {
                slug
              }
            }
            allContentfulNews(filter: {isPrivate: {eq: true}}) {
              nodes {
                title
                categories {
                  name
                }
              }
            }
          }`,
          resolvePages: ({
            allSitePage: { nodes: allSitePages },
            allContentfulLayout: { nodes: allPrivateContentfulPages },
            allContentfulNews: { nodes: allPrivateContentfulNews },
          }) => {
            let privatePages = ['/preview/']
            allPrivateContentfulPages.forEach(page => {
              privatePages.push(page.slug)
            })
            allPrivateContentfulNews.forEach(page => {
              const newsUrl = getNewsUrl(page)
              privatePages.push(newsUrl)
            });

            const allPages = [];
            allSitePages.forEach(page => {
              if (privatePages.indexOf(page.path) === -1) {
                allPages.push(page)
              }
            })
            return allPages.map(page => {
              return { ...page }
            })
          },
          serialize: ({ path }) => {
            return {
              url: path,
              changefreq: 'daily',
              priority: path === '' ? 1 : 0.8,
            }
          },
        },
      },
      'gatsby-plugin-well-known',
      'gatsby-plugin-image',
      {
        resolve: `gatsby-plugin-sharp`,
        options: {
          defaults: {
            placeholder: `none`,
          },
        },
      },
      {
        resolve: 'gatsby-plugin-robots-txt',
        options:
          activeEnv === 'production'
            ? {
              host: 'https://metamask.io',
              sitemap: 'https://metamask.io/sitemap-index.xml',
              policy: [{ userAgent: '*', allow: '/' }],
            }
            : {
              host: 'https://metamask.younetco.com',
              sitemap: 'https://metamask.younetco.com/sitemap-index.xml',
              policy: [{ userAgent: '*', disallow: '/' }],
            },
      },
    ],
  }
}
