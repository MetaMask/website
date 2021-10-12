import React from 'react';
import PropTypes from 'prop-types';

import SubHeader from '../SubHeader';


const ContentfulPageSubHeader = (props) => {
  const {
    moduleConfig: {
      subheaderLinks: links,
      subheaderBackgroundColor: backgroundColor,
    },
  } = props;

  return (
    <SubHeader
      links={links}
      backgroundColor={backgroundColor}
    />
  );
}

ContentfulPageSubHeader.propTypes = {
  moduleConfig: PropTypes.shape({
    links: PropTypes.object,
    backgroundColor: PropTypes.string,
   }),
};


export default ContentfulPageSubHeader;
