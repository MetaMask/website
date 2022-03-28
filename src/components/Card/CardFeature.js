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
        layoutSize={layoutSize}
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
          {title ? <Title layoutSize={layoutSize}>{title}</Title> : null}
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
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 64px 64px -8px rgba(15, 15, 15, 0.1);
  border-radius: 12px;
  height: 100%;
  color: ${({ theme }) => theme.text.dark};
  ${({ layoutSize }) =>
    layoutSize === 'small'
      ? `
      box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
  `
      : null}
`

const ImageWrapper = styled.div`
  height: 140px;
  margin-bottom: 24px;
  box-shadow: 0px 7.1px 42.6px rgba(216, 216, 216, 0.4);
  border-radius: 100%;
  margin-top: 40px;

  img {
    height: 100%;
    width: auto;

    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      margin: 0 auto;
    }
  }

  ${({ layoutSize }) =>
    layoutSize === 'small'
      ? `
    height: 80px;
  `
      : null}
`

const ImageSrc = styled(Image)`
  display: block;
`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(3, 125, 214, 0.03);
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

  ${({ layoutSize }) =>
    layoutSize === 'small'
      ? `
      font-size: 18px;
  `
      : null}
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
`
