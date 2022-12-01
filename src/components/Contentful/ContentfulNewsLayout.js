import React from 'react'
import styled from 'styled-components'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import ContentWrapper from '../ContentWrapper'
import { Section } from '../StyledGeneral'
import SocialButtonList from '../SocialButtonList'
import Image from '../Image'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'

// For preview only
const ContentfulNewsLayout = props => {
  const {
    moduleConfig: {
      content,
      image,
      title,
      subtitle,
      previewMode = false,
      publishDate,
      author,
    },
  } = props

  const contentConfig = {
    __typename: 'RichText',
    previewContent: content,
    displayTitle: false,
    previewMode: true,
    publishDate,
    author,
  }

  return (
    <NewsContainer>
      <ContentWrapper className="news-content">
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        <Image image={image} previewMode={previewMode} />
        <SocialShare>
          <SocialButtonList />
        </SocialShare>
      </ContentWrapper>
      <NewsContentWrapper>
        {contentfulModuleToComponent(contentConfig)}
      </NewsContentWrapper>
    </NewsContainer>
  )
}

const parsePreviewData = data => {
  data = data.moduleConfig.previewContent || data.moduleConfig

  const dataUpdate = {
    moduleConfig: {
      previewMode: true,
      ...data,
    },
  }
  return dataUpdate
}

export default withProcessPreviewData(parsePreviewData)(ContentfulNewsLayout)

const NewsContainer = styled(Section)`
  position: relative;
`

const NewsContentWrapper = styled.div`
  ${({ bgUrl, darkBgUrl }) =>
    bgUrl || darkBgUrl
      ? ` background-size: contain;
      background-repeat: no-repeat;
      background-position: bottom;
   `
      : ''}

  ${({ bgUrl }) =>
    bgUrl
      ? ` background-image: url(${bgUrl});
  `
      : ''}
  
  ${({ darkBgUrl }) =>
    darkBgUrl
      ? ` 
      body.dark-mode & {
        background-image: url(${darkBgUrl});
      }
   `
      : ''}

  & > * {
    max-width: 784px;
    margin: 0 auto;
    padding: 0 20px;
  }
`

const Title = styled.h2`
  font-size: 40px;
  line-height: 40px;
  padding-top: 64px;
`

const Subtitle = styled.p`
  font-size: 16px;
  line-height: 24px;
  padding-top: 24px;
`

const SocialShare = styled.div`
  margin: 32px 0;
  display: flex;
  align-items: center;
  justify-content: right;

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    flex-direction: column;
  }
`
