import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'gatsby'

const DefaultLink = props => {
  const { activeStyle, children, styleOverride, to, onClick, ...rest } = props

  let { newTab } = props
  if (!to) {
    return <div {...rest}>{children}</div>
  }

  const isAnchorLink = to.startsWith('#')
  if (isAnchorLink) {
    newTab = false
  }

  // checks if relative url "about/" or "/about/"
  // otherwise treats as external link
  const isInternal = /^\/(?!\/)/.test(to)
  const newTabHtmlAttributes = {
    target: newTab ? '_blank' : null,
    rel: newTab ? 'noopener' : null,
  }

  return isInternal ? (
    <Link to={to} activeStyle={activeStyle} {...newTabHtmlAttributes} {...rest}>
      {children}
    </Link>
  ) : (
    <a
      style={{ textDecoration: 'none' }}
      href={to}
      {...(isAnchorLink ? { 'data-anchor': to } : {})}
      {...newTabHtmlAttributes}
      {...rest}
    >
      {children}
    </a>
  )
}

export default DefaultLink

DefaultLink.propTypes = {
  activeStyle: PropTypes.object,
  styleOverride: PropTypes.string,
  to: PropTypes.string,
}
