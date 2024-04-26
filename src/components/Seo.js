import React from 'react'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'
import Helmet from 'react-helmet'
import { useLocation } from '@reach/router'
import { DEFAULT_LOCALE_CODE, LOCALES } from '../lib/config.mjs'

/**
 * @name - SEO
 * @summary - Adds SEO metadata to pages
 * @description -
 * @prop -
 */
const SEO = props => {
  const {
    title,
    description,
    image,
    metaTags,
    linkTags,
    pageType,
    pagePath,
    originalSlug,
    canonicalUrl,
    translation,
    structuredDataSchema,
  } = props

  const location = useLocation()
  const pathname = location.pathname

  const data = useStaticQuery(siteSeoQuery)
  const {
    site: {
      siteMetadata: { defaultTitle, defaultDescription, siteUrl },
    },
  } = data

  const seo = {
    title: title || defaultTitle,
    desc: description || defaultDescription,
    canonicalUrl: canonicalUrl || `${siteUrl}${pagePath}`,
  }
  const getMetaTags = (name, value) =>
    name && value
      ? [
          { name, content: value },
          { property: `og:${name}`, content: value },
          { name: `twitter:${name}`, content: value },
        ]
      : []
  const urlImageMeta = image && image?.file?.url
  const urlImageMetaClean =
    urlImageMeta &&
    typeof urlImageMeta === 'string' &&
    urlImageMeta.startsWith('//')
      ? `https:${urlImageMeta}`
      : urlImageMeta
  const meta = [
    { property: 'og:type', content: pageType },
    ...getMetaTags('title', seo.title),
    ...getMetaTags('description', seo.desc),
    ...getMetaTags('image', urlImageMetaClean),
    ...getMetaTags('image:src', urlImageMetaClean),
    pathname !== pagePath
      ? {
          'http-equiv': 'refresh',
          content: `0;URL='${siteUrl}${pagePath}'`,
        }
      : {},
    ...(metaTags || []),
    urlImageMetaClean
      ? {
          name: 'twitter:card',
          content: 'summary_large_image',
        }
      : {},
  ]

  const link = [
    { rel: 'canonical', href: seo.canonicalUrl },
    ...(linkTags || []),
  ]

  const localeUrl = locale =>
    locale === DEFAULT_LOCALE_CODE ? '' : `/${locale}`
  if (translation) {
    LOCALES.forEach(l => {
      const localeHref =
        siteUrl + localeUrl(l.code) + (originalSlug || pagePath)
      link.push({
        rel: 'alternate',
        hrefLang: l.code,
        href: localeHref,
      })
    })
  }

  return (
    <Helmet meta={meta} link={link} title={seo.title}>
      {structuredDataSchema && (
        <script type="application/ld+json">
          {structuredDataSchema.internal.content}
        </script>
      )}
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  pageType: PropTypes.string,
  pagePath: PropTypes.string.isRequired,
  metaTags: PropTypes.arrayOf(PropTypes.object),
  linkTags: PropTypes.arrayOf(PropTypes.object),
  image: PropTypes.object,
  structuredDataSchema: PropTypes.object,
}

SEO.defaultProps = {
  image: undefined,
  description: undefined,
  pageType: 'page',
  metaTags: [],
  linktags: [],
}

export default SEO

const siteSeoQuery = graphql`
  query {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl
      }
    }
  }
`
