import React from 'react'
import styled from 'styled-components'
import RawHTML from './RawHTML'
import { kebabCase } from 'lodash'

const RichText = props => {
  const { title, content, html, displayTitle = true, fontWeightManual } = props

  return (
    <RichTextWrapper id={kebabCase(title || '')}>
      {displayTitle && <RichTextTitle> {title} </RichTextTitle>}
      {content && (
        <RawHTML content={content} fontWeightManual={fontWeightManual} />
      )}
      {html && <HTML dangerouslySetInnerHTML={{ __html: html }} />}
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
`;