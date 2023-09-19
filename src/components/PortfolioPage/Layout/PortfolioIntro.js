import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styled from 'styled-components'
import Cookies from 'universal-cookie'
import Loadable from '@loadable/component'
import { useMediaQuery } from 'react-responsive'

import Cta from '../Shared/PortfolioCta'
import MMLogoSvg from '../../../images/metamask-logo-iso.svg'
import withProcessPreviewData from '../../../lib/utils/withProcessPreviewData'
import ParseMD from '../../ParseMD'

const searchParams = new URLSearchParams(
  typeof window !== `undefined` && window.location.search
)

/**
 * @name PortfolioIntro
 * @summary -
 * @description - Portfolio page - Intro
 */

const PortfolioIntro = props => {
  const { canvas, setShowIntro, setShowInstructions, data, previewMode } = props
  const { title, description, ctaLabel } = data

  const isDesktop = useMediaQuery({
    query: `(min-width: 993px)`,
  })

  const LogoPortfolio = Loadable(() => import('../Shared/LogoPortfolio'))

  const cookies = new Cookies()
  const el = useRef(null)
  const q = gsap.utils.selector(el)

  const handleClick = () => {
    canvas.current.start()
    animationOut(onCompleteFn)
    if (
      cookies.get('mm-portfolio-instructions-completed') === '1' &&
      !searchParams.has('showInstructions')
    ) {
      // don't show instructions
      canvas.current.enable()
    } else {
      setShowInstructions(1)
    }
  }

  const onCompleteFn = () => {
    setShowIntro(false)
  }

  const animationIn = () => {
    const logo = q(`.${LogoContainer.styledComponentId}`)
    const heading = q(`.${Heading.styledComponentId}`)
    const description = q(`.${Description.styledComponentId}`)

    gsap
      .timeline({
        defaults: {
          ease: 'mm-ease-1',
        },
      })
      .addLabel('start')
      .fromTo(
        [logo, heading, description],
        {
          autoAlpha: 0,
        },
        {
          delay: 0,
          autoAlpha: 1,
          duration: 1.5,
          stagger: 0,
        },
        'start'
      )
  }

  const animationOut = onCompleteFn => {
    const logo = q(`.${LogoContainer.styledComponentId}`)
    const heading = q(`.${Heading.styledComponentId}`)
    const description = q(`.${Description.styledComponentId}`)
    const cta = q(`.${CtaWrapper.styledComponentId}`)

    gsap
      .timeline({
        defaults: {
          ease: 'mm-ease-1',
        },
      })
      .addLabel('start')
      .fromTo(
        [logo, heading, description, cta, el?.current],
        {
          autoAlpha: 1,
          scale: 1,
        },
        {
          autoAlpha: 0,
          duration: 0.8,
          //delay: 0.2,
          onComplete: () => onCompleteFn && onCompleteFn(),
        },
        'start'
      )
  }

  useEffect(() => {
    animationIn()
  }, [])

  return (
    <Wrapper ref={el}>
      <Content>
        <LogoContainer>
          {isDesktop ? <LogoPortfolio lookAtCenter={true} /> : <MMLogoSvg />}
        </LogoContainer>

        <Heading>{title}</Heading>

        <Description>
          {previewMode ? (
            <ParseMD>{description}</ParseMD>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: description.childMarkdownRemark.html,
              }}
            />
          )}
        </Description>
        <CtaWrapper>
          <Cta
            backgroundColor="#ffffff"
            textColor="#1E1F25"
            onClick={handleClick}
            width="161px"
            animationInit={true}
            animationDelay={0.7}
          >
            {ctaLabel}
          </Cta>
        </CtaWrapper>
      </Content>
    </Wrapper>
  )
}

const parsePreviewData = data => {
  const dataUpdate = {
    previewMode: true,
    ...data,
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(PortfolioIntro)

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    height: 100svh;
  }

  @media only screen and (max-device-width: 1024px) and (orientation: portrait) {
    height: 100svh;
  }

  @media only screen and (max-device-width: 1366px) and (orientation: landscape) {
    height: 100svh;
  }
`

const Content = styled.div`
  position: relative;
  width: 100%;
  max-width: 660px;
  text-align: center;
  z-index: 1;
`

const LogoContainer = styled.div`
  position: relative;
  opacity: 0;
  min-height: 55px;
  max-height: 55px;

  @media (max-width: ${({ theme }) => theme.device.miniDesktop}) {
    svg {
      max-width: 55px;
      max-height: 55px;
    }
  }

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    min-height: 45px;
    max-height: 45px;

    svg {
      max-width: 45px;
      max-height: 45px;
    }
  }
`

const Heading = styled.h1`
  margin-top: 10px;
  font-weight: 700;
  font-size: 58px;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: #ffffff;
  opacity: 0;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    padding: 0 40px;
    font-size: 42px;
  }
`

const Description = styled.p`
  margin: 28px 0 0;
  font-weight: 400;
  font-size: 22px;
  line-height: 1.4;
  color: #ffffff;
  opacity: 0;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 14px;
    line-height: 1.43;
    margin: 28px 40px 0;
  }
`

const CtaWrapper = styled.div`
  margin-top: 35px;
  display: flex;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    margin-top: 30px;
  }
`
