import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../Footer';

const ContentfulLayoutFooter = (props) => {

  const {
    moduleConfig: {
      logo,
      menuItems,
      copyright
    },
  } = props;

  return (
    <Footer
      logo={logo}
      menus={menuItems}
      copyright={copyright}
    />
  )
}

export default ContentfulLayoutFooter;

ContentfulLayoutFooter.propTypes = {
  moduleConfig: PropTypes.shape({
    logo: PropTypes.object,
    menuItems:PropTypes.arrayOf(PropTypes.shape({ // top level columns
      title: PropTypes.string,
      modules: PropTypes.arrayOf(PropTypes.shape({ // list of links in column
        ctaLink: PropTypes.string.isRequired,
        displayText: PropTypes.string,
        newTab: PropTypes.bool,
      })),
    })),
    copyright: PropTypes.string,
  }),
};
