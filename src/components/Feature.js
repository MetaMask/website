import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import ContentWrapper from './ContentWrapper'
import CTA from './CTA'
import ScrollAnimation from 'react-animate-on-scroll'

const FeatureComponent = props => {
  const {
    ctaLink,
    ctaText,
    headline,
    hideHeadline,
    description,
    image: {
      file: { url },
    },
    withContent,
    imageWidth,
    contentAlignment,
    imageAlignment,
  } = props
  return (
    <FeatureContainer className="section">
      <ContentWrapper>
        <FeatureWrapper
          contentAlignment={contentAlignment}
          imageWidth={imageWidth}
        >
          <SideImage>
            {url ? (
              <Image>
                <ScrollAnimation
                  animateIn={
                    contentAlignment === 'right' ? 'fadeInLeft' : 'fadeInRight'
                  }
                  animateOnce
                  delay={0}
                  offset={0}
                >
                  <ImageSrc
                    src={url}
                    widthImg={imageWidth}
                    imageAlignment={imageAlignment}
                  />
                </ScrollAnimation>
              </Image>
            ) : null}
          </SideImage>
          <FeatureInner withContent={withContent}>
            <ScrollAnimation
              animateIn={
                contentAlignment === 'left' ? 'fadeInLeft' : 'fadeInRight'
              }
              animateOnce
              delay={0}
              offset={0}
            >
              {headline ? (
                <Headline hideHeadline={hideHeadline}>{headline}</Headline>
              ) : null}
              {description ? (
                <Description>
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </Description>
              ) : null}
            </ScrollAnimation>
          </FeatureInner>
          {ctaLink ? <CTA ctaLink={ctaLink} ctaText={ctaText} /> : null}
        </FeatureWrapper>
      </ContentWrapper>
    </FeatureContainer>
  )
}

export default withTheme(FeatureComponent)

FeatureComponent.propTypes = {
  image: PropTypes.object,
  headline: PropTypes.string,
  description: PropTypes.string,
  modules: PropTypes.arrayOf(PropTypes.object.isRequired),
}

const FeatureContainer = styled.div`
  display: block;
`
const Image = styled.div`
  display: block;
  width: 100%;
`
const ImageSrc = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 100%;
  ${({ widthImg }) =>
    widthImg
      ? `
    width: ${widthImg};
  `
      : ''}
  ${({ imageAlignment }) =>
    imageAlignment === 'left'
      ? `
    margin: 0 auto 0 0;
  `
      : ''}
  ${({ imageAlignment }) =>
    imageAlignment === 'right'
      ? `
    margin: 0 0 0 auto;
  `
      : ''}
`
const Headline = styled.h2`
  padding-bottom: 20px;
  font-weight: 700;
  margin-top: 40px;
  ${({ hideHeadline }) =>
    hideHeadline
      ? `
    display: none;
  `
      : ''}
`

const Description = styled.div`
  display: block;
`

const FeatureWrapper = styled.div`
  display: flex;
  margin: -10px;
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    flex-direction: column;
  }
  ${({ contentAlignment, theme }) =>
    contentAlignment === 'left'
      ? `
    flex-direction: row-reverse;
    @media (max-width: ${theme.device.tabletMediaMax}){
      flex-direction: column-reverse;
    }
  `
      : ''}
  & > * {
    padding: 10px;
  }
`

const SideImage = styled.div`
  display: block;
  flex: 1;
  min-width: 0;
`

const FeatureInner = styled.div`
  display: block;
  ${({ withContent }) =>
    withContent
      ? `
    width: ${withContent};
  `
      : 'width: 50%'}
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    width: 100%;
  }
`
