import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import MultiToken from '../../components/Landing/token-swap/multiToken'
import Freedom from '../../components/Landing/token-swap/freedom'
import Leading from '../../components/Landing/token-swap/leading'
import Header from '../../components/Landing/token-swap/header'
import Intro from '../../components/Landing/token-swap/intro'
import Layout from '../../templates/PageLayout'
import './token-swap.module.scss'
import { graphql } from 'gatsby'
import React from 'react'

const TokenSwapPage = ({ data }) => {
  const { seo, footer } = data

  return (
    <Layout>
      {seo &&
        contentfulModuleToComponent({ ...seo, pagePath: '/swaps/token-swap/' })}

      <article className="page-token-swap">
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
          contentfulModuleToComponent({
            ...footer,
            pagePath: '/swaps/token-swap/',
          })}
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

export default TokenSwapPage
