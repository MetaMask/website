import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';
import SocialIcon from './SocialIcon';

const SocialButtonItem = (props) => {
  const {
    name,
    text,
  } = props;

  return (
    <li>
        <Link ariaLabel={name}>
          <SocialIcon name={name} text={text}/>
        </Link>
    </li>
  );
};

SocialButtonItem.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
};

SocialButtonItem.defaultProps = {
  name: '',
  text: '',
};

export default SocialButtonItem;
