import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { prettifyURL } from '../../lib/utils/urlParser';

import Link from '../Link';

const ProfileLink = ({
  styleOverride,
  text,
  to,
  ...props
}) => {
  if( !to ) return null;
  return (
    <StyledProfileLink
      to={to}
      styleOverride={styleOverride}
      {...props}
    >
      {text || prettifyURL(to)}
    </StyledProfileLink>
  );
};

export default ProfileLink;


const StyledProfileLink = styled(Link)`
  margin-bottom: 0;
  color: #487BF8;
  font-size: 0.6875rem;
  font-weight: ${({theme}) => theme.font.weight.semiBold};
  line-height: 17px;
  text-transform: uppercase;
  cursor: pointer;
  ${({styleOverride}) => styleOverride || ""}
  &:hover {
    text-decoration: underline;
  }
`;


ProfileLink.propTypes = {
  styleOverride:  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  props: PropTypes.object,
}
