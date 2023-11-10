import React, { useContext } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import ParseMD from './ParseMD'
import Context from '../Context/ContextPage'

function DevReleaseNotes() {
  const { extraData } = useContext(Context)

  if (!extraData) return null

  return (
    <Wrapper>
      {extraData?.map((item, index) => (
        <div className={classnames('release-wrapper', item.type)} key={index}>
          <div className="release-info">
            <div className="release-name">{item.title}</div>
          </div>
          <div className="release-content">
            {item.version ? <span>{item.version}&nbsp;</span> : null}
            {item.date ? (
              <span className="release-date">({item.date})</span>
            ) : null}
            <ParseMD>{item.content}</ParseMD>
            <a
              className="view-full-changelog"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View full changelog
            </a>
          </div>
        </div>
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
      /* max-height: 400px;
      overflow-y: scroll; */
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
