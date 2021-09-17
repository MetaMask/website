import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'gatsby';

const DefaultLink = (props) => {
  const {
    activeStyle,
    newTab,
    children,
    styleOverride,
    to,
    ...rest
  } = props
  
  // checks if relative url "about/" or "/about/"
  // otherwise treats as external link
  const isInternal = /^\/(?!\/)/.test(to);
  const newTabHtmlAttributes = {
    target: newTab ? "_blank" : null,
    rel: newTab ? "noopener" : null
  };

  return isInternal 
    ? <Link
        to={to}
        activeStyle={activeStyle}
        {...newTabHtmlAttributes}
        {...rest}
      > 
        {children}
      </Link>
    : <a
        style={{"textDecoration": "none"}}
        href={to}
        {...newTabHtmlAttributes}
        {...rest}
      >
        {children}
      </a>
};


export default DefaultLink;

DefaultLink.propTypes = {
  activeStyle: PropTypes.object,
  styleOverride: PropTypes.string,
  to: PropTypes.string.isRequired,
}
