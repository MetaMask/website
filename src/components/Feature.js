import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import ContentWrapper from './ContentWrapper'
import CTA from './CTA'
import ScrollAnimation from 'react-animate-on-scroll'
import classnames from 'classnames'
import { Section } from './StyledGeneral'
import ImageItem from './Image'

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
    headlineMarginTop0,
    sectionPadding,
    imageMobile,
    eyebrow,
  } = props
  const contentAlignLR = ['left', 'right'].includes(contentAlignment)
    ? contentAlignment
    : ''
  const isContentAlignVertical = contentAlignment === 'vertical'

  const innerContent = (
    <>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {headline ? (
        <Headline
          hasCta={ctaText}
          hideHeadline={hideHeadline}
          headlineMarginTop0={headlineMarginTop0}
        >
          {headline}
        </Headline>
      ) : null}
      {description ? (
        <Description>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </Description>
      ) : null}
      {ctaText ? (
        <CTAWrapper>
          <CTA
            link={ctaLink}
            text={ctaText}
            newTab={newTab}
            button={true}
            buttonColor={
              ['white', 'gray'].includes(backgroundColor)
                ? 'primary'
                : 'white-outline'
            }
          />
        </CTAWrapper>
      ) : null}
    </>
  )
  const imageContent = (
    <>
      {image ? (
        <ImageSrc
          classname={classnames({
            'hidden-mobile': imageMobile,
          })}
          image={image}
          widthImg={imageWidth}
          imageAlignment={imageAlignment}
        />
      ) : null}
      {imageMobile ? (
        <ImageSrc
          classname={'hidden-desktop'}
          image={imageMobile}
          widthImg={imageWidth}
          imageAlignment={imageAlignment}
        />
      ) : null}
    </>
  )
  return (
    <FeatureContainer
      sectionPadding={sectionPadding}
      backgroundColor={backgroundColor}
      className={classnames({
        [`bg-${backgroundColor}`]: backgroundColor,
      })}
    >
      <ContentWrapper>
        <FeatureWrapper
          contentAlignLR={contentAlignLR}
          isContentAlignVertical={isContentAlignVertical}
          alignItemsCenter={alignItemsCenter}
          imageWidth={imageWidth}
          backgroundColor={backgroundColor}
        >
          {image || imageMobile ? (
            <SideImage>
              <Image>
                {animation ? (
                  <ScrollAnimation
                    animateIn={
                      contentAlignLR === 'right'
                        ? 'fadeInLeftMini'
                        : 'fadeInRightMini'
                    }
                    animateOnce
                    delay={0}
                    offset={0}
                  >
                    {imageContent}
                  </ScrollAnimation>
                ) : (
                  imageContent
                )}
              </Image>
            </SideImage>
          ) : null}
          <FeatureInner
            withContent={withContent}
            contentPaddingTop={contentPaddingTop}
          >
            {animation ? (
              <ScrollAnimation
                animateIn={
                  contentAlignLR === 'left'
                    ? 'fadeInLeftMini'
                    : 'fadeInRightMini'
                }
                animateOnce
                delay={0}
                offset={0}
              >
                {innerContent}
              </ScrollAnimation>
            ) : (
              <div>{innerContent}</div>
            )}
          </FeatureInner>
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

const FeatureContainer = styled(Section)`
  display: block;
`
const Image = styled.div`
  display: block;
  width: 100%;
`
const ImageSrc = styled(ImageItem)`
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
  ${({ hideHeadline }) =>
    hideHeadline
      ? `
    display: none;
  `
      : ''}
      
  ${({ headlineMarginTop0 }) =>
    headlineMarginTop0 ? 'margin-top: 0;' : 'margin-top: 40px;'}

  ${({ hasCta, theme }) =>
    !hasCta
      ? `
    @media (max-width: ${theme.device.tabletMediaMax}) {
      font-size: 28px;
      line-height: 32px;
      margin-bottom: 15px;
      margin-top: 16px;
      padding-bottom: 0;
      padding-top: 0;
      text-align: center;
    }`
      : 'padding-bottom: 14px;'}
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
    align-items: center;
    text-align: center;
  }
  ${({ contentAlignLR }) =>
    contentAlignLR === 'left'
      ? `
    flex-direction: row-reverse;
  `
      : ''}

  ${({ isContentAlignVertical }) =>
    isContentAlignVertical
      ? `
      flex-direction: column-reverse !important;
  `
      : ''}
  ${({ alignItemsCenter }) =>
    alignItemsCenter
      ? `
    align-items: center;
    justify-content: center;
    text-align: center;
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
const CTAWrapper = styled.div`
  margin-top: 20px;
  a {
    min-width: 160px;
  }
`
const Eyebrow = styled.div`
  margin-bottom: 0px;
  color: #f6851b;
  font-weight: 700;
  letter-spacing: 5px;
  margin-bottom: 16px;
`
