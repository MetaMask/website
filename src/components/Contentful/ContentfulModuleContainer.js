import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import classnames from 'classnames'
import FaqList from '../FaqList'
import kebabCase from 'lodash/kebabCase'

const ContentfulModuleContainer = props => {
  const {
    moduleConfig: {
      title,
      description,
      columns,
      columnsOnMobile,
      contentAlignment,
      splitModules,
      displayTitle,
      modules = [],
      gridModules = true,
      gridModulesGap = '8px',
      isLiquiditySection,
      containerBgColor,
      previewMode,
    },
  } = props

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
        {title || htmlData ? (
          <Content splitModules={splitModules}>
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
              columns={columns}
              columnsOnMobile={columnsOnMobile}
              contentAlignment={contentAlignment}
              gridModules={gridModules}
              gridModulesGap={isLiquiditySection ? '24px' : gridModulesGap}
              isLiquiditySection={isLiquiditySection}
              className={'moduleContainerListModules'}
            >
              {modulesOther.map(m =>
                contentfulModuleToComponent({
                  ...m,
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
  `
      : ''}

  ${({ gridModules, gridModulesGap, columns, columnsOnMobile, theme }) =>
    columns && gridModules
      ? `
      margin: -${gridModulesGap} !important;

    > * {
    width: calc(100%/${columns});
    padding: ${gridModulesGap} !important;
    @media (max-width: ${theme.device.miniDesktopMediaMax}){
      ${columnsOnMobile && columns > 3 ? `width: 33.333%` : ''};
    }
    @media (max-width: ${theme.device.tabletMediaMax}){
      ${columnsOnMobile && columns > 2 ? `width: 50%` : ''};
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
`
