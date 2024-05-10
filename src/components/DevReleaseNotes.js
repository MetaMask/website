import classnames from 'classnames'
import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Context from '../Context/ContextPage'
import ParseMD from './ParseMD'

function ReleaseNoteItem({ type, title, version, date, content, url }) {
  const [isCollapsed, setCollapsed] = useState(content.trim().length > 1000)

  return (
    <div
      className={classnames('release-wrapper', type, {
        collapsed: isCollapsed,
      })}
    >
      <div className="release-info">
        <div className="release-name">{title}</div>
      </div>
      <div className="release-content">
        {version ? <span>{version}&nbsp;</span> : null}
        {date ? <span className="release-date">({date})</span> : null}
        <ParseMD>{content}</ParseMD>
        <a
          className="view-full-changelog"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View full
        </a>
        {isCollapsed && (
          <div
            className="view-more"
            onClick={() => setCollapsed(false)}
            aria-label="Click to view more"
          >
            <a role="button">View more</a>
          </div>
        )}
      </div>
    </div>
  )
}

function DevReleaseNotes() {
  const { extraData } = useContext(Context)

  if (!extraData) return null

  return (
    <Wrapper>
      {extraData?.map((item, index) => (
        <ReleaseNoteItem
          key={index}
          type={item.type}
          title={item.title}
          version={item.version}
          date={item.date}
          content={item.content}
          url={item.url}
        />
      ))}
    </Wrapper>
  )
}

export default DevReleaseNotes

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  h2 {
    font-size: 18px !important;
    line-height: 1.2;
    font-weight: 500;
  }
  h3 {
    font-size: 16px;
    line-height: 1.2;
    font-weight: 400;
  }

  .release-wrapper {
    display: flex;
    gap: 16px;

    &.collapsed {
      .release-content {
        max-height: 320px;
        overflow: hidden;
        position: relative;

        .view-more {
          background: linear-gradient(
            to top,
            rgba(255, 255, 255, 1),
            rgba(255, 255, 255, 0.8) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          body.dark-mode & {
            background: linear-gradient(
              to top,
              rgba(18, 18, 18, 1),
              rgba(18, 18, 18, 0.9) 60%,
              rgba(18, 18, 18, 0) 100%
            );
          }
          position: absolute;
          z-index: 2;
          bottom: 0;
          height: 100px;
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;

          a {
            font-size: 14px;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }

    &:nth-child(odd) {
      .release-content {
        &::after {
          width: 1.5px;
          background-color: #88e39d;
        }
      }
    }
    &:nth-child(even) {
      .release-content {
        &::after {
          width: 1.5px;
          background-color: #f5841f;
        }
      }
    }

    ul {
      margin-bottom: 8px;

      li {
        margin-bottom: 4px;
        line-height: 1.2;
      }
      & > li:last-child {
        margin-bottom: 0;
      }
    }
    ul:last-child {
      margin-bottom: 0;
    }

    .release-info {
      flex-basis: 70px;
      flex-shrink: 0;
      font-size: 14px;

      @media (min-width: ${({ theme }) => theme.device.mobile}) {
        flex-basis: 100px;
      }
      @media (min-width: ${({ theme }) => theme.device.tablet}) {
        flex-basis: 150px;
      }
    }

    .release-date {
      font-size: 16px;
      margin-bottom: 8px;
      display: inline-block;
    }
    .release-name {
      color: #8d8d8d;
    }
    .release-content {
      padding-left: 24px;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        inset: 0;
      }

      blockquote {
        margin-left: 0;
        margin-bottom: 8px;
      }
      p {
        margin-bottom: 16px;
      }
      p:last-child {
        margin-bottom: 0;
      }
      a.view-full-changelog {
        font-size: 14px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    &.infura-sdk {
      .release-content {
        h4 {
          font-weight: 500;
          font-size: 16px;
        }
      }
    }
    &.metamask {
      .release-content {
        h3 {
          font-size: 12px;
          margin: 4px 0;
        }
      }
    }
  }
`
