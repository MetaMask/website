import ContentfulLayoutPopupRegionSelector from './ContentfulLayoutPopupRegionSelector'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import { useContentfulInspectorMode } from '@contentful/live-preview/react'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'
import React, { useEffect, useMemo, useState, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import { EyebrowStyle } from '../StyledGeneral'
import kebabCase from 'lodash/kebabCase'
import styled from 'styled-components'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Carousel from '../Carousel'
import FaqList from '../FaqList'

const ContentfulModuleContainer = props => {
  const {
    moduleConfig: {
      title,
      eyebrow,
      description,
      numberOfItem,
      columns,
      columnsOnTablet,
      centerOnTablet,
      columnsOnMobile,
      centerOnMobile,
      contentAlignment,
      splitModules,
      displayTitle,
      modules = [],
      gridModules = true,
      gridModulesGap: gridModulesGapDefault,
      isLiquiditySection,
      isTrustBar,
      containerBgColor,
      previewMode = false,
      columnType,
      carouselMode = false,
      contentful_id,
      hasRegionSelector,
      regionSelectorHeadline,
      regionSelectorPopupTitle,
      regionSelectorPopupText,
      regionListKey,
      extraData,
    },
  } = props

  const inspectorProps = useContentfulInspectorMode()
  const gridModulesGap = gridModulesGapDefault || '8px'
  const { childMarkdownRemark: { html } = {} } = description || {}
  const htmlData = previewMode ? description : html
  const faqList = []
  const modulesOther = []

  modules?.forEach(module => {
    let typeName = module.__typename || module.internal?.type
    if (['ContentfulFaq', 'Faq'].includes(typeName)) {
      faqList.push(module)
    } else {
      modulesOther.push(module)
    }
  })

  const isFaq = faqList && faqList.length
  const [modulesRender, setModulesRender] = useState(modulesOther)
  const initialModulesRender = useRef(modulesRender)
  const [shuffled, setShuffled] = useState(false)

  const isMobile = useMediaQuery({
    query: '(max-width: 479px)',
  })

  const isTablet = useMediaQuery({
    query: '(max-width: 767px)',
  })

  const shouldShowCarousel = useMemo(() => {
    if (carouselMode === 'desktop') return true
    if (carouselMode === 'tablet' && isTablet) return true
    if (carouselMode === 'mobile' && isMobile) return true
    return false
  }, [isMobile, isTablet, carouselMode])

  useEffect(() => {
    if (columnType === 'randomize') {
      const lastItem = modulesOther.pop()
      let modulesShuffled = modulesOther
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
      modulesShuffled.push(lastItem)
      setModulesRender(modulesShuffled)
      setShuffled(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffled])

  return (
    <Wrapper
      isFaq={isFaq}
      className="contentfulModuleContainerWrapper"
      id={kebabCase(title || '')}
    >
      <Inner splitModules={splitModules}>
        {title || htmlData || eyebrow ? (
          <Content splitModules={splitModules}>
            {eyebrow ? (
              <EyebrowStyle
                {...(previewMode
                  ? inspectorProps({
                      entryId: contentful_id,
                      fieldId: 'eyebrow',
                    })
                  : {})}
              >
                {eyebrow}
              </EyebrowStyle>
            ) : null}

            {title && displayTitle ? (
              <Title
                isFaq={isFaq}
                {...(previewMode
                  ? inspectorProps({
                      entryId: contentful_id,
                      fieldId: 'title',
                    })
                  : {})}
              >
                {title}
              </Title>
            ) : null}

            {htmlData ? (
              <div
                className={classnames({
                  'txt-center': contentAlignment === 'center',
                })}
                dangerouslySetInnerHTML={{ __html: htmlData }}
                {...(previewMode
                  ? inspectorProps({
                      entryId: contentful_id,
                      fieldId: 'description',
                    })
                  : {})}
              />
            ) : null}
          </Content>
        ) : null}

        {hasRegionSelector && (
          <ContentfulLayoutPopupRegionSelector
            headline={regionSelectorHeadline}
            title={regionSelectorPopupTitle}
            text={regionSelectorPopupText}
            regionListKey={regionListKey}
            extraData={
              previewMode
                ? { internal: { content: JSON.stringify(extraData) } }
                : extraData
            }
            modulesRender={initialModulesRender}
            setModulesRender={setModulesRender}
          />
        )}

        <ModulesWrapper splitModules={splitModules}>
          {isFaq ? (
            <FaqList
              list={faqList}
              containerBgColor={containerBgColor}
              previewMode={previewMode}
            />
          ) : null}

          {!shouldShowCarousel && modulesRender.length ? (
            <Modules
              columnType={columnType}
              columns={columns}
              columnsOnMobile={columnsOnMobile}
              columnsOnTablet={columnsOnTablet}
              contentAlignment={contentAlignment}
              centerOnMobile={centerOnMobile}
              centerOnTablet={centerOnTablet}
              gridModules={gridModules}
              gridModulesGap={isLiquiditySection ? '16px' : gridModulesGap}
              isLiquiditySection={isLiquiditySection}
              isTrustBar={isTrustBar}
              className={classnames('moduleContainerListModules', {
                [`columnType${columnType}`]: columnType,
                [`column-${columns}`]: columns,
              })}
            >
              {modulesRender.map(m =>
                contentfulModuleToComponent({
                  ...m,
                  numberOfItem,
                  previewMode,
                })
              )}
            </Modules>
          ) : null}

          {shouldShowCarousel && modulesRender.length ? (
            <Carousel
              itemsOnTablet={columnsOnTablet}
              itemsOnMobile={columnsOnMobile}
              items={columns}
              gap={gridModulesGap}
            >
              {modulesRender.map(m =>
                contentfulModuleToComponent({
                  ...m,
                  numberOfItem,
                  previewMode,
                })
              )}
            </Carousel>
          ) : null}
        </ModulesWrapper>
      </Inner>
    </Wrapper>
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
    numberOfItem: PropTypes.number,
    columns: PropTypes.number,
    contentAlignment: PropTypes.string,
    splitModules: PropTypes.bool,
    columnsOnTablet: PropTypes.number,
    columnsOnMobile: PropTypes.number,
    isTrustBar: PropTypes.bool,
    centerOnTablet: PropTypes.bool,
    centerOnMobile: PropTypes.bool,
    hasRegionSelector: PropTypes.bool,
    regionSelectorHeadline: PropTypes.string,
    regionSelectorPopupTitle: PropTypes.string,
    regionSelectorPopupText: PropTypes.string,
    regionListKey: PropTypes.string,
    extraData: PropTypes.object,
  }),
}

const Wrapper = styled.div`
  display: block;

  /* remove margin when nested child in child */
  .contentfulModuleContainerWrapper {
    margin-bottom: 0 !important;
  }

  ${({ isFaq, theme }) =>
    isFaq
      ? `
    width: 600px;
    max-width: 100%;
    margin: 0 auto 80px auto;

    @media (max-width: ${theme.device.tabletMediaMax}) {
      margin-bottom: 40px;
    }

    .snaps-faqs & {
      width: 100%;
      margin-bottom: 0;
    }
  `
      : ``}

  .registerEventForm & {
    width: 625px;
    max-width: 100%;
    margin: 0 auto 40px;
    line-height: 24px;
  }

  &#sell-crypto-transact-providers {
    @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
      padding-top: 0 !important;
    }
  }
`

const Inner = styled.div`
  display: block;
  ${({ splitModules, theme }) =>
    splitModules
      ? `
    display: flex;

    @media (max-width: ${theme.device.tabletMediaMax}) {
      flex-direction: column;
    }


  `
      : ``}

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    text-align: center;
  }
`

const ModulesWrapper = styled.div`
  display: block;
  ${({ splitModules, theme }) =>
    splitModules
      ? `
    flex: 1;
    min-with: 0;
    @media (max-width: ${theme.device.mobileMediaMax}) {
      flex: none;
      width: 100%;
    }
    `
      : ``}
`

const Content = styled.div`
  display: block;

  .newsCategoriesTab & {
    margin-bottom: 32px;
  }

  ${({ splitModules, theme }) =>
    splitModules
      ? `
    width: 33%;
    padding-right: 16px;
    @media (max-width: ${theme.device.tabletMediaMax}) {
      padding: 0;
      width: 100%;
    }
  `
      : ``}
`

const Title = styled.h2`
  margin-bottom: 1rem;
  ${({ isFaq, theme }) =>
    isFaq
      ? `
      margin-bottom: 20px;
      @media (max-width: ${theme.device.tabletMediaMax}) {
        font-size: 2rem;
      }
      @media (max-width: ${theme.device.mobileMediaMax}) {
        padding-top: 20px;
        text-align: center;
      }
    `
      : ``}
`
const Modules = styled.div`
  display: flex;
  flex-flow: wrap;

  ${({ isLiquiditySection }) =>
    isLiquiditySection
      ? `
    align-items: center;
    #liquidity-left {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        max-width: 316px;
      }
    }
    .LogoImageWrapper {
      justify-content: center;
      align-items: center;
    }
  `
      : ''}

  ${({ isTrustBar, columns, columnsOnTablet, columnsOnMobile, theme }) =>
    isTrustBar
      ? `
    padding: 10px 19px;
    border-radius: 12px;
    box-shadow: 0px 4px 24px rgb(0 0 0 / 10%);
    align-items: center;

    & > * {
      width: calc(100%/${columns});
      padding: 16px;

      @media (max-width: ${theme.device.tabletMediaMax}){
        padding: 16px 8px;
        width: ${columnsOnTablet ? `calc(100%/${columnsOnTablet})` : '50%'};
      }

      @media (max-width: ${theme.device.mobileMediaMax}){
        width: ${columnsOnMobile ? `calc(100%/${columnsOnMobile})` : '50%'};
        padding: 16px;
      }
    }

    body.dark-mode && {
      background-color: #3c444b;
    }
  `
      : ''}

  ${({
    gridModules,
    columnType,
    gridModulesGap,
    columns,
    columnsOnTablet,
    columnsOnMobile,
    theme,
    isTrustBar,
  }) =>
    columns && gridModules && columnType !== 'tag' && !isTrustBar
      ? `
      margin: -${gridModulesGap} !important;

      @media (max-width: ${theme.device.tabletMediaMax}){
        .mobileCardGridModulesGap12 && {
          margin: -12px !important;
        }
      }

    > * {
    width: calc(100%/${columns});
    padding: ${gridModulesGap} !important;
    @media (max-width: ${theme.device.miniDesktopMediaMax}){
      ${columnsOnMobile && columns > 3 ? `width: 33.333%` : ''};
    }
    @media (max-width: ${theme.device.tabletMediaMax}){
      .mobileCardGridModulesGap12 && {
        padding: 12px !important;
      }
      width: ${
        columnsOnTablet
          ? `calc(100%/${columnsOnTablet})`
          : columnsOnMobile && columns > 2
          ? `width: 50%`
          : ''
      };
    }
    @media (max-width: ${theme.device.mobileMediaMax}){
      width: ${columnsOnMobile ? `calc(100%/${columnsOnMobile})` : '50%'};
    }
  }
  `
      : ''}
  /* custom when 1 column */
  ${({ gridModules, columns, theme }) =>
    [1, 2].includes(columns) && gridModules
      ? `
    > * {
    @media (max-width: ${theme.device.mobileMediaMax}){
      width: 100% !important;
    }
  }
  `
      : ''}

  ${({ contentAlignment }) =>
    contentAlignment === 'center'
      ? `
    justify-content: center;
    .ctaModuleContainer {
      justify-content: center;
    }
  `
      : ''}

  ${({ centerOnMobile, theme }) =>
    centerOnMobile
      ? `
    @media(max-width: ${theme.device.mobileMediaMax}) {
      justify-content: center;
      .ctaModuleContainer {
        justify-content: center;
      }
    }
  `
      : ''}

  ${({ centerOnTablet, theme }) =>
    centerOnTablet
      ? `
    @media(max-width: ${theme.device.tabletMediaMax}) {
      justify-content: center;
      .ctaModuleContainer {
        justify-content: center;
      }
    }
  `
      : ''}

  ${({ columnType, columns }) =>
    columnType === 'pinterest'
      ? `
    column-count: ${columns};
    column-gap: 14px;
    display: block !important;
    margin: 0 !important;
    & > *{
      display: inline-block;
      width: 100% !important;
      padding: 0 !important;
      margin: 0 0 14px 0 !important;
    }
  `
      : ``}

  ${({ columnType }) =>
    columnType === 'tag'
      ? `
    display: flex;
    flex-flow: wrap;
    & > *{
      display: inline-flex;
      width: auto !important;
      margin-right: 20px;
      margin-bottom: 20px;

    }
  `
      : ``}
`
