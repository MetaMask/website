import PropTypes from 'prop-types'
import React from 'react'
import Card from './Card'
import { getNewsUrl } from '../lib/utils/news'
import styled from 'styled-components'

/**
 * @name -
 * @summary -
 * @description -
 * @prop -
 */
function NewsList(props) {
  const { data } = props

  return (
    <>
      {data.map(news => {
        const { title, subtitle, image, publishDate, authors } = news
        const newsUrl = getNewsUrl(news)
        const hasAuthors = authors && authors.length > 0
        const authorsName =
          hasAuthors &&
          authors.reduce((acc, cur) => {
            acc.push(cur.name)
            return acc
          }, [])
        return (
          <NewsListWrapper>
            <Card
              title={title}
              image={image}
              link={newsUrl}
              description={subtitle}
              layoutType={'news'}
            />
            <NewsInfo hasMt={!!subtitle}>
              <span>by&nbsp;</span>
              <span className="author">
                {hasAuthors ? authorsName.join(', ') : 'MetaMask'}
              </span>
              <span className="separator" />
              <span className="publishDate">{publishDate}</span>
            </NewsInfo>
          </NewsListWrapper>
        )
      })}
    </>
  )
}

const NewsListWrapper = styled.div``

const NewsInfo = styled.div`
  margin-top: ${({ hasMt }) => (hasMt ? '0.75rem' : 0)};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 11px;

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    justify-content: center;
    margin-top: 0.5rem;
  }

  body.light-mode & {
    color: #4c4c4c;
  }
  .separator {
    background-color: #4c4c4c;
    display: inline-flex;
    height: 1px;
    margin: 0 0.5rem;
    width: 0.5rem;
    body.dark-mode & {
      background-color: #fff;
    }
  }
  .author,
  .publishDate {
    font-weight: 700;
  }
`

NewsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}

export default NewsList
