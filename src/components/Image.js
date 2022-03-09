import React from 'react'
import { parseContentfulAssetUrl } from '../lib/utils/urlParser'

const Image = props => {
  const { image, src, ...rest } = props
  const { title, description } = image || {}
  const urlImg = src ? src : parseContentfulAssetUrl(image)
  if (!urlImg) return null
  return (
    <img
      loading={'lazy'}
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
