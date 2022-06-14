import React from 'react'
import PropTypes from 'prop-types'
import ContentWrapper from '../ContentWrapper'
import styled from 'styled-components'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import classnames from 'classnames'
import { SectionTitle, Section, EyebrowStyle } from '../StyledGeneral'
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser'
import TabWrapper from '../Tab/TabWrapper'

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
      noPaddingBottom,
      modules,
      sectionPadding,
      modulesMargin,
      previewMode,
      isTab,
      customClass,
      eyebrow,
      sideImage,
    },
  } = props

  const { childMarkdownRemark: { html } = {} } = description || {}
  const bgUrl = parseContentfulAssetUrl(backgroundImage)
  const sideImageUrl = parseContentfulAssetUrl(sideImage)
  const htmlData = previewMode ? description : html
  const isCategoryTab = customClass === 'newsCategoriesTab' && isTab
  const tabs =
    isTab && modules && modules.length
      ? modules.map(item => ({
          label: item.title,
          id: item.contentful_id,
          content: (
            <TabContent>
              {contentfulModuleToComponent({
                ...item,
              })}
            </TabContent>
          ),
        }))
      : null
  return (
    <Container
      sectionPadding={sectionPadding}
      bgUrl={bgUrl}
      backgroundSize={backgroundSize}
      className={classnames({
        noPaddingBottom: noPaddingBottom,
        [`bg-${backgroundColor}`]: backgroundColor,
      })}
    >
      {bgUrl ? (
        <BackgroundSection backgroundSize={backgroundSize}>
          <img src={bgUrl} alt="" />
        </BackgroundSection>
      ) : null}
      <ContentWrapper customClass={customClass}>
        <Inner hasSideImage={!!sideImageUrl}>
          <MainContent>
            {(headline && displayHeadline) || htmlData || eyebrow ? (
              <ContentInfo paddingTop={paddingTop}>
                {eyebrow ? <EyebrowStyle>{eyebrow}</EyebrowStyle> : null}
                {headline && displayHeadline ? (
                  <Title
                    className={classnames({
                      'txt-center': headlineAlignCenter,
                    })}
                  >
                    {headline}
                  </Title>
                ) : null}
                {htmlData ? (
                  <SubInfo
                    className={classnames({
                      'txt-center': contentAlignCenter,
                    })}
                    dangerouslySetInnerHTML={{ __html: htmlData }}
                  />
                ) : null}
              </ContentInfo>
            ) : null}
            {isTab && modules && modules.length ? (
              <TabWrapper
                tabs={tabs}
                typeLayout={'module'}
                activeTabDefault={modules[0].contentful_id}
                isTabParam={isCategoryTab}
              ></TabWrapper>
            ) : null}
            {!isTab && modules && modules.length ? (
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
                  })
                )}
              </Modules>
            ) : null}
          </MainContent>
          {sideImageUrl ? (
            <SideImage sectionPadding={sectionPadding}>
              <img src={sideImageUrl} alt="" />
            </SideImage>
          ) : null}
        </Inner>
      </ContentWrapper>
    </Container>
  )
}

export default ContentfulModuleContainer

ContentfulModuleContainer.propTypes = {
  moduleConfig: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    paddingTop: PropTypes.string,
    backgroundColor: PropTypes.string,
    backgroundImage: PropTypes.object,
    headlineAlignCenter: PropTypes.bool,
    contentAlignCenter: PropTypes.bool,
    displayHeadline: PropTypes.bool,
    noPaddingBottom: PropTypes.bool,
  }),
}

const MainContent = styled.div`
  display: block;
`
const Inner = styled.div`
  display: block;
  ${({ hasSideImage, theme }) =>
    hasSideImage
      ? ` 
      @media (min-width: ${theme.device.miniDesktop}) {
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
  img {
    filter: drop-shadow(-15px 15px 24px rgba(0, 0, 0, 0.05))
      drop-shadow(-3px 3px 10px rgba(0, 0, 0, 0.07));
    border-radius: 5px;
  }
  @media (min-width: ${({ theme }) => theme.device.miniDesktop}) {
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
`

const Title = styled(SectionTitle)`
  display: block;
  margin-bottom: 20px;
`
const Modules = styled.div`
  display: block;
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
    }
  }

  > .ctaModuleContainer {
    padding: 22px;
    margin-bottom: 0;
  }
  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    .button {
      width: 100%;
    }
  }
`
const ContentInfo = styled.div`
  margin-bottom: 40px;

  & > *:last-child {
    margin-bottom: 0 !important;
  }
  ${({ paddingTop }) =>
    paddingTop
      ? `
    padding-top: ${paddingTop};
  `
      : ''}
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    padding-top: 0;
  }
`
const SubInfo = styled.div`
  display: block;
`
const TabContent = styled.div`
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    padding: 0 48px;
  }
`
