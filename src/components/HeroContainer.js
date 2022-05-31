import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import ContentWrapper from './ContentWrapper'
import { useLocation } from '@reach/router'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import { Section } from './StyledGeneral'
import classnames from 'classnames'
import Image from './Image'
import isEmpty from 'lodash/isEmpty'
import ContextClientSide from '../Context/ContextClientSide'

const HeroContainerComponent = props => {
  const {
    backgroundImage,
    headline,
    hideHeadline,
    description,
    sideImage,
    sideImageDarkMode,
    sideImageUrl,
    sideImageDarkModeUrl,
    showLearnMore,
    eyebrow,
    eyebrowLogo,
    eyebrowMobileLogo,
    eyebrowLogoDarkMode,
    eyebrowMobileLogoDarkMode,
    showFavIcon,
    hubSpotForm,
    ctas,
    contentAlignment,
    backgroundColor,
    headlineBorderBottom,
    sideImageFlex,
    backgroundColorMobile,
    isFaq,
    sectionPadding,
    customClass,
  } = props
  const { darkMode: darkModeContextValue } = React.useContext(ContextClientSide)
  const { isDarkMode } = darkModeContextValue || {}
  const location = useLocation()
  const pathname = location.pathname.replace(/\/?$/, '/')
  const isHome = pathname === '/'
  const isAbout = pathname === '/about/'
  const isFlask = pathname === '/flask/'
  const isInstitutions = pathname === '/institutions/'
  const isInstitutionalChild =
    pathname === '/institutions/portfolio/' ||
    pathname === '/institutions/compliance/'
  const isCustody = pathname === '/institutions/custody/'
  const isThankYou = pathname === '/institutions/thank-you/'
  let hubspotWrapper
  if (hubSpotForm) {
    hubspotWrapper = (
      <HubSpotDefault>
        {contentfulModuleToComponent({
          ...hubSpotForm,
        })}
      </HubSpotDefault>
    )
  }
  const isStyleHubspot = hubSpotForm
  const isStyleCenterSimple = contentAlignment === 'center' && !sideImageUrl
  let heroTitleFontsize = ''
  if (isStyleHubspot) {
    heroTitleFontsize = '16px'
  } else if (
    (contentAlignment === 'center' || headlineBorderBottom) &&
    !isThankYou
  ) {
    heroTitleFontsize = '30px'
  }

  return (
    <>
      {showFavIcon ? (
        <FavIconContainer>
          <ContentWrapper>
            <FavIconWrapper>
              <FavIcon src={'/images/metamask-logo.png'} alt="logo" />
            </FavIconWrapper>
          </ContentWrapper>
        </FavIconContainer>
      ) : null}
      <HeroContainer
        isThankYou={isThankYou}
        sectionPadding={sectionPadding || ''}
        headlineBorderBottom={headlineBorderBottom}
        isStyleCenterSimple={isStyleCenterSimple}
        showFavIcon={showFavIcon}
        image={!isThankYou && backgroundImage}
        className={classnames({
          [`bg-${backgroundColor}`]: backgroundColor,
          [`bg-mobile-${backgroundColorMobile}`]: backgroundColorMobile,
        })}
      >
        {isThankYou && backgroundImage ? (
          <BackgroundImageContain>
            <img alt={headline} src={backgroundImage} />
          </BackgroundImageContain>
        ) : null}
        <ContentWrapper customClass={customClass}>
          <HeroContentContainer
            isStyleCenterSimple={isStyleCenterSimple}
            contentAlignment={contentAlignment}
            bgSrc={
              !isStyleHubspot && !sideImageFlex && !isFlask
                ? isDarkMode && sideImageDarkModeUrl
                  ? sideImageDarkModeUrl
                  : sideImageUrl
                : ''
            }
            isAbout={isAbout}
            reverse={contentAlignment === 'right'}
            center={sideImageFlex}
            isCustody={isCustody}
            isInstitutions={isInstitutions}
            isFlask={isFlask}
            isInstitutionalChild={isInstitutionalChild}
            isThankYou={isThankYou}
          >
            <HeroImageTextContainer
              isStyleHubspot={isStyleHubspot}
              isHome={isHome}
              headlineBorderBottom={headlineBorderBottom}
              className={classnames({
                heroMobileOverlayContent: !backgroundImage,
              })}
              center={!sideImageFlex && !isHome}
              sideImageFlex={sideImageFlex}
            >
              {eyebrowLogo ? (
                <EyebrowWrapper
                  className={classnames({ 'hidden-mobile': eyebrowMobileLogo })}
                  hideHeadline={hideHeadline}
                  isFaq={isFaq}
                >
                  {contentfulModuleToComponent(
                    eyebrowLogoDarkMode && isDarkMode
                      ? {
                          ...eyebrowLogoDarkMode,
                          cleanStyle: true,
                        }
                      : {
                          ...eyebrowLogo,
                          cleanStyle: true,
                        }
                  )}
                </EyebrowWrapper>
              ) : null}
              {eyebrowMobileLogo ? (
                <EyebrowWrapper
                  className={'hidden-desktop'}
                  hideHeadline={hideHeadline}
                  isMobileLogo={true}
                  isFaq={isFaq}
                >
                  {contentfulModuleToComponent(
                    eyebrowMobileLogoDarkMode && isDarkMode
                      ? {
                          ...eyebrowMobileLogoDarkMode,
                          cleanStyle: true,
                        }
                      : {
                          ...eyebrowMobileLogo,
                          cleanStyle: true,
                        }
                  )}
                </EyebrowWrapper>
              ) : null}
              {eyebrow ? <EyebrowText>{eyebrow}</EyebrowText> : null}
              {headline && (
                <HeroTitle
                  headlineBorderBottom={headlineBorderBottom}
                  hideHeadline={hideHeadline}
                  fontSize={heroTitleFontsize}
                  isFaq={isFaq}
                  isFlask={isFlask}
                >
                  {' '}
                  {headline}{' '}
                </HeroTitle>
              )}
              {description && (
                <HeroDescription isFaq={isFaq}>
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </HeroDescription>
              )}
              {!isEmpty(ctas) && !isFlask ? (
                <HeroCTA>
                  {ctas.map(cta =>
                    contentfulModuleToComponent({
                      ...cta,
                      buttonSize: 'hero',
                    })
                  )}
                </HeroCTA>
              ) : null}
              {hubspotWrapper ? hubspotWrapper : null}
            </HeroImageTextContainer>
            {sideImage ? (
              <HeroSideImage
                sideImageFlex={sideImageFlex}
                isStyleHubspot={isStyleHubspot}
                isFlask={isFlask}
              >
                {isStyleHubspot || sideImageFlex || isFlask ? (
                  <Image
                    image={
                      isDarkMode && !isEmpty(sideImageDarkMode)
                        ? sideImageDarkMode
                        : sideImage
                    }
                  />
                ) : null}
              </HeroSideImage>
            ) : null}
            {!isEmpty(ctas) && isFlask ? (
              <HeroCTA isFlask={isFlask}>
                {ctas.map(cta =>
                  contentfulModuleToComponent({
                    ...cta,
                    buttonSize: 'hero',
                  })
                )}
              </HeroCTA>
            ) : null}
          </HeroContentContainer>
        </ContentWrapper>
      </HeroContainer>
      {showLearnMore ? (
        <div>
          <ContentWrapper>
            <LearnMoreWrapper>
              <LearnMoreInner className="text-block">
                Learn More
                <Icon className="w-icon w-icon-dropdown-toggle"></Icon>
              </LearnMoreInner>
            </LearnMoreWrapper>
          </ContentWrapper>
        </div>
      ) : null}
    </>
  )
}

export default withTheme(HeroContainerComponent)

HeroContainerComponent.propTypes = {
  backgroundImage: PropTypes.string,
  eyebrowLogo: PropTypes.object,
  eyebrowMobileLogo: PropTypes.object,
  sideImageUrl: PropTypes.string,
  sideImage: PropTypes.object,
  hubSpotForm: PropTypes.object,
  headline: PropTypes.string,
  description: PropTypes.string,
  contentAlignment: PropTypes.string,
  hideHeadline: PropTypes.bool,
  showLearnMore: PropTypes.bool,
  showFavIcon: PropTypes.bool,
  sectionPadding: PropTypes.string,
}

const HeroContainer = styled(Section)`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  min-width: 100%;
  ${({ isThankYou }) =>
    isThankYou
      ? `
  z-index: 5;
  `
      : ``}
  ${({ image }) =>
    image
      ? ` background-image: url(${image});
    background-size: cover;
   `
      : ''}

  ${({ isStyleCenterSimple }) =>
    isStyleCenterSimple
      ? `
      + div {
        padding-top: 0 !important;
      }
    `
      : ''}

  ${({ headlineBorderBottom }) =>
    headlineBorderBottom
      ? `
    padding-top: 0;
    & + div {
      padding-top: 0 !important;
    }
  `
      : ''}

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}){
    padding-top: 0;
  }

  ${({ showFavIcon }) =>
    showFavIcon
      ? `
      padding-top: 0;
  `
      : ``}

  ${({ sectionPadding }) =>
    sectionPadding
      ? `
      padding-bottom: ${sectionPadding} !important;
  `
      : ``}
  
`

const HeroContentContainer = styled.div`
  display: flex;
  margin: -10px;
  margin-top: 10px;
  
  & > * {
    width: 50%;
    padding: 10px;
  }

  ${({ center }) =>
    center
      ? `
    align-items: center;

    img {
      margin: 0 auto;
    }
  `
      : ''}

  ${({ bgSrc }) =>
    bgSrc
      ? `
    background-image: url(${bgSrc});
    background-position: 100% 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-attachment: scroll;
  `
      : ''}
  
  ${({ isAbout }) =>
    isAbout
      ? `
    background-position: 100% 0%;
    background-size: 50%;
    ${HeroImageTextContainer} {
      padding-top: 0;
      padding-bottom: 0;
    }
  `
      : ''}

  ${({ contentAlignment }) =>
    contentAlignment === 'center'
      ? `
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    & > * {
      width: 100%;
    }
  `
      : ''}

  ${({ isStyleCenterSimple }) =>
    isStyleCenterSimple
      ? `
    margin: 0 !important;
    padding: 48px 0 0 0 !important;
  `
      : ''}

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}){
    flex-direction: column-reverse;
    background-position: 50% 0%;
    background-size: 90%;
    background-attachment: scroll;
    padding-bottom: 0;
    ${({ isFlask }) =>
      isFlask
        ? `
      flex-direction: column;

      ${HeroSideImage} {
        height: auto !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      ${HeroTitle} {
        padding-bottom: 0 !important;
      }
    `
        : ''}
    & > * {
      width: 100%;
    }

    ${({ isInstitutions }) =>
      isInstitutions
        ? `
      background-position: 50% 0%;
      background-size: 250px;
      ${EyebrowWrapper} {
        padding-top: 42px;
      }
    `
        : ''}
  }
  ${({ isInstitutionalChild, theme }) =>
    isInstitutionalChild
      ? `
  ${EyebrowWrapper} {
      img {
        height: 40px;
        width: auto;
        margin: 0 !important;
      }
    }
  `
      : ``}
  ${({ isCustody, theme }) =>
    isCustody
      ? `
    background-position: 100% 50%;
    background-size: auto 400px;
    
    ${EyebrowWrapper} {
      img {
        width: 224px;
        height: auto;
      }
    }
    
    @media (max-width: ${theme.device.tabletMediaMax}){
      margin-top: 39px;
      background-position: 50% 0%;
      background-size: 382px;
      ${EyebrowWrapper} {
        img {
          margin: 0 auto;
        }
      }
      
      ${HeroTitle} {
        padding-top: 10px;
      }
      
      ${HeroImageTextContainer} {
        padding-top: 42px;
        background-image: ${theme.background.isCustodyOverlayHero} !important;

      }
    }
    @media (max-width: ${theme.device.mobileMediaMax}){
      background-size: 250px;
    }
  `
      : ''}

  ${({ isThankYou, theme }) =>
    isThankYou
      ? `
    max-width: 500px;
    margin: 0 auto!important;
    
     @media (min-width: ${theme.device.mobile}){
      ${EyebrowWrapper} {
        img {
          width: 376px;
          height: auto;
          margin: 0 auto;
        }
      }
  `
      : ''}

  ${({ reverse, theme }) =>
    reverse
      ? `
    flex-direction: row-reverse;
    background-position: 0% 0%;
    @media (max-width: ${theme.device.tabletMediaMax}){
      flex-direction: column;
    }
  `
      : ''}
  
`

const HeroImageTextContainer = styled.div`
  display: block;
  position: relative;

  ${({ sideImageFlex }) =>
    sideImageFlex
      ? `
  flex: 1;
  min-width: 0;
  `
      : ''}
  ${({ isHome, theme }) =>
    isHome
      ? `
  @media (min-width: ${theme.device.miniDesktop}){
    margin-top: 50px;
  }
  `
      : ''}

  ${({ center, theme }) =>
    center
      ? `
  @media (min-width: ${theme.device.tablet}){
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  `
      : ''}

  ${({ isStyleHubspot }) =>
    isStyleHubspot
      ? `
  width: auto;
  flex: 1;
  min-width: 0;
  `
      : ''}

  ${({ headlineBorderBottom }) =>
    headlineBorderBottom
      ? `
  width: 100%;
  `
      : ''}
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}){
    margin-top: -5px;
    padding-top: 0px;
    text-align: center;
  }

`

const HeroTitle = styled.h1`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.xxxl}rem;
  line-height: 1.2;
  padding-top: 20px;
  padding-bottom: 20px;
  
  ${({ hideHeadline }) =>
    hideHeadline
      ? `
    display: none;
  `
      : ''}

  ${({ fontSize }) =>
    fontSize
      ? `
      font-size: ${fontSize} !important;
  `
      : ''}

  ${({ isFaq }) =>
    isFaq
      ? `
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  `
      : ''}
  
  ${({ isFlask }) =>
    isFlask
      ? `
    font-size: 50px !important;
    font-weight: bold;
    line-height: 1.2;
    width: 100%;
    max-width: 665px;
    margin-left: auto;
    margin-right: auto;
  `
      : ''}

  ${({ headlineBorderBottom }) =>
    headlineBorderBottom
      ? `
      padding-bottom: 28px;
      border-bottom: 1px solid #a8a8a8;
      text-align: left;
  `
      : ''}
  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    font-size: 46px;
  }
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    font-size: 34px !important;
    line-height: 43px;
  }
`

const HeroDescription = styled.div`
  display: block;
  margin-bottom: 24px;

  ${({ isFaq }) =>
    isFaq
      ? `
    color: #727272;
  `
      : ''}
`

const HeroSideImage = styled.div`
  display: block;
  height: 400px;

  ${({ sideImageFlex }) =>
    sideImageFlex
      ? `
    display: flex;
    height: auto !important;
    align-items: center;
    justify-content: center;
  `
      : ''}

  ${({ isStyleHubspot }) =>
    isStyleHubspot
      ? `
    width: 58.33%;
  `
      : ''}

  ${({ isFlask, theme }) =>
    isFlask
      ? `
    height: auto;
    width: 100%;
    max-width: 960px;
    
  `
      : ''}
  .sideImageOverflow & {
    img {
      filter: drop-shadow(-15px 15px 24px rgba(0, 0, 0, 0.05)) drop-shadow(-3px 3px 10px rgba(0, 0, 0, 0.07));
      border-radius: 5px;
    }
    @media (min-width: ${({ theme }) => theme.device.desktop}) {
      min-width: 62%;
    }
  }

  .sideImageFlex45 & {
    
    @media (min-width: ${({ theme }) => theme.device.desktop}) {
      width: 45%;
    }
  }
  .sideImageFlex40 & {
    
    @media (min-width: ${({ theme }) => theme.device.desktop}) {
      width: 40%;
    }
  }
  @media (min-width: ${({ theme }) => theme.device.desktop}) {
    padding: 0 !important;
  }
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    height: 220px;
    margin-bottom: 10px;
    padding-bottom: 0;
    width: 100%;
  }
`

const HeroCTA = styled.div`
  display: flex;
  flex-flow: wrap;

  .button {
    margin: 0 16px 16px 0;
  }

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    justify-content: center;

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
const LearnMoreWrapper = styled.div`
  display: block;
`

const LearnMoreInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
`

const Icon = styled.span`
  font-size: 20px;
`
const EyebrowWrapper = styled.div`
  display: block;

  ${({ hideHeadline }) =>
    hideHeadline
      ? `
    margin-bottom: 8px;
  `
      : ``}
  img {
    height: 80px;

    ${({ isMobileLogo, isFaq, theme }) =>
      isMobileLogo || isFaq
        ? `
        height: auto;
        margin-bottom: 10px;
      `
        : `
        @media (max-width: ${theme.device.tabletMediaMax}) {
          height: auto;
          margin: 0 auto 16px;
          width: 80%;
        }
      `}
    ${({ isFaq }) =>
      isFaq
        ? `
        margin-bottom: 0;
    `
        : ''}
  }
`

const FavIconContainer = styled(Section)`
  padding-top: 0 !important;
  padding-bottom: 0 !important;
`

const FavIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0 8px 0;
`

const FavIcon = styled.img`
  width: 40px;
`
const HubSpotDefault = styled.div`
  display: block;
`
const EyebrowText = styled.div`
  font-size: 18px;
  line-height: 140.62%;
  font-weight: bold;
  text-transform: uppercase;
  color: ${({ theme }) => theme.eyebrowHero};
`
const BackgroundImageContain = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    width: 100%;
  }
`
