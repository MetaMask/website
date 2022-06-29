import PropTypes from 'prop-types'
import React from 'react'

const ArrowIcon = props => {
  const {
    fill = 'white',
    height = '25px',
    width = '50px',
    transform = 'none',
  } = props
  return (
    <svg
      width={width}
      height={height}
      transform={transform}
      viewBox="0 0 50 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill={fill}
        d="M20.4256 29.6688L29.5841 20.4387H0V13.873H29.297L20.1364 4.64247L24.7438 0L42 17.2122L25.0324 34.3112L20.4256 29.6688Z"
      />
    </svg>
  )
}

export default ArrowIcon

ArrowIcon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  transform: PropTypes.string,
}
