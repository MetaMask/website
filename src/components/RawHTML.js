import React from 'react'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import styled from 'styled-components'

export default props => {
  const { content, options, fontWeightManual } = props

  const document = {
    nodeType: 'document',
    content,
  }
  console.log('props',props)
  const renderOptions = renderOptionsParse({ fontWeightManual })

  return documentToReactComponents(document, { ...renderOptions, ...options })
}

const renderOptionsParse = ({ fontWeightManual }) => ({
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => <P>{children}</P>,
    [BLOCKS.HEADING_1]: (_, children) => (
      <H1 fontWeightManual={fontWeightManual}> {children} </H1>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <H2 fontWeightManual={fontWeightManual}> {children} </H2>
    ),
    [BLOCKS.HEADING_3]: (_, children) => (
      <H3 fontWeightManual={fontWeightManual}> {children} </H3>
    ),
    [BLOCKS.HEADING_4]: (_, children) => (
      <H4 fontWeightManual={fontWeightManual}> {children} </H4>
    ),
    [BLOCKS.HEADING_5]: (_, children) => (
      <H5 fontWeightManual={fontWeightManual}> {children} </H5>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node, _) => {
      if (node.data && node.data.target) {
        const { file, description } = node.data.target.fields

        // No data sent in `node` or notes in Contentful docs
        // on how to find appropriate locale to target when server rendering
        let locale = 'en-US'

        if (!file || !file[locale]) {
          return null
        }

        const { contentType, url } = file[locale]
        const altText = description ? description[locale] : ''

        switch (contentType) {
          case 'image/jpeg':
          case 'image/png':
            return <img src={url} alt={altText} />
          default:
            return null
        }
      }
    },
  },
})

const Bold = styled.span`
  font-weight: ${({ theme }) => theme.font.weight.bold};
`

const P = styled.p`
  font-weight: ${({ theme }) => theme.font.weight.regular};
  font-size: ${({ theme }) => theme.font.size.md}rem;
  line-height: 1.375;
  color: #000;
`

const H1 = styled.h1`
  font-weight: ${({ fontWeightManual, theme }) =>
    !fontWeightManual ? theme.font.weight.bold : 400};
  margin-bottom: 10px;
  margin-top: 30px;
  /* work for font-weight manual, admin will control fw of H tag */
  ${Bold} {
    font-weight: ${({ theme }) => theme.font.weight.bold};
  }
`

const H2 = styled.h2`
  margin-bottom: 10px;
  margin-top: 30px;
  font-weight: ${({ fontWeightManual, theme }) =>
    !fontWeightManual ? theme.font.weight.bold : 400};
  /* work for font-weight manual, admin will control fw of H tag */
  ${Bold} {
    font-weight: ${({ theme }) => theme.font.weight.bold};
  }
`

const H3 = styled.h3`
  margin-bottom: 10px;
  margin-top: 30px;
  font-weight: ${({ fontWeightManual, theme }) =>
    !fontWeightManual ? theme.font.weight.bold : 400};
  
  /* work for font-weight manual, admin will control fw of H tag */
  ${Bold} {
    font-weight: ${({ theme }) => theme.font.weight.bold};
  }
`

const H4 = styled.h4`
  margin-bottom: 10px;
  margin-top: 30px;
  font-weight: ${({ fontWeightManual, theme }) =>
    !fontWeightManual ? theme.font.weight.bold : 400};
  
  /* work for font-weight manual, admin will control fw of H tag */
  ${Bold} {
    font-weight: ${({ theme }) => theme.font.weight.bold};
  }
`

const H5 = styled.h5`
  margin-bottom: 10px;
  margin-top: 30px;
  font-weight: ${({ fontWeightManual, theme }) =>
    !fontWeightManual ? theme.font.weight.bold : 400};
  
  /* work for font-weight manual, admin will control fw of H tag */
  ${Bold} {
    font-weight: ${({ theme }) => theme.font.weight.bold};
  }
`
