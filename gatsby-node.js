const path = require('path')
const { download } = require('./src/lib/utils/download')
const { getNewsUrl } = require(`./src/lib/utils/news`)
const { buildSitemap } = require(`./src/lib/utils/sitemap`)
const { minimatch } = require('minimatch')
const { fetchDevChangeLog } = require('./fetchDataSSR')
const { writeRedirectsFile } = require('./src/lib/utils/redirect')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  const {
    LOCALES_TRANSLATE,
    mapTemplateLayout,
    DEFAULT_LOCALE_CODE,
  } = await import('./src/lib/config.mjs')

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

  const sharedCopyResult = await graphql(`
    {
      sharedCopy: allContentfulSharedCopy {
        nodes {
          node_locale
          copyItem {
            key
            value
          }
        }
      }
    }
  `)
  const sharedCopyData = sharedCopyResult?.data?.sharedCopy?.nodes || []
  const sharedCopy = sharedCopyData.reduce((acc, cur) => {
    const sharedCopyDict = {}
    for (const item of cur.copyItem || []) {
      sharedCopyDict[item.key] = item.value
    }
    acc[cur.node_locale] = sharedCopyDict
    return acc
  }, {})

  /* Customized Pages Built Inside Contentful CMS */
  const localizedPages = []
  const translatedPages = await graphql(`{
      pages: allContentfulLayout(
        filter: {isPrivate: { eq: false }, translation: {eq: true}, node_locale: {eq: "${DEFAULT_LOCALE_CODE}"}}
      ) {
        nodes {
          slug
        }
      }
      news: allContentfulNews(
        filter: {isPrivate: { eq: false }, translation: {eq: true}, node_locale: {eq: "${DEFAULT_LOCALE_CODE}"}}
      ) {
        nodes {
          title
          slug
          categories {
            name
            slug
          }
        }
      }
    }
  `)
  if (translatedPages.data) {
    if (translatedPages.data.pages?.nodes) {
      translatedPages.data.pages.nodes.forEach(page => {
        localizedPages.push(page.slug)
      })
    }
    if (translatedPages.data.news?.nodes) {
      translatedPages.data.news.nodes.forEach(news => {
        const newsUrl = getNewsUrl(news)
        localizedPages.push(newsUrl)
      })
    }
  }

  const newsCategories = []
  const result = await graphql(`
    {
      allCategories: allContentfulNewsCategory(
        filter: { name: { regex: "/^(?!.*example).*$/" }, node_locale: {eq: "${DEFAULT_LOCALE_CODE}"} }
      ) {
        nodes {
          contentful_id
          name
          news {
            contentful_id
          }
        }
      }
    }
  `)
  if (result.data && result.data.allCategories) {
    result.data.allCategories.nodes.forEach(cat => {
      newsCategories.push({
        name: cat.name === 'Latest' ? '' : cat.name.toLowerCase(),
        categoryId: cat.contentful_id,
        total: cat.news?.length || 0,
      })
    })
  }

  if (localizedPages.includes('/news/')) {
    newsCategories.forEach(
      page => page.name && localizedPages.push(`/news/${page.name}/`)
    )
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
      pages: allContentfulLayout(
        filter: { isPrivate: { eq: false }, node_locale: { eq: "${DEFAULT_LOCALE_CODE}" } }
      ) {
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
            translation
            pageType
            node_locale
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
            translation,
            pageType,
            node_locale,
          } = p.node
          const { contentful_id: footerId = '' } = footer || {}
          const { contentful_id: headerId = '' } = header || {}
          const moduleIds = modules?.map(m => m.contentful_id)
          const seoId = seo ? seo.contentful_id : ''

          if (pageType === 'Asset') {
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
                component: path.resolve(mapTemplateLayout(pageType)),
                context: {
                  headerId,
                  footerId,
                  assetData,
                  themeColor,
                  isFaqLayout,
                  widerContainer,
                  h2FontSize,
                  node_locale,
                  localizedPages,
                  sharedCopy: sharedCopy[node_locale],
                },
              })
              return
            }
          }

          if (pageType === 'News') {
            newsCategories.forEach(cat => {
              const itemsPerPage = 4
              let totalPages = Math.ceil(cat.total / itemsPerPage) || 1
              const baseCategoryPath = `/news/${cat.name ? cat.name + '/' : ''}`
              Array.from({ length: totalPages }, (_, index) => {
                const categoryPath = index
                  ? `${baseCategoryPath}page/${index + 1}/`
                  : baseCategoryPath

                if (translation) {
                  LOCALES_TRANSLATE.forEach(locale => {
                    const localeSlug = `/${locale.code}${categoryPath}`
                    createPage({
                      path: localeSlug,
                      component: path.resolve(mapTemplateLayout(pageType)),
                      context: {
                        headerId,
                        footerId,
                        seoId,
                        modules: moduleIds,
                        themeColor,
                        pathBuild: localeSlug,
                        isFaqLayout,
                        h2FontSize,
                        localizedPages,
                        limit: itemsPerPage,
                        skip: index * itemsPerPage,
                        categoryId: cat.categoryId,
                        category: cat.name,
                        totalItems: cat.total,
                        currentPage: index + 1,
                        totalPages,
                        sharedCopy: sharedCopy[locale.code],
                        slug: categoryPath,
                        translation,
                        locale: locale.code,
                        node_locale: locale.code,
                        newsCategories,
                      },
                    })
                  })
                }
                createPage({
                  path: categoryPath,
                  component: path.resolve(mapTemplateLayout(pageType)),
                  context: {
                    headerId,
                    footerId,
                    seoId,
                    modules: moduleIds,
                    themeColor,
                    pathBuild: categoryPath,
                    isFaqLayout,
                    h2FontSize,
                    localizedPages,
                    limit: itemsPerPage,
                    skip: index * itemsPerPage,
                    categoryId: cat.categoryId,
                    category: cat.name,
                    totalItems: cat.total,
                    currentPage: index + 1,
                    totalPages,
                    sharedCopy: sharedCopy[node_locale],
                    translation,
                    node_locale,
                    newsCategories,
                  },
                })
              })
            })
            return
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
              component: path.resolve(mapTemplateLayout(pageType)),
              context: {
                headerId,
                footerId,
                seoId,
                pageData: resolvedData,
                themeColor,
                pathBuild: slug,
                isFaqLayout,
                h2FontSize,
                node_locale,
                localizedPages,
                sharedCopy: sharedCopy[node_locale],
              },
            })
            return
          }
          const extraData = pageType === 'Developer' ? devChangelogData : null
          if (translation) {
            LOCALES_TRANSLATE.forEach(locale => {
              const localeSlug = `/${locale.code}${slug}`
              createPage({
                path: localeSlug,
                component: path.resolve(mapTemplateLayout(pageType)),
                context: {
                  headerId,
                  footerId,
                  seoId,
                  modules: moduleIds,
                  themeColor,
                  pathBuild: localeSlug,
                  slug,
                  isFaqLayout,
                  widerContainer,
                  h2FontSize,
                  extraData,
                  translation,
                  locale: locale.code,
                  node_locale: locale.code,
                  localizedPages,
                  sharedCopy: sharedCopy[locale.code],
                },
              })
            })
          }
          createPage({
            path: slug,
            component: path.resolve(mapTemplateLayout(pageType)),
            context: {
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
              locale: node_locale,
              translation,
              node_locale,
              localizedPages,
              sharedCopy: sharedCopy[node_locale],
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
        filter: { isPrivate: { eq: false }, node_locale: { eq: "${DEFAULT_LOCALE_CODE}" } }
      ) {
        nodes {
          contentful_id
          title
          slug
          categories {
            name
            slug
          }
          translation
          node_locale
        }
      }
    }
  `)
    .then(result => {
      if (result.data && result.data.stories) {
        const stories = result.data.stories.nodes
        return stories.map(news => {
          const { contentful_id, node_locale, translation } = news
          const newsUrl = getNewsUrl(news)

          if (translation) {
            LOCALES_TRANSLATE.forEach(locale => {
              const localeSlug = `/${locale.code}${newsUrl}`
              createPage({
                path: localeSlug,
                component: path.resolve(mapTemplateLayout('Blog')),
                context: {
                  news_content_id: contentful_id,
                  pathBuild: localeSlug,
                  node_locale: locale.code,
                  localizedPages,
                  slug: newsUrl,
                  translation,
                  sharedCopy: sharedCopy[locale.code],
                },
              })
            })
          }

          createPage({
            path: newsUrl,
            component: path.resolve(mapTemplateLayout('Blog')),
            context: {
              news_content_id: contentful_id,
              pathBuild: newsUrl,
              node_locale,
              localizedPages,
              translation,
              sharedCopy: sharedCopy[node_locale],
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
        filter: { createProfilePage: { eq: true }, node_locale: {eq: "${DEFAULT_LOCALE_CODE}"} }
      ) {
        nodes {
          contentful_id
          name
          profileUrl
          node_locale
        }
      }
    }
  `)
    .then(result => {
      if (result.data && result.data.authors) {
        const authors = result.data.authors.nodes
        return authors.map(author => {
          const { contentful_id, profileUrl, node_locale } = author
          const slug = '/author/' + profileUrl + '/'
          createPage({
            path: slug,
            component: path.resolve(mapTemplateLayout('Author')),
            context: {
              author_id: contentful_id,
              pathBuild: slug,
              node_locale,
              localizedPages,
              sharedCopy: sharedCopy[node_locale],
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

exports.onPostBuild = async ({ graphql, store, pathPrefix, reporter }) => {
  const { DEFAULT_LOCALE_CODE, LOCALES_TRANSLATE } = await import(
    './src/lib/config.mjs'
  )
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
    allPrivateContentfulLayout: allContentfulLayout(filter: {isPrivate: {eq: true}, node_locale: {eq: "${DEFAULT_LOCALE_CODE}"}}) {
      nodes {
        slug
      }
    }
    allContentfulLayoutNonCanonical: allContentfulLayout(
      filter: {node_locale: {eq: "${DEFAULT_LOCALE_CODE}"}, seo: {canonicalUrl: {ne: null}}}
    ) {
      nodes {
        slug
      }
    }
    allContentfulNews(filter: {isPrivate: {eq: false}, node_locale: {eq: "${DEFAULT_LOCALE_CODE}"}}) {
      nodes {
        contentful_id
        title
        slug
        categories {
          name
          slug
        }
        translation
        publishDate(formatString: "YYYY-MM-DD")
      }
    }
    allContentfulNewsLocalized: allContentfulNews(filter: {isPrivate: {eq: false}, translation: {eq: true}, node_locale: {ne: "${DEFAULT_LOCALE_CODE}"}}) {
      nodes {
        contentful_id
        title
        node_locale
      }
    }
    allPrivateContentfulNews: allContentfulNews(filter: {isPrivate: {eq: true}, node_locale: {eq: "${DEFAULT_LOCALE_CODE}"}}) {
      nodes {
        title
        slug
        categories {
          name
          slug
        }
      }
    }
    allContentfulNewsNonCanonical: allContentfulNews(
      filter: {node_locale: {eq: "${DEFAULT_LOCALE_CODE}"}, canonicalUrl: {ne: null}}
    ) {
      nodes {
        title
        categories {
          name
          slug
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
            allContentfulLayoutNonCanonical,
            allPrivateContentfulNews,
            allContentfulNews,
          }) => {
            let privatePages = ['/preview/', '/news/latest/']
            allPrivateContentfulLayout.nodes.forEach(page => {
              privatePages.push(page.slug)
            })
            allContentfulLayoutNonCanonical.nodes.forEach(page => {
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
            const excludePages = [
              `/pyusd`,
              `/dev-404-page*`,
              `/404*`,
              `/zh-CN/`,
              `/hi-IN/`,
              `/it/`,
              `/ja/`,
              `/ko/`,
              `/ru/`,
              `/es/`,
              `/tr/`,
              `/pcm-NG/`,
              `/news/page/+([0-9])`,
              `/news/*/page/+([0-9])`,
              `/zh-CN/news/**`,
              `/hi-IN/news/**`,
              `/it/news/**`,
              `/ja/news/**`,
              `/ko/news/**`,
              `/ru/news/**`,
              `/es/news/**`,
              `/tr/news/**`,
              `/pcm-NG/news/**`,
            ]
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
            allContentfulNewsLocalized,
            allContentfulNewsNonCanonical,
          }) => {
            const localizedNews = allContentfulNewsLocalized.nodes
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

                if (page.translation) {
                  LOCALES_TRANSLATE.forEach(locale => {
                    const localeSlug = `/${locale.code}${newsUrl}`
                    let localeTitle = page.title
                    localizedNews.forEach(news => {
                      if (
                        news.contentful_id === page.contentful_id &&
                        news.node_locale === locale.code
                      ) {
                        localeTitle = news.title
                      }
                    })
                    allNews.push({
                      ...page,
                      path: localeSlug,
                      title: localeTitle,
                      locale: locale.code,
                    })
                  })
                }
              }
            })
            return allNews.map(page => {
              return {
                path: page.path,
                siteTitle,
                publishDate: page.publishDate,
                title: page.title,
                locale: page.locale,
              }
            })
          },
          urlsetAnchorAttributes:
            'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"' +
            ' xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"' +
            ' xmlns:xhtml="http://www.w3.org/1999/xhtml"',
          serializer: ({ path, siteTitle, publishDate, title, locale }) => ({
            loc: path,
            changefreq: 'daily',
            priority: path === '' ? '1' : '0.8',
            'news:news': {
              'news:publication': {
                'news:name': siteTitle,
                'news:language': locale || 'en-US',
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
