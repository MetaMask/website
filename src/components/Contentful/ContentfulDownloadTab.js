import React from 'react';
import PropTypes from 'prop-types';

const ContentfulDownloadTab = (props) => {

  return (
    <div>Download Tab</div>
  );
};

export default ContentfulDownloadTab;

ContentfulDownloadTab.propTypes = {
  moduleConfig: PropTypes.shape({
    ctaAlignment: PropTypes.string,
    ctaLink: PropTypes.string,
    ctaNewTab: PropTypes.bool,
    ctaText: PropTypes.string,
    isButton: PropTypes.bool,
  }),
}
