import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../Footer';

const ContentfulFooter = (props) => {

  const {
    moduleConfig: {
      config
    },
  } = props;

  const columns = config[0].modules; // config[0] and config[0].modules are both required in Contentful

  const formattedColumns = columns.map((col) => ({
    // convert contentful Module Container intp default footer format
    title: col.moduleName,
    links: col.modules
  }));

  return (
    <Footer columns={formattedColumns} />
  )
}

export default ContentfulFooter;


ContentfulFooter.propTypes = {
  moduleConfig: PropTypes.shape({
    config: PropTypes.arrayOf(PropTypes.shape({
      modules:PropTypes.arrayOf(PropTypes.shape({ // top level columns
        moduleName: PropTypes.string, 
        modules: PropTypes.arrayOf(PropTypes.shape({ // list of links in column
          to: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          linkName: PropTypes.string,
          isPrivateRoute: PropTypes.bool.isRequired,
        })), 
      })),
    })),
  }),
};
