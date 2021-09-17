import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const ProfileTitle = ({
  styleOverride,
  text,
}) => {
  if( !text ) return null;
  return (
    <StyledProfileTitle styleOverride={styleOverride}>
      {text}
    </StyledProfileTitle>
  );
};

export default ProfileTitle;


const StyledProfileTitle = styled.h5`
  margin-bottom: 0.4em;
  font-size: ${({theme}) => theme.font.size.lg}rem;
  font-weight: ${({theme}) => theme.font.weight.bold};
  letter-spacing: -0.5px;
  line-height: 1.125rem;
  ${({styleOverride}) => styleOverride || ""}
`;

ProfileTitle.propTypes = {
  styleOverride: PropTypes.string,
  text: PropTypes.string,
}
