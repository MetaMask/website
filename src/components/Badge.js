import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

/**
 * @name - 
 * @summary - 
 * @description - 
 * @prop - 
 */
const StyledBadge = (props) => {
  const {
    backgroundColor,
    styleOverride,
    text,
    textColor,
    onClick
  } = props;
  return (
    <Badge
      backgroundColor={backgroundColor}
      textColor={textColor}
      styleOverride={styleOverride}
      onClick={onClick}
    >
      <BadgeText> {text} </BadgeText>
    </Badge>
  )
};

export default StyledBadge;

StyledBadge.propTypes = {
  backgroundColor: PropTypes.string,
  styleOverride:  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  text: PropTypes.string.isRequired,
  textColor: PropTypes.string,
};

const Badge = styled.div`
  width: auto;
  height: 26px;
  padding: 0 15px;
  border-radius: 40px;
  background-color: ${({backgroundColor, theme}) =>
    backgroundColor || "#1B04A8"};
  color: ${({textColor, theme}) =>
    textColor || theme.white};
  text-align: center;  
  ${({styleOverride}) => styleOverride}
`;

const BadgeText = styled.span`
  font-size: 50%;
  letter-spacing: 0.05em;
  line-height: 30px;
  overflow-wrap: letter;
  text-transform: uppercase;
`;
