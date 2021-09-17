import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import TwitterIcon from '../../images/social-icons/twitter.svg'
import LinkedInIcon from '../../images/social-icons/linkedin.svg'
import Link from '../Link';

const ProfileSocialIcon = ({
  styleOverride,
  icon,
  to,
  ...props
}) => {
  if( !to ) return null;
  return (
    <StyledProfileSocialIcon
      to={to}
      styleOverride={styleOverride}
      {...props}
    >
      {icon === 'twitter' && (
        <TwitterIcon />
      )}
      {icon === 'linkedin' && (
        <LinkedInIcon />
      )}
    </StyledProfileSocialIcon>
  );
};

export default ProfileSocialIcon;


const StyledProfileSocialIcon = styled(Link)`
  cursor: pointer;
  margin-top: 8px;
  display: inline-flex;
  margin-right: 16px;
  svg {
    height: 24px;
    path {
      fill: #595959;
    }
  }
  ${({styleOverride}) => styleOverride || ""}
`;


ProfileSocialIcon.propTypes = {
  styleOverride:  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ]),
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  props: PropTypes.object,
}
