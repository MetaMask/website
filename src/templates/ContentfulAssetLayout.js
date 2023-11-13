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
    pageContext: { assetData, themeColor, h2FontSize },
    path,
    ...rest
  } = props

  return (
    <Layout {...rest} themeColor={themeColor} h2FontSize={h2FontSize}>
      {header && contentfulModuleToComponent(header)}
      {assetData && <AssetInfo assetData={assetData} />}
      {footer && contentfulModuleToComponent(footer)}
    </Layout>
  )
}

export default ContentfulAssetLayout

export const ContentfulQuery = graphql`
  query($headerId: String, $footerId: String) {
    header: contentfulLayoutHeader(contentful_id: { eq: $headerId }) {
      ...ContentfulLayoutHeaderFields
    }

    footer: contentfulLayoutFooter(contentful_id: { eq: $footerId }) {
      ...ContentfulLayoutFooterFields
    }
  }
`
