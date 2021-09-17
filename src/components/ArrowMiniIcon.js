import PropTypes from 'prop-types'
import React from 'react'

const ArrowIcon = props => {
  const { fill = 'white', height = '13px', width = '17px' } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill}
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.4384 10.7002L11.9274 7.37133H0.657227V5.00338H11.818L8.32824 1.67433L10.0834 0L16.6572 6.20768L10.1934 12.3745L8.4384 10.7002Z"
        fill="white"
      />
    </svg>

  )
}

export default ArrowIcon

ArrowIcon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
}