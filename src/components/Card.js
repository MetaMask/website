import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Image from './Image'
import classnames from 'classnames'
import ArrowIcon from '../images/icons/icon-arrow-right.svg'
import Link from './Link'
import CardFeature from './Card/CardFeature'
import CardFeatureHorizontal from './Card/CardFeatureHorizontal'
import CardHorizontal from './Card/CardHorizontal'
import CardNews from './Card/CardNews'
import ContextClientSide from '../Context/ContextClientSide'

/**
 * @name Card
 * @summary -
 * @description - Module for blog content
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
    layoutType,
  } = props
  const { darkMode: darkModeContextValue } = React.useContext(ContextClientSide)
  const { isDarkMode } = darkModeContextValue || {}
  switch (layoutType) {
    case 'feature':
      // code block
      return <CardFeature {...props} isDarkMode={isDarkMode} />
    case 'horizontal-feature':
      // code block
      return <CardFeatureHorizontal {...props} isDarkMode={isDarkMode} />
    case 'horizontal':
      // code block
      return <CardHorizontal {...props} isDarkMode={isDarkMode} />
    case 'news':
      // code block
      return <CardNews {...props} isDarkMode={isDarkMode} />
    default:
    // code block
  }
  const isCtaType = layoutType === 'cta'

  return (
    <Card className="moduleCardWrapper" isCtaType={isCtaType}>
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
            <ImageSrc
              image={isDarkMode && imageDarkMode ? imageDarkMode : image}
            />
          </ImageWrapper>
        ) : null}
        <Inner isCtaType={isCtaType}>
          <InnerContent isCtaType={isCtaType}>
            {title ? <Title isCtaType={isCtaType}>{title}</Title> : null}
            {description ? (
              <Description>
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
              </Description>
            ) : null}
          </InnerContent>
          {isCtaType ? (
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

  ${({ isCtaType }) =>
    isCtaType
      ? `
    margin-bottom: 16px;
  `
      : ''}
`

const CardInner = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.text.body};
  .columnTypetag & {
    padding: 15px 24px;
  }
  ${({ backgroundColor, theme }) =>
    backgroundColor
      ? `
    border-radius: 10px;
    height: 100%;
    padding: 24px;

    @media (max-width: ${theme.device.tabletMediaMax}){
      .columnTypetag & {
        padding: 12px;
      }
    }
  `
      : ''}

  ${({ backgroundColor }) =>
    backgroundColor === 'white'
      ? `
    box-shadow: 0 10px 30px 0 rgba(0,0,0,0.09);
    transition: box-shadow 200ms ease;

    &:hover {
      box-shadow: 0 10px 30px 0 rgba(0,0,0,0.2);
    }
  `
      : ''}
  ${({ backgroundColor }) =>
    backgroundColor === 'gray'
      ? `
    padding: 20px;
  `
      : ''}
`

const ImageWrapper = styled.div`
  height: 90px;
  margin-bottom: 16px;

  img {
    height: 100%;
    width: auto;

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
  ${({ isCtaType }) =>
    isCtaType
      ? `
    display: flex;
    align-items: center;
  `
      : ''}
`
const Title = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.text.title};
  ${({ isCtaType }) =>
    isCtaType
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
      fill: ${({ theme }) => theme.text.title};
    }
  }
`

const InnerContent = styled.div`
  ${({ isCtaType }) =>
    isCtaType
      ? `
    flex: 1;
    min-width: 0;
    text-align: left;
  `
      : ''}
`
