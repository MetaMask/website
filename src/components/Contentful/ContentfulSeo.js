import React from 'react'
import PropTypes from 'prop-types'
import SEO from '../Seo'

const ContentfulSeo = props => {
  const {
    moduleConfig: {
      pageTitle,
      pageDescription,
      metaTags,
      linkTags,
      featuredImage,
      pageType = 'page',
      pagePath,
      originalSlug,
      canonicalUrl,
      translation,
      structuredDataSchema,
    },
  } = props

  const extractTags = list =>
    list ? list.map(tag => JSON.parse(tag.internal.content)) : null
  const [ex_metaTags, ex_linkTags] = [metaTags, linkTags].map(extractTags)

  return (
    // eslint-disable-next-line react/jsx-pascal-case
    <SEO
      title={pageTitle}
      description={pageDescription}
      pageType={pageType}
      pagePath={pagePath}
      canonicalUrl={canonicalUrl}
      image={featuredImage}
      metaTags={ex_metaTags}
      linkTags={ex_linkTags}
      originalSlug={originalSlug}
      translation={translation}
      structuredDataSchema={structuredDataSchema}
    />
  )
}

ContentfulSeo.propTypes = {
  pageTitle: PropTypes.string,
  pageDescription: PropTypes.string,
  metaTags: PropTypes.arrayOf(PropTypes.object),
  linkTags: PropTypes.arrayOf(PropTypes.object),
  featuredImage: PropTypes.object,
  pagePath: PropTypes.string,
  canonicalUrl: PropTypes.string,
  structuredDataSchema: PropTypes.object,
}

export default ContentfulSeo
