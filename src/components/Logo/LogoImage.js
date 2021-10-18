import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const LogoImage = ({
  alt,
  src,
}) => {
  return (
    <StyledPartnerImageContainer >
      <StyledPartnerImage
        fixed={src}
        alt={alt}
        objectFit="contain"
        objectPosition="50% 50%"
      />
    </StyledPartnerImageContainer>
  );
};

export default LogoImage;

const StyledPartnerImageContainer = styled.div`
  display: flex;  
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: auto;
`;

const StyledPartnerImage = styled(Img)`
  width: 100% !important;
  height: 130px !important;
  margin: auto;
  
  & img {
    margin-bottom: 0;
    object-fit: contain !important;
  }
`;

LogoImage.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.object.isRequired,
}
