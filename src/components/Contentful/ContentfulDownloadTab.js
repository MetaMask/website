import React from 'react';
import PropTypes from 'prop-types';

const ContentfulDownloadTab = (props) => {
  const {
    moduleConfig: {
    },
  } = props;

  return ;
};

export default ContentfulDownloadTab;


ContentfulDownloadTab.propTypes = {
  moduleConfig: PropTypes.shape({
    cardDescription: PropTypes.object,
    cardLink: PropTypes.string,
    cardTitle: PropTypes.string,
    cardImage: PropTypes.object,
    cardLinkOpensNewTab: PropTypes.boolean,
    isFeatured: PropTypes.bool,
    featuredBackground: PropTypes.object,
  }),
}



