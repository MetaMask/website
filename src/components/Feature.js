import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import { parseContentfulAssetUrl } from '../lib/utils/urlParser'
import GatsbyBackgroundImage from './GatsbyBackgroundImage'
import { useFeatureFlag } from '../hooks/useFeatureFlag'
import { EyebrowStyle, Section } from './StyledGeneral'
import styled, { withTheme } from 'styled-components'
import ScrollAnimation from 'react-animate-on-scroll'
import React, { Fragment, useRef } from 'react'
import ContentWrapper from './ContentWrapper'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import ImageItem from './Image'
import ParseMD from './ParseMD'
import Embed from './Embed'

const FeatureComponent = props => {
  const {
    cta,
    ctaSecond,
    embed,
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
    backgroundImage,
    backgroundImageDarkMode,
    backgroundImageMobile,
    headlineMarginTop0,
    sectionPadding,
    noPaddingBottom,
    removeSectionPaddingBottomOnDesktop,
    imageMobile,
    eyebrow,
    featureItems,
    showFeatureItemsAsSlideImage,
    imageDarkMode,
    imageMobileDarkMode,
    imageShadow,
    hideImageOnMobile,
    imageLink,
    customClass,
    previewMode = false,
    contentfulId,
    moduleId,
    launchDarklyFlag,
  } = props

  const elementRef = useRef()

  const showApiPlayground = useFeatureFlag({
    componentName: 'FeatureComponent',
    componentId: contentfulId,
    flagName: launchDarklyFlag,
    elementRef,
  })

  const contentAlignLR = ['left', 'right'].includes(contentAlignment)
    ? contentAlignment
    : ''

  const isContentAlignVertical = contentAlignment === 'vertical'
  const isAPIPlayground = customClass?.includes('feature-api-playground')
  const isDevMeetFlask = customClass?.includes('feature-meet-flask')
  const isInfuraGas = customClass?.includes('feature-infura-gas')

  if (
    (showApiPlayground && isDevMeetFlask) ||
    (!showApiPlayground && isAPIPlayground)
  ) {
    return null
  }

  const innerContent = (
    <>
      {eyebrow ? (
        <EyebrowStyle dangerouslySetInnerHTML={{ __html: eyebrow }} />
      ) : null}
      {headline ? (
        <Headline
          hasEyebrow={eyebrow}
          hasCta={cta}
          hideHeadline={hideHeadline}
          headlineMarginTop0={headlineMarginTop0}
        >
          <div dangerouslySetInnerHTML={{ __html: headline }} />
        </Headline>
      ) : null}
      {description ? (
        <Description sectionPadding={sectionPadding}>
          {previewMode ? (
            <ParseMD>{description}</ParseMD>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: description }} />
          )}
        </Description>
      ) : null}
      {featureItems && featureItems.length && !showFeatureItemsAsSlideImage ? (
        <FeatureItems>
          {featureItems.map((m, index) => (
            <FeatureItem key={index}>
              {contentfulModuleToComponent({
                ...m,
                previewMode,
              })}
            </FeatureItem>
          ))}
        </FeatureItems>
      ) : null}
      {cta && !isContentAlignVertical ? (
        <CTAWrapper
          className={classnames({
            'hidden-mobile': !(
              isDevMeetFlask ||
              isInfuraGas ||
              isAPIPlayground
            ),
          })}
        >
          {contentfulModuleToComponent({
            ...cta,
            color: ['white', 'gray', 'default'].includes(backgroundColor)
              ? cta.color
              : 'white-outline',
            previewMode,
          })}
          {ctaSecond ? (
            <>
              {contentfulModuleToComponent({
                ...ctaSecond,
                color: ['white', 'gray', 'default'].includes(backgroundColor)
                  ? ctaSecond.color
                  : 'white-outline',
                previewMode,
              })}
            </>
          ) : null}
        </CTAWrapper>
      ) : null}
    </>
  )

  const imageContent = (
    <ImageSrc
      image={image}
      darkImage={imageDarkMode}
      imageMobile={imageMobile}
      darkImageMobile={imageMobileDarkMode}
      widthImg={imageWidth}
      imageAlignment={imageAlignment}
      link={imageLink}
      previewMode={previewMode}
    />
  )

  return (
    <Container
      ref={elementRef}
      sectionPadding={sectionPadding}
      className={classnames({
        noPaddingBottom: noPaddingBottom,
        removeSectionPaddingBottomOnDesktop: removeSectionPaddingBottomOnDesktop,
        [`bg-${backgroundColor}`]: backgroundColor,
      })}
      id={moduleId}
    >
      <GatsbyBackgroundImage
        image={backgroundImage}
        imageDarkMode={backgroundImageDarkMode}
        imageMobile={backgroundImageMobile}
        previewMode={previewMode}
        mobileImageBreakpoint={'mobile'}
        absolute
        className={customClass}
      >
        <ContentWrapper customClass={customClass}>
          <FeatureWrapper
            contentAlignLR={contentAlignLR}
            isContentAlignVertical={isContentAlignVertical}
            alignItemsCenter={alignItemsCenter}
            imageWidth={imageWidth}
            backgroundColor={backgroundColor}
            imageShadow={imageShadow}
            hideImageOnMobile={hideImageOnMobile}
            sectionPadding={sectionPadding}
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
                      initiallyVisible
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
            {embed ? (
              <SideEmbed>
                <Embed
                  html={embed.embed?.embed}
                  thumbnailUrl={parseContentfulAssetUrl(
                    embed.thumbnail,
                    previewMode
                  )}
                  playOnPopup={embed.playOnPopup}
                />
              </SideEmbed>
            ) : null}
            {featureItems &&
            featureItems.length &&
            showFeatureItemsAsSlideImage ? (
              <SlideFeatureItems>
                <SlideFeatureItemInner>
                  {featureItems.map((m, index) => (
                    <Fragment key={index}>
                      {contentfulModuleToComponent({
                        ...m,
                        previewMode,
                      })}
                    </Fragment>
                  ))}
                </SlideFeatureItemInner>
              </SlideFeatureItems>
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
            {cta && isContentAlignVertical ? (
              <CTAWrapper>
                {contentfulModuleToComponent({
                  ...cta,
                  color: ['white', 'gray', 'default'].includes(backgroundColor)
                    ? cta.color
                    : 'white-outline',
                  previewMode,
                })}
                {ctaSecond ? (
                  <>
                    {contentfulModuleToComponent({
                      ...ctaSecond,
                      color: ['white', 'gray', 'default'].includes(
                        backgroundColor
                      )
                        ? ctaSecond.color
                        : 'white-outline',
                      previewMode,
                    })}
                  </>
                ) : null}
              </CTAWrapper>
            ) : null}
          </FeatureWrapper>
          {cta && !isContentAlignVertical ? (
            <CTAWrapper
              className={classnames('hidden-desktop', {
                'hidden-mobile':
                  isDevMeetFlask || isInfuraGas || isAPIPlayground,
              })}
            >
              {contentfulModuleToComponent({
                ...cta,
                color: ['white', 'gray', 'default'].includes(backgroundColor)
                  ? cta.color
                  : 'white-outline',
                previewMode,
              })}
              {ctaSecond ? (
                <>
                  {contentfulModuleToComponent({
                    ...ctaSecond,
                    color: ['white', 'gray', 'default'].includes(
                      backgroundColor
                    )
                      ? ctaSecond.color
                      : 'white-outline',
                    previewMode,
                  })}
                </>
              ) : null}
            </CTAWrapper>
          ) : null}
        </ContentWrapper>
      </GatsbyBackgroundImage>
    </Container>
  )
}

export default withTheme(FeatureComponent)

FeatureComponent.propTypes = {
  image: PropTypes.object,
  headline: PropTypes.string,
  description: PropTypes.string,
  modules: PropTypes.arrayOf(PropTypes.object.isRequired),
  sectionPadding: PropTypes.string,
  noPaddingBottom: PropTypes.bool,
  removeSectionPaddingBottomOnDesktop: PropTypes.bool,
  previewMode: PropTypes.bool,
  contentfulId: PropTypes.string.isRequired,
}

const Container = styled(Section)``
const Image = styled.div`
  display: block;
  width: 100%;

  .sideImageMaxHeight500 & img {
    max-height: 500px;
    margin: 0 auto;
  }

  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    .floatImageRightMinus32 & {
      width: calc(50% + 32vw);
      max-width: 170%;
    }
  }
`

const SideImage = styled.div`
  display: block;
  flex: 1;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    .noPaddingBottom & {
      margin-bottom: 0 !important;
    }

    .sideImageOverflowRight & {
      margin-right: -40px;
    }

    .removeOverflowBelowMd & {
      margin-right: unset;
    }
  }

  .sideImageMaxWidth667 & {
    max-width: 667px;
  }

  .feature-api-playground & {
    img {
      width: 100%;
    }
  }

  .feature-meet-flask &,
  .feature-api-playground & {
    padding-top: 0;
    padding-bottom: 0;
    align-self: center;

    @media (max-width: 767px) {
      padding: 0;
    }
  }
`

const SideEmbed = styled.div`
  display: block;
  flex: 1;
  min-width: 0;

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    width: 100%;

    .noPaddingBottom & {
      margin-bottom: 0 !important;
    }
  }

  .snapsLiveMetaMaskFlask & {
    padding: 0;
  }
`

const ImageSrc = styled(ImageItem)`
  margin: 0 auto;
  max-width: 100%;
  width: auto;
  height: auto;

  &.gatsby-image-wrapper, img& {
    display: block;
    overflow: visible;
  }

  ${({ widthImg, theme }) =>
    widthImg
      ? `
    width: ${widthImg};
    @media (max-width: ${theme.device.tabletMediaMax}){
      width: 100%;
    }
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

  ${({ hasEyebrow, theme }) =>
    hasEyebrow
      ? `
  @media (max-width: ${theme.device.tabletMediaMax}) {
    margin-top: 0;
    padding-top: 0;
  }
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

  .feature-meet-flask &, .feature-api-playground & {
    color: #fff;
  }
`

const Description = styled.div`
  display: block;

  .descriptionMinusSectionPadding && {
    @media (min-width: ${({ theme }) => theme.device.tablet}) {
      ${({ sectionPadding }) =>
        sectionPadding
          ? `
        margin-top: -${sectionPadding};
      `
          : ''}
    }
  }

  .stake-logo-list {
    display: flex;
    column-gap: 20px;
    row-gap: 8px;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 16px;
    justify-content: left;

    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      justify-content: center;
    }
  }

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    text-align: center;

    * {
      max-width: initial !important;
    }
  }

  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    .descriptionMW453 & {
      max-width: 453px;
    }
  }
`

const FeatureWrapper = styled.div`
  display: flex;
  margin: -10px;

  .feature-infura-gas & {
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    flex-direction: column-reverse;
    margin: 0;
    align-items: center;
    text-align: center;
    row-gap: 32px;

    .rowGap16 & {
      row-gap: 16px;
    }
  }

  ${({ hideImageOnMobile, theme }) =>
    hideImageOnMobile
      ? `
      @media (max-width: ${theme.device.tabletMediaMax}) {
        ${SideImage} {
          display: none;
        }
        ${SideEmbed} {
          display: none;
        }
      }
  `
      : ''}

  ${({ imageShadow }) =>
    imageShadow
      ? `
      img {
        filter: drop-shadow(0px 0px 30px rgba(0, 0, 0, 0.1));
      }
  `
      : ''}

  ${({ contentAlignLR, theme }) =>
    contentAlignLR === 'left'
      ? `
      @media (min-width: ${theme.device.tablet}) {
        flex-direction: row-reverse;
      }
  `
      : ''}

  ${({ isContentAlignVertical }) =>
    isContentAlignVertical
      ? `
      flex-direction: column !important;
      row-gap: 0;
      ${CTAWrapper} {
        order: 4;
        margin-top: 20px;
      }
      ${SideImage} {
        order: 3;
      }
      ${SideEmbed} {
        order: 3;
      }
      ${FeatureInner} {
        order: 2;
      }
  `
      : ''}

  ${({ alignItemsCenter }) =>
    alignItemsCenter
      ? `
    align-items: center;
    justify-content: center;
  `
      : ''}

  ${({ alignItemsCenter, isContentAlignVertical }) =>
    alignItemsCenter && isContentAlignVertical
      ? `
    text-align: center;
  `
      : ''}

  & > * {
    padding: 10px;
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      padding: 0 10px;
    }
  }

  ${({ sectionPadding }) =>
    sectionPadding === '0px'
      ? `
    & > * {
      padding-bottom: 0px;
    }
                `
      : ''}

  h1.feature-hero-title {
    font-weight: ${({ theme }) => theme.font.weight.bold};
    font-size: ${({ theme }) => theme.font.size.xxxl}rem;
    line-height: 1.2;
    padding-top: 20px;
    padding-bottom: 20px;
    transition: all 0.5s ease;

    @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
      font-size: 46px;
    }

    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      font-size: 34px !important;
      line-height: 43px;
    }
  }

  .dark-mode & {
    svg path.can-fill-color {
      fill: ${({ theme }) => theme.white};
    }
  }
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

  .contentWidth667 & {
    width: 667px;
    max-width: 100%;
  }

  .feature-meet-flask &, .feature-api-playground & {
    color: #fff;
    padding-top: 24px;

    @media (min-width: ${({ theme }) => theme.device.tablet}) {
      padding-top: 32px;
      padding-bottom: 32px;
      padding-left: 40px;
    }
  }

  .feature-infura-gas & {
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      padding-top: 24px;
    }
  }
`

const CTAWrapper = styled.div`
  display: flex;
  row-gap: 8px;
  column-gap: 16px;
  margin-top: 40px;

  a {
    min-width: 160px;
  }

  .snapsLiveMetaMaskFlask & {
    order: 1;
    margin-top: 0;
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      margin-bottom: 16px;
    }
  }

  .ctaMt10 & {
    margin-top: 10px;
  }

  .ctaDesktopMt96 & {
    @media (min-width: ${({ theme }) => theme.device.tablet}) {
      margin-top: 96px;
    }
  }

  .feature-meet-flask & {
    a {
      background: linear-gradient(180deg, #8a42ad 0%, #6762eb 100%) !important;

      &:hover {
        color: #fff;
      }
    }
  }

  .feature-api-playground & {
    a {
      color: #121212;
      background: linear-gradient(90deg, #ffe566 0%, #ffb0eb 100%);
    }
  }

  .feature-meet-flask &,
  .feature-api-playground & {
    a {
      border: none;
    }

    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      margin-top: 0;
    }
  }

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    justify-content: center;
  }

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    flex-wrap: wrap;
  }
`

const FeatureItems = styled.div`
  display: block;
  margin-top: 32px;
  margin-right: 32px;

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    margin: 32px 0 auto auto;
  }
`

const FeatureItem = styled.div`
  &:not(:last-child) {
    margin-bottom: 48px;
  }
`

const SlideFeatureItems = styled.div`
  flex: 1;
  align-self: flex-start;
`

const SlideFeatureItemInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  flex: 1;
  align-self: flex-start;

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    justify-content: center;
  }

  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    .slideFeatureMt52 & {
      margin-top: 52px;
    }

    .slideFeatureMt56 & {
      margin-top: 56px;
    }

    .slideFeatureMt59 & {
      margin-top: 59px;
    }

    .slideFeatureMW520 & {
      position: absolute;
      max-width: 520px;
    }

    .slideFeatureMW545 & {
      position: absolute;
      max-width: 545px;
    }

    .slideFeatureMW400 & {
      position: absolute;
      max-width: 400px;
    }
  }
`
