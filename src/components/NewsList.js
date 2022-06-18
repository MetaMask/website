import PropTypes from 'prop-types'
import React from 'react'
import Card from './Card'
import { getNewsUrl } from '../lib/utils/news'

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
    </>
  )
}

NewsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
}

export default NewsList
