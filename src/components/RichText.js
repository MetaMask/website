import React from 'react'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'

const RichText = props => {
  const { moduleId, title, html, displayTitle = true } = props
  return (
    <RichTextWrapper id={moduleId || kebabCase(title || '')}>
      {displayTitle && <RichTextTitle> {title} </RichTextTitle>}
      {html && (
        <HTML className="richText" dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </RichTextWrapper>
  )
}

export default RichText

const RichTextWrapper = styled.div`
  padding: 0;

  .gatsby-remark-prismjs-copy-button-container {
    left: -3px;

    & > div.gatsby-remark-prismjs-copy-button {
      color: black;
      padding: 3px 8px 2px;
      opacity: 0.3;
      transition: all 0.2s ease-in-out;

      &:hover {
        opacity: 1;
        background-color: lightgray;
      }

      @media (max-width: 600px) {
        visibility: hidden;
      }
    }
  }

  .gatsby-highlight {
    position: relative;
  }

  pre[class*='language-'] {
    font-size: 0.85rem;
    padding: 2rem 1.5rem 1.5rem;
  }

  .gatsby-highlight pre[class*='language-']::before {
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
    top: 0px;
  }
  .gatsby-highlight pre[class='language-javascript']::before {
    content: 'js';
    background: #f7df1c;
  }
  .gatsby-highlight pre[class='language-js']::before {
    content: 'js';
    background: #f7df1c;
  }
  .gatsby-highlight pre[class='language-css']::before {
    content: 'css';
    background: #ff9800;
  }
  .gatsby-highlight pre[class~='language-html']::before {
    content: 'html';
    background: #005a9c;
  }

  pre {
    background-color: #fcfaf6;
    & > code > span {
      background-color: transparent !important;
    }
  }
  code[class='language-text'] {
    background-color: #f5f5f5;
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
