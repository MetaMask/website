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
    cardDescription: PropTypes.object,
    cardLink: PropTypes.string,
    cardTitle: PropTypes.string,
    cardImage: PropTypes.object,
    cardLinkOpensNewTab: PropTypes.boolean,
    isFeatured: PropTypes.bool,
    featuredBackground: PropTypes.object,
  }),
}

const renderCard = props => {
  const {
    cardDescription,
    cardTitle,
    cardImage,
    cardLink,
    cardLinkOpensNewTab,
  } = props

  return (
    <Card
      body={''}
      richText={cardDescription}
      title={cardTitle}
      image={cardImage && cardImage.fluid}
      link={cardLink}
      newTab={cardLinkOpensNewTab}
    />
  )
}
