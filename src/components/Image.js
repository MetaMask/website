import React from 'react'
import { parseContentfulAssetUrl } from '../lib/utils/urlParser'
import Link from './Link'
import styled from 'styled-components'

const Image = props => {
  const {
    image,
    src,
    link,
    lazyLoad = true,
    previewMode = false,
    ...rest
  } = props
  const { title, description } = image || {}

  const urlImg = src ? src : parseContentfulAssetUrl(image, previewMode)
  if (!urlImg) return null
  if (link) {
    return (
      <LinkImage newTab to={link}>
        <img
          loading={lazyLoad ? 'lazy' : 'eager'}
          decoding="async"
          src={urlImg}
          alt={description || title}
          width="640"
          height="360"
          {...rest}
        />
      </LinkImage>
    )
  }
  return (
    <img
      loading={lazyLoad ? 'lazy' : 'eager'}
      decoding="async"
      src={urlImg}
      alt={description || title}
      width="640"
      height="360"
      {...rest}
    />
  )
}

export default Image

const LinkImage = styled(Link)`
  display: block;
`
