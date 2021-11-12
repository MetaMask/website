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
    },
  } = props

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
    />
  )
}

export default ContentfulCta

ContentfulCta.propTypes = {
  moduleConfig: PropTypes.shape({
    ctaAlignment: PropTypes.string,
    ctaLink: PropTypes.string,
    newTab: PropTypes.bool,
    ctaText: PropTypes.string,
    isButton: PropTypes.bool,
    typeLayout: PropTypes.string,
    isHideArrow: PropTypes.bool,
  }),
}
