import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card'
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser'

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
  const { description, title, image, link, newTab } = props

  const imageUrl = parseContentfulAssetUrl(image)

  return (
    <Card
      body={''}
      richText={description}
      title={title}
      image={imageUrl}
      link={link}
      newTab={newTab}
    />
  )
}
