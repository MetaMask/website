import React from 'react'
import { parseContentfulAssetUrl } from '../lib/utils/urlParser'

const Image = props => {
  const { image, classname, src } = props
  const { title, description } = image || {}
  const urlImg = src ? src : parseContentfulAssetUrl(image)
  if (!urlImg) return null
  return <img src={urlImg} alt={description || title} className={classname} />
}

export default Image
