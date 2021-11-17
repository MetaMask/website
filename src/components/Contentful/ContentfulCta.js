import React from 'react'
import PropTypes from 'prop-types'
import CTA from '../CTA'

const ContentfulCta = props => {
  const {
    moduleConfig: {
      ctaLink,
      ctaText,
      newTab,
      buttonDisplay,
      ctaAlignment,
      displayText,
      typeLayout = '',
      isHideArrow = true,
      color = 'primary',
      buttonSize,
      customClick,
      fontSize,
      buttonGradient,
      className,
      downloadBrowsers,
    },
  } = props
  const extractBrowsers = item =>
    item ? JSON.parse(item.internal.content) : null
  const arrayBrowsers = downloadBrowsers ? downloadBrowsers.map(extractBrowsers) : []
  const browsers = arrayBrowsers.reduce((obj, cur) => ({...obj, [cur.name]: cur}), {})
  return (
    <CTA
      link={ctaLink}
      text={displayText || ctaText}
      newTab={newTab}
      button={buttonDisplay}
      align={ctaAlignment}
      color={color}
      typeLayout={typeLayout}
      isHideArrow={isHideArrow}
      buttonSize={buttonSize}
      customClick={customClick}
      fontSize={fontSize}
      buttonGradient={buttonGradient}
      className={className}
      downloadBrowsers={browsers}
    />
  )
}

export default ContentfulCta

ContentfulCta.propTypes = {
  moduleConfig: PropTypes.shape({
    className: PropTypes.string,
    ctaAlignment: PropTypes.string,
    ctaLink: PropTypes.string,
    newTab: PropTypes.bool,
    ctaText: PropTypes.string,
    isButton: PropTypes.bool,
    typeLayout: PropTypes.string,
    isHideArrow: PropTypes.bool,
  }),
}
