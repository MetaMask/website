import { graphql } from 'gatsby'
import React, { useEffect, useState } from 'react'
import Layout from './PageLayout'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import * as styles from '../styles/card-giveaway/card-giveaway.module.scss'
import { useCountry } from '../hooks/useCountry'
import Hero from '../components/Landing/card-giveaway/hero/Hero'
import Container from '../components/Landing/card-giveaway/container/Container'
import Content from '../components/Landing/card-giveaway/content/Content'
import LinkButton from '../components/Landing/card-giveaway/link-button/LinkButton'
import Banner from '../components/Landing/card-giveaway/banner/Banner'
import GeoblockOverlay from '../components/Landing/card-giveaway/geoblock-overlay/GeoblockOverlay'
import { EU_COUNTRY_CODES } from '../lib/config.mjs'

const CardGiveaway = ({ data, pageContext }) => {
  const { seo, header, footer } = data
  const { pathBuild, widerContainer, localizedPages } = pageContext
  const euCountryCodes = EU_COUNTRY_CODES

  const country = useCountry()
  const [isBlocked, setIsBlocked] = useState(false)

  useEffect(() => {
    if (!euCountryCodes.includes(country)) {
      setIsBlocked(true)
      return
    }
    setIsBlocked(false)
  }, [country])

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
      {header && contentfulModuleToComponent(header)}
      <div className={styles.page}>
        {isBlocked && (
          <GeoblockOverlay>
            <h2>This giveaway is only open to Europe.</h2>
            <p>
              Unfortunately this MetaMask Card giveaway isn’t available in your
              area.
              <br />
              <br />
              Follow{' '}
              <a href="https://x.com/metamask" target="_blank">
                @MetaMask
              </a>{' '}
              on Twitter/X and sign up for our MetaMask newsletter to hear about
              future giveaways.
            </p>
            <LinkButton href="/">Return to Metamask.io</LinkButton>
          </GeoblockOverlay>
        )}
        <Hero
          title={'Win $1000 in ETH'}
          description={
            'Use your MetaMask Card now through 20 February to enter. The more you tap, the more chances you have to win.'
          }
          buttons={
            !isBlocked && (
              <LinkButton
                color="white"
                href="https://consensys-software.typeform.com/to/XmbxlTR5"
                target="_blank"
              >
                Opt in
              </LinkButton>
            )
          }
        />
        <Container width="narrow">
          <Content>
            <h2>Every purchase on your MetaMask Card is an entry</h2>
            <br />
            <p>
              MetaMask Card is live in Europe! To celebrate, we’re doing a
              giveaway of 30 prizes of $1000 in ETH. To enter, just use your
              MetaMask Card from 22 January 2025 to 20 February 2025 – every
              purchase is an additional chance to win. Check out the Official
              Rules below for further information, including an alternative way
              to enter without making a purchase.
            </p>
            <p style={{ fontWeight: 500 }}>
              Promotion period: 22 January (14:00 UTC) to 20 February (14:00
              UTC) 2025
            </p>
            <hr />
            <h2>Opt in and use your MetaMask Card to enter</h2>
            <br />
            <ol>
              <li>
                Opt-in by minting an NFT on MetaMask Portfolio using the wallet
                address associated with your MetaMask Card. Note: only one
                wallet address can be entered per person. Minting the NFT is
                free, you only pay gas determined by the blockchain.
              </li>
              <li>
                Use your MetaMask Card to make purchases. Each transaction is a
                separate entry.
              </li>
              <li>
                Check the{' '}
                <a href="https://x.com/metamask" target="_blank">
                  @MetaMask
                </a>{' '}
                Twitter/X account in March 2025 to find out if you're a winner.
              </li>
            </ol>
            <br />
            {!isBlocked && (
              <LinkButton
                color="primary"
                href="https://consensys-software.typeform.com/to/XmbxlTR5"
                target="_blank"
              >
                Opt in
              </LinkButton>
            )}
          </Content>
        </Container>
        <Banner
          image={
            <img
              src="/images/landing/card-giveaway/card.png"
              alt="MetaMask Card"
              width={649}
              height={449}
              loading="lazy"
            />
          }
        >
          <h2>Don’t have a card? Signing up is easy.</h2>
          <p>
            Use crypto for everyday purchases, with instant spending from your
            MetaMask wallet.
          </p>
          <LinkButton
            color="green"
            href="https://portfolio.metamask.io/card"
            target="_blank"
          >
            Get Metamask card
          </LinkButton>
        </Banner>
        <Container width="narrow">
          <Content>
            <h2>Official rules</h2>
            <br />
            <br />
            <p>
              NO PURCHASE OR TRANSACTION NECESSARY TO ENTER AND/OR WIN. A
              PURCHASE OR TRANSACTION WILL NOT INCREASE YOUR CHANCES OF WINNING.
              VOID WHERE PROHIBITED.
            </p>
            <br />
            <ol>
              <li>
                The promotion sponsor is Consensys Software Inc., located at
                5049 Edwards Ranch Road, Fort Worth, Texas 76109. All inquiries
                may be directed to that address or to{' '}
                <a href="mailto:notices@consensys.io">notices@consensys.io</a>.
              </li>
              <li>
                To be eligible to participate in the promotion, you must meet
                both of the following criteria:
                <ol style={{ listStyleType: 'lower-alpha' }}>
                  <li>
                    You must be a resident of the European Union or Switzerland.
                  </li>
                  <li>
                    You must be at least 18 years of age, and able to prove your
                    identity and age using a government-issued ID upon request.
                  </li>
                </ol>
              </li>
              <li>
                The promotion begins on 22 January (14:00 UTC) and ends on 20
                February (14:00 UTC).
              </li>
              <li>
                You may enter the promotion by either method outlined below:
                <ol style={{ listStyleType: 'lower-alpha' }}>
                  <li>
                    Method 1: you must opt-in to the giveaway, and complete a
                    transaction using your MetaMask Card. You can opt-in to the
                    giveaway by minting an NFT using the wallet address
                    associated with your MetaMask Card through this link. You
                    will not be a part of the giveaway if you make a transaction
                    without opting in by minting an NFT. You can only mint one
                    NFT per person. Every card transaction is an entry into the
                    promotion. The Sponsor shall not be held liable for any
                    incorrect or inaccurate submissions by participants.
                    Participants are solely responsible for ensuring the correct
                    wallet address is provided during the NFT minting process.
                  </li>
                  <li>
                    Method 2: you may also enter the promotion without making a
                    purchase or conducting a transaction by filling out a form{' '}
                    <a
                      href="https://consensys-software.typeform.com/to/ApLoCtMc"
                      target="_blank"
                    >
                      here
                    </a>
                    . Requests for confirmation of receipt of entries of this
                    method will not be acknowledged. Sponsor is not responsible
                    for late, incomplete, illegible or misdirected entries.
                    Winners that entered via this method will be required to
                    provide their wallet address on the form. If you do not, you
                    will be ineligible to receive a prize. You can only enter
                    one wallet address into the promotion, and it must be
                    associated with your MetaMask Card.
                  </li>
                </ol>
              </li>
              <li>
                You may be disqualified from participating if you violate these
                official rules or otherwise attempt to defraud the sponsor,
                including by entering using false or misleading information or
                accounts.
              </li>
              <li>
                Thirty eligible wallet addresses will be randomly selected as
                winners, approximately two weeks after the last day of the
                giveaway. Prizes will automatically be distributed to the
                winning users’ wallets. Winners are limited to one prize per
                person in this promotion. We will also publish a list of the
                first four characters of the winning wallets on{' '}
                <a href="https://x.com/metamask" target="_blank">
                  MetaMask's X account
                </a>
                .
              </li>
              <li>
                Each winner is solely responsible for reporting and paying any
                and all applicable taxes related to the prize(s). Potential
                winners should consult an accountant or tax professional to
                determine tax implications in accepting and using (including
                conducting transactions of) any prize.
              </li>
              <li>
                Prizes comprise of $30K equivalent of ETH. A total prize fund of
                $30,000 USD equivalent of ETH is available. 30 prizes are
                available, and each prize is valued at $1,000 USD equivalent of
                ETH.
              </li>
              <li>
                Participation in this promotion means that you agree to the
                sponsor’s{' '}
                <a href="https://consensys.io/terms-of-use" target="_blank">
                  Terms of Use
                </a>
                , including the sections pertaining to limitation of liability,
                disclaimers, and dispute resolution, and you agree to the
                processing of your personal information for the purposes of the
                promotion, in accordance with the sponsor’s{' '}
                <a href="https://consensys.io/privacy-notice" target="_blank">
                  Privacy Notice
                </a>
                .
              </li>
              <li>
                To receive a copy of the list of winners, please submit a
                request in the form{' '}
                <a
                  href="https://share.hsforms.com/1O-q9ZB1FSVmolDS28-d8bA2urwb"
                  target="_blank"
                >
                  here
                </a>
                , and indicate the promotion that you are writing in reference
                to.
              </li>
            </ol>
          </Content>
        </Container>
      </div>

      {footer && contentfulModuleToComponent(footer)}
    </Layout>
  )
}

export const query = graphql`
  query(
    $seoId: String
    $headerId: String
    $footerId: String
    $node_locale: String
  ) {
    seo: contentfulSeo(
      contentful_id: { eq: $seoId }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulSeoFields
    }
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
export default CardGiveaway
