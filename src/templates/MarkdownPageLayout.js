import React from 'react'
import { graphql } from 'gatsby'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import Layout from './PageLayout'
import MarkdownPageBody from '../components/MarkdownPageBody'

/**
 * @name MarkdownPageLayout
 * @summary -
 * @description -
 */

const MarkdownPageLayout = props => {
  const {
    data: { header, footer, seo },
    pageContext: { pageData, pathBuild, themeColor, h2FontSize },
    path,
    ...rest
  } = props

  return (
    <Layout {...rest} themeColor={themeColor} h2FontSize={h2FontSize}>
      {seo && contentfulModuleToComponent({ ...seo, pagePath: pathBuild })}
      {header && contentfulModuleToComponent(header)}
      {pageData && <MarkdownPageBody pageData={pageData} />}
      {footer && contentfulModuleToComponent(footer)}
    </Layout>
  )
}

export default MarkdownPageLayout

export const ContentfulQuery = graphql`
  query($headerId: String, $footerId: String, $seoId: String) {
    header: contentfulLayoutHeader(contentful_id: { eq: $headerId }) {
      ...ContentfulLayoutHeaderFields
    }

    footer: contentfulLayoutFooter(contentful_id: { eq: $footerId }) {
      ...ContentfulLayoutFooterFields
    }

    seo: contentfulSeo(contentful_id: { eq: $seoId }) {
      ...ContentfulSeoFields
    }
  }
`
