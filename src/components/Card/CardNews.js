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
 * @description - Module for card news
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
    imageMargin,
    layoutSize,
    linkText,
    isDarkMode,
  } = props

  return (
    <Card className="moduleCardWrapper">
      <CardInner
        to={link}
        newTab={newTab}
        backgroundColor={backgroundColor}
        layoutSize={layoutSize}
        className={classnames('custom-card-bg', {
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

const Card = styled.div`
  margin-top: 16px;
`

const CardInner = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: ${({ theme }) => theme.text.dark};
`

const ImageWrapper = styled.div`
  min-height: 176px;
  margin-bottom: 24px;
  padding: 10px 16px;
  border-radius: 12px;
  body.light-mode &{
    background: #F2F4F6;
  }
  body.dark-mode &{
    background: #F2F4F615;
  }
  img {
    height: 100%;
    width: auto;
    border-radius: 12px;
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

  ${({ layoutSize, theme }) =>
    `
  @media (max-width: ${theme.device.mobileMediaMax}){
    height: ${layoutSize === 'small' ? '80px' : '96px'};
  }
  `}
    @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
      height: auto;
    }
`

const ImageSrc = styled(Image)`
  display: block;
`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  min-height: 0;
  flex: 1;
  width: 100%;
`
const Title = styled.div`
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 12px;

  ${({ layoutSize }) =>
    layoutSize === 'small'
      ? `
      font-size: 18px;
  `
      : null}

  ${({ layoutSize, theme }) =>
    `
  @media (max-width: ${theme.device.mobileMediaMax}){
    font-size: ${layoutSize === 'small' ? '16px' : '20px'};
  }
  `}
`

const Description = styled.div`
  display: block;
  line-height: 24px;
  &:not(:last-child) {
    margin-bottom: 64px;
  }

  p:last-child {
    margin-bottom: 0;
  }
  body.light-mode & {
    color: #535a61;
  }
`
const CTAWrapper = styled.div`
  display: block;
  margin-top: auto;
`
