import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import ContentWrapper from './ContentWrapper'
import CTA from './CTA'
import './logoMetaMaskAnimation'

const FullWidthCta = props => {
  const {
    ctaText,
    ctaLink,
    description,
    showLogoAnimation,
    backgroundColor,
    headline,
  } = props
  return (
    <Container backgroundColor={backgroundColor} className="section">
      <ContentWrapper>
        <FeatureWrapper>
          {showLogoAnimation ? <div id="logo-container"></div> : null}
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
                  link={ctaLink}
                  text={ctaText}
                  button={true}
                  buttonSize={'large'}
                />
              </CTAWrapper>
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

const Container = styled.div`
  display: block;
  padding: 50px 0;
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
`

const Headline = styled.h2`
  font-weight: ${({ theme }) => theme.font.weight.bold};
  ${({ backgroundColor, theme }) =>
    backgroundColor === 'dark'
      ? `
  color: ${theme.white};
  `
      : `
  color: ${theme.black};
  `}

  ${({ showLogoAnimation }) =>
    !showLogoAnimation
      ? `
  font-size: 32px;
  margin-top: 40px;
  `
      : ``}
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
`

const Description = styled.div`
  display: block;
  margin-top: 8px;
  & + ${CTAWrapper} {
    margin-top: 24px;
  }
`

