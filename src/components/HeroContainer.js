import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import ContentWrapper from './ContentWrapper'
import { useLocation } from '@reach/router'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import CTA from './CTA'
import Popup from './Popup'
import { Section } from './StyledGeneral'
import classnames from 'classnames'

const HeroContainerComponent = props => {
  const {
    backgroundImage,
    headline,
    hideHeadline,
    description,
    sideImage,
    showLearnMore,
    eyebrowLogo,
    eyebrowMobileLogo,
    showFavIcon,
    hubSpotForm,
    ctaText,
    ctaLink,
    contentAlignment,
    backgroundColor,
    headlineBorderBottom,
  } = props
  const [showPopup, setShowPopup] = React.useState(false)
  const togglePopup = () => {
    setShowPopup(!showPopup)
  }
  const onClosePopup = () => {
    setShowPopup(false)
  }
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isAbout = location.pathname === '/about/'
  let hubspotWrapper
  if (hubSpotForm) {
    hubspotWrapper = ctaText ? (
      <Popup
        width={hubSpotForm.width}
        showPopup={showPopup}
        onClosePopup={onClosePopup}
      >
        {contentfulModuleToComponent({
          ...hubSpotForm,
          width: '100%',
        })}
      </Popup>
    ) : (
      <HubSpotDefault>
        {contentfulModuleToComponent({
          ...hubSpotForm,
        })}
      </HubSpotDefault>
    )
  }
  const isStyleHubspot = hubSpotForm && !ctaText
  const isStyleCenterSimple = contentAlignment === 'center' && !sideImage
  let heroTitleFontsize = ''
  if (isStyleHubspot) {
    heroTitleFontsize = '16px'
  } else if (contentAlignment === 'center' || headlineBorderBottom) {
    heroTitleFontsize = '30px'
  }

  return (
    <>
      {showFavIcon ? (
        <Section>
          <ContentWrapper>
            <FavIconWrapper>
              <FavIcon src={'/images/metamask-logo.png'} alt="logo" />
            </FavIconWrapper>
          </ContentWrapper>
        </Section>
      ) : null}
      <HeroContainer
        headlineBorderBottom={headlineBorderBottom}
        isStyleCenterSimple={isStyleCenterSimple}
        image={backgroundImage}
        className={classnames({
          [`bg-${backgroundColor}`]: backgroundColor,
        })}
      >
        <ContentWrapper>
          <HeroContentContainer
            isStyleCenterSimple={isStyleCenterSimple}
            contentAlignment={contentAlignment}
            bgSrc={!isStyleHubspot ? sideImage : ''}
            isAbout={isAbout}
          >
            <HeroImageTextContainer
              isStyleHubspot={isStyleHubspot}
              isHome={isHome}
              headlineBorderBottom={headlineBorderBottom}
            >
              {eyebrowLogo ? (
                <EyebrowWrapper
                  className={'hidden-mobile'}
                  hideHeadline={hideHeadline}
                >
                  {contentfulModuleToComponent({
                    ...eyebrowLogo,
                    cleanStyle: true,
                  })}
                </EyebrowWrapper>
              ) : null}
              {eyebrowMobileLogo ? (
                <EyebrowWrapper
                  className={'hidden-desktop'}
                  hideHeadline={hideHeadline}
                >
                  {contentfulModuleToComponent({
                    ...eyebrowMobileLogo,
                    cleanStyle: true,
                  })}
                </EyebrowWrapper>
              ) : null}
              {headline && (
                <HeroTitle
                  headlineBorderBottom={headlineBorderBottom}
                  hideHeadline={hideHeadline}
                  fontSize={heroTitleFontsize}
                >
                  {' '}
                  {headline}{' '}
                </HeroTitle>
              )}
              {description && (
                <HeroDescription>
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </HeroDescription>
              )}
              {ctaText ? (
                <HeroCTA>
                  <CTA
                    text={ctaText}
                    link={ctaLink}
                    button={true}
                    buttonSize="hero"
                    customClick={hubSpotForm ? () => togglePopup() : null}
                  />
                </HeroCTA>
              ) : null}
              {hubspotWrapper ? hubspotWrapper : null}
            </HeroImageTextContainer>
            {sideImage ? (
              <HeroSideImage isStyleHubspot={isStyleHubspot}>
                {isStyleHubspot ? (
                  <img src={sideImage} alt="hero hubspot" />
                ) : null}
              </HeroSideImage>
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
  sideImage: PropTypes.string,
  hubSpotForm: PropTypes.object,
  headline: PropTypes.string,
  description: PropTypes.string,
  ctaText: PropTypes.string,
  ctaLink: PropTypes.string,
  contentAlignment: PropTypes.string,
  hideHeadline: PropTypes.bool,
  showLearnMore: PropTypes.bool,
  showFavIcon: PropTypes.bool,
}

const HeroContainer = styled(Section)`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  min-width: 100%;
  background-color: ${({ theme }) => theme.primaryColor};
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
    padding-top: 0 !important;
  }
`

const HeroContentContainer = styled.div`
  display: flex;
  margin: -10px;
  margin-top: 10px;
  & > * {
    width: 50%;
    padding: 10px;
  }

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
    justify-content: center;
    text-align: center;
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
    & > * {
    width: 100%;
  }
  }
`

const HeroImageTextContainer = styled.div`
  display: block;
  position: relative;
  ${({ isHome, theme }) =>
    isHome
      ? `
  @media (min-width: ${theme.device.miniDesktop}){
    margin-top: 50px;
  }
  `
      : ''}

  ${({ isStyleHubspot, theme }) =>
    isStyleHubspot
      ? `
  width: auto;
  flex: 1;
  min-width: 0;
  `
      : ''}

  ${({ headlineBorderBottom, theme }) =>
    headlineBorderBottom
      ? `
  width: 100%;
  `
      : ''}
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}){

    margin-top: -5px;
    padding-top: 0px;
    background-image: -webkit-gradient(linear, left top, left bottom, from(hsla(0, 0%, 100%, 0)), color-stop(11%, #fff));
    background-image: linear-gradient(
  180deg
  , hsla(0, 0%, 100%, 0), #fff 11%);
    text-align: center;
  }

`

const HeroTitle = styled.h1`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-size: ${({ theme }) => theme.font.size.xxxl}rem;
  line-height: 1.1;
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
`

const HeroSideImage = styled.div`
  display: block;
  height: 400px;

  ${({ isStyleHubspot }) =>
    isStyleHubspot
      ? `
    width: 58.33%;
  `
      : ''}
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
  display: block;
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
  }
`
const FavIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0 0 0;
`

const FavIcon = styled.img`
  width: 40px;
`
const HubSpotDefault = styled.div`
  display: block;
`
