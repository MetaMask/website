import PropTypes from 'prop-types'
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled, { withTheme } from 'styled-components'
import ContentWrapper from './ContentWrapper'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import { Section } from './StyledGeneral'
import classnames from 'classnames'
import Image from './Image'
import isEmpty from 'lodash/isEmpty'
import ContextClientSide from '../Context/ContextClientSide'
import Context from '../Context/ContextPage'
import Loadable from '@loadable/component'
import ParseMD from './ParseMD'
import GatsbyBackgroundImage from './GatsbyBackgroundImage'
import { MetaMaskContext } from '../Context/MetaMaskContextProvider'

const FoxAnimation = Loadable(() => import('./FoxAnimation/'))

const HeroContainerComponent = props => {
  const {
    backgroundImage,
    backgroundImageDarkMode,
    headline,
    headlinePortfolio,
    hideHeadline,
    description,
    descriptionPortfolio,
    note,
    sideImage,
    sideImagePortfolio,
    sideImageDarkMode,
    sideImagePortfolioDarkMode,
    learnMoreText,
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
    sideImageFoxAnimation,
    isFaq,
    sectionPadding,
    customClass,
    previewMode = false,
  } = props

  const { isMetaMaskInstalled } = useContext(MetaMaskContext)
  const { darkMode: darkModeContextValue } = useContext(ContextClientSide)
  const { isDarkMode } = darkModeContextValue || {}

  const isHome = customClass?.includes('page-home')
  const isAbout = customClass?.includes('page-about')
  const isFlask = customClass?.includes('page-flask')
  const isSDK = customClass?.includes('page-sdk')
  const isInstitutions = customClass?.includes('page-institutions')
  const isInstitutionalChild = customClass?.includes('page-institutional-child')
  const isThankYou = customClass?.includes('page-thank-you')

  let hubspotWrapper
  if (hubSpotForm) {
    hubspotWrapper = (
      <HubSpotDefault>
        {contentfulModuleToComponent({
          ...hubSpotForm,
          previewMode,
        })}
      </HubSpotDefault>
    )
  }

  const isStyleHubspot = hubSpotForm
  const isStyleCenterSimple = contentAlignment === 'center' && !sideImage

  let heroTitleFontsize = ''
  if (isStyleHubspot) {
    heroTitleFontsize = '16px'
  } else if (
    (contentAlignment === 'center' || headlineBorderBottom) &&
    !isThankYou
  ) {
    heroTitleFontsize = '30px'
  }

  const { heroContainer: heroContainerREF } = useContext(Context)
  const { heroContainerRef } = heroContainerREF || {}

  const sdkRef = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (isSDK && sdkRef.current) {
      handleWindowSizeChange()
      window.addEventListener('resize', handleWindowSizeChange)
      return () => {
        window.removeEventListener('resize', handleWindowSizeChange)
      }
    }
  }, [isSDK, sdkRef])

  const handleWindowSizeChange = () => {
    setHeight(sdkRef.current.clientHeight + 48)
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
        $isThankYou={isThankYou}
        sectionPadding={sectionPadding || ''}
        headlineBorderBottom={headlineBorderBottom}
        isStyleCenterSimple={isStyleCenterSimple}
        showFavIcon={showFavIcon}
        image={
          !isThankYou &&
          (isDarkMode && backgroundImageDarkMode
            ? backgroundImageDarkMode
            : backgroundImage)
        }
        ref={heroContainerRef}
        className={classnames({
          [`bg-${backgroundColor}`]: backgroundColor,
          [`custom-${customClass}`]: customClass,
        })}
      >
        <GatsbyBackgroundImage
          image={!isThankYou && backgroundImage}
          imageDarkMode={!isThankYou && backgroundImageDarkMode}
          previewMode={previewMode}
          absolute
        >
          {isThankYou && backgroundImage ? (
            <BackgroundImageContain>
              <Image
                alt={headline}
                image={backgroundImage}
                darkImage={backgroundImageDarkMode}
                previewMode
              />
            </BackgroundImageContain>
          ) : null}
          <ContentWrapper customClass={customClass}>
            <HeroContentContainer
              isStyleCenterSimple={isStyleCenterSimple}
              contentAlignment={contentAlignment}
              isAbout={isAbout}
              reverse={contentAlignment === 'right'}
              center={sideImageFlex}
              isInstitutions={isInstitutions}
              isFlask={isFlask}
              isSDK={isSDK}
              isInstitutionalChild={isInstitutionalChild}
              $isThankYou={isThankYou}
            >
              <GatsbyBackgroundImage
                image={
                  !isStyleHubspot &&
                  !sideImageFlex &&
                  !isFlask &&
                  !isSDK &&
                  sideImage
                }
                imageDarkMode={
                  !isStyleHubspot &&
                  !sideImageFlex &&
                  !isFlask &&
                  !isSDK &&
                  sideImageDarkMode
                }
                previewMode={previewMode}
              >
                <HeroImageTextContainer
                  isStyleHubspot={isStyleHubspot}
                  isHome={isHome}
                  headlineBorderBottom={headlineBorderBottom}
                  center={!sideImageFlex && !isHome}
                  sideImageFlex={sideImageFlex}
                  isSDK={isSDK}
                >
                  {eyebrowLogo ? (
                    <EyebrowWrapper
                      className={classnames({
                        'hidden-mobile': eyebrowMobileLogo,
                      })}
                      hideHeadline={hideHeadline}
                      isFaq={isFaq}
                    >
                      {contentfulModuleToComponent(
                        eyebrowLogoDarkMode && isDarkMode
                          ? {
                              ...eyebrowLogoDarkMode,
                              cleanStyle: true,
                              previewMode,
                            }
                          : {
                              ...eyebrowLogo,
                              cleanStyle: true,
                              previewMode,
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
                              previewMode,
                            }
                          : {
                              ...eyebrowMobileLogo,
                              cleanStyle: true,
                              previewMode,
                            }
                      )}
                    </EyebrowWrapper>
                  ) : null}
                  {eyebrow ? (
                    <EyebrowText isSDK={isSDK}>{eyebrow}</EyebrowText>
                  ) : null}
                  {headline && (
                    <HeroTitle
                      headlineBorderBottom={headlineBorderBottom}
                      hideHeadline={hideHeadline}
                      fontSize={heroTitleFontsize}
                      isFaq={isFaq}
                      isFlask={isFlask}
                      isSDK={isSDK}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: isMetaMaskInstalled
                            ? headlinePortfolio
                            : headline,
                        }}
                      />
                    </HeroTitle>
                  )}
                  {sideImage && isSDK && !sideImageFoxAnimation ? (
                    <HeightSlide height={height} isSDK={isSDK}>
                      <HeroSideImage
                        sideImageFlex={sideImageFlex}
                        isSDK={isSDK}
                        ref={sdkRef}
                      >
                        <Image
                          image={sideImage}
                          darkImage={sideImageDarkMode}
                          previewMode={previewMode}
                        />
                      </HeroSideImage>
                    </HeightSlide>
                  ) : null}
                  {description && (
                    <HeroDescription isFaq={isFaq}>
                      {previewMode ? (
                        <ParseMD>
                          {isMetaMaskInstalled
                            ? descriptionPortfolio
                            : description}
                        </ParseMD>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: isMetaMaskInstalled
                              ? descriptionPortfolio
                              : description,
                          }}
                        />
                      )}
                    </HeroDescription>
                  )}
                  {!isEmpty(ctas) && !isFlask ? (
                    <HeroCTA>
                      {ctas.map(cta =>
                        contentfulModuleToComponent({
                          ...cta,
                          buttonSize: 'hero',
                          previewMode,
                        })
                      )}
                    </HeroCTA>
                  ) : null}
                  {note && <HeroNote>{note}</HeroNote>}
                  {hubspotWrapper ? hubspotWrapper : null}
                </HeroImageTextContainer>
                {(sideImage || sideImageFoxAnimation) && !isSDK ? (
                  <HeroSideImage
                    sideImageFlex={sideImageFlex}
                    isStyleHubspot={isStyleHubspot}
                    sideImageFoxAnimation={sideImageFoxAnimation}
                    isFlask={isFlask}
                  >
                    {sideImageFoxAnimation ? <FoxAnimation /> : null}
                    {!sideImageFoxAnimation &&
                    (isStyleHubspot || sideImageFlex || isFlask) ? (
                      <Image
                        image={
                          isMetaMaskInstalled ? sideImagePortfolio : sideImage
                        }
                        darkImage={
                          isMetaMaskInstalled
                            ? sideImagePortfolioDarkMode
                            : sideImageDarkMode
                        }
                        lazyLoad={!isInstitutions}
                        previewMode={previewMode}
                      />
                    ) : null}
                  </HeroSideImage>
                ) : null}
                {!isEmpty(ctas) && isFlask ? (
                  <HeroCTA>
                    {ctas.map(cta =>
                      contentfulModuleToComponent({
                        ...cta,
                        buttonSize: 'hero',
                        previewMode,
                      })
                    )}
                  </HeroCTA>
                ) : null}
              </GatsbyBackgroundImage>
            </HeroContentContainer>
          </ContentWrapper>
        </GatsbyBackgroundImage>
      </HeroContainer>
      {learnMoreText ? (
        <ContentWrapper>
          <LearnMoreWrapper>
            <LearnMoreInner className="text-block">
              {learnMoreText}
              <Icon className="w-icon w-icon-dropdown-toggle" />
            </LearnMoreInner>
          </LearnMoreWrapper>
        </ContentWrapper>
      ) : null}
    </>
  )
}

export default withTheme(HeroContainerComponent)

HeroContainerComponent.propTypes = {
  backgroundImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  backgroundImageDarkMode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  eyebrowLogo: PropTypes.object,
  eyebrowMobileLogo: PropTypes.object,
  sideImage: PropTypes.object,
  hubSpotForm: PropTypes.object,
  headline: PropTypes.string,
  description: PropTypes.string,
  contentAlignment: PropTypes.string,
  hideHeadline: PropTypes.bool,
  learnMoreText: PropTypes.string,
  showFavIcon: PropTypes.bool,
  sideImageFoxAnimation: PropTypes.bool,
  sectionPadding: PropTypes.string,
  previewMode: PropTypes.bool,
}

const HeroContainer = styled(Section)`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  min-width: 100%;
  transition: all 0.5s ease;
  overflow: hidden;
  &.custom-newsHero + div{
    padding-top: 64px !important;
    padding-bottom: 0;
  }

  ${({ $isThankYou }) =>
    $isThankYou
      ? `
  z-index: 5;
  `
      : ``}

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
    &.custom-newsHero.bg-default:not(.noPaddingBottom) + div{
      padding-top: 64px !important;
    }
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
      padding-bottom: ${sectionPadding};
  `
      : ``}

  &.removePaddingBottomOnMobile {
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}){
      padding-bottom: 0;
    }
  }
`

const HeroContentContainer = styled.div`
  display: flex;
  margin: -10px;
  margin-top: 10px;

  ${({ center }) =>
    center
      ? `
    align-items: center;

    img {
      margin: 0 auto;
    }
  `
      : ''}

  ${({ isAbout }) =>
    isAbout
      ? `
    .gatsby-bg__content {
      display: flex;
      > * {
        width: 50%;
        padding: 10px;
      }
    }
    .gatsby-bg__wrapper {
      background-position: 100% 0%;
      background-size: 50%;
      background-repeat: no-repeat;
    }
    ${HeroImageTextContainer} {
      padding-top: 0;
      padding-bottom: 0;
    }
  `
      : `
      & > * {
        width: 50%;
        padding: 10px;
      }
      `}

  ${({ isSDK }) =>
    isSDK
      ? `
    margin-bottom: 64px;
  `
      : ''}

  ${({ contentAlignment }) =>
    contentAlignment === 'center'
      ? `
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    ${HeroCTA} {
      justify-content: center;

      .button {
        margin: 0 8px 16px;
      }
    }

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

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    flex-direction: column;
    padding-bottom: 0;
    transition: all 0.5s ease;
    .gatsby-bg__wrapper {
      background-position: 50% 0%;
      background-size: 90%;
      background-attachment: scroll;
    }
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
    .gatsby-bg__content {
      flex-direction: column;
      & > * {
        width: 100%;
      }
    }

    & > * {
      width: 100%;
    }

    ${({ isInstitutions }) =>
      isInstitutions
        ? `
      flex-direction: column;
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

        .mmi-fireblocks-hero & {
          height: 30px;
        }
      }
    }

    @media (max-width: ${theme.device.tabletMediaMax}){
      ${EyebrowWrapper} {
        img {
          margin: 16px auto !important;

          .mmi-fireblocks-hero & {
            margin: 16px 0 0 0 !important;
          }
        }
      }
    }
  `
      : ``}

  ${({ $isThankYou, theme }) =>
    $isThankYou
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
  .hero-snaps & ,
  .hero-developer & {
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}){
      flex-direction: column-reverse;
    }
  }
`

const HeroImageTextContainer = styled.div`
  display: block;
  position: relative;
  transition: all 0.5s ease;
  z-index: 1;

  .contentWidth70 & {
    @media (min-width: ${({ theme }) => theme.device.tablet}) {
      width: 70%;
      img {
        width: 50%;
      }
    }
  }
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

  ${({ isSDK }) =>
    isSDK
      ? `
    position: inherit
  `
      : ''}
`

const HeroTitle = styled.h1`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.xxxl}rem;
  line-height: 1.2;
  padding-top: 20px;
  padding-bottom: 20px;
  transition: all 0.5s ease;

  .newsHero & {
    font-size: 40px !important;
    line-height: 1.2;
  }
  .headline-max-width-754 & {
    max-width: 754px;
  }
  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    .newsHero & {
      font-size: 30px !important;
      line-height: 32px;
      padding-bottom: 8px;
    }
  }

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

  ${({ isFlask, isSDK }) =>
    isFlask || isSDK
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

  .titleFontSize64 & {
    @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
      font-size: 64px;
    }
  }

  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    font-size: 46px;
  }
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    font-size: 34px !important;
    line-height: 43px;
  }
  @media (min-width: ${({ theme }) => theme.device.desktop}) {
    .mmi-fireblocks-access-hero & {
      width: 480px;
    }
    .mmi-fireblocks-hero & {
      width: 540px;
    }
  }
`

const HeroDescription = styled.div`
  display: block;
  margin-bottom: 24px;

  .newsHero & {
    font-size: 20px;

    a {
      color: #535a61;
      body.dark-mode & {
        color: ${({ theme }) => theme.white};
      }

      svg {
        margin-right: 16px;
        path {
          fill: #535a61;
          body.dark-mode & {
            fill: ${({ theme }) => theme.white};
          }
          transition: all ease 0.5s;
        }
      }

      &:hover {
        color: ${({ theme }) => theme.primaryColor} !important;

        svg {
          path {
            fill: ${({ theme }) => theme.primaryColor} !important;
          }
        }
      }
      transition: all ease 0.5s;
    }
  }

  .contentMaxWidth480 & {
    @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
      max-width: 480px;
    }
  }

  .mmi-fireblocks-hero & {
    @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
      width: 500px;
    }
  }

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

  .gatsby-image-wrapper {
    overflow: visible;
  }

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

  ${({ isFlask }) =>
    isFlask
      ? `
    height: auto;
    width: 100%;
    max-width: 960px;

  `
      : ''}

  ${({ isSDK }) =>
    isSDK
      ? `
    height: auto;
    margin-top: 24px;
    margin-bottom: 24px;
    width: 100vw;
    position: absolute;
    left: 0;
  `
      : ''}

  .sideImageOverflow &,
  .sideImageOverflowRight & {
    img {
      filter: drop-shadow(-15px 15px 24px rgba(0, 0, 0, 0.05)) drop-shadow(-3px 3px 10px rgba(0, 0, 0, 0.07));
      border-radius: 5px;
    }

    @media (min-width: ${({ theme }) =>
      theme.device.miniDesktop}) and (max-width: ${({ theme }) =>
  theme.device.twoKResolutionMax}) {
        min-width: 62%;

        .sideImageMinWidth50 & {
          min-width: 50%;
        }
      }

    @media (max-width: ${({ theme }) =>
      theme.device.tablet}) and (max-width: ${({ theme }) =>
  theme.device.miniDesktopMediaMax}) {
        min-width: 60%;
      }

    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      margin-right: -40px;
      width: calc(100% + 40px);

      .removeOverflowBelowMd & {
        margin-right: unset;
        width: 100%;
      }
    }
  }
  .sideImageMobileOverflowHiddenBottom100 & {
    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      margin-bottom: -100px;
    }
  }

  @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
    .mmi-fireblocks-access-hero & img {
      padding-left: 60px;
    }
    .mmi-fireblocks-hero & img {
      padding-left: 120px;
    }
  }

  .removeShadowAndRadius & img {
    filter: none;
    border-radius: 0;
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

  .sideImageFlex35 & {
    @media (min-width: ${({ theme }) => theme.device.desktop}) {
      width: 35%;
    }
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      width: 50%;
    }
    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      width: 100%;
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

    ${({ sideImageFoxAnimation }) =>
      sideImageFoxAnimation
        ? `
        height: 320px !important;
    `
        : ''}
  }

  .sideImageLeft70 & {
    @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
      position: relative;
      left: 70px;
    }
  }

  .hasShadow & img {
    filter: drop-shadow(-16.1252px 16.1252px 25.8003px rgba(0, 0, 0, 0.05)) drop-shadow(-3.22503px 3.22503px 10.7501px rgba(0, 0, 0, 0.07));
  }
  .imagePl40 & img {
    @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
      padding-left: 40px;
    }
  }
  .hero-snaps & {
    width: 40%;
  }
`

const HeightSlide = styled.div`
  display: block;

  ${({ height }) =>
    height
      ? `
    height: ${height}px
  `
      : ''}
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
    display: inline-flex;
    flex-direction: column;
    a {
      padding: 8px 40px;
    }
    .ctaMobileFullWidth & {
      display: flex;
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

  .logoHeight40 & {
    img {
      height: 40px;
      width: auto;
      margin: unset;
    }
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

  ${({ isSDK, theme }) =>
    isSDK
      ? `
        color: ${theme.orange};
    `
      : ''}
`

const BackgroundImageContain = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  .gatsby-image-wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    width: 100%;
  }
`

const HeroNote = styled.p`
  font-style: italic;
  font-size: 12px;
  color: ${({ theme }) => theme.darkGray};
  margin-bottom: 0;
`
