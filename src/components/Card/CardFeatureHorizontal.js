import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Image from '../Image'
import classnames from 'classnames'
import Link from '../Link'
import CTAAngleIcon from './CTAAngleIcon'

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
    contentAlignment,
    isDarkMode,
  } = props

  return (
    <Card className="moduleCardWrapper">
      <CardInner
        to={link}
        newTab={newTab}
        backgroundColor={backgroundColor}
        image={backgroundImage}
        className={classnames('custom-card-bg cardLink', {
          [`bg-${backgroundColor}`]: backgroundColor,
          [`bg-default`]: !backgroundColor,
        })}
        contentAlignment={contentAlignment}
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
          {linkText ? (
            <CTAWrapper>
              <CTAAngleIcon text={linkText} />
            </CTAWrapper>
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

const Card = styled.div``

const CardInner = styled(Link)`
  display: flex;
  box-shadow: 0px 4px 24px ${({ theme }) => theme.shadowCard};
  border-radius: 12px;
  overflow: hidden;
  color: ${({ theme }) => theme.text.dark};
  ${({ contentAlignment }) =>
    contentAlignment === 'left'
      ? `
  flex-direction: row-reverse;
  `
      : null}

  ${({ theme }) =>
    `
  @media (max-width: ${theme.device.mobileMediaMax}){
    flex-direction: column;
  }
  `}
  ${({ image }) =>
    image
      ? ` background-image: url(${image});
      background-size: cover;
    `
      : ''}
`

const ImageWrapper = styled.div`
  width: 484px;
  max-width: 50%;

  img {
    object-fit: cover;
  }

  ${({ theme }) =>
    `
  @media (max-width: ${theme.device.mobileMediaMax}){
    width: 100%;
    max-width: 100%;
  }
  `}
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
  padding: 44px 32px;

  ${({ theme }) =>
    `
  @media (max-width: ${theme.device.mobileMediaMax}){
    padding: 16px;
  }
  `}
`
const Title = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 1.4;
  margin-bottom: 24px;

  ${({ theme }) =>
    `
  @media (max-width: ${theme.device.mobileMediaMax}){
    font-size: 24px;
  }
  `}
`

const Description = styled.div`
  display: block;

  p:last-child {
    margin-bottom: 0;
  }

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`
const CTAWrapper = styled.div`
  display: block;
  margin-top: auto;
  &:hover {
    opacity: 0.9;
  }
`
