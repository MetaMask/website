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
      paddingTop,
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
        <ContentInfo paddingTop={paddingTop}>
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
          {modules && modules.length
            ? modules.map(m =>
                contentfulModuleToComponent({
                  ...m,
                  hasModuleContainer: true,
                  color: ['dark'].includes(backgroundColor) ? 'white' : 'black',
                })
              )
            : null}
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
    paddingTop: PropTypes.string,
    backgroundColor: PropTypes.string,
    headlineAlignCenter: PropTypes.bool,
    contentAlignCenter: PropTypes.bool,
    displayHeadline: PropTypes.bool,
    noPaddingBottom: PropTypes.bool,
  }),
}

const Title = styled.h2`
  padding-bottom: 20px;
  font-weight: 700;
  margin-top: 40px;

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    font-size: 28px;
    line-height: 32px;
    margin-bottom: 15px;
    margin-top: 16px;
    padding-bottom: 0;
    padding-top: 0;
    text-align: center;
  }
`
const Container = styled.div`
  display: block;
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
`
const ContentInfo = styled.div`
  margin-bottom: 1rem;
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
