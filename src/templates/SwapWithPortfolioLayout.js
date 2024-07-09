import { graphql } from 'gatsby'
import React, { useEffect } from 'react'
import FeatureVideo from '../components/Landing/feature-video'
import Freedom from '../components/Landing/multitoken-swap/freedom'
import Header from '../components/Landing/multitoken-swap/header'
import Intro from '../components/Landing/multitoken-swap/intro'
import SupportedNetwork from '../components/Landing/supported-network'
import WhySwap from '../components/Landing/why-swap'
import Layout from './PageLayout'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import * as styles from '../styles/swap.module.scss'
import HeaderDisclaimer from '../components/HeaderDisclaimer'
import { useCountry } from '../hooks/useCountry'

const SwapWithPortfolio = ({ data, pageContext }) => {
  const { seo, footer } = data
  const { pathBuild, widerContainer, localizedPages } = pageContext

  const country = useCountry()

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

      <article className="page-swap-with-portfolio">
        <Header
          title="Metamask | Portfolio"
          btnLabel="Try Portfolio"
          btnLink="https://portfolio.metamask.io/"
        />
        {country === 'GB' && <HeaderDisclaimer />}

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

        <SupportedNetwork />

        <Freedom
          title="Connect your wallet and start swapping"
          text="MetaMask is the leading self-custodial wallet. The safe and simple way to access blockchain applications and web3."
          btnLabel="Try Portfolio"
          btnLink="https://portfolio.metamask.io/"
          bgColor="green"
          image="/images/landing/multitoken-swap/freedom-v2.svg"
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
export default SwapWithPortfolio
