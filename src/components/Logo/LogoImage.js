import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { parseContentfulAssetUrl } from '../../lib/utils/urlParser'
import classnames from 'classnames'

const LogoImage = ({ alt = '', src, width, height, srcDarkMode, previewMode }) => {
  return (
    <StyledPartnerImageContainer className={'LogoImageWrapper'}>
      {getImage(src) ? (
        <StyledPartnerImage
          image={getImage(src)}
          alt={alt}
          $widthCustom={width}
          width={width || 400}
          height={height || 400}
          className={classnames({ 'image-light': srcDarkMode })}
        />
      ) : (
        <StyledImage
          src={parseContentfulAssetUrl(src, previewMode)}
          alt={alt}
          loading="lazy"
          $widthCustom={width}
          width={width || 400}
          height={height || 400}
          className={classnames({ 'image-light': srcDarkMode })}
        />
      )}
      {getImage(srcDarkMode) ? (
        <StyledPartnerImage
          image={getImage(srcDarkMode)}
          alt={alt}
          $widthCustom={width}
          width={width || 400}
          height={height || 400}
          className="image-dark"
        />
      ) : (
        srcDarkMode && (
          <StyledImage
            src={parseContentfulAssetUrl(srcDarkMode, previewMode)}
            alt={alt}
            loading="lazy"
            $widthCustom={width}
            width={width || 400}
            height={height || 400}
            className="image-dark"
          />
        )
      )}
    </StyledPartnerImageContainer>
  )
}

export default LogoImage

const StyledPartnerImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: auto;
`

const StyledPartnerImage = styled(GatsbyImage)`
  ${({ $widthCustom }) =>
    $widthCustom
      ? `
    width: ${$widthCustom};
    margin: 0 auto;
    height: auto !important;
  `
      : ''}
`

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;

  ${({ $widthCustom }) =>
    $widthCustom
      ? `
    width: ${$widthCustom};
    margin: 0 auto;
    `
      : ''}
`

LogoImage.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
}
