import React from 'react'
import { graphql } from 'gatsby'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import Layout from './PageLayout'
import ConsenSysToU from '../components/ConsenSysToU'

/**
 * @name ContentfulToULayout
 * @summary -
 * @description -
 */

const ContentfulToULayout = props => {
  const {
    data: { header, footer, seo },
    pageContext: { touData, pathBuild, themeColor, h2FontSize, isStandalone },
    path,
    ...rest
  } = props

  if (isStandalone)
    return (
      <Layout
        {...rest}
        themeColor={themeColor}
        h2FontSize={h2FontSize}
        isStandalone={isStandalone}
      >
        {touData && <ConsenSysToU touData={touData} />}
      </Layout>
    )

  return (
    <Layout {...rest} themeColor={themeColor} h2FontSize={h2FontSize}>
      {seo && contentfulModuleToComponent({ ...seo, pagePath: pathBuild })}
      {header && contentfulModuleToComponent(header)}
      {touData && <ConsenSysToU touData={touData} />}
      {footer && contentfulModuleToComponent(footer)}
    </Layout>
  )
}

export default ContentfulToULayout

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
