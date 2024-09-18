import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import { DEFAULT_LOCALE_CODE } from '../lib/config.mjs'
import ContextClientSide from '../Context/ContextClientSide'
import Context from '../Context/ContextPage'
import { Link } from 'gatsby'

const DefaultLink = props => {
  const {
    activeStyle,
    children,
    styleOverride,
    to,
    newTab: omitNewTab,
    ...rest
  } = props
  let { newTab } = props
  const { localization } = useContext(ContextClientSide)
  const { localizedPages } = useContext(Context)
  const { locale } = localization || {}
  const [href, setHref] = useState(to)

  useEffect(() => {
    const localeCode = locale?.code
    if (
      localizedPages &&
      localizedPages.includes(href) &&
      localeCode &&
      localeCode !== DEFAULT_LOCALE_CODE
    ) {
      setHref(`/${localeCode}${to}`)
      return
    }
    setHref(to)
  }, [to, localizedPages, locale])

  if (!href) {
    return <div {...rest}>{children}</div>
  }

  const isAnchorLink = href.startsWith('#')
  if (isAnchorLink) {
    newTab = false
  }

  // checks if relative url "about/" or "/about/"
  // otherwise treats as external link
  const isInternal = /^\/(?!\/)/.test(href)
  const newTabHtmlAttributes = {
    target: newTab ? '_blank' : null,
    rel: newTab ? 'noopener' : null,
  }

  return isInternal ? (
    <Link
      to={href}
      activeStyle={activeStyle}
      {...newTabHtmlAttributes}
      {...rest}
    >
      {children}
    </Link>
  ) : (
    <a
      style={{ textDecoration: 'none' }}
      href={href}
      {...(isAnchorLink ? { 'data-anchor': href } : {})}
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
