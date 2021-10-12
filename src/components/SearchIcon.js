import PropTypes from 'prop-types';
import React from 'react';
import { withTheme } from 'styled-components';

const SearchIcon = (props) => {
  const {
    width = "50px",
    height = "25px",
    fill,
    theme
  } = props;
  return (
    // <!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"  fill="none" height={height} width={width}
       viewBox="0 0 488.139 488.139" >
      <g>
        <g>
          <g>
            <path fill={fill || theme.gray} d="M290.513,0.004C181.378,0.004,92.916,88.466,92.916,197.6c0,46.967,16.477,90.043,43.836,124.03
              L6.156,452.196c-8.208,8.238-8.208,21.553,0,29.761c8.208,8.238,21.553,8.238,29.761,0l130.596-130.566
              c33.926,27.329,77.032,43.806,124.03,43.806c109.134,0,197.597-88.462,197.597-197.597S399.616,0.004,290.513,0.004z
              M290.513,364.797c-92.232,0-167.197-74.996-167.197-167.197S198.341,30.403,290.513,30.403S457.71,105.399,457.71,197.6
              S382.714,364.797,290.513,364.797z"/>
          </g>
        </g>
      </g>
    </svg>
    
  );
};

export default withTheme(SearchIcon);

SearchIcon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
};