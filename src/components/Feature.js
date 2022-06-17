import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import ContentWrapper from './ContentWrapper'
import ScrollAnimation from 'react-animate-on-scroll'
import classnames from 'classnames'
import { Section } from './StyledGeneral'
import ImageItem from './Image'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import ContextClientSide from '../Context/ContextClientSide'

const FeatureComponent = props => {
  const {
    cta,
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
    noPaddingBottom,
    imageMobile,
    eyebrow,
    featureItems,
    imageDarkMode,
    imageMobileDarkMode,
    imageShadow,
    hideImageOnMobile,
    imageLink,
    customClass,
  } = props
  const { darkMode: darkModeContextValue } = React.useContext(ContextClientSide)
  const { isDarkMode } = darkModeContextValue || {}
  const contentAlignLR = ['left', 'right'].includes(contentAlignment)
    ? contentAlignment
    : ''
  const isContentAlignVertical = contentAlignment === 'vertical'
  const innerContent = (
    <>
      {eyebrow ? <Eyebrow className="hidden-mobile">{eyebrow}</Eyebrow> : null}
      {headline ? (
        <Headline
          hasEyebrow={eyebrow}
          hasCta={cta}
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
      {featureItems && featureItems.length ? (
        <FeatureItems>
          {featureItems.map(m => (
            <FeatureItem>
              {contentfulModuleToComponent({
                ...m,
              })}
            </FeatureItem>
          ))}
        </FeatureItems>
      ) : null}
      {cta && !isContentAlignVertical ? (
        <CTAWrapper>
          {contentfulModuleToComponent({
            ...cta,
            color: ['white', 'gray', 'default'].includes(backgroundColor)
              ? cta.color
              : 'white-outline',
          })}
        </CTAWrapper>
      ) : null}
    </>
  )
  const imageContent = (
    <>
      {image ? (
        <ImageSrc
          className={classnames({
            'hidden-mobile': imageMobile,
          })}
          image={isDarkMode && imageDarkMode ? imageDarkMode : image}
          widthImg={imageWidth}
          imageAlignment={imageAlignment}
          link={imageLink}
        />
      ) : null}
      {imageMobile ? (
        <ImageSrc
          className={classnames('hidden-desktop')}
          image={
            isDarkMode && imageMobileDarkMode
              ? imageMobileDarkMode
              : imageMobile
          }
          widthImg={imageWidth}
          imageAlignment={imageAlignment}
          link={imageLink}
        />
      ) : null}
    </>
  )
  return (
    <Container
      sectionPadding={sectionPadding}
      className={classnames({
        noPaddingBottom: noPaddingBottom,
        [`bg-${backgroundColor}`]: backgroundColor,
      })}
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
          {eyebrow ? (
            <Eyebrow className="hidden-desktop">{eyebrow}</Eyebrow>
          ) : null}
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
          {cta && isContentAlignVertical ? (
            <CTAWrapper>
              {contentfulModuleToComponent({
                ...cta,
                color: ['white', 'gray', 'default'].includes(backgroundColor)
                  ? cta.color
                  : 'white-outline',
              })}
            </CTAWrapper>
          ) : null}
        </FeatureWrapper>
      </ContentWrapper>
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
}

const Container = styled(Section)``
const Image = styled.div`
  display: block;
  width: 100%;
`
const SideImage = styled.div`
  display: block;
  flex: 1;
  min-width: 0;
`
const ImageSrc = styled(ImageItem)`
  display: block;
  margin: 0 auto;
  max-width: 100%;
  width: auto;
  height: auto;
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

  ${({ hasEyebrow, theme }) =>
    hasEyebrow
      ? `
  @media (max-width: ${theme.device.tabletMediaMax}) {
    margin-top: 0;
    padding-top: 0;
  }
  `
      : ''}
`
const Description = styled.div`
  display: block;
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    text-align: center;
    * {
      max-width: initial !important;
    }
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
    ${SideImage} {
      margin-bottom: 32px;
    }
  }

  ${({ hideImageOnMobile, theme }) =>
    hideImageOnMobile
      ? `
      @media (max-width: ${theme.device.tabletMediaMax}) {
        ${SideImage} {
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
      ${CTAWrapper} {
        order: 4;
        margin-top: 20px;
      }
      ${SideImage} {
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
  margin-top: 40px;
  a {
    min-width: 160px;
  }

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    .button {
      width: 100%;
    }
  }
`
const Eyebrow = styled.div`
  color: #f6851b;
  font-weight: 700;
  letter-spacing: 5px;
  margin-bottom: 16px;
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
