import React, { useEffect } from 'react'
import Freedom from '../components/Landing/multitoken-swap/freedom'
import Header from '../components/Landing/multitoken-swap/header'
import Intro from '../components/Landing/multitoken-swap/intro'
import Leading from '../components/Landing/multitoken-swap/leading'
import MultiToken from '../components/Landing/multitoken-swap/multiToken'
import Layout from './PageLayout'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import * as styles from '../styles/swap.module.scss'
import { graphql } from 'gatsby'

const MultiTokenSwap = ({ data, pageContext }) => {
  const { seo, footer } = data
  const { pathBuild, widerContainer, localizedPages } = pageContext

  useEffect(() => {
    document.documentElement.classList.add(styles.isLanding)
    return () => document.documentElement.classList.remove(styles.isLanding)
  })

  return (
    <Layout widerContainer={widerContainer} localizedPages={localizedPages}>
      {seo &&
        contentfulModuleToComponent({
          ...seo,
          pagePath: pathBuild,
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

        {footer && contentfulModuleToComponent(footer)}
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($seoId: String, $footerId: String, $node_locale: String) {
    seo: contentfulSeo(
      contentful_id: { eq: $seoId }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulSeoFields
    }
    footer: contentfulLayoutFooter(
      contentful_id: { eq: $footerId }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulLayoutFooterFields
    }
  }
`

export default MultiTokenSwap
