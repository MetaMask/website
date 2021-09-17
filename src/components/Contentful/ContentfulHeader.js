import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header';

const ContentfulHeader = (props) => {
  const {
    moduleConfig: {
      links,
      shadow = false,
    },
  } = props;

  return (
    <Header
      links={links}
      shadow={shadow}
    />
  );
};

export default ContentfulHeader;


ContentfulHeader.propTypes = {
  moduleConfig: PropTypes.shape({
    ctaAlignment: PropTypes.string,
    ctaLink: PropTypes.string,
    ctaNewTab: PropTypes.bool,
    ctaText: PropTypes.object,
    isButton: PropTypes.bool,
  }),
}
