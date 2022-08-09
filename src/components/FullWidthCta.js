import PropTypes from 'prop-types'
import React from 'react'
import styled, { withTheme } from 'styled-components'
import ContentWrapper from './ContentWrapper'
import Loadable from '@loadable/component'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import { Section, SectionTitle } from './StyledGeneral'
import classnames from 'classnames'

const LogoAnimation = Loadable(() => import('./LogoAnimation/'))

const FullWidthCta = props => {
  const {
    ctas,
    hubSpotForm,
    description,
    showLogoAnimation,
    backgroundColor,
    headline,
    marginBottom,
    logoType,
    sectionPadding,
    customClass,
  } = props

  return (
    <Container
      sectionPadding={sectionPadding}
      className={classnames({
        [`bg-${backgroundColor}`]: backgroundColor,
      })}
    >
      <ContentWrapper customClass={customClass}>
        <FullWidthCtaWrapper showLogoAnimation={showLogoAnimation}>
          {showLogoAnimation && customClass !== 'metaMaskUninstalled' ? (
            <LogoAnimation logoType={logoType} />
          ) : null}
          <FullWidthCtaInner
            marginBottom={marginBottom}
            backgroundColor={backgroundColor}
          >
            {headline ? (
              <Headline
                backgroundColor={backgroundColor}
                showLogoAnimation={showLogoAnimation}
                hasDescription={!!description}
              >
                {headline}
              </Headline>
            ) : null}
            {description ? (
              <Description>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </Description>
            ) : null}
            {hubSpotForm ? (
              <>{contentfulModuleToComponent(hubSpotForm)}</>
            ) : null}
            {showLogoAnimation && customClass == 'metaMaskUninstalled' ? (
              <LogoAnimation logoType={logoType} />
            ) : null}
            {ctas ? (
              <CTAWrapper>
                {ctas.map(cta =>
                  contentfulModuleToComponent({
                    ...cta,
                  })
                )}
              </CTAWrapper>
            ) : null}
          </FullWidthCtaInner>
        </FullWidthCtaWrapper>
      </ContentWrapper>
    </Container>
  )
}

export default withTheme(FullWidthCta)

FullWidthCta.propTypes = {
  hubSpotForm: PropTypes.object,
  headline: PropTypes.string,
  description: PropTypes.string,
  ctas: PropTypes.arrayOf(PropTypes.object),
  sectionPadding: PropTypes.string,
}

const Container = styled(Section)`
  display: block;
`

const FullWidthCtaWrapper = styled.div`
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
      : ``}

  ${({ showLogoAnimation }) => (showLogoAnimation ? 'padding-top: 0;' : '')}

  ${({ hasDescription }) =>
    hasDescription ? 'font-size: 32px !important;' : ''}
`

const FullWidthCtaInner = styled.div`
  display: block;

  .metaMaskUninstalled & {
    #logo-container{
      padding: 24px 0;
      @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
        padding: 0;
      }
    }
  }

  ${({ backgroundColor, theme }) =>
    backgroundColor === 'dark'
      ? `
    color: ${theme.white};
  `
      : ``}

  ${({ marginBottom }) =>
    marginBottom
      ? `
    margin-bottom: ${marginBottom};
  `
      : ''}

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}){
  margin-bottom: 0;
}
`
const CTAWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  margin-top: 32px;
  justify-content: center;
  
  .button {
    margin: 0 8px 16px;
  }

  .metaMaskUninstalled & {
    flex-direction: column;
    .button{
      margin: 0 8px 16px;
      max-width: 327px;
      margin-left: auto;
      margin-right: auto;
      width: 100%;
    }
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      margin-top: 16px;
      margin-bottom: 16px;
      .button{
        max-width: 273px;
      }
    }
  }

  ${({ showLogoAnimation, theme }) =>
    showLogoAnimation
      ? `
      @media (max-width: ${theme.device.mobileMediaMax}) {
        width: 100%;
      }
  `
      : ``}

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}){
  .button {
    width: 100%;
    margin: 0 0 16px 0;
  }
}
`

const Description = styled.div`
  display: block;
  margin-top: 8px;
  & + ${CTAWrapper} {
    margin-top: 24px;
  }

  .metaMaskUninstalled & {
    p {
      font-size: 18px;
      line-height: 25px;
    }
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      h2 {
        font-size: 32px;
        padding: 0 32px;
      }
    }

    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      h2 {
        padding: 0;
      }
    }
  }
`
