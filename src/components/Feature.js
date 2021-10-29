import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import ContentWrapper from './ContentWrapper'
import CTA from './CTA'
import ScrollAnimation from 'react-animate-on-scroll'
import { parseContentfulAssetUrl } from '../lib/utils/urlParser'

const FeatureComponent = props => {
  const {
    ctaLink,
    ctaText,
    newTab,
    headline,
    hideHeadline,
    description,
    image,
    withContent,
    imageWidth,
    alignItemsCenter,
    contentAlignment,
    contentPaddingTop,
    imageAlignment,
    animation,
    backgroundColor,
  } = props
  const url = parseContentfulAssetUrl(image)
  return (
    <FeatureContainer className="section">
      <ContentWrapper>
        <FeatureWrapper
          contentAlignment={contentAlignment}
          alignItemsCenter={alignItemsCenter}
          imageWidth={imageWidth}
          backgroundColor={backgroundColor}
        >
          <SideImage>
            {url ? (
              <Image>
                {animation ? (
                  <ScrollAnimation
                    animateIn={
                      contentAlignment === 'right'
                        ? 'fadeInLeft'
                        : 'fadeInRight'
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
                ) : (
                  <ImageSrc
                    src={url}
                    widthImg={imageWidth}
                    imageAlignment={imageAlignment}
                  />
                )}
              </Image>
            ) : null}
          </SideImage>
          <FeatureInner
            withContent={withContent}
            contentPaddingTop={contentPaddingTop}
          >
            {animation ? (
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
            ) : (
              <div>
                {headline ? (
                  <Headline hideHeadline={hideHeadline}>{headline}</Headline>
                ) : null}
                {description ? (
                  <Description>
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                  </Description>
                ) : null}
              </div>
            )}
          </FeatureInner>
          {ctaLink ? (
            <CTA link={ctaLink} text={ctaText} newTab={newTab} button={true} />
          ) : null}
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
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    font-size: 28px;
    line-height: 32px;
    margin-bottom: 15px;
    margin-top: 16px;
    padding-bottom: 0;
    padding-top: 0;
    text-align: center;
  }
`

const Description = styled.div`
  display: block;
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    text-align: center;
  }
`

const FeatureWrapper = styled.div`
  display: flex;
  margin: -10px;
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    flex-direction: column;
    margin: 0;
  }
  ${({ contentAlignment }) =>
    contentAlignment === 'left'
      ? `
    flex-direction: row-reverse;
  `
      : ''}
  ${({ alignItemsCenter }) =>
    alignItemsCenter
      ? `
    align-items: center;
    justify-content: center;
  `
      : ''}
  & > * {
    padding: 10px;
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      padding: 0 10px;
    }
  }
`

const SideImage = styled.div`
  display: block;
  flex: 1;
  min-width: 0;
`

const FeatureInner = styled.div`
  display: block;
  ${({ contentPaddingTop }) =>
    contentPaddingTop
      ? `
    padding-top: ${contentPaddingTop};
  `
      : ''}
  ${({ withContent }) =>
    withContent
      ? `
    width: ${withContent};
  `
      : 'width: 50%'}
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    width: 100%;
    padding-top: 0;
  }
`
