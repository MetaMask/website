import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import MultiToken from '../../components/Landing/multitoken-swap/multiToken'
import Freedom from '../../components/Landing/multitoken-swap/freedom'
import Leading from '../../components/Landing/multitoken-swap/leading'
import Header from '../../components/Landing/multitoken-swap/header'
import Intro from '../../components/Landing/multitoken-swap/intro'
import * as styles from './multitoken-swap.module.scss'
import Layout from '../../templates/PageLayout'
import React, { useEffect } from 'react'
import { graphql } from 'gatsby'

const TokenSwapPage = ({ data }) => {
  const { seo, footer } = data

  useEffect(() => {
    document.documentElement.classList.add(styles.isLanding)

    return () => document.documentElement.classList.remove(styles.isLanding)
  })

  return (
    <Layout>
      {seo &&
        contentfulModuleToComponent({
          ...seo,
          pagePath: '/swaps/multitoken-swap/',
        })}

      <article className="page-multitoken-swap">
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
          videoFirst={true}
          disableImage={true}
          youtubeCode="4ecgDYmt36U"
          title="Multiple tokens. A single swap. Save gas with multi-token swaps."
          text="The Swaps feature combines data from decentralized exchange aggregators, market makers, and DEXs, to ensure you get the very best price with the lowest network fees."
          btnLabel="Take a look"
          btnLink="https://portfolio.metamask.io/swaps"
        />

        <Freedom
          title="The freedom of <br />self-custody meets the safety of MetaMask"
          text="Track and manage your web3 everything, all in one place."
          btnLabel="Try Portfolio"
          btnLink="https://portfolio.metamask.io/"
        />

        <Leading
          text="MetaMask is the leading self-custodial wallet. The safe and simple way to access blockchain applications and web3."
          title="Connect your wallet and start swapping"
          btnLabel="Connect Your Wallet"
          btnLink="https://portfolio.metamask.io/"
        />

        {footer &&
          contentfulModuleToComponent({
            ...footer,
            pagePath: '/swaps/multitoken-swap/',
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
