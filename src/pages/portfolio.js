import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/dist/CustomEase'
import classnames from 'classnames'

import { ContentfulSeo as Seo } from '../components/Contentful'
import {
  PortfolioHelmet,
  PortfolioLoader as Loader,
  PortfolioIntro as Intro,
  PortfolioHeader as Header,
  PortfolioFooter as Footer,
  PortfolioInstructions as Instructions,
  PortfolioMap as Map,
} from '../components/PortfolioPage'
import Layout from '../templates/PageLayout'

gsap.registerPlugin(CustomEase)

const searchParams = new URLSearchParams(
  typeof window !== `undefined` && window.location.search
)

const PortfolioPage = props => {
  const {
    data: { seo, header },
    location,
  } = props

  const canvas = useRef()
  const [showLoader, setShowLoader] = useState(
    searchParams.has('skipIntro') ? false : true
  )
  const [showIntro, setShowIntro] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [showFooter, setShowFooter] = useState(false)
  const [canvasHandleReady, setCanvasHandleReady] = useState(false)

  CustomEase.create('mm-ease-1', '0.5,0.14,0,1.01')

  return (
    <Layout>
      <PortfolioHelmet showLoader={showLoader} showIntro={showIntro} />

      {seo && <Seo moduleConfig={{ ...seo, pagePath: location.pathname }} />}

      <Container className={classnames({ 'show-footer': showFooter })}>
        {showLoader && (
          <Loader
            canvas={canvas}
            canvasHandleReady={canvasHandleReady}
            setShowLoader={setShowLoader}
            setShowIntro={setShowIntro}
          />
        )}

        <Header header={header} showIntro={showIntro} />

        {showIntro && (
          <Intro
            canvas={canvas}
            setShowIntro={setShowIntro}
            setShowInstructions={setShowInstructions}
          />
        )}

        {showInstructions && (
          <Instructions
            canvas={canvas}
            showInstructions={showInstructions}
            setShowInstructions={setShowInstructions}
          />
        )}

        <Map
          canvas={canvas}
          setCanvasHandleReady={setCanvasHandleReady}
          showIntro={showIntro}
          showFooter={showFooter}
          setShowFooter={setShowFooter}
          showNav={!showFooter & !showInstructions && !showIntro}
        />

        <Footer
          canvas={canvas}
          showFooter={showFooter}
          setShowFooter={setShowFooter}
        />
      </Container>
    </Layout>
  )
}

export const PortfolioPageQuery = graphql`
  query {
    header: contentfulLayoutHeader(
      contentful_id: { eq: "6I0knvqLf0DS5PB72DqUlM" }
    ) {
      ...ContentfulLayoutHeaderFields
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
  position: relative;
  width: 100%;
  height: 100vh;
`

export default PortfolioPage
