import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Image from '../Image'
import classnames from 'classnames'
import Link from '../Link'
import CTAAngleIcon from './CTAAngleIcon'
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
    hubSpotForm,
    linkText,
    cta,
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
            <ImageWrapper $imageMargin={imageMargin} $layoutSize={layoutSize}>
              <ImageSrc
                image={image}
                darkImage={imageDarkMode}
                previewMode={previewMode}
              />
            </ImageWrapper>
          ) : null}
          <Inner>
            {title ? <Title>{title}</Title> : null}
            {description ? (
              <Description>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
              </Description>
            ) : null}
            {linkText ? (
              <CTAWrapper>
                <CTAAngleIcon text={linkText} />
              </CTAWrapper>
            ) : null}
            {hubSpotForm ? (
              <>{contentfulModuleToComponent(hubSpotForm)}</>
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

const Card = styled.div``

const CardInner = styled(Link)`
  display: flex;
  overflow: hidden;
  color: ${({ theme }) => theme.text.dark};
  &:hover {
    .arrowAnimation:after {
      margin-left: 6px;
    }
  }
  ${({ theme }) => `
    @media (max-width: ${theme.device.mobileMediaMax}){
      flex-direction: column;
      align-items: center;
    }
  `}

  ${({ image }) =>
    image
      ? `
      border-radius: 12px;
      .gatsby-bg__content {
        display: flex;
        padding: 16px;
        ${({ theme }) => `
          @media (max-width: ${theme.device.mobileMediaMax}){
            flex-direction: column;
            align-items: center;
          }
        `}
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
  width: 80px;
  margin-right: 32px;

  ${({ theme }) =>
    `
  @media (max-width: ${theme.device.mobileMediaMax}){
    width: 56px;
    margin-right: 0;
    margin-bottom: 16px;
  }
  `}

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
`
const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 1.2;
  margin-bottom: 8px;

  ${({ theme }) =>
    `
  @media (max-width: ${theme.device.mobileMediaMax}){
    font-size: 20px;
  }
  `}
`

const Description = styled.div`
  display: block;

  p:last-child {
    margin-bottom: 0;
  }
`
const CTAWrapper = styled.div`
  display: block;
  margin-top: auto;
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
