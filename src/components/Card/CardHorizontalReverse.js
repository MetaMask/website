import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Image from '../Image'
import classnames from 'classnames'
import Link from '../Link'
import CTAAngleIcon from './CTAAngleIcon'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'

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
    imageMargin,
    layoutSize,
    linkText,
    cta,
    isDarkMode,
  } = props

  return (
    <Card className="moduleCardWrapper">
      <CardInner
        to={link}
        newTab={newTab}
        backgroundColor={backgroundColor}
        image={backgroundImage}
        className={classnames({
          [`bg-${backgroundColor}`]: backgroundColor,
        })}
      >
        {image ? (
          <ImageWrapper imageMargin={imageMargin} layoutSize={layoutSize}>
            <ImageSrc
              image={isDarkMode && imageDarkMode ? imageDarkMode : image}
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
          {linkText ? <CTAWrapper>{linkText}</CTAWrapper> : null}
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

const CTA = styled.div`
  display: flex;
  flex-flow: wrap;
  margin-top: auto;
  padding-top: 16px;
  .button {
    margin: 0 16px 16px 0;
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

const Card = styled.div`
  padding-top: 16px !important;
  padding-bottom: 16px !important;
  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    .snapsCardHorizontalResize & {
      width: 100%;
    }
  }
`

const CardInner = styled(Link)`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  color: ${({ theme }) => theme.text.dark};
  border-radius: 48px;

  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    .snapsCardHorizontalResize & {
      position: relative;
      overflow: hidden;
    }
  }
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    flex-direction: column;
    text-align: center;
  }
  ${({ theme }) =>
    `
  @media (max-width: ${theme.device.mobileMediaMax}){
    flex-direction: column;
    align-items: center;
  }
  `}
  ${({ image, theme }) =>
    image
      ? ` background-image: url(${image});
      background-size: cover;
      height: 100%;
      padding: 32px;

      @media (max-width: ${theme.device.tabletMediaMax}){
        .columnTypetag & {
          padding: 12px;
        }
      }
    `
      : ''}
`

const ImageWrapper = styled.div`
  max-width: 200px;
  margin-left: 64px;
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    .snapsCardHorizontalResize & {
      position: absolute;
      right: 0;
    }
  }
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    max-width: 125px;
    margin-left: 0;
    margin-bottom: 24px;
  }
  ${({ theme }) =>
    `
  @media (max-width: ${theme.device.mobileMediaMax}){
    width: 100px;
    margin-left: 0;
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
  height: 100%;
`
const Title = styled.div`
  font-weight: 700;
  font-size: 48px;
  line-height: 1.2;
  margin-bottom: 8px;
  .snapsCardHorizontalResize & {
    font-size: 40px;
  }
  ${({ theme }) =>
    `
  @media (max-width: ${theme.device.mobileMediaMax}){
    font-size: 32px;
    .snapsCardHorizontalResize & {
      font-size: 24px;
    }
  }
  `}
`

const Description = styled.div`
  display: block;
  font-size: 24px;
  line-height: 30px;
  p:last-child {
    margin-bottom: 0;
  }
  ${({ theme }) =>
    `
  @media (max-width: ${theme.device.mobileMediaMax}){
    font-size: 16px;
    line-height: 20px;
  }
  `}
`
const CTAWrapper = styled.div`
  display: block;
  margin-top: auto;
`
