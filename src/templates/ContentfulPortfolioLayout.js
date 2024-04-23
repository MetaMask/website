import React, { useRef, useEffect, useState } from 'react'
import Layout from './PageLayout'
import { graphql } from 'gatsby'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/dist/CustomEase'
import {
  PortfolioFooter,
  PortfolioHeader,
  PortfolioHelmet,
  PortfolioInstructions,
  PortfolioIntro,
  PortfolioLoader,
  PortfolioMap,
} from '../components/PortfolioPage'
import styled from 'styled-components'
import { ContentfulSeo } from '../components/Contentful'
import withProcessPreviewData from '../lib/utils/withProcessPreviewData'

gsap.registerPlugin(CustomEase)
const searchParams = new URLSearchParams(
  typeof window !== `undefined` && window.location.search
)

const ContentfulPortfolioLayout = props => {
  const { data, pageContext, previewMode } = props
  const { seo, header, footer } = data || {}
  const portfolioCta = header?.downloadButton

  let { portfolioIntro, portfolioInstructions, portfolioMap } = data || {}

  const canvas = useRef()
  const [showInstructions, setShowInstructions] = useState(false)
  const [showFooter, setShowFooter] = useState(false)
  const [showLoader, setShowLoader] = useState(
    searchParams.has('skipIntro') ? false : true
  )
  const [showIntro, setShowIntro] = useState(false)
  const [canvasHandleReady, setCanvasHandleReady] = useState(false)

  CustomEase.create('mm-ease-1', '0.5,0.14,0,1.01')

  if (!previewMode) {
    portfolioIntro = portfolioIntro.nodes[0]
    portfolioInstructions = portfolioInstructions.nodes[0]
    portfolioMap = portfolioMap.nodes[0]
  }

  useEffect(() => {
    window.location.href = 'https://portfolio.metamask.io'
  }, [])

  return (
    <Layout localizedPages={pageContext?.localizedPages}>
      <PortfolioHelmet showLoader={showLoader} showIntro={showIntro} />
      {seo && (
        <ContentfulSeo
          moduleConfig={{ ...seo, pagePath: pageContext?.pathBuild }}
        />
      )}
      <Container>
        {showLoader && (
          <PortfolioLoader
            canvas={canvas}
            canvasHandleReady={canvasHandleReady}
            setShowLoader={setShowLoader}
            setShowIntro={setShowIntro}
          />
        )}
        <PortfolioHeader header={header} showIntro={showIntro} />

        {showIntro && portfolioIntro && (
          <PortfolioIntro
            canvas={canvas}
            setShowIntro={setShowIntro}
            setShowInstructions={setShowInstructions}
            data={portfolioIntro}
          />
        )}

        {showInstructions && portfolioInstructions && (
          <PortfolioInstructions
            canvas={canvas}
            showInstructions={showInstructions}
            setShowInstructions={setShowInstructions}
            data={portfolioInstructions}
          />
        )}

        <PortfolioMap
          canvas={canvas}
          setCanvasHandleReady={setCanvasHandleReady}
          showIntro={showIntro}
          showFooter={showFooter}
          setShowFooter={setShowFooter}
          showNav={!showFooter && !showInstructions && !showIntro}
          mapData={portfolioMap}
          portfolioCta={portfolioCta}
        />

        <PortfolioFooter
          canvas={canvas}
          showFooter={showFooter}
          setShowFooter={setShowFooter}
          footerData={footer}
        />
      </Container>
    </Layout>
  )
}

const parsePreviewData = data => {
  const {
    header,
    footer,
    modulesCollection: { items },
  } = data.data
  const portfolioIntro = items.find(
    item => item.__typename === 'PortfolioIntro'
  )
  const portfolioMap = items.find(item => item.__typename === 'PortfolioMap')
  const portfolioInstructions = items.find(
    item => item.__typename === 'PortfolioInstructions'
  )

  const dataUpdate = {
    previewMode: true,
    data: {
      header,
      footer,
      portfolioIntro,
      portfolioInstructions,
      portfolioMap,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(
  ContentfulPortfolioLayout
)

export const ContentfulQuery = graphql`
  query(
    $headerId: String
    $footerId: String
    $seoId: String
    $modules: [String]!
    $node_locale: String
  ) {
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
    seo: contentfulSeo(
      contentful_id: { eq: $seoId }
      node_locale: { eq: $node_locale }
    ) {
      ...ContentfulSeoFields
    }
    portfolioIntro: allContentfulPortfolioIntro(
      filter: {
        contentful_id: { in: $modules }
        node_locale: { eq: $node_locale }
      }
    ) {
      nodes {
        ...ContentfulPortfolioIntroFields
      }
    }
    portfolioInstructions: allContentfulPortfolioInstructions(
      filter: {
        contentful_id: { in: $modules }
        node_locale: { eq: $node_locale }
      }
    ) {
      nodes {
        ...ContentfulPortfolioInstructionsFields
      }
    }
    portfolioMap: allContentfulPortfolioMap(
      filter: {
        contentful_id: { in: $modules }
        node_locale: { eq: $node_locale }
      }
    ) {
      nodes {
        ...ContentfulPortfolioMapFields
      }
    }
  }
`

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;

  body.dark-mode & {
    color: #161616;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    strong,
    b {
      color: #161616;
    }
  }
`
