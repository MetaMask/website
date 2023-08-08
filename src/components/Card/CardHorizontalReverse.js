import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Image from '../Image'
import classnames from 'classnames'
import Link from '../Link'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import GatsbyBackgroundImage from '../GatsbyBackgroundImage'

/**
 * @name Card
 * @summary -
 * @description - Module for card feature
 */

const StyledCard = props => {
  const {
    description,
    image,
    imageDarkMode,
    link,
    title,
    newTab,
    backgroundColor,
    backgroundImage,
    backgroundImageMobile,
    imageMargin,
    layoutSize,
    linkText,
    cta,
    contentAlignment,
    hubSpotForm,
    customClass,
    previewMode = false,
  } = props

  return (
    <Card className="moduleCardWrapper">
      <CardInner
        to={link}
        newTab={newTab}
        $backgroundColor={backgroundColor}
        $image={backgroundImage}
        $contentAlignment={contentAlignment}
        className={classnames('cardLink', {
          [`bg-${backgroundColor}`]: backgroundColor,
          [customClass]: customClass,
        })}
      >
        <GatsbyBackgroundImage
          image={backgroundImage}
          imageMobile={backgroundImageMobile}
          previewMode={previewMode}
        >
          {image ? (
            <ImageWrapper $imageMargin={imageMargin} layoutSize={layoutSize}>
              <ImageSrc
                image={image}
                darkImage={imageDarkMode}
                previewMode={previewMode}
              />
            </ImageWrapper>
          ) : null}
          <Inner>
            {title ? (
              <Title $contentAlignment={contentAlignment}>{title}</Title>
            ) : null}
            {description ? (
              <Description>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
              </Description>
            ) : null}
            {hubSpotForm ? (
              <>{contentfulModuleToComponent(hubSpotForm)}</>
            ) : null}
            {linkText ? (
              <CTAWrapper>
                <span dangerouslySetInnerHTML={{ __html: linkText }} />
              </CTAWrapper>
            ) : null}
            {cta ? (
              <CTA>
                {cta.map(cta =>
                  contentfulModuleToComponent({
                    ...cta,
                    buttonSize: 'hero',
                  })
                )}
              </CTA>
            ) : null}
          </Inner>
        </GatsbyBackgroundImage>
      </CardInner>
    </Card>
  )
}

export default StyledCard

StyledCard.propTypes = {
  body: PropTypes.string,
  image: PropTypes.object,
  link: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  imageMargin: PropTypes.bool,
}

const Card = styled.div`
  padding-top: 16px !important;
  padding-bottom: 16px !important;
  .cardImageAbsolute & {
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      width: 100%;
    }
  }
`

const CardInner = styled(Link)`
  display: flex;
  overflow: hidden;
  .gatsby-bg__content {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      flex-direction: column;
      text-align: center;
    }
  }
  color: ${({ theme }) => theme.text.dark};
  border-radius: 24px;

  .theme-dark & {
    color: #222222 !important;

    .dark-mode & {
      color: #ffffff !important;
      background-color: #1b1b1b;
    }
  }
  
  &:hover {
    .arrowAnimation:after {
      margin-left: 6px;
    }
  }
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    .cardImageAbsolute & {
      position: relative;
      overflow: hidden;
    }
  }
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    border-radius: 48px;
  }

  ${({ $contentAlignment }) =>
    $contentAlignment === 'center'
      ? `
      flex-direction: column;
      text-align: center;
      align-items: center;
      background-position: center;
  `
      : null}
  
  ${({ $image }) =>
    $image
      ? `
      .gatsby-bg__content {
        padding: 32px;
      }
    `
      : ''}

  ${({ $backgroundColor }) =>
    $backgroundColor === 'white'
      ? `
    box-shadow: 0 10px 30px 0 rgba(0,0,0,0.09);
    transition: box-shadow 200ms ease;

    &:hover {
      box-shadow: 0 10px 30px 0 rgba(0,0,0,0.2);
      filter: saturate(1.15);
    }
  `
      : ''}

  .cardBoxShadowNone &:not(:hover) {
    box-shadow: none;
  }

  .cardHoverBoxShadowNone &:hover {
    box-shadow: none;
  }
`

const ImageWrapper = styled.div`
  max-width: 200px;
  margin-left: 64px;

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    max-width: 150px;
    margin-left: 0;
    margin-bottom: 24px;
  }

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    max-width: 120px;
    margin-bottom: 16px;
  }

  .cardImageAbsolute & {
    @media (min-width: ${({ theme }) => theme.device.tablet}) {
      position: absolute;
      right: 0;

      picture > img {
        width: 100%;
        height: 100%;
      }
    }
  }

  img {
    object-fit: contain;
  }
`

const ImageSrc = styled(Image)`
  display: block;
`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;
  width: 100%;
  height: 100%;
  .cardImageAbsolute & {
    z-index: 1;
  }
`

const Title = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 45px;
  margin-bottom: 16px;

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    font-size: 28px;
    line-height: 1.4;
  }

  ${({ $contentAlignment, theme }) =>
    $contentAlignment === 'center'
      ? `
      margin: 0 auto 16px;
      text-align: center;
      @media (max-width: ${theme.device.mobileMediaMax}) {
        font-size: 32px;
        line-height: 45px;
        max-width: 300px;
        margin-bottom: 24px;
      }
  `
      : null}
`

const Description = styled.div`
  display: block;

  p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    font-size: 18px !important;
    line-height: 26px !important;
  }

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    font-size: 16px;
    line-height: 22px;
  }
`

const CTAWrapper = styled.div`
  display: block;
  margin-top: auto;
  font-weight: 700;
  position: relative;
  &:hover {
    opacity: 0.9;
  }
`

const CTA = styled.div`
  display: flex;
  flex-flow: wrap;
  margin-top: auto;
  padding-top: 16px;
  .button {
    margin: 0 16px 0 0;
  }

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    justify-content: center;
    flex-direction: column;

    .button {
      margin: 0 8px 16px;
    }
  }

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    .button {
      width: 100%;
      margin: 0 0 16px 0;
    }
  }
`
