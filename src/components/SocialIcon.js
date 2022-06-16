import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Twitter from '../images/icons/twitter.svg'

const SocialIcon = (props) => {
  const {
    type,
  } = props;

  return (
    <Icon>
      { 'Twitter' === type && <Twitter /> }
    </Icon>
  );
};

SocialIcon.propTypes = {
  type: PropTypes.string,
};

SocialIcon.defaultProps = {
  type: '',
};

export default SocialIcon;

const Icon = styled.span`
    display: flex;
    padding-right: 8px;
`