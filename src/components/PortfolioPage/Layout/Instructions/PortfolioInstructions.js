import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import styled, { keyframes } from 'styled-components'
import classnames from 'classnames'
import Cookies from 'universal-cookie'
import { useMediaQuery } from 'react-responsive'

import Cta from '../../Shared/PortfolioCta'
import DragAnimation from './Animations/DragAnimation'
import DragMobileAnimation from './Animations/DragMobileAnimation'
import ScrollAnimation from './Animations/ScrollAnimation'
import PinchAnimation from './Animations/PinchAnimation'
import PyramidTopInstructionsSvg from '../../../../images/portfolio/pyramid-top-instructions.svg'
import PyramidBottomInstructionsSvg from '../../../../images/portfolio/pyramid-bottom-instructions.svg'

/**
 * @name PortfolioInstructions
 * @summary -
 * @description - Portfolio page - Instructions
 */

const PortfolioInstructions = props => {
  const {
    canvas,
    showInstructions,
    setShowInstructions,
    instructionsCompleted,
    data: { steps },
  } = props
  const [exitInstructions, setExitInstructions] = useState(false)
  const cookies = new Cookies()
  const numOfStep = steps.length
  const el = useRef(null)
  const q = gsap.utils.selector(el)

  const isDesktop = useMediaQuery({
    query: `(min-width: 993px)`,
  })

  const handleNextBtnClick = () => {
    if (showInstructions !== numOfStep) {
      setExitInstructions(showInstructions + 1)

      setTimeout(() => {
        setShowInstructions(showInstructions + 1)
      }, 350)
    } else {
      setExitInstructions(showInstructions + 1)

      setTimeout(() => {
        setShowInstructions(false)
        setExitInstructions(false)
        canvas.current.enable()
        cookies.set('mm-portfolio-instructions-completed', 1, {
          path: '/',
        })
      }, 350)
    }
  }

  const animationIn = () => {
    const bg = q(`.${Bg.styledComponentId}`)
    const pyramidTop = q(`.${PyramidTopContainer.styledComponentId}`)[0]
      .firstChild
    const pyramidBotton = q(`.${PyramidBottomContainer.styledComponentId}`)[0]
      .firstChild
    const content = q(`.${Content.styledComponentId}`)

    gsap
      .timeline({
        defaults: {
          ease: 'mm-ease-1', //ease-lb
        },
      })
      .addLabel('start')
      .fromTo(
        [bg],
        {
          autoAlpha: 0,
          scale: () => (isDesktop ? 1.1 : 1.1),
        },
        {
          delay: 0.5,
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
        },
        'start'
      )
      .fromTo(
        [content],
        {
          autoAlpha: 0,
        },
        {
          delay: 0.5,
          autoAlpha: 1,
          duration: 0.5,
        },
        'start'
      )
      .fromTo(
        [pyramidTop, pyramidBotton],
        {
          autoAlpha: 0,
          scale: () => (isDesktop ? 1.6 : 1.4),
        },
        {
          delay: 1.25,
          autoAlpha: 1,
          scale: 1,
          duration: 0.35,
          stagger: 0.15,
        },
        'start'
      )
  }

  const animationOut = () => {
    const pyramidTop = q(`.${PyramidTopContainer.styledComponentId}`)[0]
      .firstChild
    const pyramidBotton = q(`.${PyramidBottomContainer.styledComponentId}`)[0]
      .firstChild
    const content = q(`.${Content.styledComponentId}`)

    gsap
      .timeline({
        defaults: {
          ease: 'mm-ease-1', //ease-lb
        },
      })
      .addLabel('start')
      .fromTo(
        content,
        {
          scale: 1,
        },
        {
          scale: 0.9,
          duration: 0.35,
        },
        'start'
      )
      .fromTo(
        [pyramidTop, pyramidBotton],
        {
          scale: 1,
          autoAlpha: 1,
        },
        {
          scale: () => (isDesktop ? 1.4 : 1.2), //anton
          autoAlpha: 0,
          duration: 0.35,
        },
        'start'
      )
  }

  useEffect(() => {
    if (showInstructions === 1) {
      animationIn()
    }
  }, [showInstructions])

  useEffect(() => {
    if (exitInstructions === numOfStep + 1) {
      animationOut()
    }
  }, [exitInstructions])

  useEffect(() => {
    instructionsCompleted && canvas.current.enable()
  }, [instructionsCompleted, canvas])

  return (
    <Wrapper
      ref={el}
      className={classnames({ 'fade-out': exitInstructions === 4 })}
    >
      <Bg />

      <Content>
        <PyramidTopContainer>
          <PyramidTopInstructionsSvg />
        </PyramidTopContainer>

        <PyramidBottomContainer>
          <PyramidBottomInstructionsSvg />
        </PyramidBottomContainer>

        <ContentInner>
          <StepsCount>
            {showInstructions} / {numOfStep}
          </StepsCount>

          {showInstructions === 1 && (
            <StepsContainer
              className={classnames({ 'fade-out': exitInstructions === 2 })}
            >
              <Step>
                <StepTitle
                  dangerouslySetInnerHTML={{
                    __html: steps[0].title,
                  }}
                />

                <StepDescription
                  dangerouslySetInnerHTML={{
                    __html: steps[0].description?.childMarkdownRemark?.html,
                  }}
                />

                <StepCtaWrapper>
                  <Cta
                    backgroundColor="#86E29B"
                    textColor="#1E1F25"
                    onClick={handleNextBtnClick}
                    animationInit={true}
                    animationDelay={0.8}
                  >
                    {steps[0].ctaLabel}
                  </Cta>
                </StepCtaWrapper>
              </Step>
            </StepsContainer>
          )}

          {showInstructions === 2 && (
            <StepsContainer
              className={classnames({ 'fade-out': exitInstructions === 3 })}
            >
              <Step>
                <StepTitle
                  dangerouslySetInnerHTML={{
                    __html: steps[1].title,
                  }}
                />

                <StepRiveWrapper>
                  <StepDrag>
                    <DragAnimation />
                  </StepDrag>

                  <StepDragMobile>
                    <DragMobileAnimation />
                  </StepDragMobile>
                </StepRiveWrapper>

                <StepCtaWrapper>
                  <Cta
                    backgroundColor="#FFAFEA"
                    textColor="#1E1F25"
                    onClick={handleNextBtnClick}
                    animationInit={true}
                  >
                    {steps[1].ctaLabel}
                  </Cta>
                </StepCtaWrapper>
              </Step>
            </StepsContainer>
          )}

          {showInstructions === 3 && (
            <StepsContainer
              className={classnames({ 'fade-out': exitInstructions === 4 })}
            >
              <Step>
                <StepScroll>
                  <StepTitle
                    dangerouslySetInnerHTML={{
                      __html: steps[2].title,
                    }}
                  />
                </StepScroll>

                <StepPinch>
                  <StepTitle
                    dangerouslySetInnerHTML={{
                      __html: steps[2].titleMobile,
                    }}
                  />
                </StepPinch>

                <StepRiveWrapper>
                  <StepScroll>
                    <ScrollAnimation />
                  </StepScroll>

                  <StepPinch>
                    <PinchAnimation />
                  </StepPinch>
                </StepRiveWrapper>

                <StepCtaWrapper>
                  <Cta
                    backgroundColor="#FFE466"
                    textColor="#1E1F25"
                    onClick={handleNextBtnClick}
                    animationInit={true}
                  >
                    {steps[2].ctaLabel}
                  </Cta>
                </StepCtaWrapper>
              </Step>
            </StepsContainer>
          )}
        </ContentInner>
      </Content>
    </Wrapper>
  )
}

export default PortfolioInstructions

const PIWrapperFadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const PIWrapperFadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`

const PIFloating = keyframes`
    0% { transform: translate(0,  0px); }
    50%  { transform: translate(0, 15px); }
    100%   { transform: translate(0, -0px); }
`

const PIStepsContainerFadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`

const PIStepsContainerFadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 30;
  animation: ${PIWrapperFadeIn} 0.5s ${({ theme }) => theme.easeType.defaultMM1}
    forwards;

  &.fade-out {
    animation: ${PIWrapperFadeOut} 0.35s
      ${({ theme }) => theme.easeType.defaultMM1} forwards;
  }

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    z-index: 50;
  }

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

const Bg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.45);
  opacity: 0;
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 620px;
  height: 420px;
  border: 2px solid #000000;
  border-radius: 8px;
  padding: 50px;
  background: #ffffff;
  text-align: center;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    border: none;
    width: calc(100vw - 30px);
    height: calc(100% - 30px);
    max-width: none;
    max-height: none;
  }
`

const ContentInner = styled.div`
  position: relative;
  z-index: 1;
`

const PyramidTopContainer = styled.div`
  position: absolute;
  top: -67px;
  left: 10px;
  animation: ${PIFloating} 5s ease-out infinite;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    display: none;
  }
`

const PyramidBottomContainer = styled.div`
  position: absolute;
  bottom: -30px;
  right: 0px;
  animation: ${PIFloating} 5s 1s ease-out infinite;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    display: none;
  }
`

const StepsCount = styled.div`
  font-weight: 500;
  font-size: 15px;
  line-height: 1;
  color: #7e7e7ee7;
`

const StepsContainer = styled.ul`
  margin: 10px 0 0;
  opacity: 0;

  animation: ${PIStepsContainerFadeIn} 0.35s
    ${({ theme }) => theme.easeType.defaultMM1} forwards;

  &.fade-out {
    animation: ${PIStepsContainerFadeOut} 0s
      ${({ theme }) => theme.easeType.defaultMM1} forwards;
  }
`

const Step = styled.li`
  list-style: none;
  margin: 0;
`

const StepTitle = styled.h2`
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #1e1f25;
  opacity: 0;

  animation: ${PIStepsContainerFadeIn} 0s 0s
    ${({ theme }) => theme.easeType.defaultMM1} forwards;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    font-size: 26px;
  }
`

const StepDescription = styled.p`
  //height: 97px;
  //overflow: hidden;
  margin: 28px 0 0;
  color: #7e7e7e;
  opacity: 0;

  animation: ${PIStepsContainerFadeIn} 0s 0s
    ${({ theme }) => theme.easeType.defaultMM1} forwards;

  @media (max-width: ${({ theme }) => theme.device.tablet}) {
    height: auto;
    margin: 20px 0 0;
  }
`

const StepRiveWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
  //opacity: 0;
  //animation: ${PIStepsContainerFadeIn} 0s 0s
  //  ${({ theme }) => theme.easeType.defaultMM1} forwards;
`

const StepCtaWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  opacity: 0;

  animation: ${PIStepsContainerFadeIn} 0s 0s
    ${({ theme }) => theme.easeType.defaultMM1} forwards;
`

const StepDrag = styled.div`
  display: none;

  @media (hover: hover) and (pointer: fine) {
    display: block;
  }
`

const StepDragMobile = styled.div`
  display: block;

  @media (hover: hover) and (pointer: fine) {
    display: none;
  }
`

const StepScroll = styled.div`
  display: none;
  @media (hover: hover) and (pointer: fine) {
    display: block;
  }
`

const StepPinch = styled.div`
  display: block;

  @media (hover: hover) and (pointer: fine) {
    display: none;
  }
`
