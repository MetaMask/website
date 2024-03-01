const path = require('path')
const { download } = require('./src/lib/utils/download')
const { getNewsUrl } = require(`./src/lib/utils/news`)
const redirects = require('./redirects.json')
const { buildSitemap } = require(`./src/lib/utils/sitemap`)
const { fetchDevChangeLog } = require('./fetchDataSSR')
const { writeRedirectsFile } = require('./src/lib/utils/redirect')

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
  const devChangelogData = await fetchDevChangeLog(process.env.GH_TOKEN)
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
            widerContainer
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
                  widerContainer,
                  h2FontSize,
                },
              })
            })
          }

          let legalMatch = -1
          if (
            (legalMatch = [
              '/terms-of-use/',
              '/privacy-policy/',
              '/privacy-policy/cookies/',
            ].indexOf(slug)) >= 0
          ) {
            const resolvedData = legalData?.find(
              s => s?.frontmatter?.slug === slug
            )
            if (!resolvedData) {
              // Skip creating page
              return
            }
            const legalUrls = [slug]
            if (legalMatch === 0) legalUrls.push(`${slug}standalone/`)
            legalUrls.forEach((legalUrl, index) => {
              createPage({
                path: legalUrl,
                component: path.resolve(
                  `./src/templates/MarkdownPageLayout.js`
                ),
                context: {
                  headerId,
                  footerId,
                  seoId,
                  pageData: resolvedData,
                  themeColor,
                  pathBuild: legalUrl,
                  isFaqLayout,
                  widerContainer,
                  h2FontSize,
                  isStandalone: index === 1,
                },
              })
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
          if (slug === '/swaps/swap-with-portfolio/') {
            createPage({
              path: slug,
              component: path.resolve(
                `./src/templates/SwapWithPortfolioLayout.js`
              ),
              context: {
                footerId,
                seoId,
                pathBuild: slug,
                widerContainer
              },
            })
            return
          }
          if (slug === '/swaps/multitoken-swap/') {
            createPage({
              path: slug,
              component: path.resolve(
                `./src/templates/MultiTokenSwapLayout.js`
              ),
              context: {
                footerId,
                seoId,
                pathBuild: slug,
                widerContainer
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
              widerContainer,
              h2FontSize,
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

exports.onPostBuild = ({ graphql, store, pathPrefix, reporter }) => {
  const { redirects, program, config } = store.getState()
  buildSitemap({
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
    }`,
    sitemapTree: {
      fileName: 'sitemap-index.xml',
      children: [
        {
          fileName: 'sitemap-0.xml',
          urlsetAnchorAttributes: 'xmlns:xhtml="http://www.w3.org/1999/xhtml"',
          resolvePages: ({
            allSitePage,
            allPrivateContentfulLayout,
            allPrivateContentfulNews,
            allContentfulNews,
          }) => {
            let privatePages = ['/preview/']
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
            const excludePages = [`/dev-404-page`, `/404`, `/404.html`]
            return !excludePages.some(exclude => path.startsWith(exclude))
          },
          serializer: ({ path }) => ({
            loc: path,
            changefreq: 'daily',
            priority: path === '' ? '1' : '0.8',
          }),
        },
        {
          fileName: 'news-sitemap.xml',
          resolvePages: ({ site, allContentfulNews }) => {
            const siteTitle = site.siteMetadata.title
            return allContentfulNews.nodes.map(page => {
              const newsUrl = getNewsUrl(page)
              return {
                path: newsUrl,
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
  })({ graphql, pathPrefix, reporter })
  // Write redirect
  let prefix = ''
  if (program.prefixPaths) {
    prefix = config.pathPrefix
  }
  const folder = path.join(program.directory, 'public')
  return writeRedirectsFile(redirects, folder, prefix)
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig, plugins }) => {
  if (stage === 'build-javascript' || stage === 'develop') {
    const config = getConfig();
    const miniCss = config.plugins.find(
      (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
    );
    if (miniCss) {
      miniCss.options.ignoreOrder = true;
    }
    actions.replaceWebpackConfig(config);
    actions.setWebpackConfig({
      plugins: [plugins.provide({ process: 'process/browser' })],
    });
  }
}