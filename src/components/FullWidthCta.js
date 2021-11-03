import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import ContentWrapper from './ContentWrapper'
import CTA from './CTA'
import Loadable from '@loadable/component'
import Popup from './Popup'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import { Section, SectionTitle } from './StyledGeneral'

const LogoAnimation = Loadable(() => import('./LogoAnimation'))
const FullWidthCta = props => {
  const {
    ctaText,
    ctaLink,
    description,
    showLogoAnimation,
    backgroundColor,
    headline,
    hubSpotForm,
  } = props

  const [showPopup, setShowPopup] = React.useState(false)
  const togglePopup = () => {
    setShowPopup(!showPopup)
  }
  const onClosePopup = () => {
    setShowPopup(false)
  }
  return (
    <Container backgroundColor={backgroundColor}>
      <ContentWrapper>
        <FeatureWrapper showLogoAnimation={showLogoAnimation}>
          {showLogoAnimation ? <LogoAnimation /> : null}
          <FeatureInner backgroundColor={backgroundColor}>
            {headline ? (
              <Headline
                backgroundColor={backgroundColor}
                showLogoAnimation={showLogoAnimation}
              >
                {headline}
              </Headline>
            ) : null}
            {description ? (
              <Description>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </Description>
            ) : null}
            {ctaText ? (
              <CTAWrapper>
                <CTA
                  link={hubSpotForm ? '' : ctaLink}
                  text={ctaText}
                  button={true}
                  buttonSize={'large'}
                  customClick={hubSpotForm ? () => togglePopup() : null}
                />
              </CTAWrapper>
            ) : null}
            {hubSpotForm ? (
              <Popup showPopup={showPopup} onClosePopup={onClosePopup}>
                {contentfulModuleToComponent({
                  ...hubSpotForm,
                })}
              </Popup>
            ) : null}
          </FeatureInner>
        </FeatureWrapper>
      </ContentWrapper>
    </Container>
  )
}

export default withTheme(FullWidthCta)

FullWidthCta.propTypes = {
  image: PropTypes.object,
  headline: PropTypes.string,
  description: PropTypes.string,
  modules: PropTypes.arrayOf(PropTypes.object.isRequired),
}

const Container = styled(Section)`
  display: block;
  padding-top: 48px !important;
  padding-bottom: 48px !important;
  ${({ backgroundColor, theme }) =>
    backgroundColor === 'dark'
      ? `
  background: ${theme.dark};
  `
      : `
  background: ${theme.white};
  `}
`

const FeatureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  ${({ showLogoAnimation, theme }) =>
    showLogoAnimation
      ? `
      @media (max-width: ${theme.device.mobileMediaMax}) {
        width: 100%;
        align-items: stretch;
      }
  `
      : ``}
`

const Headline = styled(SectionTitle)`
  ${({ backgroundColor, theme }) =>
    backgroundColor === 'dark'
      ? `
  color: ${theme.white};
  `
      : `
  color: ${theme.black};
  `}

  ${({ showLogoAnimation }) =>
    !showLogoAnimation ? 'font-size: 32px !important;' : 'padding-top: 0;'}
`
const FeatureInner = styled.div`
  display: block;
  color: #fff;
  ${({ backgroundColor, theme }) =>
    backgroundColor === 'dark'
      ? `
  color: ${theme.white};
  `
      : `
  color: ${theme.black};
  `}
`
const CTAWrapper = styled.div`
  margin-top: 32px;
  ${({ showLogoAnimation, theme }) =>
    showLogoAnimation
      ? `
      @media (max-width: ${theme.device.mobileMediaMax}) {
        width: 100%;
      }
  `
      : ``}
`

const Description = styled.div`
  display: block;
  margin-top: 8px;
  & + ${CTAWrapper} {
    margin-top: 24px;
  }
`
