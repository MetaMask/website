import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import styled, { withTheme } from 'styled-components'
import { useContentfulInspectorMode } from '@contentful/live-preview/react'
import ContentWrapper from './ContentWrapper'
import Loadable from '@loadable/component'
import { contentfulModuleToComponent } from '../lib/utils/moduleToComponent'
import { Section, SectionTitle } from './StyledGeneral'
import classnames from 'classnames'
import ParseMD from './ParseMD'
import getWebpImage from '../lib/utils/getWebpImage'
import ContextClientSide from '../Context/ContextClientSide'
import { useMediaQuery } from 'react-responsive'
import isEmpty from 'lodash/isEmpty'
import { MetaMaskContext } from '../Context/MetaMaskContextProvider'

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
    headlinePortfolio,
    marginBottom,
    logoType,
    sectionPadding,
    noPaddingTop,
    noPaddingBottom,
    customClass,
    previewMode = false,
    contentfulId,
    bordered,
    backgroundImage,
    backgroundImageMobile,
    backgroundImageDarkMode,
    backgroundImageMobileDarkMode,
    fullWidthBackground,
    headlineMarginTop0,
    moduleId,
  } = props

  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  })

  const { darkMode: darkModeContextValue } = useContext(ContextClientSide)
  const { isMetaMaskInstalled } = useContext(MetaMaskContext)
  const { isDarkMode } = darkModeContextValue || {}

  const inspectorProps = useContentfulInspectorMode()

  const resBgImage =
    isMobile && backgroundImageMobile ? backgroundImageMobile : backgroundImage
  const resBgImageDark =
    isMobile && backgroundImageMobileDarkMode
      ? backgroundImageMobileDarkMode
      : backgroundImageDarkMode
  const backgroundImageUrl = getWebpImage(
    previewMode ? resBgImage?.url : resBgImage?.file?.url
  )
  const backgroundImageDarkModeUrl = getWebpImage(
    previewMode ? resBgImageDark?.url : resBgImageDark?.file?.url
  )
  const bgImageUrl =
    isDarkMode && backgroundImageDarkModeUrl
      ? backgroundImageDarkModeUrl
      : backgroundImageUrl

  if (customClass?.includes('onlyShowOnMMInstalled') && isMetaMaskInstalled)
    return null

  return (
    <Container
      sectionPadding={sectionPadding}
      className={classnames({
        noPaddingBottom: noPaddingBottom,
        noPaddingTop: noPaddingTop,
        [`bg-${backgroundColor}`]: backgroundColor,
        [customClass]: customClass,
      })}
      id={moduleId}
      style={
        fullWidthBackground
          ? { backgroundImage: `url(${bgImageUrl})`, backgroundSize: 'cover' }
          : {}
      }
    >
      <ContentWrapper>
        <FullWidthCtaWrapper
          showLogoAnimation={showLogoAnimation}
          $bordered={bordered}
          $backgroundImage={!fullWidthBackground && bgImageUrl}
        >
          {showLogoAnimation && customClass !== 'metaMaskUninstalled' ? (
            <LogoAnimation logoType={logoType} />
          ) : null}
          <FullWidthCtaInner
            marginBottom={marginBottom}
            backgroundColor={backgroundColor}
            className="fullwidth-cta-inner"
          >
            {headline ? (
              <Headline
                backgroundColor={backgroundColor}
                showLogoAnimation={showLogoAnimation}
                hasDescription={!!description}
                headlineMarginTop0={headlineMarginTop0}
                {...(previewMode
                  ? inspectorProps({
                      entryId: contentfulId,
                      fieldId: 'headline',
                    })
                  : {})}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: isMetaMaskInstalled
                      ? headlinePortfolio ?? headline
                      : headline,
                  }}
                />
              </Headline>
            ) : null}
            {description ? (
              <Description
                {...(previewMode
                  ? inspectorProps({
                      entryId: contentfulId,
                      fieldId: 'description',
                    })
                  : {})}
              >
                {previewMode ? (
                  <ParseMD>{description}</ParseMD>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                )}
              </Description>
            ) : null}
            {showLogoAnimation && customClass === 'metaMaskUninstalled' ? (
              <LogoAnimation logoType={logoType} />
            ) : null}
            {hubSpotForm ? (
              <div
                id={'hubspot-container'}
                {...(previewMode
                  ? inspectorProps({
                      entryId: contentfulId,
                      fieldId: 'hupSpotForm',
                    })
                  : {})}
              >
                {contentfulModuleToComponent({ ...hubSpotForm, previewMode })}
              </div>
            ) : null}
            {embedHtml ? (
              <div
                id={'html-container'}
                {...(previewMode
                  ? inspectorProps({
                      entryId: contentfulId,
                      fieldId: 'embedHtml',
                    })
                  : {})}
              >
                {contentfulModuleToComponent({ ...embedHtml, previewMode })}
              </div>
            ) : null}
            {!isEmpty(ctas) ? (
              <CTAWrapper
                {...inspectorProps({
                  entryId: contentfulId,
                  fieldId: 'ctas',
                })}
              >
                {ctas.map(cta =>
                  contentfulModuleToComponent({
                    ...cta,
                    previewMode,
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
  headlinePortfolio: PropTypes.string,
  description: PropTypes.string,
  ctas: PropTypes.arrayOf(PropTypes.object),
  sectionPadding: PropTypes.string,
  previewMode: PropTypes.bool,
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

  ${({ $bordered }) =>
    $bordered
      ? `
    border-radius: 16px;
    border: 1px solid #BBC0C5;

    .fullwidth-cta-inner {
      margin: 32px 0;
      h2, a {
        margin-top: 0;
        margin-bottom: 0;
      }
    }
    `
      : ''}

  ${({ $backgroundImage }) =>
    $backgroundImage
      ? `
      background-image: url(${$backgroundImage});
    `
      : ''}

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

  ${({ headlineMarginTop0 }) => (headlineMarginTop0 ? 'margin-top: 0;' : ``)}

  ${({ hasDescription }) =>
    hasDescription ? 'font-size: 32px !important;' : ''}

  .snaps-fullwidth-cta & {
    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      font-size: 24px !important;
      line-height: 1.2;
    }
  }
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

    #html-container {
      width: 60%;
      background-color: #F2F4F6;
      border-radius: 8px;
      padding-bottom: 32px;
      margin-left: auto;

      .dark-mode & {
        background-color: #24292E;
      }

      .uninstallSurvey {
        padding: 32px;
        border-radius: 8px;
        text-align: left;
        background-color: #F2F4F6;
        .dark-mode & {
          background-color: #24292E;
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

      .buttonSurvey > button {
        width: calc(100% - 64px);
        cursor: pointer;
        transition: all 0.3s ease;

        &:disabled {
          background-color: #6A737D;
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

  .snaps-fullwidth-cta & {
    padding-left: 24px;
    padding-right: 24px;
  }
`
const CTAWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  margin-top: 32px;
  justify-content: center;
  gap: 16px;

  .button {
    min-width: 140px;
  }
  .button:last-child {
    margin-bottom: 0;
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
      margin: 0 0 16px 0;
    }
    .snaps-fullwidth-cta & a {
      width: 100%;
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
