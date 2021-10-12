import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const ProfileDescription = ({
  text,
  styleOverride
}) => {
  if( !text ) return null;
  return (
    <StyledProfileDescription styleOverride={styleOverride}>
      {text}
    </StyledProfileDescription>
  );
};

export default ProfileDescription;

const StyledProfileDescription = styled.div`
  margin: ${({theme}) => theme.font.size.sm}rem 0 1rem 0;
  overflow: hidden;
  color: #595959;
  font-size: 13px;
  font-weight: ${({theme}) => theme.font.weight.regular};
  line-height: 1.5;
  ${({styleOverride}) => styleOverride || ""}
`;

ProfileDescription.propTypes = {
  text: PropTypes.string,
  styleOverride:  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
}
