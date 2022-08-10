import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import classnames from 'classnames'
import FaqList from '../FaqList'
import kebabCase from 'lodash/kebabCase'
import { EyebrowStyle } from '../StyledGeneral'

const ContentfulModuleContainer = props => {
  const {
    moduleConfig: {
      title,
      eyebrow,
      description,
      numberOfItem,
      columns,
      columnsOnMobile,
      contentAlignment,
      splitModules,
      displayTitle,
      modules = [],
      gridModules = true,
      gridModulesGap: gridModulesGapDefault,
      isLiquiditySection,
      containerBgColor,
      previewMode,
      columnType,
    },
  } = props
  const gridModulesGap = gridModulesGapDefault || '8px'
  const { childMarkdownRemark: { html } = {} } = description || {}
  const htmlData = previewMode ? description : html
  const faqList =
    modules && modules.length
      ? modules.filter(modules => modules.__typename === 'ContentfulFaq')
      : []
  const modulesOther =
    modules && modules.length
      ? modules.filter(modules => modules.__typename !== 'ContentfulFaq')
      : []
  const isFaq = faqList && faqList.length
  return (
    <Wrapper
      isFaq={isFaq}
      className="contentfulModuleContainerWrapper"
      id={kebabCase(title || '')}
    >
      <Inner splitModules={splitModules}>
        {title || htmlData || eyebrow ? (
          <Content splitModules={splitModules}>
            {eyebrow ? <EyebrowStyle>{eyebrow}</EyebrowStyle> : null}
            {title && displayTitle ? (
              <Title isFaq={isFaq}>{title}</Title>
            ) : null}
            {htmlData ? (
              <div
                className={classnames({
                  'txt-center': contentAlignment === 'center',
                })}
                dangerouslySetInnerHTML={{ __html: htmlData }}
              />
            ) : null}
          </Content>
        ) : null}
        <ModulesWrapper splitModules={splitModules}>
          {isFaq ? (
            <FaqList list={faqList} containerBgColor={containerBgColor} />
          ) : null}
          {modulesOther.length ? (
            <Modules
              columnType={columnType}
              columns={columns}
              columnsOnMobile={columnsOnMobile}
              contentAlignment={contentAlignment}
              gridModules={gridModules}
              gridModulesGap={isLiquiditySection ? '16px' : gridModulesGap}
              isLiquiditySection={isLiquiditySection}
              className={classnames('moduleContainerListModules', {
                [`columnType${columnType}`]: columnType,
                [`column-${columns}`]: columns,
              })}
            >
              {modulesOther.map(m =>
                contentfulModuleToComponent({
                  ...m,
                  numberOfItem,
                  previewMode,
                })
              )}
            </Modules>
          ) : null}
        </ModulesWrapper>
      </Inner>
    </Wrapper>
  )
}

export default ContentfulModuleContainer

ContentfulModuleContainer.propTypes = {
  moduleConfig: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.object,
    numberOfItem: PropTypes.number,
    columns: PropTypes.number,
    contentAlignment: PropTypes.string,
    splitModules: PropTypes.bool,
    columnsOnMobile: PropTypes.number,
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
  `
      : ``}
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

  ${({
    gridModules,
    columnType,
    gridModulesGap,
    columns,
    columnsOnMobile,
    theme,
  }) =>
    columns && gridModules && columnType !== 'tag'
      ? `
      margin: -${gridModulesGap} !important;
      
      @media (max-width: ${theme.device.tabletMediaMax}){
        .mobileCardGridModulesGap12 & {
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
      ${columnsOnMobile && columns > 2 ? `width: 50%` : ''};
      .mobileCardGridModulesGap12 & {
        padding: 12px !important;
      }
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
