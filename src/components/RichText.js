import React from 'react'
import styled from 'styled-components'
import RawHTML from './RawHTML'
import { kebabCase } from 'lodash'

const RichText = props => {
  const { title, content, displayTitle = true, fontWeightManual } = props

  return (
    <RichTextWrapper id={kebabCase(title || '')}>
      {displayTitle && <RichTextTitle> {title} </RichTextTitle>}
      {content && (
        <RawHTML content={content} fontWeightManual={fontWeightManual} />
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
