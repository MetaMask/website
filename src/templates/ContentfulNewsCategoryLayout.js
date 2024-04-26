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
    } = {},
    path,
  } = props

  const location = useLocation()
  const { pathname, search } = location
  const paginatedNews = stories.nodes

  const seoData = { ...seo }
  if (path.includes('/news/')) {
    let categoryName = 'Latest'
    categoryName = category ? capitalize(category) : 'Latest'
    seoData.pageTitle = `${seoData.pageTitle} | ${categoryName} | MetaMask`
    seoData.pageDescription = `${seoData.pageDescription} | ${categoryName}`
  }

  useEffect(() => {
    const params = queryString.parse(search)
    const { page } = params
    if (page) {
      navigate(`${pathname}${page}`)
    }
  }, [])

  return (
    <Layout locale={locale} localizedPages={localizedPages}>
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
