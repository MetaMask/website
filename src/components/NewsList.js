import PropTypes from 'prop-types'
import React from 'react'
import Wrapper from './ContentWrapper'
import Card from './Card'
import { getNewsUrl } from '../lib/utils/news'

/**
 * @name -
 * @summary -
 * @description -
 * @prop -
 */
function NewsList(props) {
  const { stories } = props

  return (
    <Wrapper>
      {stories.map(news => {
        const { title, subtitle, image } = news
        const newsUrl = getNewsUrl(news)
        return (
          <Card
            title={title}
            image={image}
            link={newsUrl}
            description={subtitle}
            layoutType={'news'}
          />
        )
      })}
    </Wrapper>
  )
}

NewsList.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}

export default NewsList
