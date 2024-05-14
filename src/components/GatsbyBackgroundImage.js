import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { useMediaQuery } from 'react-responsive'
import styled, { useTheme } from 'styled-components'
import ContextClientSide from '../Context/ContextClientSide'
import { parseContentfulAssetUrl } from '../lib/utils/urlParser'
import classnames from 'classnames'

const GatsbyBackgroundImage = props => {
  const {
    image,
    imageMobile,
    imageDarkMode,
    children,
    mobileImageBreakpoint = 'tablet',
    absolute = false,
    className,
    previewMode,
  } = props

  const theme = useTheme()
  const { title } = image || {}

  const { darkMode: darkModeContextValue } = useContext(ContextClientSide)
  const { isDarkMode } = darkModeContextValue || {}

  const isMobile =
    useMediaQuery({
      query: `(max-width: ${
        mobileImageBreakpoint
          ? theme.device.mobileMediaMax
          : theme.device.tabletMediaMax
        })`,
    }) && !!imageMobile

  if (!image && !imageMobile) {
    return children
  }

  const imageSrc = isMobile
    ? imageMobile
    : isDarkMode && imageDarkMode
      ? imageDarkMode
      : image

  const parsedContentfulAssetUrl = parseContentfulAssetUrl(
    imageSrc,
    previewMode
  )

  return (
    <Wrapper
      background={!getImage(imageSrc) && parsedContentfulAssetUrl}
      className={classnames(className, 'gatsby-bg__wrapper')}
    >
      {getImage(imageSrc) && (
        <>
          <StyledGatsbyImage
            image={getImage(isMobile ? imageMobile : image) || {}}
            alt={title || ''}
            $absolute={absolute}
            width={getImage(isMobile ? imageMobile : image).width}
            height={getImage(isMobile ? imageMobile : image).height}
            className={classnames({ 'image-light': imageDarkMode })}
          />
          {imageDarkMode && (
            <StyledGatsbyImage
              image={getImage(isMobile ? imageMobile : imageDarkMode) || {}}
              alt={title || ''}
              $absolute={absolute}
              width={getImage(isMobile ? imageMobile : imageDarkMode).width}
              height={getImage(isMobile ? imageMobile : imageDarkMode).height}
              className="image-dark"
            />
          )}
        </>
      )}
      <Content className="gatsby-bg__content">{children}</Content>
    </Wrapper>
  )
}

GatsbyBackgroundImage.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  imageMobile: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  imageDarkMode: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  title: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  mobileImageBreakpoint: PropTypes.oneOf(['mobile', 'tablet']),
  absolute: PropTypes.bool,
}

export default GatsbyBackgroundImage

export const Wrapper = styled.div`
  ${({ background }) =>
    background
      ? `
    background-image: url(${background});
    background-size: cover;
    background-repeat: no-repeat;
    `
      : ``}
  display: grid;
  height: 100%;
  width: 100%;

  #snaps-guides & {
    position: relative;
    overflow: hidden;
  }
`

const StyledGatsbyImage = styled(GatsbyImage)`
  grid-area: 1/1;
  ${({ $absolute }) =>
    $absolute &&
    `
      position: absolute !important;
      inset: 0;
  `}

  #snaps-guides & {
    position: absolute;
    inset: 0;
  }

  .snaps-security & img {
    object-position: center bottom;
  }
`

const Content = styled.div`
  grid-area: 1/1;
  position: relative;
  place-items: center;
  display: grid;
  height: fit-content;
`
