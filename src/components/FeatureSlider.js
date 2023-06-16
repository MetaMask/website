import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import styled, { withTheme } from 'styled-components'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import ContentWrapper from './ContentWrapper'
import ParseMD from './ParseMD'
import ImageItem from './Image'
import { Section } from './StyledGeneral'

const FeatureSlider = props => {
  const {
    headline,
    description,
    featureSliderItems,
    layoutType,
    sectionPadding,
    slideShow,
    animation,
    cta,
    ctaSecond,
    backgroundColor,
    customClass,
    previewMode,
  } = props

  const timeoutRef = useRef(null)
  const [activeItem, setActiveItem] = useState(0)

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    if (slideShow) {
      resetTimeout()
      timeoutRef.current = setTimeout(() => {
        if (activeItem + 1 === featureSliderItems.length) {
          setActiveItem(0)
        } else {
          setActiveItem(activeItem + 1)
        }
      }, 5000)
      return () => {
        resetTimeout()
      }
    }
  }, [activeItem])

  const ctaContent = (
    <>
      {cta
        ? contentfulModuleToComponent({
            ...cta,
            color: ['white', 'gray', 'default'].includes(backgroundColor)
              ? cta.color
              : 'white-outline',
            previewMode,
          })
        : null}
      {ctaSecond
        ? contentfulModuleToComponent({
            ...ctaSecond,
            color: 'secondary',
            previewMode,
          })
        : null}
    </>
  )

  const imageContent = (image, imageMobile, itemCustomClass) => (
    <>
      {image ? (
        <ImageSrc
          className={classnames({
            'hidden-mobile': imageMobile,
            [itemCustomClass]: itemCustomClass,
          })}
          image={image}
          previewMode={previewMode}
        />
      ) : null}
      {imageMobile ? (
        <ImageSrc
          className={classnames('hidden-desktop', {
            [itemCustomClass]: itemCustomClass,
          })}
          image={imageMobile}
          previewMode={previewMode}
        />
      ) : null}
    </>
  )

  const innerContent = (
    <InnerContent>
      {headline ? (
        <Headline>
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
      <SliderTextWrapper>
        {featureSliderItems
          ? featureSliderItems.map((item, index) => (
              <SliderText className="dl-checklist fadeIn">
                <SliderTitle
                  className={classnames({
                    active: activeItem === index,
                  })}
                  onClick={() => setActiveItem(index)}
                >
                  {item.title}
                </SliderTitle>
                <SliderDescription>
                  {previewMode ? (
                    <ParseMD>{item.description}</ParseMD>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.description?.childMarkdownRemark.html,
                      }}
                    />
                  )}
                </SliderDescription>
                <div class="hidden-desktop">
                  {imageContent(item.image, item.imageMobile, item.customClass)}
                </div>
              </SliderText>
            ))
          : null}
      </SliderTextWrapper>
      {cta ? (
        <CTAWrapper className="hidden-mobile">{ctaContent}</CTAWrapper>
      ) : null}
    </InnerContent>
  )

  return (
    <Container
      sectionPadding={sectionPadding}
      className={classnames({
        [`bg-${backgroundColor}`]: backgroundColor,
      })}
    >
      <ContentWrapper
        customClass={`${customClass} ${featureSliderItems[activeItem]?.customClass}`}
      >
        <FeatureSliderWrapper
          className={classnames({
            [`layout-${layoutType}`]: layoutType,
          })}
        >
          <FeatureSliderInner>
            <ScrollAnimation
              animateIn={animation ? 'fadeInLeftMini' : ''}
              animateOnce
              initiallyVisible
              delay={0}
              offset={0}
            >
              {innerContent}
            </ScrollAnimation>
          </FeatureSliderInner>
          <SliderImage className="hidden-mobile">
            <ScrollAnimation
              animateIn={animation ? 'fadeInRightMini' : ''}
              initiallyVisible
              animateOnce
              delay={0}
              offset={0}
            >
              {featureSliderItems &&
                featureSliderItems.map((item, index) => (
                  <SliderImageItem
                    className={classnames('fadeIn', {
                      active: activeItem === index,
                    })}
                  >
                    {imageContent(item.image, item.imageMobile)}
                  </SliderImageItem>
                ))}
            </ScrollAnimation>
          </SliderImage>
        </FeatureSliderWrapper>
        {cta ? (
          <CTAWrapper className="hidden-desktop">{ctaContent}</CTAWrapper>
        ) : null}
      </ContentWrapper>
    </Container>
  )
}

export default withTheme(FeatureSlider)

FeatureSlider.propTypes = {
  headline: PropTypes.string,
  description: PropTypes.string,
  layoutType: PropTypes.string,
  featureSliderItems: PropTypes.arrayOf(PropTypes.object.isRequired),
  sectionPadding: PropTypes.string,
  customClass: PropTypes.string,
  backgroundColor: PropTypes.string,
  slideShow: PropTypes.bool,
  animation: PropTypes.bool,
  previewMode: PropTypes.bool,
  cta: PropTypes.object,
  ctaSecond: PropTypes.object,
}

const Container = styled(Section)``

const FeatureSliderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: -10px;
`

const Headline = styled.h2`
  padding-bottom: 20px;
  font-weight: 700;

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
    * {
      max-width: initial !important;
    }
  }
`

const CTAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-top: 40px;
  a {
    min-width: 160px;
  }
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    margin: 24px;
    align-items: center;
  }
`

const SliderTitle = styled.dt`
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    cursor: pointer;
    color: #adadad;
    transition: all 0.3s ease;
    .dl-checklist &:before {
      background-color: #adadad;
      transition: all 0.3s ease;
    }
    &.active {
      color: #333;

      body.dark-mode & {
        color: #fff;
      }

      & + dd {
        max-height: 100px;
        opacity: 1;
      }

      &::before {
        background-color: #2c56dd;
      }
    }
  }
`
const SliderDescription = styled.dd`
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    transition: opacity 0.3s ease;
    max-height: 0;
    opacity: 0;
    overflow-y: hidden;
  }

  p:last-child {
    margin-bottom: 0;
  }
`
const SliderText = styled.dl`
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    img.sideImageOverflowRight {
      margin-right: -20px;
    }
  }
  animation-duration: 0.5s;
`

const SliderImage = styled.div`
  padding: 10px;
  flex: 1 1 0%;
`
const SliderImageItem = styled.div`
  display: none;

  &.active {
    display: block;
  }
  animation-duration: 0.5s;

  .imageMaxHeight525 & img {
    max-height: 525px;
  }
`
const ImageSrc = styled(ImageItem)`
  display: block;
  margin: 0 auto;
  max-width: 100%;
  width: auto;
  height: auto;
`
const FeatureSliderInner = styled.div`
  width: 50%;
  padding: 10px;

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    width: 100%;
  }
`
const SliderTextWrapper = styled.div`
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    margin: 32px 0;
  }
`

const InnerContent = styled.div`
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    .contentMaxWidth500 & {
      max-width: 500px;
    }
  }
`
