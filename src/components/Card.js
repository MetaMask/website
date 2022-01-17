import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Image from './Image'
import classnames from 'classnames'
import ArrowIcon from '../images/icons/icon-arrow-right.svg'
import Link from './Link'

/**
 * @name Card
 * @summary -
 * @description - Module for blog content
 */

const StyledCard = props => {
  const {
    description,
    image,
    link,
    title,
    newTab,
    backgroundColor,
    showArrowIcon,
    imageMargin,
  } = props

  return (
    <Card className="moduleCardWrapper" showArrowIcon={showArrowIcon}>
      <CardInner
        to={link}
        newTab={newTab}
        backgroundColor={backgroundColor}
        className={classnames({
          [`bg-${backgroundColor}`]: backgroundColor,
        })}
      >
        {image ? (
          <ImageWrapper imageMargin={imageMargin}>
            <ImageSrc image={image} />
          </ImageWrapper>
        ) : null}
        <Inner showArrowIcon={showArrowIcon}>
          <InnerContent showArrowIcon={showArrowIcon}>
            {title ? (
              <Title showArrowIcon={showArrowIcon}>{title}</Title>
            ) : null}
            {description ? (
              <Description>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
              </Description>
            ) : null}
          </InnerContent>
          {showArrowIcon ? (
            <ArrowItem>
              <ArrowIcon />
            </ArrowItem>
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

const Card = styled.div`
  display: block;

  ${({ showArrowIcon }) =>
    showArrowIcon
      ? `
    margin-bottom: 16px;
  `
      : ''}
`

const CardInner = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.textColor};
  ${({ backgroundColor }) =>
    backgroundColor
      ? `
    border-radius: 10px;
    height: 100%;
    padding: 24px;
    box-shadow: 0 10px 30px 0 rgba(0,0,0,0.09);
    transition: box-shadow 200ms ease;

    &:hover {
      box-shadow: 0 10px 30px 0 rgba(0,0,0,0.2);
    }
  `
      : ''}
`

const ImageWrapper = styled.div`
  height: 90px;
  margin-bottom: 16px;

  img {
    height: 100%;

    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      margin: 0 auto;
    }
  }

  ${({ imageMargin }) => (imageMargin ? 'margin-left: -15px' : '')}
`

const ImageSrc = styled(Image)`
  display: block;
`

const Inner = styled.div`
  display: block;
  ${({ showArrowIcon }) =>
    showArrowIcon
      ? `
    display: flex;
    align-items: center;
  `
      : ''}
`
const Title = styled.div`
  font-weight: 700;

  ${({ showArrowIcon }) =>
    showArrowIcon
      ? `
    font-size: 24px;
    line-height: 1.25;
  `
      : ''}
`

const Description = styled.div`
  display: block;

  p:last-child {
    margin-bottom: 0;
  }
`
const ArrowItem = styled.div`
  height: 35px;
  margin-left: 16px;
  svg {
    height: 100%;
    width: auto;
    path {
      fill: #333;
    }
  }
`

const InnerContent = styled.div`
  ${({ showArrowIcon }) =>
    showArrowIcon
      ? `
    flex: 1;
    min-width: 0;
    text-align: left;
  `
      : ''}
`
