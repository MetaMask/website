const activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV ||
  'development'
const envConfig = {
  path: `${ __dirname }/gatsby.${ activeEnv }.env`,
}

const env = require('dotenv').config(envConfig)
console.log('------- CURRENT ENVIRONMENT -------', activeEnv.toUpperCase())

const { kebabCase } = require('lodash')
const { getArticleCategory } = require(`./src/lib/utils/blog`)

const low = require('lowlight');
const { definer: solidityLangDef } = require('highlightjs-solidity');

low.registerLanguage('solidity', solidityLangDef);

if (env.errors) {
  // handle errors
} else {
  module.exports = {
    siteMetadata: {
      title: 'MetaMask',
      description: `MetaMask is a ConsenSys Formation.`,
      siteUrl: 'https://metamask.io',
    },
    plugins: [
      'gatsby-plugin-react-helmet',
      'gatsby-plugin-sharp',
      `gatsby-plugin-styled-components`,
      'gatsby-transformer-sharp',
      {
        resolve: `gatsby-source-contentful`,
        options: {
          spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
          accessToken: process.env.GATSBY_CONTENTFUL_API_KEY,
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
          background_color: '#000000',
          theme_color: '#151C24',
          display: 'minimal-ui',
          icon: `${ __dirname }/src/images/metamask-icon-logo-black.png`,
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: `${ __dirname }/src/images`,
        },
      },
      {
        resolve: 'gatsby-plugin-react-svg',
        options: {
          rule: {
            include: `${__dirname}/src/images`
          }
        }
      },
      // {
      //   resolve: `gatsby-plugin-sitemap`,
      //   options: {
      //     query: `
      //     {
      //       site {
      //         siteMetadata {
      //           siteUrl
      //         }
      //       }
      //       allSitePage {
      //         edges {
      //           node {
      //             path
      //           }
      //         }
      //       }
      //       allContentfulPage(filter: {isPrivate: {eq: true}}) {
      //         edges {
      //           node {
      //             slug
      //           }
      //         }
      //       }
      //       allContentfulArticlePage(filter: {isPrivate: {eq: true}}) {
      //       edges {
      //         node {
      //           articleTitle
      //           primaryCategory {
      //             categoryName
      //           }
      //           articleCategories {
      //             categoryName
      //           }
      //         }
      //       }
      //     }
      //     }`,
      //     serialize: ({
      //                   site,
      //                   allSitePage,
      //                   allContentfulPage,
      //                   allContentfulArticlePage,
      //                 }) => {
      //       let privatePages = []
      //       allContentfulPage.edges.map(edge => {
      //         privatePages.push(edge.node.slug)
      //       })
      //
      //       allContentfulArticlePage.edges.map(edge => {
      //         const category = getArticleCategory(edge.node.primaryCategory,
      //           edge.node.articleCategories)
      //         privatePages.push(`/blog/${ kebabCase(category) }/${ kebabCase(
      //           edge.node.articleTitle) }/`)
      //       })
      //
      //       let pages = []
      //       allSitePage.edges.map(edge => {
      //         if (privatePages.indexOf(edge.node.path) === -1) {
      //           pages.push({
      //             url: site.siteMetadata.siteUrl + edge.node.path,
      //             changefreq: `daily`,
      //             priority: 0.7,
      //           })
      //         }
      //       })
      //       return pages
      //     },
      //   },
      // },
      'gatsby-plugin-well-known',
      'gatsby-plugin-preact',
      {
        resolve: 'gatsby-plugin-robots-txt',
        options: {
          host: 'https://metamask.io',
          sitemap: 'https://metamask.io/sitemap.xml',
          policy: [{ userAgent: '*', allow: '/' }]
        }
      }
      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.app/offline
      // 'gatsby-plugin-offline',
    ],
  }
}
