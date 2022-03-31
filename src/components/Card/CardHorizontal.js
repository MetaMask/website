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
    link,
    title,
    newTab,
    backgroundColor,
    imageMargin,
    layoutSize,
    linkText,
  } = props

  return (
    <Card className="moduleCardWrapper">
      <CardInner
        to={link}
        newTab={newTab}
        backgroundColor={backgroundColor}
        className={classnames({
          [`bg-${backgroundColor}`]: backgroundColor,
        })}
      >
        {image ? (
          <ImageWrapper imageMargin={imageMargin} layoutSize={layoutSize}>
            <ImageSrc image={image} />
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
  color: ${({ theme }) => theme.text.dark};

  ${({ theme }) =>
  `
  @media (max-width: ${theme.device.mobileMediaMax}){
    flex-direction: column;
    align-items: center;
  }
  `}
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
`