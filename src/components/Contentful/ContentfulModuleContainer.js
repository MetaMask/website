import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import classnames from 'classnames'

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

  return (
    <Wrapper>
      {title ? (
        <Title
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
      <Modules
        columns={columns}
        contentAlignment={contentAlignment}
        splitModules={splitModules}
      >
        {modules && modules.map ? modules.map(m =>
          contentfulModuleToComponent({
            ...m,
          })
        ) : null}
      </Modules>
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
`

const Title = styled.h2`
  margin-bottom: 1rem;
  @media (min-width: ${({ theme }) => theme.device.desktop}) {
    margin-bottom: 2rem;
  }
`
const Modules = styled.div`
  display: flex;
  flex-flow: wrap;
  ${({ columns, theme }) =>
    columns
      ? `
  > * {
    width: calc(100%/${columns});
    @media (max-width: ${theme.device.mobileMediaMax}){
      width: 50%;
    }
  }
  `
      : ``}
`
