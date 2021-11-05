import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'

import Arrow from './ArrowIcon'
import Link from './Link'
import Img from 'gatsby-image'

/**
 * @name Card
 * @summary -
 * @description - Module for blog content
 */
const StyledCard = props => {
  const { description, image, link, title, newTab } = props

  return (
    <div>card</div>
  )
}

export default StyledCard

StyledCard.propTypes = {
  body: PropTypes.string,
  image: PropTypes.object,
  link: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
}
