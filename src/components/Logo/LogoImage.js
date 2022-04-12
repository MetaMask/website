import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import ContextClientSide from '../../Context/ContextClientSide'

const LogoImage = ({ alt, src, width, height, srcDarkMode }) => {
  const { darkMode: darkModeContextValue } = React.useContext(ContextClientSide)
  const { isDarkMode } = darkModeContextValue || {}
  return (
    <StyledPartnerImageContainer>
      <StyledPartnerImage
        src={isDarkMode && srcDarkMode ? srcDarkMode : src}
        alt={alt}
        widthCustom={width}
        width={width || 400}
        height={height || 400}
        loading="lazy"
      />
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

const StyledPartnerImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;

  ${({ widthCustom }) =>
    widthCustom
      ? `
    width: ${widthCustom};
    margin: 0 auto;
    height: auto !important;
  `
      : ''}
`

LogoImage.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}
