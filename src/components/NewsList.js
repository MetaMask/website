import PropTypes from 'prop-types'
import React from 'react'
import Card from './Card'
import { getNewsUrl } from '../lib/utils/news'
import styled from 'styled-components'
import Image from './Image'

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
        const { title, subtitle, image, publishDate, author } = news
        const newsUrl = getNewsUrl(news)
        return (
          <NewsListWrapper>
            <Card
              title={title}
              image={image}
              link={newsUrl}
              description={subtitle}
              layoutType={'news'}
            />
            <NewsInfo>
              {author?.avatar && <ImageSrc image={author.avatar} />}
              <div>
                {author?.name && <div>{author.name}</div>}
                <div className="publishDate">{publishDate}</div>
              </div>
            </NewsInfo>
          </NewsListWrapper>
        )
      })}
    </>
  )
}

const NewsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const NewsInfo = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.device.mobileMediaMax}) {
    justify-content: center;
    margin-top: 0.5rem;
  }
  .publishDate {
    body.light-mode & {
      color: #535a61;
    }
  }
`

const ImageSrc = styled(Image)`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  object-fit: cover;
  margin-right: 0.75rem;
`

NewsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}

export default NewsList
