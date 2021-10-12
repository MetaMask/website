import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const ProfileImage = ({
  alt,
  containerStyleOverride,
  imageStyleOverride,
  src,
}) => {
  return (
    <StyledProfileImageContainer styleOverride={containerStyleOverride}>
      <StyledProfileImage
        fixed={src}
        alt={alt}
        styleOverride={imageStyleOverride}
      />
    </StyledProfileImageContainer>
  );
};

export default ProfileImage;

const StyledProfileImageContainer = styled.div`
  display: flex;  
  flex-direction: column;
  justify-content: flex-start;
  width: 100px;
  height: auto;
  border-radius: 50%;
  ${({styleOverride}) => styleOverride || ""}
`;

const StyledProfileImage = styled(Img)`
  width: 100%;
  height: 100%;
  margin: auto;
  border-radius: 50%;
  box-shadow: ${({theme}) => theme.shadow.light};
  ${({styleOverride}) => styleOverride || ""}
  
  & img {
    margin-bottom: 0;
  }
`;

ProfileImage.propTypes = {
  alt: PropTypes.string.isRequired,
  containerStyleOverride:  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  imageStyleOverride:  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  src: PropTypes.object.isRequired,
}
