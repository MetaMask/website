import React from 'react'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'
import NewsList from './NewsList'
import { Link } from 'gatsby'
import ArrowIcon from './ArrowIcon'
import { Section } from './StyledGeneral'
import ContentWrapper from './ContentWrapper'
import ParseMD from './ParseMD'
import SocialIcon from './SocialIcon'
import Image from './Image'

function AuthorProfileContent({
  name,
  position,
  twitter,
  linkedin,
  relatedNews,
  expertise,
  description,
  education,
  image,
  heroBgUrl,
  heroBgDarkUrl,
  bgImageUrl,
  bgImageDarkUrl,
  previewMode,
}) {
  const twRegex = /(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?@?([^\/]+)/
  const liRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([^\/]+)/
  const twMatch = twitter.match(twRegex)
  const liMatch = linkedin.match(liRegex)
  const twitterName = twMatch && twMatch[1]
  const linkedinName = liMatch && liMatch[1]
  return (
    <AuthorWrapper>
      <BgImageWrapper cover bgUrl={heroBgUrl} darkBgUrl={heroBgDarkUrl}>
        <Section>
          <ContentWrapper>
            <HeroWrapper>
              <Image
                className="profile-image"
                image={image}
                previewMode={previewMode}
              />
              <div>
                <h1>{name}</h1>
                {position && <div>{position}</div>}
              </div>
            </HeroWrapper>
          </ContentWrapper>
        </Section>
      </BgImageWrapper>
      <BgImageWrapper bgUrl={bgImageUrl} darkBgUrl={bgImageDarkUrl}>
        <Section sectionPadding="120px">
          <ContentWrapper>
            <BodyContentWrapper>
              <div className="social">
                {twitterName && (
                  <div className="social-item">
                    <SocialIcon name="twitter-x" />
                    <a href={twitter} target="_blank" rel="noopener noreferrer">
                      @{twitterName}
                    </a>
                  </div>
                )}
                {linkedinName && (
                  <div className="social-item">
                    <SocialIcon name="linkedin" />
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      /{linkedinName}
                    </a>
                  </div>
                )}
              </div>
              <div className="profile-content">
                {expertise && (
                  <div className="content-item">
                    <strong>Expertise</strong>
                    <p>{expertise}</p>
                  </div>
                )}
                {education && (
                  <div className="content-item">
                    <strong>Education</strong>
                    <ParseMD>{education}</ParseMD>
                  </div>
                )}
                <hr />
                {description && (
                  <>
                    <h3>Experience</h3>
                    <ParseMD>{description}</ParseMD>
                  </>
                )}
              </div>
            </BodyContentWrapper>
          </ContentWrapper>
        </Section>
      </BgImageWrapper>
      {!previewMode && (
        <RelatedNewsWrapper>
          <Section sectionPadding="120px">
            <ContentWrapper>
              <div className="related-news-header">
                <div className="cta-wrapper left">
                  <Link to="/news/">
                    <ArrowIcon news transform={'rotate(180)'} />
                    <span>All posts</span>
                  </Link>
                </div>
                <h2>Articles by {name}</h2>
                <div className="right" />
              </div>
              <div className="news-list-wrapper">
                {!isEmpty(relatedNews) ? (
                  <NewsList data={relatedNews} />
                ) : (
                  <div className="no-blog-found">No articles found</div>
                )}
              </div>
            </ContentWrapper>
          </Section>
        </RelatedNewsWrapper>
      )}
    </AuthorWrapper>
  )
}

export default AuthorProfileContent

const AuthorWrapper = styled.div``

const BgImageWrapper = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;

  ${({ bgUrl }) =>
    bgUrl
      ? ` background-image: url(${bgUrl});
  `
      : ''}
  
  ${({ darkBgUrl }) =>
    darkBgUrl
      ? ` 
      body.dark-mode && {
        background-image: url(${darkBgUrl});
      }
   `
      : ''}

  ${({ cover }) =>
    cover
      ? ` 
      background-size: cover;
   `
      : ''}
  .profile-image {
    width: 182px;
    border-radius: 50%;
  }
`

const RelatedNewsWrapper = styled.div`
  .related-news-header {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: space-between;
    h2 {
      font-size: 24px;
      margin-bottom: 24px;
      text-align: center;
      line-height: 1.2;
    }
    .cta-wrapper {
      align-self: flex-start;
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      a {
        display: inline-flex;
        align-items: center;
        color: ${({ theme }) => theme.text.default};
        transition: color 0.15s ease;
        svg > path {
          transition: stroke 0.15s ease;
          stroke: ${({ theme }) => theme.text.default};
        }
        &:hover {
          color: ${({ theme }) => theme.lightBlue};
          svg > path {
            stroke: ${({ theme }) => theme.lightBlue};
          }
        }
      }
    }
    .left,
    .right {
      flex: 1;
    }
    @media (min-width: ${({ theme }) => theme.device.tablet}) {
      flex-direction: row;
      align-items: center;
      margin-bottom: 64px;
      .cta-wrapper {
        align-self: flex-end;
        margin-bottom: 0;
      }
      h2 {
        margin-bottom: 0;
        font-size: 40px;
      }
    }
  }
  .news-list-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px;
    & > * {
      width: 100%;
      max-width: 315px;
    }
    .no-blog-found {
      text-align: center;
    }
    @media (min-width: ${({ theme }) => theme.device.mobile}) {
      & > * {
        flex: 1;
      }
    }
  }
`

const HeroWrapper = styled.div`
  display: flex;
  max-width: 788px;
  column-gap: 48px;
  row-gap: 16px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;

  h1 {
    font-size: 36px;
    line-height: 1.2;
    margin-bottom: 16px;
  }
  @media (min-width: ${({ theme }) => theme.device.mobile}) {
    flex-direction: row;
    justify-content: flex-start;
    text-align: left;
  }
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    h1 {
      font-size: 48px;
    }
  }
`

const BodyContentWrapper = styled.div`
  display: flex;
  max-width: 788px;
  margin: 0 auto;
  gap: 2rem;
  flex-direction: column-reverse;

  .social {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .social-item {
      display: flex;
      column-gap: 8px;
      font-size: 14px;
      align-items: center;
      padding: 12px;
      border: 1px solid #d6d9dc;
      border-radius: 8px;
      a {
        color: #bbc0c5;

        :hover {
          color: ${({ theme }) => theme.lightBlue};
          text-decoration: underline;
          text-underline-offset: 4px;
        }
      }

      span {
        padding: 0;
      }
    }
  }
  .profile-content {
    .content-item {
      strong {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 12px;
      }
      a:hover {
        text-decoration: underline;
      }
      &:not(:last-child) {
        margin-bottom: 30px;
      }
    }
    h3 {
      font-size: 24px;
      margin-bottom: 24px;
    }
    p {
      color: ${({ theme }) => theme.darkGray};
      .dark-mode & {
        color: ${({ theme }) => theme.white};
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  hr {
    margin: 30px 0;
  }
  @media (min-width: ${({ theme }) => theme.device.mobile}) {
    flex-direction: row;
  }
  @media (min-width: ${({ theme }) => theme.device.tablet}) {
    .social {
      .social-item {
        min-width: 168px;
      }
    }
    hr {
      margin: 50px 0;
    }
  }
`
