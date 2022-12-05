import React from 'react'
import styled from 'styled-components'
import { contentfulModuleToComponent } from '../../lib/utils/moduleToComponent'
import ContentWrapper from '../ContentWrapper'
import { Section } from '../StyledGeneral'
import SocialButtonList from '../SocialButtonList'
import Image from '../Image'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'
import moment from 'moment'

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
    htmlBody: content,
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
        <NewsInfo>
          <span>by&nbsp;</span>
          <span className="author">{author?.name || 'MetaMask'}</span>
          <span className="separator" />
          <span className="publishDate">
            {publishDate ? moment(publishDate).format('MMMM D, YYYY') : ''}
          </span>
        </NewsInfo>
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

const NewsInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-top: 2rem;
  margin-bottom: 3rem;
  padding-top: 0.75rem;

  .separator {
    background-color: #333;
    display: inline-flex;
    height: 1px;
    margin: 0 0.5rem;
    width: 0.5rem;
    body.dark-mode & {
      background-color: #fff;
    }
  }
  .author,
  .publishDate {
    font-weight: 700;
  }

  &::before {
    background-color: #333;
    content: '';
    height: 3px;
    left: 0;
    position: absolute;
    top: 0;
    width: 3.5rem;

    body.dark-mode & {
      background-color: #fff;
    }
  }
`
