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
  line-height: 1.5;
`

const H1 = styled.h1`
  font-size: ${({ theme }) => theme.font.size.x5}rem;
  font-weight: ${({ fontWeightManual, theme }) =>
    !fontWeightManual ? theme.font.weight.bold : 400};
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    font-size: 2.5rem;
  }
  /* work for font-weight manual, admin will control fw of H tag */
  ${Bold} {
    font-weight: ${({ theme }) => theme.font.weight.bold};
  }
`

const H2 = styled.h2`
  font-size: ${({ theme }) => theme.font.size.x4}rem;
  font-weight: ${({ fontWeightManual, theme }) =>
    !fontWeightManual ? theme.font.weight.bold : 400};
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    font-size: 2rem;
  }
  /* work for font-weight manual, admin will control fw of H tag */
  ${Bold} {
    font-weight: ${({ theme }) => theme.font.weight.bold};
  }
`

const H3 = styled.h3`
  font-size: ${({ theme }) => theme.font.size.xxxl}rem;
  font-weight: ${({ fontWeightManual, theme }) =>
    !fontWeightManual ? theme.font.weight.semiBold : 400};
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    font-size: 1.75rem;
  }
  /* work for font-weight manual, admin will control fw of H tag */
  ${Bold} {
    font-weight: ${({ theme }) => theme.font.weight.semiBold};
  }
`

const H4 = styled.h4`
  font-size: ${({ theme }) => theme.font.size.xxl}rem;
  font-weight: ${({ fontWeightManual, theme }) =>
    !fontWeightManual ? theme.font.weight.semiBold : 400};
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    font-size: 1.5rem;
  }
  /* work for font-weight manual, admin will control fw of H tag */
  ${Bold} {
    font-weight: ${({ theme }) => theme.font.weight.semiBold};
  }
`

const H5 = styled.h5`
  font-size: ${({ theme }) => theme.font.size.xl}rem;
  font-weight: ${({ fontWeightManual, theme }) =>
    !fontWeightManual ? theme.font.weight.semiBold : 400};
  @media (max-width: ${({ theme }) => theme.device.mobile}) {
    font-size: 1.25rem;
  }
  /* work for font-weight manual, admin will control fw of H tag */
  ${Bold} {
    font-weight: ${({ theme }) => theme.font.weight.semiBold};
  }
`
