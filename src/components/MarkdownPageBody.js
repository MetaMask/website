import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import ContentWrapper from './ContentWrapper'
import { Section } from './StyledGeneral'
import ParseMD from './ParseMD'

const MarkdownPageBody = ({ pageData }) => {
  const {
    body,
    frontmatter: { date, title },
  } = pageData || {}
  return (
    <Section>
      <ContentWrapper>
        <WrapperInner>
          <h1
            className="title"
            dangerouslySetInnerHTML={{
              __html: title || 'Terms of use',
            }}
          />
          {date && (
            <h2
              className="description"
              dangerouslySetInnerHTML={{
                __html: `Last Updated: ${date}`,
              }}
            />
          )}
          <ParseMD>{body}</ParseMD>
        </WrapperInner>
      </ContentWrapper>
    </Section>
  )
}

export default MarkdownPageBody

MarkdownPageBody.propTypes = {
  pageData: PropTypes.shape({
    frontmatter: PropTypes.shape({
      date: PropTypes.string,
      title: PropTypes.string,
    }),
    body: PropTypes.string.isRequired,
  }).isRequired,
}

const WrapperInner = styled.div`
  h1.title {
    text-align: center;
    & > p {
      margin-bottom: 0;
    }
  }

  h2.description {
    font-weight: 400;
    text-align: center;
    margin-bottom: 32px;
    font-size: 16px;
  }

  h3,
  h4 {
    margin: 24px 0;
  }

  th,
  td {
    border: 1px solid black;
    border-collapse: collapse;
    padding: 16px 32px;
    text-align: left;
  }

  table {
    margin: 24px 0;
    display: block;
    overflow: auto;
    border-collapse: collapse;
    word-break: normal;
    word-wrap: normal;
  }

  th {
    padding: 40px 32px;
  }

  td {
    @media (min-width: 1024px) {
      min-width: 250px;
    }
  }
`
