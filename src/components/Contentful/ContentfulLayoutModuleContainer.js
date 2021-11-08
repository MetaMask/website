import React from 'react'
import PropTypes from 'prop-types'
import ContentWrapper from '../ContentWrapper'
import styled from 'styled-components'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import classnames from 'classnames'
import { SectionTitle, Section } from '../StyledGeneral'
import Context from '../Context/ContextLayoutModuleContainer';



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
      sectionPadding,
    },
  } = props

  const { childMarkdownRemark: { html } = {} } = description || {}
  const [idFaqActive, setIdFaqActive] = React.useState('')
  const valueContext = {
    faq: {
      idFaqActive,
      setIdFaqActive,
    },
  }

  return (
    <Context.Provider value={valueContext}>
      <Section
        sectionPadding={sectionPadding}
        backgroundColor={backgroundColor}
        className={classnames({
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
            contentAlignCenter={contentAlignCenter}
          >
            {modules && modules.length
              ? modules.map(m =>
                  contentfulModuleToComponent({
                    ...m,
                    hasModuleContainer: true,
                    color: ['dark'].includes(backgroundColor)
                      ? 'white'
                      : 'black',
                  })
                )
              : null}
          </Modules>
        </ContentWrapper>
      </Section>
    </Context.Provider>
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

const Title = styled(SectionTitle)`
  padding-bottom: 20px;
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
