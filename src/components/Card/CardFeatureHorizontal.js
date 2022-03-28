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
  box-shadow: 0px 4px 24px rgba(216, 216, 216, 0.4);
  border-radius: 12px;
  background-color: ${({ theme }) => theme.background.white};
  color: ${({ theme }) => theme.text.dark};
`

const ImageWrapper = styled.div`
  width: 484px;

  img {
    object-fit: cover;
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
  padding: 44px 32px;
`
const Title = styled.div`
  font-weight: 700;
  font-size: 32px;
  line-height: 1.4;
  margin-bottom: 24px;
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