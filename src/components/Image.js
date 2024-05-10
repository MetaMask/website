import React from 'react'
import { parseContentfulAssetUrl } from '../lib/utils/urlParser'
import Link from './Link'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useMediaQuery } from 'react-responsive'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const Image = props => {
  const {
    image,
    imageMobile,
    darkImage,
    darkImageMobile,
    src,
    link,
    lazyLoad = true,
    previewMode = false,
    className,
    ...rest
  } = props
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)',
  })

  const { title = '', description } = image || {}

  if (!image && !src) return null

  const imgSrc = isMobile && imageMobile ? imageMobile : image

  const darkImgSrc = isMobile && darkImageMobile ? darkImageMobile : darkImage

  const imageElement = (
    <>
      {getImage(imgSrc) && !src ? (
        <StyledGatsbyImage
          alt={description || title}
          image={getImage(imgSrc)}
          width={getImage(imgSrc).width}
          height={getImage(imgSrc).height}
          className={classnames(className, { 'image-light': darkImage })}
        />
      ) : (
        <StyledImage
          loading={lazyLoad ? 'lazy' : 'eager'}
          decoding="async"
          src={src || parseContentfulAssetUrl(imgSrc, previewMode)}
          alt={description || title}
          width="640"
          height="360"
          className={classnames(className, { 'image-light': darkImage })}
          {...rest}
        />
      )}
      {getImage(darkImgSrc) ? (
        <StyledGatsbyImage
          alt={description || title}
          image={getImage(darkImgSrc)}
          width={getImage(darkImgSrc).width}
          height={getImage(darkImgSrc).height}
          className={classnames(className, 'image-dark')}
        />
      ) : (
        darkImgSrc && (
          <StyledImage
            loading={lazyLoad ? 'lazy' : 'eager'}
            decoding="async"
            src={parseContentfulAssetUrl(darkImgSrc, previewMode)}
            alt={description || title}
            width="640"
            height="360"
            className={classnames(className, 'image-dark')}
            {...rest}
          />
        )
      )}
    </>
  )

  if (link) {
    return (
      <LinkImage newTab to={link}>
        {imageElement}
      </LinkImage>
    )
  }
  return imageElement
}

export default Image

Image.propTypes = {
  image: PropTypes.object,
  imageMobile: PropTypes.object,
  darkImage: PropTypes.object,
  darkImageMobile: PropTypes.object,
  src: PropTypes.string,
  link: PropTypes.string,
  lazyLoad: PropTypes.bool,
  previewMode: PropTypes.bool,
}

const LinkImage = styled(Link)`
  display: block;
`

const StyledGatsbyImage = styled(GatsbyImage)`
  &.gatsby-image-wrapper img {
    width: auto;
    height: auto;
    max-height: 100%;
    max-width: 100%;
  }

  .imageWidth280 & {
    width: 280px;
  }

  @media (max-width: ${({ theme }) => theme.device.tabletMediaMax}) {
    .imageMobileMaxWidth180 & {
      max-width: 180px;
    }
  }
`

const StyledImage = styled.img`
  .imageWidth280 & {
    width: 280px;
  }
`
