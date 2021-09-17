import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const Wrapper = (props) => {
  const {
    children,
    styleOverride
  } = props;

  return (
    <StyledContainer styleOverride={styleOverride}>
      {children}
    </StyledContainer>
  );
};

const TextContainer = (props) => {
  const {
    children,
    styleOverride
  } = props;

  return (
    <StyledTextContainer styleOverride={styleOverride}>
      {children}
    </StyledTextContainer>
  );
};

export {
  Wrapper,
  TextContainer
};

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  ${({styleOverride}) => styleOverride || ""}
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 35px;
  ${({styleOverride}) => styleOverride || ""}
`;

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  styleOverride:  PropTypes.string
}


TextContainer.propTypes = {
  children: PropTypes.node.isRequired,
  styleOverride:  PropTypes.string
}
