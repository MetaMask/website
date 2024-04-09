import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import ContentWrapper from '../ContentWrapper'
import ImageItem from '../Image'
import { EyebrowStyle } from '../StyledGeneral'
import ParseMD from '../ParseMD'
import withProcessPreviewData from '../../lib/utils/withProcessPreviewData'

const ContentfulTimeline = props => {
  const {
    moduleConfig: {
      eyebrow,
      headline,
      description,
      image,
      imageDarkMode,
      layout,
      customClass,
      previewMode = false,
    },
  } = props

  const { childMarkdownRemark: { html: htmlDescription } = {} } =
    description || {}
  const { childMarkdownRemark: { html: htmlHeadline } = {} } = headline || {}
  const isDeveloperLayout = layout === 'Developer'

  console.log(layout);

  return (
    <Container
      className={classnames({
        'layout-developer': isDeveloperLayout,
      })}
    >
      <ContentWrapper customClass={customClass}>
        <div className="time-line-wrapper-inner">
          {eyebrow && isDeveloperLayout ? (
            <span className="release-date">{eyebrow}</span>
          ) : null}
          <div className="timeline">
            <div className="container right">
              <div className="content">
                {eyebrow && !isDeveloperLayout ? (
                  <Eyebrow>{eyebrow}</Eyebrow>
                ) : null}
                <div className="text-content">
                  {headline ? (
                    <Headline hasEyebrow={eyebrow}>
                      {previewMode ? (
                        <ParseMD>{headline}</ParseMD>
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{ __html: htmlHeadline }}
                        />
                      )}
                    </Headline>
                  ) : null}
                  {previewMode ? (
                    <Description>
                      <ParseMD>{description}</ParseMD>
                    </Description>
                  ) : (
                    <Description
                      dangerouslySetInnerHTML={{ __html: htmlDescription }}
                    />
                  )}
                </div>
                {image ? (
                  <ImageSrc
                    image={image}
                    darkImage={imageDarkMode}
                    previewMode={previewMode}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </Container>
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

export default withProcessPreviewData(parsePreviewData)(ContentfulTimeline)

ContentfulTimeline.propTypes = {
  moduleConfig: PropTypes.shape({
    eyebrow: PropTypes.string,
    headline: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    description: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    image: PropTypes.object,
    imageDarkMode: PropTypes.object,
    customClass: PropTypes.string,
    previewMode: PropTypes.bool,
  }),
}

const Container = styled.article`
  margin-bottom: 0 !important;
  &.layout-developer {
    .time-line-wrapper-inner {
      display: flex;
    }
    .container {
      padding-left: 23px !important;
      padding-right: 0 !important;
    }
    & > div {
      padding-left: 0;
      padding-right: 0;
    }
    .release-date {
      color: #8d8d8d;
      font-size: 14px;
      flex-basis: 33.33%;
      min-width: 48px;
    }
    &:nth-child(odd) {
      .timeline {
        &::after {
          margin-left: 8px;
          width: 2px;
          background-color: #88e39d;
        }
      }
    }
    &:nth-child(even) {
      .timeline {
        &::after {
          margin-left: 8px;
          width: 2px;
          background-color: #f5841f;
        }
      }
    }
    .container::after {
      display: none;
    }
    .content {
      padding: 0;
      .text-content {
        p:last-child {
          margin-bottom: 0;
        }
        a {
          font-size: 18px;
          font-weight: 400;
        }
      }
    }

    &:not(:last-child) {
      margin-bottom: 16px !important;
    }
  }
  .timeline {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
  }

  .timeline::after {
    content: '';
    position: absolute;
    width: 1px;
    background-color: #d6d9dc;
    top: 0;
    bottom: 0;
    margin-left: -3px;
  }
  .container {
    padding-left: 23px;
    position: relative;
    background-color: inherit;
  }

  .container::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    right: -17px;
    background-color: #f5841f;
    ${({ theme }) => `border: 4px solid ${theme.white};`}
    top: 28px;
    border-radius: 50%;
    z-index: 1;
    .dark-mode & {
      ${({ theme }) => `border: 4px solid ${theme.darker};`}
    }
  }

  .right::after {
    left: -13px;
  }

  .content {
    padding: 32px 0;
    position: relative;
    border-radius: 6px;
  }

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    .container {
      width: 100%;
      padding-left: 15px;
      padding-right: 25px;
    }

    .right {
      left: 0%;
    }
  }
  .text-content {
    @media (min-width: ${({ theme }) => theme.device.tablet}) {
      display: flex;
      justify-content: space-between;
    }
  }
`

const Headline = styled.h3`
  width: 40%;
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    width: 100%;
  }
`

const Eyebrow = styled(EyebrowStyle)`
  color: #f5841f;
  margin-bottom: 14px;
`

const Description = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 22.82px;
  width: 55%;
  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    width: 100%;
  }
  .layout-developer & {
    width: 100%;
  }

  ol {
    list-style-type: none;
    counter-reset: li;
    margin-left: 0;
    li:before {
      counter-increment: li;
      content: counter(li, decimal-leading-zero);
      color: #f5841f;
      font-weight: 700;
      margin-right: 10px;
    }
  }
`

const ImageSrc = styled(ImageItem)`
  display: block;
  margin: 0 auto;
  max-width: 100%;
  width: auto;
  height: auto;
`
