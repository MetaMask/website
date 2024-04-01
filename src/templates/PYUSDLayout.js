import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import TextImgList from '../components/Landing/pyusd/textImgList'
import Slideshow from '../components/Landing/pyusd/slideshow'
import TitleBtn from '../components/Landing/pyusd/titleBtn'
import Header from '../components/Landing/pyusd/header'
import Terms from '../components/Landing/pyusd/terms'
import Intro from '../components/Landing/pyusd/intro'
import * as styles from '../styles/swap.module.scss'
import React, { useEffect } from 'react'
import Layout from './PageLayout'
import { graphql } from 'gatsby'

const PYUSDLayout = ({ data, pageContext }) => {
  const { seo, footer } = data
  const { pathBuild, widerContainer, localizedPages } = pageContext

  useEffect(() => {
    document.documentElement.classList.add(styles.isLanding)
    document.documentElement.style.setProperty('--mobile-mockup-width', '375')
    return () => document.documentElement.classList.remove(styles.isLanding)
  })

  return (
    <Layout widerContainer={widerContainer} localizedPages={localizedPages}>
      {seo &&
        contentfulModuleToComponent({
          ...seo,
          pagePath: pathBuild,
        })}

      <article className="page-pyusd">
        <Header
          title="Metamask"
          btnLabel="Download MetaMask"
          btnLink="https://metamask.io/download/"
        />

        <Intro
          title="PayPal USD now available on MetaMask with zero provider fees"
          text="We’ve teamed up with PayPal to offer MetaMask users access to PayPal USD (PYUSD) without incurring provider fees. That’s right, from March 25th to April 8th 2024, we're waiving provider fees so you can onboard to web3 through a trusted stablecoin. "
          smallText="*users will be responsible for network gas fees"
          firstBtnLabel="Get Started"
          firstBtnLink="https://metamask.io/download/"
          alternativeLink="https://portfolio.metamask.io/buy"
          secondBtnLabel="Terms apply"
          secondBtnLink="https://consensys.io/terms-of-use"
        />

        <TextImgList
          items={[
            {
              title:
                'MetaMask was the first web3 wallet to enable users to buy ETH using PayPal, a leader in the digital payment space.',
              text:
                'And now, we’re also adding support for the PYUSD stablecoin.',
              img: {
                src: '/images/landing/pyusd/list-1.png',
                width: 359,
                height: 331,
              },
            },
            {
              title:
                'PayPal USD is designed to maintain a stable $1 USD value.',
              text:
                'It’s backed by dollar deposits, US treasuries, and cash equivalents. PYUSD adopts existing blockchain token standards and is compatible with the web3 ecosystem.',
              img: {
                src: '/images/landing/pyusd/list-2.png',
                width: 829,
                height: 443,
              },
            },
            {
              title:
                'Users can use their PayPal balance, linked bank account, or debit card to add PYUSD to their MetaMask wallet.',
              text:
                'Available from March 25th to April 8th 2024 to users across the U.S (excl. Hawaii).',
              img: {
                src: '/images/landing/pyusd/list-3.png',
                width: 350,
                height: 591,
              },
            },
          ]}
        />

        <Slideshow
          title="How to get started"
          text="Use the arrows to browse through the carousel to learn more about each step on how to get started."
          items={[
            {
              text:
                'Connect your MetaMask wallet to <a href="https://portfolio.metamask.io/" target="_blank" rel="noopener noreferer">portfolio.metamask.io</a> and click the “Buy” tab, or just click the “Buy & Sell” button on the MetaMask browser extension. If you’re using the MetaMask mobile app, tap on the arrows icon on the footer menu, then tap “Buy”. Make sure you’re on Ethereum mainnet.',
            },
            {
              text:
                'Select the US as your region and PayPal as your payment method.',
            },
            {
              text: 'Select PYUSD as the token.',
            },
            {
              text: 'Enter the desired purchase amount in fiat (USD).',
            },
            {
              text:
                'Click “Buy with PayPal” and you’ll be securely redirected to PayPal’s website to complete the purchase. Funds will be deposited in your MetaMask account.',
            },
          ]}
        />

        <TitleBtn
          title="MetaMask and PayPal USD. Zero provider fees."
          btnLabel="Get Started"
          btnLink="https://metamask.io/download/"
          alternativeLink="https://portfolio.metamask.io/buy"
        />

        <Terms
          text={`Terms & Conditions for the PayPal and MetaMask Zero Provider Fees for PYUSD Promotion.<br/><br/>Users are generally subject to the <a href="https://metamask.io/terms-of-use/" target="_blank" rel="noopener noreferrer">MetaMask terms of use</a> and the <a href="https://www.paypal.com/us/legalhub/useragreement-full" target="_blank" rel="noopener noreferrer">PayPal User Agreement</a>. For additional terms relating to the promotion, please see below.<br/><br/>Eligibility Requirements<br/>Offer applies to new and existing PayPal customers located in the United States (excl. Hawaii).<br/><br/>Promotional Offer<br/>MetaMask and PayPal’s standard on-ramping provider fees will be waived for eligible customers purchasing PayPal USD (PYUSD) during the Promotion Period. Provider fees herein shall mean the fees that are paid by customers to MetaMask and PayPal for the buy service. Technical fees, including but not limited to the Ethereum network gas fees, are still applicable and will be charged.<br/><br/>Promotional Period<br/>Offer starts on 25 March 2024 at 9am ET and ends on 8 April 2024 at 9am ET (“Promotion Period”). If there are any delays, cancellations, or any other circumstances that cause the processing of the transaction to exceed the timeframe of the promotion period, the transaction will be processed without the special offer.<br/><br/>Notwithstanding any other provision of these terms and conditions, both parties have the right to cancel or change the Promotion at any time without notice and in its sole discretion. We shall not be liable for any financial loss arising out of the refusal, cancellation or withdrawal of the Promotion or any failure or inability of a customer to take advantage of the Promotion for any reason.`}
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

export default PYUSDLayout
