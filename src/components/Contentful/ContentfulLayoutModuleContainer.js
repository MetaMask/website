import React from 'react'
import PropTypes from 'prop-types'
import ContentWrapper from '../ContentWrapper'
import styled from 'styled-components'
import { useLocation } from '@reach/router'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import classnames from 'classnames'
import { SectionTitle, Section, EyebrowStyle } from '../StyledGeneral'
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser'
import TabWrapper from '../Tab/TabWrapper'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'
import ParseMD from '../ParseMD'
import HeroSubNav from '../HeroSubNav'
import DevReleaseNotes from '../DevReleaseNotes'
import Image from '../Image'

const ContentfulModuleContainer = props => {
  const {
    moduleConfig: {
      headline,
      description,
      backgroundColor,
      backgroundImage,
      backgroundSize,
      paddingTop,
      displayHeadline,
      headlineAlignCenter,
      contentAlignCenter,
      headlineMarginTop0,
      noPaddingTop,
      noPaddingBottom,
      modules,
      sectionPadding,
      modulesMargin,
      previewMode = false,
      isTab,
      customClass,
      moduleId,
      eyebrow,
      sideImage,
      showLeftArrow,
      iconConfig,
      cta,
      storiesData,
    },
  } = props

  const { pathname } = useLocation()
  const { childMarkdownRemark: { html } = {} } = description || {}
  const bgUrl = parseContentfulAssetUrl(backgroundImage, previewMode)
  const sideImageUrl = parseContentfulAssetUrl(sideImage, previewMode)
  const htmlData = previewMode ? description : html
  const isCategoryTab = customClass === 'newsCategoriesTab' && isTab
  const isSubNav = customClass?.includes('heroSubNav')
  const isDevReleaseNotes = customClass?.includes('dev-release-notes')
  const isSecurityPage = pathname === '/security/'
  const tabs =
    isTab && modules && modules.length
      ? modules.map(item => ({
          label: item.title,
          id: previewMode ? item.title : item.contentful_id,
          content: (
            <TabContent>
              {contentfulModuleToComponent({
                ...item,
                storiesData,
                previewMode,
              })}
            </TabContent>
          ),
        }))
      : null

  if (isSubNav || isDevReleaseNotes)
    return (
      <Container
        sectionPadding={sectionPadding}
        className={classnames({
          noPaddingTop: noPaddingTop,
          noPaddingBottom: noPaddingBottom,
          [customClass]: customClass,
          [`bg-${backgroundColor}`]: backgroundColor,
        })}
      >
        <ContentWrapper>
          {isSubNav && (
            <HeroSubNav
              headline={headline}
              modules={modules}
              previewMode={previewMode}
            />
          )}
          {isDevReleaseNotes && (
            <>
              <ContentInfo paddingTop={paddingTop}>
                {headline && displayHeadline ? (
                  <div
                    className={classnames('title-wrapper', {
                      'headline-center': headlineAlignCenter && !cta,
                    })}
                  >
                    <Title
                      headlineMarginTop0={headlineMarginTop0}
                      dangerouslySetInnerHTML={{ __html: headline }}
                    />
                  </div>
                ) : null}
              </ContentInfo>
              <DevReleaseNotes />
            </>
          )}
        </ContentWrapper>
      </Container>
    )

  return (
    <Container
      id={moduleId}
      sectionPadding={sectionPadding}
      bgUrl={bgUrl}
      backgroundSize={backgroundSize}
      className={classnames({
        noPaddingTop: noPaddingTop,
        noPaddingBottom: noPaddingBottom,
        [customClass]: customClass,
        [`bg-${backgroundColor}`]: backgroundColor,
      })}
    >
      {bgUrl ? (
        <BackgroundSection backgroundSize={backgroundSize}>
          <Image image={backgroundImage} />
        </BackgroundSection>
      ) : null}

      <ContentWrapper customClass={customClass}>
        <Inner hasSideImage={!!sideImageUrl}>
          <MainContent>
            {(headline && displayHeadline) || htmlData || eyebrow ? (
              <ContentInfo paddingTop={paddingTop}>
                {eyebrow ? <EyebrowStyle>{eyebrow}</EyebrowStyle> : null}
                {headline && displayHeadline ? (
                  <div
                    className={classnames('title-wrapper', {
                      'headline-center': headlineAlignCenter && !cta,
                    })}
                  >
                    <Title
                      headlineMarginTop0={headlineMarginTop0}
                      dangerouslySetInnerHTML={{ __html: headline }}
                    />

                    {cta ? (
                      <>
                        {contentfulModuleToComponent({
                          ...cta,
                          previewMode,
                        })}
                      </>
                    ) : null}
                  </div>
                ) : null}

                {htmlData ? (
                  <>
                    {previewMode || isSecurityPage ? (
                      <SubInfo
                        className={classnames({
                          'txt-center': contentAlignCenter,
                        })}
                      >
                        <ParseMD>{htmlData}</ParseMD>
                      </SubInfo>
                    ) : (
                      <SubInfo
                        className={classnames({
                          'txt-center': contentAlignCenter,
                        })}
                        dangerouslySetInnerHTML={{ __html: htmlData }}
                      />
                    )}
                  </>
                ) : null}
              </ContentInfo>
            ) : null}

            {tabs ? (
              <TabWrapper
                tabs={tabs}
                typeLayout={'module'}
                activeTabDefault={
                  previewMode ? modules[0].title : modules[0].contentful_id
                }
                isTabParam={isCategoryTab}
              />
            ) : null}

            {!isTab && modules && modules.length && (
              <Modules
                contentAlignCenter={contentAlignCenter}
                modulesMargin={modulesMargin}
              >
                {modules.map(m =>
                  contentfulModuleToComponent({
                    ...m,
                    previewMode,
                    hasModuleContainer: true,
                    containerBgColor: backgroundColor,
                    color: ['dark'].includes(backgroundColor)
                      ? 'white'
                      : 'black',
                    showLeftArrow,
                    iconConfig,
                    storiesData,
                  })
                )}
              </Modules>
            )}

            {cta ? (
              <div
                className={classnames('layout-cta', {
                  'hidden-desktop': headline && displayHeadline,
                })}
              >
                {contentfulModuleToComponent({
                  ...cta,
                  previewMode,
                })}
              </div>
            ) : null}
          </MainContent>

          {sideImageUrl ? (
            <SideImage sectionPadding={sectionPadding}>
              <Image image={sideImage} />
            </SideImage>
          ) : null}
        </Inner>
      </ContentWrapper>
    </Container>
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig.previewContent || data.moduleConfig
  const { modulesCollection } = data

  const dataUpdate = {
    moduleConfig: {
      previewMode: true,
      modules: modulesCollection?.items,
      ...data,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(
  ContentfulModuleContainer
)

ContentfulModuleContainer.propTypes = {
  moduleConfig: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    paddingTop: PropTypes.string,
    backgroundColor: PropTypes.string,
    backgroundImage: PropTypes.object,
    headlineAlignCenter: PropTypes.bool,
    contentAlignCenter: PropTypes.bool,
    headlineMarginTop0: PropTypes.bool,
    displayHeadline: PropTypes.bool,
    noPaddingTop: PropTypes.bool,
    noPaddingBottom: PropTypes.bool,
  }),
}

const MainContent = styled.div`
  display: block;

  .registerEventForm & {
    display: flex;
    flex-direction: column-reverse;
  }

  .layout-cta {
    .ctaModuleContainer {
      padding-top: 22px;
      a {
        font-weight: 600;
      }
    }
    display: flex;
    justify-content: flex-end;
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      justify-content: center;
    }
  }
`

const Inner = styled.div`
  display: block;
  ${({ hasSideImage, theme }) =>
    hasSideImage
      ? `
      max-width: 100%;

      @media (max-width: ${theme.device.miniDesktopMediaMax}){
        max-width: var(--container-width-miniDesktop);
      }

      @media (min-width: ${theme.device.miniDesktop}) and (max-width: ${theme.device.twoKResolutionMax})  {
        display: flex;

        ${MainContent} {
          flex: 1;
          min-width: 0;
        }
      }
     `
      : ``}
`

const SideImage = styled.div`
  display: block;
  margin-top: 40px;
  img {
    filter: drop-shadow(-15px 15px 24px rgba(0, 0, 0, 0.05))
      drop-shadow(-3px 3px 10px rgba(0, 0, 0, 0.07));
    border-radius: 5px;
  }
  width: 100%;

  @media (min-width: ${({ theme }) =>
      theme.device.miniDesktop}) and (max-width: ${({ theme }) =>
      theme.device.twoKResolutionMax}) {
    margin-top: 0;
    width: 33.33%;

    .sideImageOverflow & {
      min-width: 500px;
      width: 48%;
      margin-left: 40px;
      ${({ sectionPadding }) =>
        sectionPadding
          ? `
          margin-top: calc(0px - (${sectionPadding} + 40px));
       `
          : ``}
    }

    .sideImageOverflowRight & {
      min-width: 500px;
      width: 48%;
      margin-left: 40px;
    }
  }
`

const BackgroundSection = styled.div`
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;

  img {
    width: 100%;
  }
  ${({ backgroundSize }) =>
    backgroundSize === 'contain'
      ? `
      img {
        width: 100%;
        height: auto;
      }
   `
      : `
      bottom: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      `}
`

const Container = styled(Section)`
  position: relative;

  ${({ bgUrl }) =>
    bgUrl
      ? `
    z-index: 3;
   `
      : ''}

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    &.mobileSectionBottom0 {
      padding-bottom: 0;
    }
  }

  &.bg-light-blue-gradient {
    background: linear-gradient(#037DD60A, #F7FBFE00);
  }
`

const Title = styled(SectionTitle)`
  display: block;
  margin-bottom: 20px;

  ${({ headlineMarginTop0 }) => (headlineMarginTop0 ? 'margin-top: 0;' : ``)}

  .storiesOnNewsDetail & {
    font-size: 40px;
    line-height: 56px;
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      font-size: 30px;
      line-height: 36px;
    }
    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      font-size: 25px;
      line-height: 30px;
    }
  }

  .registerCustodyForm & {
    margin-top: 0;
    margin-bottom: 16px;
  }
`

const Modules = styled.div`
  display: block;
  .storiesOnNewsDetail & {
    @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
      padding-top: 40px;
      position: relative;
    }
  }
  ${({ contentAlignCenter }) =>
    contentAlignCenter
      ? `
    display: flex;
    flex-direction: column;
    align-items: center;
  `
      : ``}

  > * {
    &:not(:last-child) {
      margin-bottom: ${({ modulesMargin }) => modulesMargin || '40px'};
      @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
        .mobileCardGridModulesGap12 & {
          margin-bottom: 12px !important;
        }
      }
    }
  }

  > .ctaModuleContainer {
    padding: 22px;
    margin-bottom: 0;

    .cta-blue-right & {
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 0;
      justify-content: right;

      a {
        color: ${({ theme }) => theme.linkColor};
        font-weight: 600;
      }
    }
    .cta-tablet-center & {
      @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
        justify-content: center;
      }
    }
  }
  .dev-release-notes & {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }
`

const ContentInfo = styled.div`
  margin-bottom: 40px;

  .contentInfoDesktopMb12 & {
    @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
      margin-bottom: 12px;
    }
  }

  & > *:last-child {
    margin-bottom: 0 !important;
  }
  ${({ paddingTop }) =>
    paddingTop
      ? `
    padding-top: ${paddingTop};
  `
      : ''}

  .contentInfoBottom0 & {
    margin-bottom: 0;
  }

  .contentInfoBottom27 & {
    margin-bottom: 27px;
  }

  .contentInfoBottom35 & {
    margin-bottom: 35px;
  }

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    margin-bottom: 24px;
    text-align: center;
  }

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    padding-top: 0;
    .storiesOnNewsDetail & {
      padding-top: 40px;
    }
  }

  .registerEventForm & {
    width: 625px;
    max-width: 100%;
    margin: 0 auto;
    padding-top: 32px;
    font-size: 13px;
    line-height: 150%;
    letter-spacing: 0.2px;
    & p {
      margin-bottom: 0;
    }
  }
  .registerCustodyForm & {
    width: 625px;
    max-width: 100%;
    margin: 0 auto;
    padding-top: 0;
  }
  .title-wrapper {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    column-gap: 16px;
    row-gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 20px;

    h2 {
      margin-bottom: 0;
    }

    &.headline-center {
      justify-content: center;
    }

    .ctaModuleContainer {
      display: flex;
      align-items: center;

      a {
        font-weight: 600;
      }
    }
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      .ctaModuleContainer {
        display: none;
      }
    }
    @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
      justify-content: center;
    }
  }
`

const SubInfo = styled.div`
  display: block;

  .storiesOnNewsDetail & {
    text-align: center;
    color: ${({ theme }) => theme.text.default};
  }

  #reportBugFn {
    cursor: pointer;
    color: #2196f3;
  }

  .registerCustodyForm & {
    margin-bottom: 3.25rem !important;
  }
`

const TabContent = styled.div`
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    padding: 0 48px;

    .newsCategoriesTab & {
      padding: 0;
    }
  }
`
