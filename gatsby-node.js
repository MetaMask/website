const path = require('path')
const { download } = require('./src/lib/utils/download')
const { getNewsUrl } = require(`./src/lib/utils/news`)
const { buildSitemap } = require(`./src/lib/utils/sitemap`)
const { minimatch } = require('minimatch')
const { fetchDevChangeLog } = require('./fetchDataSSR')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  const redirects = await graphql(`
    {
      allRedirects: allContentfulRedirectRedirectArrayJsonNode {
        nodes {
          fromPath
          toPath
        }
      }
    }
  `)
  const devChangelogData = await fetchDevChangeLog(process.env.GH_TOKEN)

  redirects.data?.allRedirects.nodes.forEach(r =>
    createRedirect({
      fromPath: r.fromPath,
      toPath: r.toPath,
    })
  )

  /* Customized Pages Built Inside Contentful CMS */
  const newsCategories = []
  const result = await graphql(`
    {
      allCategories: allContentfulNewsCategory(
        filter: { name: { regex: "/^(?!.*(?:Latest|example)).*$/" } }
      ) {
        nodes {
          contentful_id
          name
        }
      }
    }
  `)
  if (result.data && result.data.allCategories) {
    result.data.allCategories.nodes.forEach(cat => {
      if (cat.name) {
        newsCategories.push(cat.name.toLowerCase())
      }
    })
  }
  const legalsQuery = await graphql(`
    {
      allMdx {
        nodes {
          id
          frontmatter {
            slug
            title
            date
          }
          body
        }
      }
    }
  `)
  const legalData = legalsQuery?.data?.allMdx?.nodes
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
              ... on ContentfulAssetStorage {
                contentful_id
                assets {
                  url
                  filename
                }
              }
              ... on ContentfulPortfolioIntro {
                contentful_id
              }
              ... on ContentfulPortfolioInstructions {
                contentful_id
              }
              ... on ContentfulPortfolioMap {
                contentful_id
              }
            }
            themeColor
            isFaqLayout
            h2FontSize
            widerContainer
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
            widerContainer,
            h2FontSize,
          } = p.node
          const { contentful_id: footerId = '' } = footer || {}
          const { contentful_id: headerId = '' } = header || {}
          const moduleIds = modules.map(m => m.contentful_id)
          const seoId = seo ? seo.contentful_id : ''

          if (slug === '/assets/') {
            const assetResponseData = modules[0]?.assets
            const assetUrls = assetResponseData?.map(el => el.url)
            const assetData = assetResponseData?.map(el => ({
              filename: el.filename,
              url: `/assets/${path.parse(el.url).base}`,
            }))

            if (assetUrls) {
              ;(async () => {
                await Promise.all(
                  assetUrls.map(url =>
                    download(url, `public/assets/${path.parse(url).base}`)
                  )
                ).catch(_ => {
                  return Promise.reject('Fetch MetaMask assets failed!')
                })
              })()
              createPage({
                path: slug,
                component: path.resolve(
                  `./src/templates/ContentfulAssetLayout.js`
                ),
                context: {
                  headerId,
                  footerId,
                  assetData,
                  themeColor,
                  isFaqLayout,
                  widerContainer,
                  h2FontSize,
                },
              })
              return
            }
          }

          if (slug === '/news/') {
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

          let legalPages = [
            '/terms-of-use/',
            '/privacy-policy/',
            '/privacy-policy/cookies/',
          ]
          if (legalPages.includes(slug)) {
            const resolvedData = legalData?.find(
              s => s?.frontmatter?.slug === slug
            )
            if (!resolvedData) {
              // Skip creating page
              return
            }
            createPage({
              path: slug,
              component: path.resolve(`./src/templates/MarkdownPageLayout.js`),
              context: {
                headerId,
                footerId,
                seoId,
                pageData: resolvedData,
                themeColor,
                pathBuild: slug,
                isFaqLayout,
                h2FontSize,
              },
            })
            return
          }

          if (slug === '/portfolio/') {
            createPage({
              path: slug,
              component: path.resolve(
                `./src/templates/ContentfulPortfolioLayout.js`
              ),
              context: {
                headerId,
                footerId,
                seoId,
                pathBuild: slug,
                modules: moduleIds,
              },
            })
            return
          }

          const extraData = slug === '/developer/' ? devChangelogData : null
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
              widerContainer,
              extraData,
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
      stories: allContentfulNews(sort: { publishDate: DESC }) {
        edges {
          node {
            contentful_id
            title
            slug
            categories {
              name
            }
            isPrivate
          }
        }
      }
    }
  `)
    .then(result => {
      if (result.data && result.data.stories) {
        const stories = result.data.stories.edges.filter(
          item => !item.node.isPrivate
        )
        return stories.map(({ node: news }, index) => {
          const { contentful_id } = news
          const newsUrl = getNewsUrl(news)

          createPage({
            path: newsUrl,
            component: path.resolve('./src/templates/NewsLayout.js'),
            context: {
              news_content_id: contentful_id,
              pathBuild: newsUrl,
            },
          })
        })
      }
    })
    .catch(error => {
      console.log(' Error generating News Page: ', error)
    })
  // Author profile page
  const contentfulAuthorProfile = graphql(`
    {
      authors: allContentfulNewsAuthor(
        filter: { createProfilePage: { eq: true } }
      ) {
        nodes {
          contentful_id
          name
          profileUrl
        }
      }
    }
  `)
    .then(result => {
      if (result.data && result.data.authors) {
        const authors = result.data.authors.nodes
        return authors.map(author => {
          const { contentful_id, profileUrl } = author
          const slug = '/author/' + profileUrl + '/'
          createPage({
            path: slug,
            component: path.resolve('./src/templates/AuthorProfileLayout.js'),
            context: {
              author_id: contentful_id,
              pathBuild: slug,
            },
          })
        })
      }
    })
    .catch(error => {
      console.log(' Error generating author profile page: ', error)
    })

  const autoGeneratedPages = [
    contentfulLayouts,
    contentfulNews,
    contentfulAuthorProfile,
  ]

  return Promise.all(autoGeneratedPages)
}

exports.onPostBuild = buildSitemap({
  query: `
  {
    site {
      siteMetadata {
        siteUrl
        title
      }
    }
    allSitePage {
      nodes {
        path
      }
    }
    allPrivateContentfulLayout: allContentfulLayout(filter: {isPrivate: {eq: true}}) {
      nodes {
        slug
      }
    }
    allContentfulNews(filter: {isPrivate: {eq: false}}) {
      nodes {
        title
        slug
        categories {
          name
        }
        publishDate(formatString: "YYYY-MM-DD")
      }
    }
    allPrivateContentfulNews: allContentfulNews(filter: {isPrivate: {eq: true}}) {
      nodes {
        title
        slug
        categories {
          name
        }
      }
    }
    allContentfulNewsNonCanonical: allContentfulNews(filter: {canonicalUrl: {ne: null}}) {
      nodes {
        title
        categories {
          name
        }
      }
    }
  }`,
  sitemapTree: {
    fileName: 'sitemap-index.xml',
    children: [
      {
        fileName: 'sitemap-0.xml',
        urlsetAnchorAttributes:
          'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' +
          ' xmlns:xhtml="http://www.w3.org/1999/xhtml"',
        resolvePages: ({
          allSitePage,
          allPrivateContentfulLayout,
          allPrivateContentfulNews,
          allContentfulNews,
        }) => {
          let privatePages = ['/preview/', '/news/latest/']
          allPrivateContentfulLayout.nodes.forEach(page => {
            privatePages.push(page.slug)
          })
          allContentfulNews.nodes.forEach(page => {
            const newsUrl = getNewsUrl(page)
            privatePages.push(newsUrl)
          })
          allPrivateContentfulNews.nodes.forEach(page => {
            const newsUrl = getNewsUrl(page)
            privatePages.push(newsUrl)
          })
          const allPages = []
          allSitePage.nodes.forEach(page => {
            if (privatePages.indexOf(page.path) === -1) {
              allPages.push(page)
            }
          })
          return allPages.map(page => {
            return { ...page }
          })
        },
        filterPages: ({ path }) => {
          const excludePages = [`/dev-404-page*`, `/404*`, `/news/*`]
          return !excludePages.some(exclude => minimatch(path, exclude))
        },
        serializer: ({ path }) => ({
          loc: path,
          changefreq: 'daily',
          priority: path === '' ? '1' : '0.8',
        }),
      },
      {
        fileName: 'news-sitemap.xml',
        resolvePages: ({
          site,
          allContentfulNews,
          allContentfulNewsNonCanonical,
        }) => {
          const siteTitle = site.siteMetadata.title
          const privatePages = []
          allContentfulNewsNonCanonical.nodes.forEach(page => {
            const newsUrl = getNewsUrl(page)
            privatePages.push(newsUrl)
          })
          const allNews = []
          allContentfulNews.nodes.forEach(page => {
            const newsUrl = getNewsUrl(page)
            if (privatePages.indexOf(newsUrl) === -1) {
              allNews.push({ ...page, path: newsUrl })
            }
          })
          return allNews.map(page => {
            return {
              path: page.path,
              siteTitle,
              publishDate: page.publishDate,
              title: page.title,
            }
          })
        },
        urlsetAnchorAttributes:
          'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' +
          ' xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"' +
          ' xmlns:xhtml="http://www.w3.org/1999/xhtml"',
        serializer: ({ path, siteTitle, publishDate, title }) => ({
          loc: path,
          changefreq: 'daily',
          priority: path === '' ? '1' : '0.8',
          'news:news': {
            'news:publication': {
              'news:name': siteTitle,
              'news:language': 'en',
            },
            'news:publication_date': publishDate,
            'news:title': title,
          },
        }),
      },
    ],
  },
})
