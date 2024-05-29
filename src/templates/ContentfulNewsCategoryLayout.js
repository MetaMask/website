import React, { useEffect } from 'react'
import { graphql, navigate } from 'gatsby'
import Layout from './PageLayout'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import { DEFAULT_LOCALE_CODE } from '../lib/config.mjs'
import queryString from 'query-string'
import { useLocation } from '@reach/router'
import capitalize from 'lodash/capitalize'

const ContentfulNewsCategoryLayout = props => {
  const {
    data: { seo, header, footer, layoutModuleContainer, hero, stories },
    pageContext: {
      pathBuild,
      locale = DEFAULT_LOCALE_CODE,
      totalItems,
      currentPage,
      category,
      localizedPages,
      totalPages,
      sharedCopy,
    } = {},
  } = props

  const location = useLocation()
  const { pathname, search } = location
  const paginatedNews = stories.nodes

  const seoData = { ...seo }
  let categoryName = 'Latest'
  categoryName = category ? capitalize(category) : 'Latest'
  seoData.pageTitle = `MetaMask | ${seoData.pageTitle} | ${categoryName}`
  seoData.pageDescription = `${seoData.pageDescription} | ${categoryName}`
  if (currentPage && currentPage < totalPages) {
    seoData.paginationNext =
      currentPage === 1
        ? `${pathBuild}page/${currentPage + 1}/`
        : pathBuild.replace(currentPage, currentPage + 1)
  }
  if (currentPage && currentPage > 1) {
    seoData.paginationPrev =
      currentPage === 2
        ? pathBuild.replace(`page/${currentPage}/`, '')
        : pathBuild.replace(currentPage, currentPage - 1)
  }

  useEffect(() => {
    const params = queryString.parse(search)
    const { page } = params
    if (page > 1) {
      navigate(`${pathname}page/${page}/`)
    }
  }, [])

  return (
    <Layout
      locale={locale}
      localizedPages={localizedPages}
      sharedCopy={sharedCopy}
    >
      {seoData &&
        contentfulModuleToComponent({
          ...seoData,
          pagePath: pathBuild,
        })}
      {header && contentfulModuleToComponent(header)}
      {hero && contentfulModuleToComponent(hero)}
      {layoutModuleContainer &&
        contentfulModuleToComponent({
          ...layoutModuleContainer,
          storiesData: {
            stories: paginatedNews,
            totalItems,
            currentPage,
          },
        })}
      {footer && contentfulModuleToComponent(footer)}
    </Layout>
  )
}

export default ContentfulNewsCategoryLayout

export const DownloadPageQuery = graphql`
  query(
    $modules: [String]!
    $headerId: String
    $footerId: String
    $seoId: String
    $skip: Int
    $limit: Int
    $categoryId: String
    $node_locale: String
  ) {
    header: contentfulLayoutHeader(
      contentful_id: { eq: $headerId }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulLayoutHeaderFields
    }
    footer: contentfulLayoutFooter(
      contentful_id: { eq: $footerId }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulLayoutFooterFields
    }
    seo: contentfulSeo(
      contentful_id: { eq: $seoId }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulSeoFields
    }
    hero: contentfulLayoutHero(
      contentful_id: { in: $modules }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulLayoutHeroFields
    }
    layoutModuleContainer: contentfulLayoutModuleContainer(
      contentful_id: { in: $modules }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulLayoutModuleContainerFields
    }
    stories: allContentfulNews(
      sort: { publishDate: DESC }
      filter: {
        isPrivate: { eq: false }
        node_locale: { eq: $node_locale }
        categories: { elemMatch: { contentful_id: { eq: $categoryId } } }
      }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        ...ContentfulNewsFields
      }
    }
  }
`
