const activeEnv =
  process.env.ACTIVE_ENV || process.env.NODE_ENV || 'development'
const envConfig = {
  path: `${__dirname}/gatsby.${activeEnv}.env`,
}

const env = require('dotenv').config(envConfig)
console.log('------- CURRENT ENVIRONMENT:', activeEnv.toUpperCase(), '-------')

if (env.errors) {
  // handle errors
} else {
  module.exports = {
    siteMetadata: {
      title: 'MetaMask',
      description: `MetaMask is a ConsenSys Formation.`,
      siteUrl:
        activeEnv === 'development'
          ? 'https://metamask.consensys.io'
          : 'https://metamask.io',
    },
    plugins: [
      {
        resolve: 'gatsby-plugin-google-tagmanager',
        options: {
          id: process.env.GATSBY_GTM_ID,

          // Defaults to false meaning GTM will only be loaded in production.
          includeInDevelopment: false,

          // Defaults to null
          defaultDataLayer: { platform: 'gatsby' },

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
          head: false,
          // Setting this parameter is optional
          anonymize: true,
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
        },
      },
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `MetaMask.io`,
          short_name: `MM`,
          description: `A crypto wallet & gateway to blockchain apps`,
          start_url: `/`,
          background_color: `#FFFFFF`,
          theme_color: `#FFFFFF`,
          display: `standalone`,
          icon: `${__dirname}/src/images/metamask-logo.png`,
          icons: [
            {
              src: `${__dirname}/favicon/android-chrome-192x192.png`,
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable',
            },
            {
              src: `${__dirname}/favicon/android-chrome-256x256.png`,
              sizes: '256x256',
              type: 'image/png',
            },
            {
              src: `${__dirname}/favicon/android-chrome-384x384.png`,
              sizes: '384x384',
              type: 'image/png',
            },
            {
              src: `${__dirname}/favicon/icon-512x512.png`,
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: `${__dirname}/src/images`,
        },
      },
      'gatsby-plugin-mdx',
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `legal`,
          path: `${__dirname}/legal`,
        },
        __key: 'legal',
      },
      {
        resolve: 'gatsby-plugin-react-svg',
        options: {
          rule: {
            include: `${__dirname}/src/images`,
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
                host: 'https://metamask.consensys.io',
                sitemap: 'https://metamask.consensys.io/sitemap-index.xml',
                policy: [{ userAgent: '*', disallow: '/' }],
              },
      },
      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.app/offline
      // 'gatsby-plugin-offline',
    ],
  }
}
