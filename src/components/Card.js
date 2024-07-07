import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Image from './Image'
import classnames from 'classnames'
import ArrowIcon from '../images/icons/icon-arrow-right.svg'
import Link from './Link'
import CardFeature from './Card/CardFeature'
import CardStat from './Card/CardStat'
import CardFeatureHorizontal from './Card/CardFeatureHorizontal'
import CardHorizontal from './Card/CardHorizontal'
import CardHorizontalReverse from './Card/CardHorizontalReverse'
import CardSnapsCategory from './Card/CardSnapsCategory'
import CardDevBuilding from './Card/CardDevBuilding'
import CardDevTutorial from './Card/CardDevTutorial'
import CardNews from './Card/CardNews'
import ContextClientSide from '../Context/ContextClientSide'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import GatsbyBackgroundImage from './GatsbyBackgroundImage'
import CardBenefit from './Card/CardBenefit'
import CardDelegationFeature from './Card/CardDelegationFeature'

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
    linkText,
    title,
    cta,
    newTab,
    backgroundColor,
    backgroundImage,
    backgroundImageMobile,
    customClass,
    imageMargin,
    layoutType,
    hubSpotForm,
    previewMode = false,
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
    case 'horizontal-reverse':
      // code block
      return <CardHorizontalReverse {...props} isDarkMode={isDarkMode} />
    case 'news':
      // code block
      return <CardNews {...props} isDarkMode={isDarkMode} />
    case 'stat':
      // code block
      return <CardStat {...props} isDarkMode={isDarkMode} />
    case 'snaps-category':
      // code block
      return <CardSnapsCategory {...props} isDarkMode={isDarkMode} />
    case 'dev-building':
      return <CardDevBuilding {...props} isDarkMode={isDarkMode} />
    case 'dev-tutorial':
      return <CardDevTutorial {...props} isDarkMode={isDarkMode} />
    case 'benefit':
      return <CardBenefit {...props} />
    case 'delegation-feature':
      return <CardDelegationFeature {...props} />
    default:
    // code block
  }
  const isCtaType = layoutType === 'cta'
  const isEventType = layoutType === 'event'
  const isCardFlex =
    customClass?.includes('custody-integrate-card') ||
    customClass?.includes('custody-technical-card')

  return (
    <Card
      isCtaType={isCtaType}
      isCardFlex={isCardFlex}
      className={classnames('moduleCardWrapper', {
        [customClass]: customClass,
      })}
    >
      <CardInner
        to={link}
        newTab={newTab}
        $backgroundColor={backgroundColor}
        $hasBackgroundImage={!!backgroundImage}
        className={classnames('cardLink', {
          [`bg-${backgroundColor}`]: backgroundColor,
        })}
      >
        <GatsbyBackgroundImage
          image={backgroundImage}
          imageMobile={backgroundImageMobile}
          previewMode={previewMode}
        >
          {image ? (
            <ImageWrapper $imageMargin={imageMargin}>
              <ImageSrc
                image={image}
                darkImage={imageDarkMode}
                previewMode={previewMode}
              />
            </ImageWrapper>
          ) : null}
          <Inner isCtaType={isCtaType}>
            <InnerContent isCtaType={isCtaType}>
              {title ? (
                <Title
                  isCtaType={isCtaType}
                  isEventType={isEventType}
                  className="title"
                >
                  {title}
                </Title>
              ) : null}
              {description ? (
                <Description isEventType={isEventType}>
                  <div dangerouslySetInnerHTML={{ __html: description }}></div>
                </Description>
              ) : null}
              {hubSpotForm ? (
                <>
                  {contentfulModuleToComponent({ ...hubSpotForm, previewMode })}
                </>
              ) : null}
            </InnerContent>
            {isCtaType ? (
              <ArrowItem>
                <ArrowIcon />
              </ArrowItem>
            ) : null}
            {linkText ? (
              <CTAWrapper>
                <span dangerouslySetInnerHTML={{ __html: linkText }} />
              </CTAWrapper>
            ) : null}
            {cta ? (
              <CTA>
                {cta.map(cta =>
                  contentfulModuleToComponent({
                    ...cta,
                    previewMode,
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
  hubSpotForm: PropTypes.object,
}

const CTA = styled.div``

const Card = styled.div`
  display: block;

  ${({ isCtaType }) =>
    isCtaType
      ? `
    margin-bottom: 16px;
  `
      : ''}
  ${({ isCardFlex }) =>
    isCardFlex
      ? `
    display: flex;
  `
      : ''}
  &.card-height-100 {
    height: 100%;
  }
  &.card-move-up-80 {
    @media (min-width: ${({ theme }) => theme.device.tablet}) {
      margin-top: -80px;
    }
  }
  &.removePaddingBottomOnMobile {
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      padding-bottom: 0 !important;
    }
  }
`

const CardInner = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.text.body} !important;
  
  .borderPink & {
    border: 2px solid #FFB0EB;
  }
  .borderYellow & {
    border: 2px solid #FFD33D;
  }
  .borderBlue & {
    border: 2px solid #037DD6;
  }

  .card-dev-explore & {
    border: 1px solid #e3e3e3;
    border-radius: 12px;
    padding: 20px;
    height: 100%;
    background-color: ${({ theme }) => theme.white};
    body.dark-mode & {
      background-color: ${({ theme }) => theme.dark};
    }

    .title {
      margin-bottom: 8px;
    }
  }

  .theme-dark & {
    color: #222222 !important;

    .dark-mode & {
      background-color: #1b1b1b;
    }
  }
  
  .columnTypetag & {
    padding: 15px 24px;
  }
  
  &:hover {
    .arrowAnimation:after {
      margin-left: 6px;
    }
  }
  
  ${({ $backgroundColor, theme }) =>
    $backgroundColor
      ? `
    border-radius: 10px;
    height: 100%;
    padding: 24px;
    .gatsby-bg__content {
      border-radius: 10px;
      padding: 24px;
    }

    @media (max-width: ${theme.device.tabletMediaMax}){
      .columnTypetag && {
        padding: 12px;
      }
    }
  `
      : ''}

  ${({ $backgroundColor }) =>
    $backgroundColor === 'white'
      ? `
    box-shadow: 0 10px 30px 0 rgba(0,0,0,0.09);
    transition: box-shadow 200ms ease;

    &:hover {
      box-shadow: 0 10px 30px 0 rgba(0,0,0,0.2);
    }
  `
      : ''}
  ${({ $backgroundColor }) =>
    $backgroundColor === 'gray'
      ? `
    padding: 20px;
  `
      : ''}
  ${({ $hasBackgroundImage, theme }) =>
    $hasBackgroundImage
      ? `
      height: 100%;
      padding: 0;
      @media (max-width: ${theme.device.tabletMediaMax}){
        .columnTypetag & {
          padding: 12px;
        }
      }
    `
      : ``}

  .gatsby-bg__wrapper img, .cardBorderRadius24 & {
    border-radius: 24px;
  }

  .dark-mode .cardContentWhiteOnDark & {
    color: white !important;
  }
  
  .cardBoxShadowNone &:not(:hover) {
    box-shadow: none;
  }

  .cardHoverBoxShadowNone &:hover {
    box-shadow: none;
  }
  
  ${({ to }) =>
    !to
      ? `
      .cardBoxShadowNone &:hover {
        box-shadow: none;
      }
  `
      : ''}

  .custody-integrate-card &, .custody-technical-card & {
    padding: 24px;
    border-radius: 12px;

    body.dark-mode & {
      background-color: ${({ theme }) => theme.dark};
    }
  }
  .custody-integrate-card & {
    background-color: #EDF6FE;
  }
  .custody-technical-card & {
    background-color: #FFF0E2;
  }
  body.dark-mode .borderInDarkMode & {
    border: 1px solid white;
  }
  body.dark-mode .bgDarkInDarkmode & {
    background-color: ${({ theme }) => theme.dark};
  }
`

const ImageWrapper = styled.div`
  height: 90px;
  margin-bottom: 16px;

  .image-height-31 & {
    height: 31px;
  }

  .image-height-64 & {
    height: 64px;
  }

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    .image-height-31 & {
      height: 62px;
    }
  }

  img {
    height: 100%;
    width: auto;

    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      margin: 0 auto;
    }
  }

  ${({ $imageMargin }) => ($imageMargin ? 'margin-left: -15px' : '')}
`

const ImageSrc = styled(Image)`
  display: block;
  height: 100%;
  border-radius: 5px;
  img {
    height: 90px;
    object-fit: contain;
  }
`

const Inner = styled.div`
  display: flex;
  ${({ isCtaType }) =>
    isCtaType
      ? `
      align-items: center;
  `
      : `
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  `}
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

  ${({ isEventType }) =>
    isEventType &&
    `
      margin-top: -2px;
      font-size: 12px;
      line-height: 13.15px;
      letter-spacing: 2.35px;
      text-transform: uppercase;
      color: #F6851B;
  `}
`

const Description = styled.div`
  display: block;

  p:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    margin-bottom: 0;
    li {
      margin-bottom: 8px;
      a {
        color: ${({ theme }) => theme.darkBlue};
        font-size: 18px;
        line-height: 25px;
      }
    }
  }

  .organizations-description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .cta {
      color: #2c56dd;
      display: flex;
      align-items: center;
      margin: 0 auto;

      a {
        font-size: 13px;
        font-weight: 600;
        color: inherit;
      }
    }
  }

  @media (min-width: ${({ theme }) => theme.device.mobile}) {
    .organizations-description {
      min-height: 153px;
      .cta {
        margin: unset;
      }
    }
  }

  ${({ isEventType }) =>
    isEventType &&
    `
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      margin-top: 4px;
  `}
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

const CTAWrapper = styled.div`
  display: block;
  margin-top: 8px;
  font-weight: bold;
  position: relative;
  color: ${({ theme }) => theme.text.title};
  &:hover {
    opacity: 0.9;
  }
`
