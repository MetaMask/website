import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import MultiToken from '../../components/Landing/get/multiToken'
import Freedom from '../../components/Landing/get/freedom'
import Leading from '../../components/Landing/get/leading'
import Header from '../../components/Landing/get/header'
import Intro from '../../components/Landing/get/intro'
import Layout from '../../templates/PageLayout'
import { graphql } from 'gatsby'
import './get.module.scss'
import React from 'react'

const SwapsGetPage = ({ data }) => {
  const { seo, footer } = data

  return (
    <Layout>
      {seo && contentfulModuleToComponent({ ...seo, pagePath: '/swaps/get/' })}

      <article className="page-swaps-get">
        <Header
          title="Metamask | Portfolio"
          btnLabel="Launch app"
          btnLink="https://portfolio.metamask.io/"
        />

        <Intro
          title="Introducing <br />multi-token swap. <br />Save gas. Save time."
          firstBtnLabel="Connect your wallet"
          firstBtnLink="https://portfolio.metamask.io/"
          text="Don’t have a MetaMask Wallet? Sign up and"
          secondBtnLabel="Download now"
          secondBtnLink="https://metamask.io/download/"
        />

        <MultiToken
          title="Multiple tokens. A single swap. Save gas with multi-token swaps."
          text="The Swaps feature combines data from decentralized exchange aggregators, market makers, and DEXs, to ensure you get the very best price with the lowest network fees."
          btnLabel="Take a look"
          btnLink="https://portfolio.metamask.io/swaps"
        />

        <Freedom
          title="The freedom of <br />self-custody meets the safety of MetaMask"
          text="Track and manage your web3 everything, all in one place."
          btnLabel="Connect your wallet"
          btnLink="https://portfolio.metamask.io/"
        />

        <Leading
          text="MetaMask is the leading self-custodial wallet. The safe and simple way to access blockchain applications and web3."
          title="Connect your wallet and start swapping"
          btnLabel="Try Portfolio"
          btnLink="https://portfolio.metamask.io/"
        />

        {footer &&
          contentfulModuleToComponent({ ...footer, pagePath: '/swaps/get/' })}
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($seoId: String, $footerId: String) {
    seo: contentfulSeo(contentful_id: { eq: $seoId }) {
      ...ContentfulSeoFields
    }
    footer: contentfulLayoutFooter(contentful_id: { eq: $footerId }) {
      ...ContentfulLayoutFooterFields
    }
  }
`

export default SwapsGetPage
