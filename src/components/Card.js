import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Image from './Image'
import classnames from 'classnames'
import ArrowIcon from '../images/icons/icon-arrow-right.svg'

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
  } = props

  return (
    <Card>
      <CardInner
        to={link}
        newTab={newTab}
        backgroundColor={backgroundColor}
        className={classnames({
          [`bg-${backgroundColor}`]: backgroundColor,
        })}
      >
        {image ? (
          <ImageWrapper>
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
}

const Card = styled.div`
  display: block;
`

const CardInner = styled.div`
  display: block;
  ${({ backgroundColor }) =>
    backgroundColor
      ? `
    border-radius: 10px;
    height: 100%;
    padding: 24px;
    box-shadow: 0 10px 30px 0 rgba(0,0,0,0.09);
  `
      : ''}
`

const ImageWrapper = styled.div`
  height: 90px;
  margin-bottom: 16px;

  img {
    height: 100%;
  }
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
`
const ArrowItem = styled.div`
  height: 35px;
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
