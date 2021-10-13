import PropTypes from 'prop-types';
import React from 'react';

const ArrowIcon = (props) => {
  const {
    fill = "white",
    height = "25px",
    width = "50px",
  } = props;
  return (
    <svg width={width} height={height} viewBox="0 0 39 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill={fill} d="M33.8002 0.399952C33.7002 0.299952 33.5502 0.249952 33.4502 0.249952C33.3502 0.249952 33.2002 0.299952 33.1002 0.399952C32.9002 0.599952 32.9002 0.899953 33.1002 1.09995L36.5002 4.44995L0.800194 4.44995C0.500195 4.44995 0.300194 4.64995 0.300194 4.94995C0.300194 5.24995 0.500195 5.44995 0.800194 5.44995L36.5002 5.44995L33.1002 8.84995C32.9002 9.04995 32.9002 9.34995 33.1002 9.54995C33.3002 9.74995 33.6002 9.74995 33.8002 9.54995L38.0502 5.29995C38.2502 5.09995 38.2502 4.79995 38.0502 4.59995L33.8002 0.399952Z" />
    </svg>
  );
};

export default ArrowIcon;

ArrowIcon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
}
