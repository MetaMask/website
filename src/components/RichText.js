import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import Markdown from './Markdown'

function parseHTML(html) {
  return html.replace(/<img.*?src="(.*?)"/g, (match, p1) => {
    return match.replace(p1, `${p1}?w=1280&q=80&fm=webp" width="1280" height="720"`)
  })
}

const RichText = props => {
  const { moduleId, title, html, displayTitle = true, content } = props

  return (
    <RichTextWrapper id={moduleId || kebabCase(title || '')}>
      {displayTitle && <RichTextTitle> {title} </RichTextTitle>}
      {html && (
        // eslint-disable-next-line react/jsx-pascal-case
        <HTML className="richText" dangerouslySetInnerHTML={{ __html: parseHTML(html) }} />
      )}
      {!html && content && <Markdown content={content} />}
    </RichTextWrapper>
  )
}

export default RichText

const RichTextWrapper = styled.div`
  padding: 0;

  pre[class*='language-'] {
    font-size: 0.85rem;
    padding: 2rem 1.5rem 1.5rem;
    margin: 0 0 1.45rem;

    & > span.line-numbers-rows {
      top: 2rem;
    }
  }

  pre[class*='line-numbers'] {
    padding: 2rem 1.5rem 1.5rem 3rem;
    & > code[class*='language-']::before {
      left: 0;
      top: -2rem;
    }
  }

  pre > code[class*='language-']::before {
    border-radius: 0px 0px 4px 4px;
    color: black;
    font-size: 0.75rem;
    font-family: inherit;
    font-weight: 400;
    letter-spacing: 0.075em;
    line-height: 1;
    padding: 0.25rem 0.5rem;
    position: absolute;
    left: 1.5rem;
    text-align: right;
    text-transform: uppercase;
    text-shadow: none;
    top: 0;
  }
  code[class*='language-'] {
    span.token.operator {
      background-color: transparent;
    }
    font-family: inherit;
    font-size: 13.6px;
    background-color: #fcfaf6;
    text-shadow: none;
    body.dark-mode & {
      background-color: #fcfaf6;
    }
  }
  pre > code[class~='language-javascript']::before {
    content: 'js';
    background: #f7df1c;
  }
  pre > code[class~='language-js']::before {
    content: 'js';
    background: #f7df1c;
  }
  pre > code[class~='language-ts']::before {
    content: 'ts';
    background: #005a9c;
    color: #fff;
  }
  pre > code[class~='language-typescript']::before {
    content: 'ts';
    background: #005a9c;
    color: #fff;
  }
  pre > code[class~='language-css']::before {
    content: 'css';
    background: #ff9800;
  }
  pre > code[class~='language-html']::before {
    content: 'html';
    background: #005a9c;
  }
  pre > code[class~='language-solidity']::before {
    content: 'sol';
    background: #636363;
    color: #fff;
  }
  pre > code[class~='language-sol']::before {
    content: 'sol';
    background: #636363;
    color: #fff;
  }

  pre {
    position: relative;
    background-color: #fcfaf6;
  }
  .btn-copy {
    position: relative;
    display: flex;
    justify-content: flex-end;
    top: 28px;
    margin-top: -28px;
    z-index: 2;
    button {
      border: none;
      cursor: pointer;
      border-radius: 3px;
      font-size: 13px;
      background-color: transparent;
      opacity: 0.5;
      padding: 3px 8px;
      transition: all 0.2s ease-in-out;
      :hover {
        opacity: 1;
        background-color: lightgray;
      }
    }
    transition: all 0.5s ease-in-out;
    &.copying {
      opacity: 0.6;
      animation: opacity-hide-show 1.6s;
    }
  }
  code[class='language-text'] {
    background-color: #f5f5f5;
  }
  code {
    body.dark-mode & {
      background-color: darkgray;
    }
    &::after {
      content: '';
    }
  }
`

const RichTextTitle = styled.h2`
  margin-bottom: 1rem;
  @media (min-width: ${({ theme }) => theme.device.desktop}) {
    margin-bottom: 2rem;
  }
`
const HTML = styled.div`
  > p:last-child {
    margin-bottom: 0;
  }
`
