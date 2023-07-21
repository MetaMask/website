import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { browserName, isMobile } from 'react-device-detect'
import {
  ContentfulSeo as Seo,
  ContentfulLayoutHeader as Header,
  ContentfulLayoutFooter as Footer,
} from '../components/Contentful'
import Layout from '../templates/PageLayout'
import DownloadContainer from '../components/DownloadContainer'
import DownloadBrowser from '../components/DownloadBrowser'
import isChromium from '../lib/utils/isChromium'

const DownloadPage = props => {
  const {
    data: {
      seo,
      header,
      footer,
      download_extension,
      download_ios,
      download_android,
      browser_chrome,
      browser_firefox,
      browser_brave,
      browser_edge,
      browser_opera,
      cta_chrome,
      cta_ios,
      cta_android,
      cta_firefox,
      cta_edge,
      cta_opera,
      cta_chrome_browser,
      cta_firefox_browser,
    },
    location,
  } = props
  const browsers = [
    {
      image: browser_chrome,
      cta: cta_chrome,
      label: 'Chrome',
    },
    {
      image: browser_firefox,
      cta: cta_firefox,
      label: 'Firefox',
    },
    {
      image: browser_brave,
      cta: cta_chrome,
      label: 'Brave',
    },
    {
      image: browser_edge,
      cta: cta_edge,
      label: 'Edge',
    },
    {
      image: browser_opera,
      cta: cta_opera,
      label: 'Opera',
    },
  ]

  const appExtensions = {
    browser: {
      image: download_extension,
      label: isMobile ? 'Chrome' : isChromium() ? 'Chromium' : browserName,
      title: 'Install MetaMask for your browser',
      ctaChrome: cta_chrome,
      ctaFirefox: cta_firefox,
      ctaEdge: cta_edge,
      ctaOpera: cta_opera,
      ctaChromeBrowser: cta_chrome_browser, // Show when the browser is not supported.
      ctaFirefoxBrowser: cta_firefox_browser, // Show when the browser is not supported.
    },
    ios: {
      image: download_ios,
      label: 'iOS',
      title: 'Install MetaMask for iPhone',
      ctaText: 'Install MetaMask for iPhone',
      ctas: [cta_ios],
    },
    android: {
      image: download_android,
      label: 'Android',
      title: 'Install MetaMask for Android',
      ctas: [cta_android],
    },
  }
  return (
    <Layout>
      {seo && <Seo moduleConfig={{ ...seo, pagePath: location.pathname }} />}
      <Header moduleConfig={header} hideDownloadBtn />
      <Container>
        <DownloadTitle>Install MetaMask</DownloadTitle>
        <DownloadContainer appExtensions={appExtensions} />
        <DownloadBrowser browsers={browsers} />
      </Container>
      <Footer moduleConfig={footer} />
    </Layout>
  )
}

export const DownloadPageQuery = graphql`
  query {
    header: contentfulLayoutHeader(
      contentful_id: { eq: "6I0knvqLf0DS5PB72DqUlM" }
    ) {
      ...ContentfulLayoutHeaderFields
    }
    cta_firefox_browser: contentfulCta(
      contentful_id: { eq: "417gM11RFHEzJJGiVptS0b" }
    ) {
      ...ContentfulCtaFields
    }
    cta_chrome_browser: contentfulCta(
      contentful_id: { eq: "dOfqSHhB8M5UUrAf3c2zF" }
    ) {
      ...ContentfulCtaFields
    }
    cta_chrome: contentfulCta(contentful_id: { eq: "CrOB61ZSnuQCuYUhhxBP5" }) {
      ...ContentfulCtaFields
    }
    cta_firefox: contentfulCta(
      contentful_id: { eq: "1xsshciF4UVR84KqFpHXNS" }
    ) {
      ...ContentfulCtaFields
    }
    cta_edge: contentfulCta(contentful_id: { eq: "5EWyZidEFFdMHvX2cTisje" }) {
      ...ContentfulCtaFields
    }
    cta_opera: contentfulCta(contentful_id: { eq: "7l1t8JzfKGwk3OWiSp1L43" }) {
      ...ContentfulCtaFields
    }
    cta_ios: contentfulCta(contentful_id: { eq: "6IujWp8Z8TSdB8fpBifwZQ" }) {
      ...ContentfulCtaFields
    }
    cta_android: contentfulCta(contentful_id: { eq: "x5Nr4AbHCHBZDNJURlzsP" }) {
      ...ContentfulCtaFields
    }
    download_extension: contentfulAsset(
      contentful_id: { eq: "6ngCUoU36ABPjs6cDNnuoK" }
    ) {
      title
      description
      gatsbyImageData(width: 1920, quality: 80)
    }
    download_ios: contentfulAsset(
      contentful_id: { eq: "7Dwln6hVLXZJnOAHNlH2tT" }
    ) {
      title
      description
      gatsbyImageData(width: 1920, quality: 80)
    }
    download_android: contentfulAsset(
      contentful_id: { eq: "7CU9NE4jlL0XjKEerlEL16" }
    ) {
      title
      description
      gatsbyImageData(width: 1920, quality: 80)
    }
    browser_chrome: contentfulAsset(
      contentful_id: { eq: "5CEOSBaSKv43i0mNninl5G" }
    ) {
      title
      description
      file {
        url
      }
    }
    browser_firefox: contentfulAsset(
      contentful_id: { eq: "4WVycyyYvlfuRrArPRjj1d" }
    ) {
      title
      description
      file {
        url
      }
    }
    browser_brave: contentfulAsset(
      contentful_id: { eq: "6HcekwtMp9fRFIphaPlqX5" }
    ) {
      title
      description
      file {
        url
      }
    }
    browser_opera: contentfulAsset(
      contentful_id: { eq: "1CHeQ1aJteDeBW8Dw3h4PN" }
    ) {
      title
      description
      file {
        url
      }
    }
    browser_edge: contentfulAsset(
      contentful_id: { eq: "2O0Uh2Nt1OciYoK96DscLF" }
    ) {
      title
      description
      file {
        url
      }
    }

    footer: contentfulLayoutFooter(
      contentful_id: { eq: "75bFgEllkMxpVsY8wWlroX" }
    ) {
      ...ContentfulLayoutFooterFields
    }

    seo: contentfulSeo(contentful_id: { eq: "2d9sWm0RbmC5zSEsF8JkiS" }) {
      ...ContentfulSeoFields
    }
  }
`

const Container = styled.div`
  display: block;
`

const DownloadTitle = styled.h1`
  display: none;
`

export default DownloadPage
