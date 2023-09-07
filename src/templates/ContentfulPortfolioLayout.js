import React, { useRef, useState } from 'react'
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

gsap.registerPlugin(CustomEase)
const searchParams = new URLSearchParams(
  typeof window !== `undefined` && window.location.search
)

const ContentfulPortfolioLayout = props => {
  const {
    data: {
      seo,
      header,
      footer,
      portfolioIntro,
      portfolioInstructions,
      portfolioMap,
    },
    pageContext: { pathBuild },
  } = props

  const canvas = useRef()
  const [showInstructions, setShowInstructions] = useState(false)
  const [showFooter, setShowFooter] = useState(false)
  const [showLoader, setShowLoader] = useState(
    searchParams.has('skipIntro') ? false : true
  )
  const [showIntro, setShowIntro] = useState(false)
  const [canvasHandleReady, setCanvasHandleReady] = useState(false)

  CustomEase.create('mm-ease-1', '0.5,0.14,0,1.01')

  return (
    <Layout>
      <PortfolioHelmet showLoader={showLoader} showIntro={showIntro} />
      {seo && <ContentfulSeo moduleConfig={{ ...seo, pagePath: pathBuild }} />}
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
            data={portfolioIntro.nodes[0]}
          />
        )}

        {showInstructions && portfolioInstructions && (
          <PortfolioInstructions
            canvas={canvas}
            showInstructions={showInstructions}
            setShowInstructions={setShowInstructions}
            data={portfolioInstructions.nodes[0]}
          />
        )}

        <PortfolioMap
          canvas={canvas}
          setCanvasHandleReady={setCanvasHandleReady}
          showIntro={showIntro}
          showFooter={showFooter}
          setShowFooter={setShowFooter}
          showNav={!showFooter && !showInstructions && !showIntro}
          mapData={portfolioMap.nodes[0]}
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

export default ContentfulPortfolioLayout

export const ContentfulQuery = graphql`
  query(
    $headerId: String
    $footerId: String
    $seoId: String
    $modules: [String]!
  ) {
    header: contentfulLayoutHeader(contentful_id: { eq: $headerId }) {
      ...ContentfulLayoutHeaderFields
    }
    footer: contentfulLayoutFooter(contentful_id: { eq: $footerId }) {
      ...ContentfulLayoutFooterFields
    }
    seo: contentfulSeo(contentful_id: { eq: $seoId }) {
      ...ContentfulSeoFields
    }
    portfolioIntro: allContentfulPortfolioIntro(
      filter: { contentful_id: { in: $modules } }
    ) {
      nodes {
        ...ContentfulPortfolioIntroFields
      }
    }
    portfolioInstructions: allContentfulPortfolioInstructions(
      filter: { contentful_id: { in: $modules } }
    ) {
      nodes {
        ...ContentfulPortfolioInstructionsFields
      }
    }
    portfolioMap: allContentfulPortfolioMap(
      filter: { contentful_id: { in: $modules } }
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
`
