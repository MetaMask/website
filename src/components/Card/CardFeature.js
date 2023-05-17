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
    linkText,
    hubSpotForm,
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
        $layoutSize={layoutSize}
        className={classnames('custom-card-bg cardLink', {
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
            {title ? <Title $layoutSize={layoutSize}>{title}</Title> : null}
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
                <CTAAngleIcon text={linkText} />
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

const Card = styled.div``

const CardInner = styled(Link)`
  padding: 16px 16px 24px 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 64px 64px -8px ${({ theme }) => theme.shadowCardGray};
  border-radius: 12px;
  height: 100%;
  color: ${({ theme }) => theme.text.dark};
  &:hover {
    .arrowAnimation:after {
      margin-left: 6px;
    }
  }
  ${({ $layoutSize, theme }) =>
    $layoutSize === 'small'
      ? `
      box-shadow: 0px 4px 24px ${theme.shadowCard};
  `
      : null}

  .cardBoxShadowNone &:not(:hover) {
    box-shadow: none;
  }

  .cardHoverBoxShadowNone &:hover {
    box-shadow: none;
  }
`

const ImageWrapper = styled.div`
  height: 140px;
  margin-bottom: 24px;
  box-shadow: 0px 7.1px 42.6px ${({ theme }) => theme.shadowCardFeatureLogo};
  border-radius: 100%;
  margin-top: 40px;

  img {
    height: 100%;
    width: auto;

    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      margin: 0 auto;
    }
  }

  ${({ $layoutSize }) =>
    $layoutSize === 'small'
      ? `
    height: 80px;
  `
      : null}

  ${({ $layoutSize, theme }) =>
    `
  @media (max-width: ${theme.device.mobileMediaMax}){
    height: ${$layoutSize === 'small' ? '80px' : '96px'};
  }
  `}
`

const ImageSrc = styled(Image)`
  display: block;
`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.background.cardFeatureInner};
  border-radius: 12px;
  min-height: 0;
  flex: 1;
  width: 100%;
  padding: 32px 16px;
`
const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 32px;

  ${({ $layoutSize }) =>
    $layoutSize === 'small'
      ? `
      font-size: 18px;
  `
      : null}

  ${({ $layoutSize, theme }) =>
    `
  @media (max-width: ${theme.device.mobileMediaMax}){
    font-size: ${$layoutSize === 'small' ? '16px' : '20px'};
  }
  `}
`

const Description = styled.div`
  display: block;

  &:not(:last-child) {
    margin-bottom: 64px;
  }

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
