import PropTypes from 'prop-types'
import React from 'react'

const ArrowIcon = props => {
  const {
    fill = 'white',
    height = '25px',
    width = '50px',
    transform = '',
    news = false,
  } = props

  if (news) {
    return (
      <svg
        width={width}
        height={height}
        transform={transform}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.4297 5.93018L20.4997 12.0002L14.4297 18.0702"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 12H20.33"
          stroke="#292D32"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  } else {
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
}

export default ArrowIcon

ArrowIcon.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  transform: PropTypes.string,
  news: PropTypes.bool,
}
