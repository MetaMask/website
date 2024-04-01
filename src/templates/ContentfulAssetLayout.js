import React from 'react'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import Layout from './PageLayout'
import AssetInfo from '../components/AssetInfo'
import { graphql } from 'gatsby'

/**
 * @name ContentfulAssetLayout
 * @summary -
 * @description -
 */

const ContentfulAssetLayout = props => {
  const {
    data: { header, footer },
    pageContext: { assetData, themeColor, h2FontSize, localizedPages },
    path,
    ...rest
  } = props

  return (
    <Layout
      {...rest}
      themeColor={themeColor}
      h2FontSize={h2FontSize}
      localizedPages={localizedPages}
    >
      {header && contentfulModuleToComponent(header)}
      {assetData && <AssetInfo assetData={assetData} />}
      {footer && contentfulModuleToComponent(footer)}
    </Layout>
  )
}

export default ContentfulAssetLayout

export const ContentfulQuery = graphql`
  query($headerId: String, $footerId: String, $node_locale: String) {
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
  }
`
