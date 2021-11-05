import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card'

const ContentfulCard = props => {
  const {
    moduleConfig: { hasModuleContainer, ...cardDisplayData },
  } = props

  return renderCard({ ...cardDisplayData })
}

export default ContentfulCard

ContentfulCard.propTypes = {
  moduleConfig: PropTypes.shape({
    description: PropTypes.object,
    link: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.object,
    newTab: PropTypes.bool,
  }),
}

const renderCard = props => {
  const { description, title, image, link, newTab } = props

  return (
    <Card
      body={''}
      richText={description}
      title={title}
      image={image}
      link={link}
      newTab={newTab}
    />
  )
}
