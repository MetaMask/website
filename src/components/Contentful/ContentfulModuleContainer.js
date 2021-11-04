import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import classnames from 'classnames'
import FaqList from '../FaqList'

const ContentfulModuleContainer = props => {
  const {
    moduleConfig: {
      title,
      description,
      columns,
      contentAlignment,
      splitModules,
      displayTitle,
      modules = [],
    },
  } = props

  const { childMarkdownRemark: { html } = {} } = description || {}
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
    <Wrapper isFaq={isFaq}>
      {title ? (
        <Title
          isFaq={isFaq}
          className={classnames({
            hidden: !displayTitle,
          })}
        >
          {title}
        </Title>
      ) : null}
      <div
        className={classnames({
          'txt-center': contentAlignment === 'center',
        })}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {isFaq ? <FaqList list={faqList} /> : null}
      {modulesOther.length ? (
        <Modules
          columns={columns}
          contentAlignment={contentAlignment}
          splitModules={splitModules}
        >
          {modulesOther.map(m =>
            contentfulModuleToComponent({
              ...m,
            })
          )}
        </Modules>
      ) : null}
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
  }),
}

const Wrapper = styled.div`
  display: block;

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

const Title = styled.h2`
  margin-bottom: 1rem;
  ${({ isFaq, theme }) =>
    isFaq ? `
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
  ${({ columns, theme }) =>
    columns
      ? `
      margin: -8px !important;
      @media (max-width: ${theme.device.mobileMediaMax}){
        padding: 5px !important;
      }

    > * {
    width: calc(100%/${columns});
    padding: 8px !important;
    @media (max-width: ${theme.device.mobileMediaMax}){
      width: 50%;
      padding: 5px !important;
    }
  }
  `
      : ``}
`
