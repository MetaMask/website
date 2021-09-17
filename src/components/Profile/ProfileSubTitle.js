import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const ProfileSubTitle = ({
  styleOverride,
  text,
}) => {
  if( !text ) return null;
  return (
    <StyledProfileSubTitle styleOverride={styleOverride}>
      {text}
    </StyledProfileSubTitle>
  );
};

export default ProfileSubTitle;


const StyledProfileSubTitle = styled.p`
  margin-bottom: 0;
  font-size: ${({theme}) => theme.font.size.md}rem;
  font-weight: ${({theme}) => theme.font.weight.regular};
  ${({styleOverride}) => styleOverride || ""}
`;

ProfileSubTitle.propTypes = {
  styleOverride: PropTypes.string,
  text: PropTypes.string,
}
