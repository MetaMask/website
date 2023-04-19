import React from 'react'
import { parseContentfulAssetUrl } from '../lib/utils/urlParser'
import Link from './Link'
import styled from 'styled-components'

const Image = props => {
  const {
    image,
    darkImage,
    src,
    link,
    lazyLoad = true,
    previewMode = false,
    ...rest
  } = props

  const { title, description } = image || {}
  let urlImg = src ? src : parseContentfulAssetUrl(image, previewMode)
  let urlDarkImg = parseContentfulAssetUrl(darkImage, previewMode)

  if (urlDarkImg) {
    urlDarkImg = urlDarkImg + '#only-dark'
    urlImg = urlImg + '#only-light'
  }

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
        {urlDarkImg ? (
          <img
            loading={lazyLoad ? 'lazy' : 'eager'}
            decoding="async"
            src={urlDarkImg}
            alt={description || title}
            width="640"
            height="360"
            {...rest}
          />
        ) : null}
      </LinkImage>
    )
  }
  return (
    <>
      <img
        loading={lazyLoad ? 'lazy' : 'eager'}
        decoding="async"
        src={urlImg}
        alt={description || title}
        width="640"
        height="360"
        {...rest}
      />
      {urlDarkImg ? (
        <img
          loading={lazyLoad ? 'lazy' : 'eager'}
          decoding="async"
          src={urlDarkImg}
          alt={description || title}
          width="640"
          height="360"
          {...rest}
        />
      ) : null}
    </>
  )
}

export default Image

const LinkImage = styled(Link)`
  display: block;
`
