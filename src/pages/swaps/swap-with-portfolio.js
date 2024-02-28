import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import MultiToken from '../../components/Landing/multitoken-swap/multiToken'
import Freedom from '../../components/Landing/multitoken-swap/freedom'
import Header from '../../components/Landing/multitoken-swap/header'
import Intro from '../../components/Landing/multitoken-swap/intro'
import * as styles from './multitoken-swap.module.scss'
import Layout from '../../templates/PageLayout'
import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import FeatureVideo from '../../components/Landing/feature-video'
import SwapFooter from '../../components/Landing/swap-footer'
import WhySwap from '../../components/Landing/why-swap'
import SupportedNetwork from '../../components/Landing/supported-network/supportedNetwork'

const TokenSwapPage = ({ data }) => {
  const { seo } = data

  useEffect(() => {
    document.documentElement.classList.add(styles.isLanding)

    return () => document.documentElement.classList.remove(styles.isLanding)
  })

  return (
    <Layout>
      {seo &&
        contentfulModuleToComponent({
          ...seo,
          pagePath: '/swaps/swap-with-portfolio/',
        })}

      <article className="page-swap-with-portfolio">
        <Header
          title="Metamask | Portfolio"
          btnLabel="Try Portfolio"
          btnLink="https://portfolio.metamask.io/"
        />

        <Intro
          title="The most trusted way to swap your tokens"
          subTitle="Swap from anywhere, anytime"
          description="Swap tokens directly from the MetaMask browser extension, mobile wallet, and <a href='https://portfolio.metamask.io/swap' target='_blank'>MetaMask Portfolio</a>. The swap feature combines data from decentralized exchange aggregators, market makers, and DEXs, to ensure you get competitive rates with the lowest network fees."
          firstBtnLabel="Swap with MetaMask"
          firstBtnLink="https://portfolio.metamask.io/swap"
          bgColor="blue"
          sectionId="swap-with-portfolio"
        />

        <FeatureVideo
          title="How to Swap with MetaMask"
          description="Unlike other crypto wallets out there, MetaMask is built to be privacy-first. We empower you to access, store and swap tokens, without having to worry about dapps or exchanges accessing more personal data than you’ve consented to give. Whether you’re participating in decentralized finance or exploring web3, with MetaMask, you are always in complete control of your data."
          youtubeCode="q9uG6Ra-w54"
        />

        <WhySwap bgColor="yellow" />

        <MultiToken
          title="Introducing multi-token swap. Save gas. Save time."
          subTitle="Swap multiple tokens to one, in a single transaction."
          text="The swap feature combines data from decentralized exchange aggregators, market makers, and DEXs to ensure you get competitive rates with the lowest network fees."
          btnLabel="Try Portfolio"
          btnLink="https://portfolio.metamask.io/swaps"
          youtubeCode="q9uG6Ra-w54"
          disableImage
          hasSideImage
        />

        <SupportedNetwork />

        <Freedom
          title="Connect your wallet and start swapping"
          text="MetaMask is the leading self-custodial wallet. The safe and simple way to access blockchain applications and web3."
          btnLabel="Try Portfolio"
          btnLink="https://portfolio.metamask.io/"
          bgColor="green"
          image="/images/landing/multitoken-swap/freedom-v2.svg"
        />

        <SwapFooter />
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
