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
