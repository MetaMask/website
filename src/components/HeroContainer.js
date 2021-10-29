import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import ContentWrapper from './ContentWrapper'
import { useLocation } from '@reach/router'
import { parseContentfulAssetUrl } from '../lib/utils/urlParser'

const HeroContainerComponent = props => {
  const {
    backgroundImage,
    CTA,
    headline,
    hideHeadline,
    description,
    sideImage,
    showLearnMore,
  } = props
  const location = useLocation()
  const isHome = location.pathname === '/'
  const imageUrl = parseContentfulAssetUrl(sideImage)
  return (
    <HeroContainer
      className="section"
      image={backgroundImage}
      showLearnMore={showLearnMore}
    >
      <ContentWrapper>
        <HeroContentContainer bgSrc={imageUrl}>
          <HeroImageTextContainer isHome={isHome}>
            {headline && (
              <HeroTitle hideHeadline={hideHeadline}> {headline} </HeroTitle>
            )}
            {description && (
              <HeroDescription>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </HeroDescription>
            )}
            <HeroCTA>{CTA}</HeroCTA>
          </HeroImageTextContainer>
          <HeroSideImage></HeroSideImage>
        </HeroContentContainer>
        {showLearnMore ? (
          <LearnMoreWrapper>
            <LearnMoreInner className="text-block">
              Learn More
              <Icon className="w-icon w-icon-dropdown-toggle"></Icon>
            </LearnMoreInner>
          </LearnMoreWrapper>
        ) : null}
      </ContentWrapper>
    </HeroContainer>
  )
}

export default withTheme(HeroContainerComponent)

HeroContainerComponent.propTypes = {
  backgroundImage: PropTypes.string,
  button: PropTypes.element,
  header: PropTypes.string,
  HeroImage: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  theme: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  modules: PropTypes.arrayOf(PropTypes.object.isRequired),
}

const HeroContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  min-width: 100%;
  padding: 0;
  background-color: ${({ theme }) => theme.primaryColor};
  ${({ image }) =>
    image
      ? ` background-image: url(${image});
    background-size: cover;
   `
      : ''}
  ${({ showLearnMore }) =>
    showLearnMore
      ? `padding-bottom: 0 !important;
    `
      : ''}
`

const HeroContentContainer = styled.div`
  display: flex;
  margin: -10px;
  margin-top: 10px;
  padding-bottom: 48px;
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

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}){
    flex-direction: column;
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
  ${({ isHome, theme }) =>
    isHome
      ? `
  @media (min-width: ${theme.device.miniDesktop}){
    margin-top: 50px;
  }
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
  @media (max-width: ${({ theme }) => theme.device.miniDesktopMediaMax}) {
    font-size: 46px;
  }
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    font-size: 34px;
    line-height: 43px;
  }
`

const HeroDescription = styled.div`
  display: block;
  margin-bottom: 24px;
`

const HeroSideImage = styled.div`
  display: block;
  min-height: 400px;
  @media (min-width: ${({ theme }) => theme.device.desktop}) {
    padding: 0 !important;
  }
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    min-height: 220px;
    margin-bottom: 10px;
    padding-bottom: 0;
  }
`

const HeroCTA = styled.div`
  display: block;
`
const LearnMoreWrapper = styled.div`
  padding-top: 48px;
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    padding: 24px 0;
  }
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
