import React from 'react'
import PropTypes from 'prop-types'
import ContentWrapper from '../ContentWrapper'
import styled from 'styled-components'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import classnames from 'classnames'

const ContentfulModuleContainer = props => {
  const {
    moduleConfig: {
      headline,
      description,
      backgroundColor,
      displayHeadline,
      headlineAlignCenter,
      contentAlignCenter,
      noPaddingBottom,
      modules,
    },
  } = props

  const { childMarkdownRemark: { html } = {} } = description || {}

  return (
    <Container
      className={classnames('section', {
        noPaddingBottom: noPaddingBottom,
        [`bg-${backgroundColor}`]: backgroundColor,
      })}
    >
      <ContentWrapper>
        <ContentInfo>
          {headline ? (
            <Title
              className={classnames({
                hidden: !displayHeadline,
                'txt-center': headlineAlignCenter,
              })}
            >
              {headline}
            </Title>
          ) : null}
          {html ? (
            <SubInfo
              className={classnames({
                'txt-center': contentAlignCenter,
              })}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : null}
        </ContentInfo>
        <Modules
          className={classnames({
            'txt-center': contentAlignCenter,
          })}
          contentAlignCenter={contentAlignCenter}
        >
          {modules.map(m =>
            contentfulModuleToComponent({
              ...m,
              hasModuleContainer: true,
              color: ['dark'].includes(backgroundColor) ? 'white' : 'black'
            })
          )}
        </Modules>
      </ContentWrapper>
    </Container>
  )
}

export default ContentfulModuleContainer

ContentfulModuleContainer.propTypes = {
  moduleConfig: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.object,
    backgroundColor: PropTypes.string,
    headlineAlignCenter: PropTypes.bool,
    contentAlignCenter: PropTypes.bool,
    displayHeadline: PropTypes.bool,
    noPaddingBottom: PropTypes.bool,
  }),
}

const Title = styled.h2`
  display: block;
`
const Container = styled.div`
  display: block;
`

const Modules = styled.div`
  display: block;
  ${({contentAlignCenter}) => contentAlignCenter ? `
    display: flex;
    flex-direction: column;
    align-items: center;
  `:``}
`
const ContentInfo = styled.div`
  margin-bottom: 1rem;
`
const SubInfo = styled.div`
  display: block; 
`;