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
    embedHtml,
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
        [customClass]: customClass,
      })}
    >
      <ContentWrapper>
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
            {showLogoAnimation && customClass === 'metaMaskUninstalled' ? (
              <LogoAnimation logoType={logoType} />
            ) : null}
            {hubSpotForm ? (
              <>{contentfulModuleToComponent(hubSpotForm)}</>
            ) : null}
            {embedHtml ? (
              <>{contentfulModuleToComponent(embedHtml)}</>
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
  embedHtml: PropTypes.object,
  headline: PropTypes.string,
  description: PropTypes.string,
  ctas: PropTypes.arrayOf(PropTypes.object),
  sectionPadding: PropTypes.string,
}

const Container = styled(Section)`
  display: block;
  &.metaMaskUninstalled {
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      padding: 24px 0;
    }
  }
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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    #logo-container{
      width: 30%;
      padding: 24px 0 8px 0;
      @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
        padding: 24px 0;
        display: none;
      }
    }
    #take-a-moment-to-share-why-youre-uninstalling-meta-mask {
      width: 60%;
      background-color: #F2F4F6;
      border-radius: 8px;
      padding-bottom: 32px;
      margin-left: auto;
      .dark-mode & {
        background-color: ${({ theme }) => theme.text.dark};
      }
      .uninstallSurvey {
        padding: 32px;
        border-radius: 8px;
        text-align: left;
        background-color: #F2F4F6;
        .dark-mode & {
          background-color: ${({ theme }) => theme.text.dark};
        }
        > div {
          padding-bottom: 16px;
          display: flex;
        }
        h6 {
          margin-top: 0;
          margin-bottom: 16px;
        }
        label {
          font-size: 16px;
          line-height: 24px;
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: flex-start;
          &:before {
            content: '';
            -webkit-appearance: none;
            background-color: transparent;
            border: 1px solid #BBC0C5;
            width: 20px;
            height: 20px;
            display: inline-block;
            position: relative;
            vertical-align: middle;
            cursor: pointer;
            margin-right: 8px;
            border-radius: 6px;
            margin-top: 2px;
          }
        }
        input:checked + label:before { 
          background-color: #037DD6;
          border-color: #037DD6;
        }
        input:checked + label:after {
          content: '';
          display: block;
          position: absolute;
          top: 6px;
          left: 8px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        input[type=checkbox] {
          display: none;
        }
      }
      #submitSurvey {
        width: calc(100% - 64px);
        cursor: pointer;
        transition: all 0.3s ease;
        &:disabled {
          background-color: ${({ theme }) => theme.text.darkGray};
          cursor: not-allowed;
        }
        &:hover:disabled {
          opacity: 0.8;
        }
      }
      @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
        width: 100%;
        background-color: transparent;
        padding-bottom: 0;
        .dark-mode & {
          background-color: transparent;
        }
        .uninstallSurvey {
          padding: 24px 42px;
          h6 {
            text-align: center;
          }
        }
        .buttonSurvey {
          padding: 40px 0 20px 0;
        }
      }
      @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
        .uninstallSurvey {
          padding: 24px;
        }
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

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
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

    .button {
      max-width: 327px;
      margin: 0 auto 16px;
      width: 100%;
    }

    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      margin-top: 16px;
      margin-bottom: 16px;
      .button {
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
  
  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
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
    margin-bottom: 32px;
    p {
      font-size: 18px;
      line-height: 25px;
      max-width: 75%;
      margin-left: auto;
      margin-right: auto;
    }
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      h2 {
        font-size: 32px;
        padding: 0 32px;
      }
      p {
        max-width: 100%;
      }
    }

    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      h2 {
        padding: 0;
      }
    }
  }
`
