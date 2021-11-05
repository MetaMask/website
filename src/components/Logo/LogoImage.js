import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const LogoImage = ({ alt, src }) => {
  return (
    <StyledPartnerImageContainer>
      <StyledPartnerImage src={src} alt={alt} />
    </StyledPartnerImageContainer>
  )
}

export default LogoImage

const StyledPartnerImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: auto;
`

const StyledPartnerImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`

LogoImage.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
}
